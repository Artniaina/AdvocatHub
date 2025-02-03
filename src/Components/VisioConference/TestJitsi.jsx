import React, { useCallback } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useNavigate } from "react-router-dom";

const VideoConference = () => {
  const navigate = useNavigate();

  // Gestionnaire d'erreurs
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
    // Désactive les notifications de feedback
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
        roomName="ma-salle-test"
        configOverwrite={jitsiConfig}
        interfaceConfigOverwrite={interfaceConfig}
        userInfo={{
          displayName: "Kanto Andriahariniaina",
          email: "", // Optionnel
          avatarURL: "", // Optionnel
        }}
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
