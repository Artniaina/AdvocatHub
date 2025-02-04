import React, { useCallback } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useLocation, useNavigate } from "react-router-dom";

const VideoConference = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lienVisio = location.state?.lienVisio;
  const handleError = useCallback(
    (error) => {
      console.error("Erreur Jitsi:", error);
      navigate("/error");
    },
    [navigate]
  );

  const handleClose = useCallback(() => {
    console.log("Réunion terminée !");
    navigate("/planning");
  }, [navigate]);

  const jitsiConfig = {
    startWithAudioMuted: true,
    startWithVideoMuted: true,
    disableModeratorIndicator: true,
    startScreenSharing: false,
    enableEmailInStats: false,
    prejoinPageEnabled: false,
    disableDeepLinking: true,
    feedbackPercentage: 0,
  };

  const interfaceConfig = {
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    SHOW_JITSI_WATERMARK: false,
    SHOW_PROMOTIONAL_CLOSE_PAGE: false,
    SHOW_CHROME_EXTENSION_BANNER: false,
  };

  return (
    <div className="video-conference-container" style={{ height: "100vh" }}>
      <JitsiMeeting
        domain="meet.jit.si"
        roomName={lienVisio}
        configOverwrite={jitsiConfig}
        interfaceConfigOverwrite={interfaceConfig}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100%";
          iframeRef.style.width = "100%";
        }}
        onReadyToClose={handleClose}
        onError={handleError}
      />
    </div>
  );
};

export default VideoConference;
