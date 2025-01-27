import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";

function TestJitsi() {
  return (
    <JitsiMeeting
      domain="meet.jit.si"
      roomName="ma-salle-test"
      configOverwrite={{
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: false,
        enableEmailInStats: false,
      }}
      interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        SHOW_JITSI_WATERMARK: false,
      }}
      userInfo={{
        displayName: "Kanto Andriahariniaina",
      }}
      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = "100vh";
      }}
    />
  );
}

export default TestJitsi;
