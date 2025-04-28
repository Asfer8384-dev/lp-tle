import { useState, useEffect, useRef } from "react";
import { Container, Box, Typography, useMediaQuery } from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const VideoSection = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    // const video = videoRef.current;
    // if (video) {
    //   video.muted = !video.muted;
    //   setIsMuted(video.muted);
    // }
    setIsMuted(!isMuted);
  };

  return (
    <Box sx={{ minHeight: "0vh", overflow: "hidden" }}>
      <Box
        id="features"
        sx={{
          position: "relative",
          height: { xs: "30vh", md: "100vh" },
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <video
          autoPlay
          loop
          // muted
          muted={isMuted}
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: { xs: "40vh", md: "100vh" },
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source
            src="https://player.vimeo.com/progressive_redirect/playback/1068823593/rendition/720p/file.mp4?loc=external&signature=a114d12a4f452079302a5ff8e34d03149e5532c24382bc339b97f9be6da3f98e"
            type="video/mp4"
          />
        </video>

        {/* <OpulenceStandouts isMobile={isMobile} /> */}

        <Typography
          sx={{
            position: "absolute",
            top: { xs: "20px", md: "120px" },
            right: { xs: "20px", md: "100px" },
            color: "white",
            cursor: "pointer",
            padding: "5px 10px",
            background: "rgba(0, 0, 0, 0.6)",
            borderRadius: "5px",
            "&:hover": {
              background: "rgba(0, 0, 0, 0.8)",
            },
            fontSize: { xs: "14px", md: "18px" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={toggleAudio}
        >
          {/* {isMuted ? "Play" : "Pause"} */}
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </Typography>
      </Box>
    </Box>
  );
};

const OpulenceStandouts = ({ isMobile }) => {
  return (
    <Box
      sx={{
        position: isMobile ? "relative" : "absolute",
        bottom: isMobile ? "auto" : 40,
        left: isMobile ? "auto" : "50%",
        transform: isMobile ? "none" : "translateX(-50%)",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        py: 2,
        px: 3,
        borderRadius: "0 76px  0 76px",
        display: { xs: "none", md: "block" },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontSize: { md: "30px", xs: "24px" },
            fontWeight: "bold",
            background:
              "linear-gradient(90deg, rgba(21, 100, 53, 1) 0%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: "Old Standard TT",
            marginBottom: { xs: "15px", sm: "0px", md: "0px" },
          }}
        >
          The Defining Standouts of The Lakes Edge
        </Typography>
      </Container>
    </Box>
  );
};

export default VideoSection;
