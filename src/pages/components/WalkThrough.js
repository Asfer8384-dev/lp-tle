import { useState, useEffect, useRef } from "react";
import { Container, Box, Typography, useMediaQuery } from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const WalkThrough = () => {
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
    <Box sx={{ minHeight: "10vh" }}>
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
        {/* <video
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
            src="https://www.youtube.com/embed/hFQ0AB046ms?si=IFs_5-IrX2SnA--g"
            type="video/mp4"
          />
        </video> */}

        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/hFQ0AB046ms?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=1&fs=0"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          rel="0"
        />

        <OpulenceStandouts isMobile={isMobile} />

        {/* <Typography
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
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </Typography> */}
      </Box>

      <Box
        sx={{
          width: "100%",
          // border: "1px solid black",
          // display: "flex",
          justifyContent: "center",
          display: { xs: "flex", md: "none" },
        }}
      >
        <Typography
          // variant="h4"
          // component="h2"
          sx={{
            fontSize: { md: "30px", xs: "24px" },
            fontWeight: "bold",
            background:
              "linear-gradient(90deg, rgba(21, 100, 53, 1) 0%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: "Old Standard TT",
            // marginBottom: { xs: "15px", sm: "0px", md: "0px" },
            textAlign: "center",
            width: "80%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          The Defining Standouts of The Lakes Edge
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
            // fontWeight: "bold",
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

export default WalkThrough;
