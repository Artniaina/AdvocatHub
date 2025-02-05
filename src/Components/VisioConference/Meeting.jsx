import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Share2,
  Copy,
  Users,
  UserPlus,
} from "lucide-react";
import io from "socket.io-client";

const Meeting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCameraEnabled, isMicEnabled, isOrganisateur } = location.state || {};
  const { roomId } = useParams();

  const [localStream, setLocalStream] = useState(null);
  const [participants, setParticipants] = useState(new Map());
  const [isMicOn, setIsMicOn] = useState(isMicEnabled);
  const [isCameraOn, setIsCameraOn] = useState(isCameraEnabled);
  const [isSharing, setIsSharing] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(isOrganisateur);
  const localVideoRef = useRef(null);
  const socket = useRef(null);
  const peerConnections = useRef(new Map());

  useEffect(() => {
    if (!roomId) {
      console.log("No valid room ID found");
      // navigate("/");
      return;
    }

    initializeMedia();
    connectToRoom();
    return () => cleanupConnection();
  }, [roomId]);

  useEffect(() => {
    initializeMedia();
    connectToRoom();
    return () => cleanupConnection();
  }, [roomId]);

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: isMicEnabled,
        video: isCameraEnabled,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      stream.getAudioTracks().forEach((track) => {
        track.enabled = isMicEnabled;
      });

      stream.getVideoTracks().forEach((track) => {
        track.enabled = isCameraEnabled;
      });

      setLocalStream(stream);
    } catch (error) {
      console.error("Media error:", error);
    }
  };

  const toggleMic = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMicOn(audioTracks[0].enabled);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn(videoTracks[0].enabled);
    }
  };

  const muteAllParticipants = () => {
    if (isOrganizer) {
      socket.current.emit("mute-all", { roomId });
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
      console.error("Screen share error:", error);
    }
  };

  const connectToRoom = () => {
    socket.current = io("http://localhost:5000");
  
    socket.current.emit("join-room", roomId);
  
    socket.current.on("user-connected", (userId) => {
      console.log("New user connected:", userId);
      createPeerConnection(userId);
    });
  
    socket.current.on("user-disconnected", (userId) => {
      console.log("User disconnected:", userId);
      if (peerConnections.current.has(userId)) {
        const peerConnection = peerConnections.current.get(userId);
        peerConnection.close();
        peerConnections.current.delete(userId);
      }
    });
  
    socket.current.on("offer", handleOffer);
    socket.current.on("answer", handleAnswer);
    socket.current.on("ice-candidate", handleIceCandidate);
  };
  
  const createPeerConnection = (userId) => {
    const peerConnection = new RTCPeerConnection();
  
    peerConnections.current.set(userId, peerConnection);
  
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("ice-candidate", {
          userId,
          candidate: event.candidate,
          roomId,
        });
      }
    };
  
    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];
      setParticipants((prevParticipants) => new Map(prevParticipants.set(userId, { id: userId, stream: remoteStream })));
    };
  
    // Add the local stream to the peer connection
    if (localStream) {
      localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));
    }
  
    // Create offer to send to new user
    peerConnection.createOffer().then((offer) => {
      peerConnection.setLocalDescription(offer);
      socket.current.emit("offer", {
        userId,
        offer,
        roomId,
      });
    }).catch((err) => console.error("Error creating offer:", err));
  };
  
  const handleOffer = (data) => {
    const { userId, offer } = data;
    const peerConnection = peerConnections.current.get(userId);
  
    if (!peerConnection) {
      createPeerConnection(userId);
    }
  
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  
    peerConnection.createAnswer().then((answer) => {
      peerConnection.setLocalDescription(answer);
      socket.current.emit("answer", {
        userId,
        answer,
        roomId,
      });
    }).catch((err) => console.error("Error creating answer:", err));
  };
  
  const handleAnswer = (data) => {
    const { userId, answer } = data;
    const peerConnection = peerConnections.current.get(userId);
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };
  
  const handleIceCandidate = (data) => {
    const { userId, candidate } = data;
    const peerConnection = peerConnections.current.get(userId);
    if (peerConnection) {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };
  

  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}/join/${roomId}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => alert("Lien d'invitation copié!"))
      .catch((err) => console.error("Erreur lors de la copie du lien:", err));
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
      {/* Header */}
      <div className="h-16 bg-gray-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-white font-semibold">Room: {roomId}</h1>
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <UserPlus size={16} />
            <span>Invite</span>
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
        <span>You (Host)</span>
        <div className="flex gap-2">
          {!isMicOn && <MicOff size={16} />}
          {!isCameraOn && <VideoOff size={16} />}
        </div>
      </div>
    </div>
  </div>

  {Array.from(participants.values()).map((participant) => (
    <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden">
      <video
        autoPlay
        playsInline
        srcObject={participant.stream}
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
            className={`p-4 rounded-full ${isMicOn ? "bg-gray-600" : "bg-red-500"}`}
          >
            {isMicOn ? <Mic className="text-white" /> : <MicOff className="text-white" />}
          </button>
          <button
            onClick={toggleCamera}
            className={`p-4 rounded-full ${isCameraOn ? "bg-gray-600" : "bg-red-500"}`}
          >
            {isCameraOn ? <Video className="text-white" /> : <VideoOff className="text-white" />}
          </button>
          <button
            onClick={toggleScreenShare}
            className={`p-4 rounded-full ${isSharing ? "bg-blue-500" : "bg-gray-600"}`}
          >
            <Share2 className="text-white" />
          </button>

          {isOrganizer && (
            <button
              onClick={muteAllParticipants}
              className="p-4 rounded-full bg-red-500 hover:bg-red-600"
            >
              <MicOff className="text-white" />
            </button>
          )}
        </div>

        <button
          onClick={() => navigate("/")}
          className="p-4 rounded-full bg-red-500 hover:bg-red-600"
        >
          <PhoneOff className="text-white" />
        </button>
      </div>

      {showParticipants && (
        <div className="absolute right-0 top-16 w-80 bg-gray-800 shadow-lg rounded-lg m-4">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-white font-semibold">Participants</h2>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-white">
                <span>You (Host)</span>
                <div className="flex gap-2">
                  {!isMicOn && <MicOff size={16} />}
                  {!isCameraOn && <VideoOff size={16} />}
                </div>
              </div>
              {Array.from(participants.values()).map((participant) => (
                <div key={participant.id} className="flex items-center justify-between text-white">
                  <span>{participant.username}</span>
                  {isOrganizer && (
                    <button className="text-red-500 hover:text-red-400">Remove</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showInvite && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-white font-semibold mb-4">Invite Participants</h2>
            <div className="flex items-center gap-2 bg-gray-700 p-2 rounded">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/join/${roomId}`}
                className="flex-1 bg-transparent text-white outline-none"
              />
              <button onClick={copyInviteLink} className="p-2 hover:bg-gray-600 rounded">
                <Copy className="text-white" size={20} />
              </button>
            </div>
            <button
              onClick={() => setShowInvite(false)}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meeting;
