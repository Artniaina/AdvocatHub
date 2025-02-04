// PreMeetingRoom.js
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Mic, Monitor, Settings, UserCircle } from 'lucide-react';

const PreMeetingRoom = () => {
  const [devices, setDevices] = useState({
    cameras: [],
    microphones: [],
    speakers: []
  });
  const [selectedDevices, setSelectedDevices] = useState({
    cameraId: '',
    microphoneId: '',
    speakerId: ''
  });
  const [username, setUsername] = useState('');
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    getDevices();
    initializePreview();
  }, []);

  const getDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setDevices({
        cameras: devices.filter(device => device.kind === 'videoinput'),
        microphones: devices.filter(device => device.kind === 'audioinput'),
        speakers: devices.filter(device => device.kind === 'audiooutput')
      });
    } catch (error) {
      console.error('Error getting devices:', error);
    }
  };

  const initializePreview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full p-6">
        <h1 className="text-2xl font-bold text-white mb-8 text-center">
          Prepare to Join Meeting
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Video Preview */}
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-2 bg-gray-900 bg-opacity-75 rounded-full px-4 py-2">
                  <button className="p-2 rounded-full hover:bg-gray-700">
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-700">
                    <Mic className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg">
              <UserCircle className="w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                className="flex-1 bg-transparent text-white border-none focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* Right Column - Device Settings */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-gray-400 text-sm font-medium">
                Camera
                <select 
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent text-white py-2 px-3"
                  value={selectedDevices.cameraId}
                  onChange={(e) => setSelectedDevices(prev => ({ ...prev, cameraId: e.target.value }))}
                >
                  {devices.cameras.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-gray-400 text-sm font-medium">
                Microphone
                <select 
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent text-white py-2 px-3"
                  value={selectedDevices.microphoneId}
                  onChange={(e) => setSelectedDevices(prev => ({ ...prev, microphoneId: e.target.value }))}
                >
                  {devices.microphones.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Microphone ${device.deviceId.slice(0, 5)}`}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-gray-400 text-sm font-medium">
                Speaker
                <select 
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent text-white py-2 px-3"
                  value={selectedDevices.speakerId}
                  onChange={(e) => setSelectedDevices(prev => ({ ...prev, speakerId: e.target.value }))}
                >
                  {devices.speakers.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Speaker ${device.deviceId.slice(0, 5)}`}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button 
              className="w-full bg-blue-500 text-white rounded-lg py-3 px-4 hover:bg-blue-600 transition-colors"
            >
              Join Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreMeetingRoom;