import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Share2,
  Copy,
  Users,
  MessageSquare,
  Settings,
  UserPlus,
} from "lucide-react";
import io from "socket.io-client";

const Meeting = () => {
  const { roomId } = "my-romm-test";
  const navigate = useNavigate();

  const [localStream, setLocalStream] = useState(null);
  const [participants, setParticipants] = useState(new Map());
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  const localVideoRef = useRef(null);
  const wsRef = useRef(null);
  const peerConnections = useRef(new Map());

  const socket = useRef(null);

  useEffect(() => {
    initializeMedia();
    connectToRoom();

    return () => {
      cleanupConnection();
    };
  }, [roomId]);

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setLocalStream(stream);
    } catch (error) {
      console.error("Erreur média:", error);
    }
  };

  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [screenStream, setScreenStream] = useState(null);
  const [screenSharing, setScreenSharing] = useState(false);

  useEffect(() => {
    const initMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
    };

    initMedia();
  }, []);
  const handleSocketMessage = (data) => {
    switch (data.type) {
      case "participant-joined":
        addParticipant(data.participantId, data.username);
        break;
      case "participant-left":
        removeParticipant(data.participantId);
        break;
    }
  };


  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
  
     
      if (audioTrack.enabled) {
        audioTrack.enabled = false;
      } else {
  
        audioTrack.enabled = true;
      }
      

      if (!audioTrack.enabled) {
        audioTrack.stop();
      }
  
      setIsMicOn(audioTrack.enabled);
    }
  };
  
  const toggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
  
  
      if (videoTrack.enabled) {
        videoTrack.enabled = false;
      } else {
       
        videoTrack.enabled = true;
      }
      
      
      if (!videoTrack.enabled) {
        videoTrack.stop();
      }
  
      setIsCameraOn(videoTrack.enabled);
    }
  };
  
  const toggleScreenShare = async () => {
    try {
      if (!isSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
     
        setIsSharing(true);
      } else {
        setIsSharing(false);
      }
    } catch (error) {
      console.error("Erreur partage écran:", error);
    }
  };

  const copyInviteLink = () => {
    const inviteLink = window.location.href;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => alert("Invite link copied!"))
      .catch((err) => console.error("Failed to copy invite link:", err));
  };

  const connectToRoom = () => {
    socket.current = io("http://localhost:5000");

    socket.current.emit("join-room", roomId);

    socket.current.on("participant-joined", (data) => {
      addParticipant(data.participantId, data.username);
      createPeerConnection(data.participantId);
    });

    socket.current.on("participant-left", (data) => {
      removeParticipant(data.participantId);
      closePeerConnection(data.participantId);
    });

    socket.current.on("offer", async (data) => {
      handleOffer(data);
    });

    socket.current.on("answer", async (data) => {
      handleAnswer(data);
    });

    socket.current.on("ice-candidate", async (data) => {
      handleNewICECandidate(data);
    });
  };

  const sendOffer = async (to) => {
    const peerConnection = peerConnections.current.get(to);
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.current.emit("offer", { to, offer });
  };

  const handleOffer = async ({ from, offer }) => {
    const peerConnection = peerConnections.current.get(from);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.current.emit("answer", { to: from, answer });
  };

  const sendAnswer = async (to) => {
    const peerConnection = peerConnections.current.get(to);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.current.emit("answer", { to, answer });
  };

  const handleAnswer = async ({ from, answer }) => {
    const peerConnection = peerConnections.current.get(from);
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  };

  const handleNewICECandidate = async (candidate) => {
    const peerConnection = peerConnections.current.get(candidate.to);
    try {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (e) {
      console.error("Error adding ICE candidate", e);
    }
  };

  const addParticipant = (id, username) => {
    setParticipants((prev) => new Map(prev).set(id, { id, username }));
  };

  const removeParticipant = (id) => {
    setParticipants((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
    closePeerConnection(id);
  };

  const createPeerConnection = (id) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    localStream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, localStream));

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("ice-candidate", {
          to: id,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];
    };

    peerConnections.current.set(id, peerConnection);
  };

  const closePeerConnection = (id) => {
    const peerConnection = peerConnections.current.get(id);
    if (peerConnection) {
      peerConnection.close();
      peerConnections.current.delete(id);
    }
  };

  const cleanupConnection = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (socket.current) {
      socket.current.disconnect();
    }
    peerConnections.current.forEach((peerConnection) => peerConnection.close());
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <div className="h-16 bg-gray-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-white font-semibold">Salle: {roomId}</h1>
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <UserPlus size={16} />
            <span>Inviter</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className="text-white flex items-center gap-2"
          >
            <Users size={20} />
            <span>{participants.size + 1} participants</span>
          </button>
        </div>
      </div>


      <div className="flex-1 grid grid-cols-3 gap-4 p-4">
        <div className="relative bg-gray-800 rounded-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
            <div className="flex items-center justify-between text-white">
              <span>Vous</span>
              <div className="flex gap-2">
                {!isMicOn && <MicOff size={16} />}
                {!isCameraOn && <VideoOff size={16} />}
              </div>
            </div>
          </div>
        </div>

        {Array.from(participants.values()).map((participant) => (
          <div
            key={participant.id}
            className="relative bg-gray-800 rounded-lg overflow-hidden"
          >
            <video
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
              <span className="text-white">{participant.username}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="h-20 bg-gray-800 flex items-center justify-between px-8">
        <div className="flex gap-4">
          <button
            onClick={toggleMic}
            className={`p-4 rounded-full ${
              isMicOn ? "bg-gray-600" : "bg-red-500"
            }`}
          >
            {isMicOn ? (
              <Mic className="text-white" />
            ) : (
              <MicOff className="text-white" />
            )}
          </button>

          <button
            onClick={toggleCamera}
            className={`p-4 rounded-full ${
              isCameraOn ? "bg-gray-600" : "bg-red-500"
            }`}
          >
            {isCameraOn ? (
              <Video className="text-white" />
            ) : (
              <VideoOff className="text-white" />
            )}
          </button>

          <button
            onClick={toggleScreenShare}
            className={`p-4 rounded-full ${
              isSharing ? "bg-blue-500" : "bg-gray-600"
            }`}
          >
            <Share2 className="text-white" />
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="p-4 rounded-full bg-red-500 hover:bg-red-600"
        >
          <PhoneOff className="text-white" />
        </button>
      </div>

      {/* Modal Participants */}
      {showParticipants && (
        <div className="absolute right-0 top-16 w-80 bg-gray-800 shadow-lg rounded-lg m-4">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-white font-semibold">Participants</h2>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-white">
                <span>Vous (Hôte)</span>
                <div className="flex gap-2">
                  {!isMicOn && <MicOff size={16} />}
                  {!isCameraOn && <VideoOff size={16} />}
                </div>
              </div>
              {Array.from(participants.values()).map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between text-white"
                >
                  <span>{participant.username}</span>
                  <button className="text-red-500 hover:text-red-400">
                    Exclure
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showInvite && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-white font-semibold mb-4">
              Inviter des participants
            </h2>
            <div className="flex items-center gap-2 bg-gray-700 p-2 rounded">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/join/${roomId}`}
                className="flex-1 bg-transparent text-white outline-none"
              />
              <button
                onClick={copyInviteLink}
                className="p-2 hover:bg-gray-600 rounded"
              >
                <Copy className="text-white" size={20} />
              </button>
            </div>
            <button
              onClick={() => setShowInvite(false)}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meeting;
