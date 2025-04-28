import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationDetailsImage from "../../../public/ImageR/Location3.jpg";

const data = [
  {
    title: "Schools within 5 -10 mins drive",
    items: [
      "Velammal International School",
      "Narayana E-Techno School",
      "Don Bosco School",
      "Everwin School",
      "Sri Sakthi Matriculation School",
      "Olive Tree International School",
      "Oakridge International School – 6.4 Kms",
      "St. Anne’s Matriculation School",
    ],
  },
  {
    title: "Hospitals within 10 mins drive",
    items: [
      "Prashanth Super Speciality Hospital",
      "St. Anthony Hospital",
      "K M Multi-speciality Hospital",
      "Jain Hospital",
      "Meridian Hospital",
      "Stanley Hospital",
    ],
  },
  {
    title: "Malls & Entertainment",
    items: ["SKLS Galaxy – 15 mins", "Spectrum – 22 mins", "VR Mall – 25 mins"],
  },
  {
    title: "Areas Nearby",
    items: [
      "Madhavaram Milk Colony – 08 mins",
      "Puthagaram – 10 mins",
      "Moolakadai Junction – 10 mins",
      "Central Railway Station – 12 mins",
      "Perambur – 12 mins",
      "Anna Nagar – 15 mins",
      "Koyambedu – 22 mins",
      "Madavaram Intercity Bus Terminus – 700 meters",
    ],
  },
];

export default function LocationDetails() {
  const [expanded, setExpanded] = useState(0);

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  const headingRef = useRef(null);
  const headingRef2 = useRef(null);

  const accordianRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    import("gsap").then((gsap) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.default.registerPlugin(ScrollTrigger);

        const getStartPosition = () =>
          window.innerWidth < 768 ? "top 95%" : "top 85%";

        gsap.default.fromTo(
          headingRef.current,
          { y: 80, opacity: 0 },
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
        gsap.default.fromTo(
          headingRef2.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef2.current,
              start: getStartPosition(),
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.default.fromTo(
          accordianRef.current,
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: accordianRef.current,
              start: getStartPosition(),
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.default.fromTo(
          imageRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: getStartPosition(),
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });
  }, []);
  return (
    <Grid sx={{ padding: { xs: "0px", sm: "30px", md: "30px" } }}>
      <Container
        id="locationAdv"
        maxWidth="80%"
        sx={{ backgroundColor: "#f5f5f5", py: 3 }}
      >
        <Box textAlign="center" mb={{ xs: 3, sm: 6, md: 6 }}>
          <Typography
            ref={headingRef2}
            sx={{
              fontSize: { xs: "28px", sm: "50px", md: "50px" },
              fontWeight: "500",
              backgroundImage:
                "linear-gradient(90deg, rgba(21, 100, 53, 1) 30%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 75%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontFamily: "Old Standard TT",
            }}
          >
            Modern Living, Perfectly Balanced
          </Typography>
          <Typography
            ref={headingRef}
            // variant="h6"
            // component="h3"
            mt={{ md: 1, xs: 2 }}
            sx={{
              fontSize: { md: "20px", xs: "14px" },
              fontWeight: 400,
              color: "rgb(2, 2, 2)",
              fontFamily: "Old Standard TT",
            }}
          >
            Experience a lifestyle crafted for effortless living with modern
            comforts and seamless connectivity at your doorstep
          </Typography>
        </Box>
        <Grid container spacing={0} alignItems={"center"}>
          {/* Accordion Section */}
          <Grid
            item
            xs={12}
            md={5}
            alignItems={"end"}
            ref={accordianRef}
            sx={{
              // border: "1px solid black",
              display: "flex",
              justifyContent: "end",
              flexDirection: "column",
              marginLeft: "0px",
            }}
          >
            {data.map((category, index) => (
              <Accordion
                expanded={expanded === index}
                onChange={handleChange(index)}
                key={index}
                disableGutters
                sx={{
                  margin: 0,
                  boxShadow: "none",
                  "&:before": {
                    display: "none",
                  },
                  minHeight: "50px",
                  width: { xs: "100%", sm: "550px", md: "550px" },
                }}
              >
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  sx={{
                    minHeight: "50px",
                    padding: "5px 10px",
                    "& .MuiAccordionSummary-content": {
                      margin: 0,
                    },
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                  >
                    <ExpandMoreIcon
                      sx={{
                        transform:
                          expanded === index
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.3s ease-in-out",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    <Typography
                      sx={{
                        color: expanded === index ? "#1252ae" : "black",
                        transition: "color 0.3s ease-in-out",
                        fontSize: { xs: "18px", sm: "20px", md: "20px" },
                        fontFamily: "Open Sans",
                      }}
                    >
                      {category?.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: "5px 10px" }}>
                  <ul>
                    {category.items.map((item, i) => (
                      <li
                        style={{
                          marginBottom: "5px",
                          fontFamily: "Open Sans",
                          fontSize: { xs: "12px", sm: "18px", md: "18px" },
                        }}
                        key={i}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
          {/* Image Section */}
          <Grid
            item
            xs={12}
            md={6.5}
            display="flex"
            justifyContent="center"
            sx={{
              overflow: "hidden",
              position: "relative",
              borderRadius: {
                xs: "0px",
                sm: "100px 30px 30px 30px",
                md: "100px 10px 10px 10px",
              },
              height: { xs: "300px", sm: "450px", md: "450px" },
            }}
            ref={imageRef}
          >
            <Image
              src={LocationDetailsImage}
              alt="Location Overview"
              style={{
                maxWidth: "100%",
                height: "100%",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
