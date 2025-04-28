import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  SvgIcon,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef } from "react";
import Image from "next/image";
import section1 from "../../../public/ImageR/Overview/frame.jpg";
import section2 from "../../../public/ImageR/Overview/elevation.webp";
import IGBC from "../../../public/ImageR/igbc.png";

const CheckIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 512 512">
    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
  </SvgIcon>
);

export default function Overview({ setOpenEnquiry }) {
  const isMobile = useMediaQuery("(max-width:600px)");

  const fullContainerRef = useRef(null);
  useEffect(() => {
    import("gsap").then((gsap) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.default.registerPlugin(ScrollTrigger);

        const getStartPosition = () =>
          window.innerWidth < 768 ? "top 100%" : "top 85%";

        gsap.default.fromTo(
          fullContainerRef.current,
          { y: 160, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: fullContainerRef.current,
              start: getStartPosition(),
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });
  }, []);
  return (
    <Box
      id="about"
      component="section"
      // sx={{ py: { md: 8, xs: 0 } }}
      ref={fullContainerRef}
      // sx={{ border: "1px solid black" }}
      sx={{ padding: "0px", py: { md: 8, xs: 0 } }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          justifyContent={"space-between"}
          // sx={{ border: "1px solid black" }}
        >
          {/* Left Images */}
          <Grid
            item
            xs={12}
            md={4.5}
            sx={{
              display: isMobile ? "none" : "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              position: "relative",
            }}
          >
            <Image
              src={section1}
              alt="Urbanrise Opulence"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <Image
              src={section2}
              alt="Urbanrise Opulence"
              style={{
                maxWidth: "90%", // Adjust the size if needed
                height: "auto",
                position: "absolute",
                bottom: "-80px",
                left: "30%", // Adjust as per your requirement
                zIndex: 10, // Corrected from "10px" to a number
              }}
            />
          </Grid>

          {/* Right Content */}
          <Grid item xs={12} md={6.5}>
            <Typography
              // variant="h4"
              // component="h2"
              // gutterBottom
              sx={{
                marginBottom: { md: "30px", xs: "10px" },
                marginTop: { md: "00px", xs: "20px" },
                fontSize: { xs: "28px", sm: "40px", md: "40px" },
                fontWeight: 500,
                backgroundImage:
                  "linear-gradient(90deg, rgba(21, 100, 53, 1) 30%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 75%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                // fontFamily: "ol",
                fontFamily: "Old Standard TT",
                // border: "1px solid black",
                textAlign: { xs: "center", sm: "start", md: "start" },
              }}
            >
              Urbanrise The Lakes Edge Congestion Free Living
            </Typography>
            {isMobile && (
              <Image
                src={section2}
                alt="Urbanrise Opulence"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  padding: "10px 0 10px 0",
                }}
              />
            )}
            <Box sx={{ paddingLeft: { xs: "0px", sm: "0px", md: "25px" } }}>
              <Typography
                // variant="body1"
                paragraph
                sx={{
                  marginBottom: { xs: "00px", sm: "30px", md: "30px" },
                  marginTop: { xs: "5px", sm: "0px", md: "0px" },
                  width: { xs: "100%", sm: "90%", md: "90%" },
                  fontFamily: "Open Sans",
                  textAlign: { xs: "start", sm: "start", md: "start" },
                  fontSize: { xs: "14px", sm: "16px", md: "16px" },
                }}
              >
                Relish a life of Style and Sophistication nestled amidst the
                serene beauty of Retteri Lake at Urbanrise The Lakes Edge in
                Madhavaram. Experience modernity in meticulously designed 2 and
                3 BHK apartments that redefine urban living. Built on 5 acres of
                pristine surroundings, this exclusive community offers
                congestion-free living, ensuring ample breathing space and
                privacy for every resident. Employing the cutting-edge MIVAN
                construction technology, The Lakes Edge ensures durability,
                safety, and superior quality living.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Box
                sx={{
                  mt: 0,
                  textAlign: "center",
                  display: { xs: "none", sm: "none", md: "block" },
                }}
              >
                <Image
                  src={IGBC}
                  alt="Urbanrise Logo"
                  width={180}
                  height={180}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Box>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  p: 0,
                  marginBottom: { md: "30px", xs: "20px" },
                }}
              >
                {[
                  {
                    label: "Total Land Area",
                    value: "5 Acres of scenic landscapes and open spaces",
                  },
                  {
                    label: "Towers",
                    value:
                      "2 stunning high-rise towers offering panoramic views",
                  },
                  {
                    label: "Floors",
                    value: "Basement + Stilt + 18 Floors",
                  },
                  {
                    label: "Apartment Sizes",
                    value:
                      "2 & 3 BHK Flats Ranging from 998 Sq.ft to 1578 Sq.ft",
                  },
                  {
                    label: "Total Apartments",
                    value: " 382 spacious homes",
                  },
                ].map((item, index) => (
                  <Box
                    component="li"
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <CheckIcon
                      sx={{
                        color: "#1252ae",
                        fontSize: { xs: 12, sm: 15, md: 15 },
                        mt: "5px",
                        display: { xs: "none", sm: "block", md: "block" },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Open Sans",
                          fontSize: { xs: "14px", sm: "16px", md: "16px" },
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>{item.label}</span>
                        &nbsp;<span style={{ fontWeight: "bold" }}>-</span>
                        &nbsp;{item.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* <Box
              component="ul"
              sx={{
                listStyle: "none",
                p: 0,
                marginBottom: { md: "30px", xs: "30px" },
              }}
            >
              {[
                {
                  label: "Total Land Area",
                  value: "3.4 Acres of scenic landscapes and open spaces",
                },
                {
                  label: "Towers",
                  value: "2 stunning high-rise towers offering panoramic views",
                },
                {
                  label: "Floors",
                  value:
                    "Ground + 12 levels with a modern architectural design",
                },
                { label: "Total Apartments", value: "382 spacious homes" },
                {
                  label: "Apartment Sizes",
                  value: "Ranging from 1320 Sft to 1650 Sft",
                },
              ].map((item, index) => (
                <Box
                  component="li"
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1, // Adds spacing between elements
                    mb: 1,
                    // flexWrap: "wrap", // Ensures wrapping when necessary
                  }}
                >
                  <CheckIcon sx={{ color: "green", fontSize: 18, mt: "3px" }} />
                  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap", // Prevents label from wrapping separately
                        mr: 0.5,
                      }}
                    >
                      {item.label}:
                    </Typography>
                    <Typography variant="body1" component="span">
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box> */}

            {/* <Box sx={{ mt: 3, textAlign: "center" }}>
              <Image
                src={IGBC}
                alt="Urbanrise Logo"
                width={50}
                height={50}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box> */}

            <Box
              sx={{
                mt: { xs: 0, sm: 4, md: 4 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: { xs: "15px", sm: "0px", md: "0px" },
              }}
            >
              <Button
                onClick={() => setOpenEnquiry(true)}
                variant="contained"
                // color="primary"
                size="small"
                sx={{
                  borderRadius: "20px",
                  padding: "10px 50px ",
                  // background: "#fff385",
                  // color: "black",
                  boxShadow: "none",
                  fontFamily: "Open Sans",
                }}
              >
                Get Brochure
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
