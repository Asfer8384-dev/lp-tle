import { Container, Grid, Typography, Button, Box } from "@mui/material";
import Image from "next/image";
import heroImage from "../../../public/ImageR/locationmap.webp"; // Replace with actual image path
import { useEffect, useRef } from "react";

export default function Details({ setOpenEnquiry }) {
  const headingRef = useRef(null);

  useEffect(() => {
    import("gsap").then((gsap) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.default.registerPlugin(ScrollTrigger);

        const getStartPosition = () =>
          window.innerWidth < 768 ? "top 95%" : "top 85%";

        gsap.default.fromTo(
          headingRef.current,
          { y: 180, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: getStartPosition(),
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });
  }, []);
  return (
    <Container
      id="luxury"
      maxWidth="xl"
      // sx={{ py: 8 }}
      ref={headingRef}
      sx={{
        // border: "1px solid black",
        padding: "0px 20px",
        borderTopLeftRadius: "80px",
        borderTopRightRadius: "80px",
        overflow: "hidden",
        padding: "10px 15px",
      }}
    >
      {/* Hero Section */}
      <Box textAlign="center" mb={5}>
        <Typography
          // variant="h4"
          // component="h1"
          sx={{
            fontSize: { xs: "28px", sm: "40px", md: "50px" },
            fontWeight: "500",
            backgroundImage:
              "linear-gradient(90deg, rgba(21, 100, 53, 1) 30%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 75%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: "Old Standard TT",
            marginBottom: { xs: "5px", sm: "0px", md: "0px" },
          }}
        >
          At the Heart of Madhavaram
        </Typography>
        <Typography
          // variant="h5"
          // component="h2"
          // mt={2}
          sx={{
            fontSize: {
              xs: "14px",
              sm: "20px",
              md: "20px",
            },
            fontWeight: 500,
            color: "rgb(33, 37, 41)",
            fontFamily: "Old Standard TT",
            display: { xs: "block", md: "none" },
          }}
        >
          In the Midst of Serenity, <br /> Close to the Vibrancy of the City
        </Typography>
        <Typography
          // variant="h5"
          // component="h2"
          // mt={2}
          sx={{
            fontSize: {
              xs: "14px",
              sm: "20px",
              md: "20px",
            },
            fontWeight: 500,
            color: "rgb(33, 37, 41)",
            fontFamily: "Old Standard TT",
            display: { xs: "none", md: "block" },
          }}
        >
          In the Midst of Serenity, Close to the Vibrancy of the City
        </Typography>
      </Box>

      {/* Content Section */}
      <Grid container spacing={4} alignItems="center">
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            overflow: "hidden",
            position: "relative",
            // border: "1px solid black",
            marginTop: { xs: "-20px", sm: "0px", md: "0px" },
          }}
        >
          <Image
            src={heroImage}
            alt="Aerial view of highways and greenery"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            paragraph
            sx={{
              fontSize: { md: "17px", xs: "14px" },
              color: "#000000",
              fontWeight: 400,
              // lineHeight: { md: "30px" },
              width: { xs: "100%", sm: "90%", md: "90%" },
              fontFamily: "Open Sans",
              // textAlign: { xs: "center", sm: "start", md: "start" },
              marginTop: { xs: "-20px", sm: "0px", md: "0px" },
            }}
          >
            Stay connected to the city’s vibrant hubs while enjoying homes
            thoughtfully designed to value your space and tranquility. Spanning
            5 acres, Urbanrise The Lakes Edge, located in the heart of
            Madhavaram, redefines modern living with a vast green community
            featuring meticulously planned apartments and expansive green
            spaces.
          </Typography>
          <Typography
            paragraph
            sx={{
              fontSize: { md: "17px", xs: "14px" },
              color: "#000000",
              fontWeight: 400,
              // lineHeight: { md: "30px" },
              width: { xs: "100%", sm: "90%", md: "90%" },
              fontFamily: "Open Sans",
              // textAlign: { xs: "center", sm: "start", md: "start" },
              marginTop: { xs: "-20px", sm: "0px", md: "0px" },
            }}
          >
            Unlike overcrowded developments, this exclusive project offers ample
            breathing room, allowing residents to savour privacy, serenity, and
            world-class amenities—all while staying close to the heart of the
            city.
          </Typography>
          <Box
            sx={{
              width: { xs: "100%", sm: "90%", md: "90%" },
              marginTop: { xs: "25px", md: "40px" },
              // textAlign: { xs: "center", md: "start" },
              // border: "1px solid black",
              display: "flex",
              justifyContent: { xs: "center", md: "start" },
              marginBottom: { xs: "10px", md: "0px" },

            }}
          >
            <Typography
              onClick={setOpenEnquiry}
              sx={{
                width: "fit-content",
                padding: "10px 20px",
                borderRadius: "20px",
                fontSize: "14px",
                backgroundColor: "#1252ae",
                color: "white",
                cursor: "pointer",
              }}
            >
              Contact Us
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
