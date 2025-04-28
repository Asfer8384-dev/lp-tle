import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import PioneersSection from "./UrbanriseAboutIcon";

export default function AboutUrbanrise() {
  const hedaingRef = useRef(null);

  useEffect(() => {
    import("gsap").then((gsap) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.default.registerPlugin(ScrollTrigger);

        const getStartPosition = () =>
          window.innerWidth < 768 ? "top 95%" : "top 85%";

        gsap.default.fromTo(
          hedaingRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: hedaingRef.current,
              start: getStartPosition(),
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });
  }, []);
  return (
    <Grid
      sx={{
        minHeight: { xs: "fit-content", sm: "80vh", md: "80vh" },
        padding: {
          xs: "15px",
          sm: "20px 30px",
          md: "60px 50px",
        },
      }}
    >
      <Box>
        <Typography
          component="h1"
          sx={{
            fontSize: {
              xs: "18px",
              sm: "16px",
              md: "18px",
            },
            marginTop: { xs: "0px", sm: "20px", md: "20px" },
            width: "fit-content",
            padding: "0px 5px",
            borderRadius: "20px",
            color: "black",
            fontFamily: "Old Standard TT",
            letterSpacing: ".5px",
            "&::after": {
              content: '""',
              display: "block",
              width: "100%",
              height: "2px",
              backgroundColor: "black",
            },
            marginBottom: { xs: "15px", sm: "20px", md: "20px" },
            fontWeight: "bold",
          }}
        >
          About Urbanrise
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "28px",
              sm: "50px",
              md: "50px",
            },
            letterSpacing: {
              xs: "3px",
              sm: "5px",
              md: "4px",
            },
            lineHeight: {
              xs: "40px",
              sm: "50px",
              md: "60px",
            },
            backgroundImage:
              "linear-gradient(90deg, rgba(21, 100, 53, 1) 8%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 65%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            display: "inline-block",
            // fontWeight: "bold",
            fontFamily: "Old Standard TT",
            width: { xs: "100%", sm: "70%", md: "70%" },
          }}
        >
          Largest Real Estate Developer in South India
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: { xs: "10px", sm: "30px", md: "30px" },
        }}
      >
        <Typography
          ref={hedaingRef}
          sx={{
            fontSize: {
              xs: "14px",
              sm: "18px",
              md: "18px",
            },
            letterSpacing: {
              // xs: ".3px",
              sm: ".4px",
              md: ".5px",
            },
            width: { xs: "100%", sm: "80%", md: "80%" },
            fontFamily: "Open Sans",
          }}
        >
          Urbanrise is South India’s largest real estate developer, recognized
          for its pathbreaking and quality residential projects across South
          India. Backed by the renowned Alliance Group, Urbanrise has delivered
          over 22,000+ homes and has 72 million square feet under development.
          Driven by a passion for growth and sustainability, our projects are
          not just about creating homes but building communities that foster a
          sense of belonging. With a commitment to integrity and reliability,
          Urbanrise ensures timely delivery, meeting and exceeding home buyer
          expectations.
        </Typography>
      </Box>
      <PioneersSection />
    </Grid>
  );
}
