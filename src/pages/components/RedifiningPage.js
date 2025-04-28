import {
  Grid,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Slide1 from "../../../public/ImageR/Slide1.jpg";
import Slide2 from "../../../public/ImageR/Slide2.jpg";
import Slide3 from "../../../public/ImageR/Slide3.jpg";
import Slide4 from "../../../public/ImageR/Slide4.jpg";

const MySwiper = styled(Swiper)({
  position: "relative",

  "& .swiper-button-next, & .swiper-button-prev": {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s, visibility 0.3s",
    color: "#fff",
  },

  "& .swiper-button-next::after, & .swiper-button-prev::after": {
    fontSize: "30px !important", // Adjusts arrow icon size
    fontWeight: "bold",
  },

  "&:hover .swiper-button-next, &:hover .swiper-button-prev": {
    opacity: 1,
    visibility: "visible",
  },

  "& .swiper-button-prev": {},
});

const ImageCarousel = ({ images, title, handleImageClick }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <MySwiper
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="mySwiper"
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Grid
              container
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "100%",
                position: "relative",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  display: { md: "flex", xs: "none" },
                  width: "100%",
                  height: `400px`,
                }}
              >
                <Image
                  onClick={() => handleImageClick(src.src)}
                  src={src}
                  alt={title}
                  fill
                  sizes="100vw"
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: { md: "none", xs: "flex" },
                  width: "100%", // Ensure parent has width
                  height: "300px", // Ensure parent has height
                  overflow: "hidden",
                }}
              >
                <Image
                  onClick={() => handleImageClick(src.src)}
                  src={src}
                  alt={title}
                  fill
                  sizes="100vw"
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                />
              </Grid>
            </Grid>
          </SwiperSlide>
        ))}
      </MySwiper>
      <Typography
        variant="h6"
        sx={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "8px 0px",
          borderRadius: "4px",
          fontWeight: "bold",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

function EcoLiving() {
  const accordionData = [
    {
      name: "Sustainable Building Design",
      name2:
        "Designed with eco-friendly principles, including EV charging, bicycle parking, and solar-reflective materials.",
    },
    {
      name: "Water Conservation",
      name2:
        "Efficient plumbing, rainwater harvesting, and a Sewage Treatment Plant to reduce water usage by up to 40%.",
    },
    {
      name: "Energy Efficiency",
      name2:
        "100% solar-powered common areas and energy-efficient appliances to lower electricity costs.",
    },
    {
      name: "Eco-Friendly Materials",
      name2:
        "30% eco-labelled products, locally sourced materials, and a waste recycling system for sustainability.",
    },
    {
      name: "Resident Health & Wellbeing",
      name2:
        "Enhanced ventilation, natural lighting, VOC-free materials, and amenities for physical and mental health.",
    },
    {
      name: "Community Benefits",
      name2:
        "Worker welfare accommodation and resident awareness on waste management and sustainability.",
    },
  ];

  const [expanded, setExpanded] = useState(null);

  const handleChange = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const imageArray = [Slide1, Slide2, Slide3, Slide4];

  //   const [currentIndex, setCurrentIndex] = useState(0);

  //   const handleNext = () => {
  //     setCurrentIndex((prev) => (prev === imageArray.length - 1 ? 0 : prev + 1));
  //   };

  //   // Auto Slide every 3 seconds
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       handleNext();
  //     }, 3000);

  //     return () => clearInterval(interval);
  //   }, [currentIndex]);

  //   const handlePrev = () => {
  //     setCurrentIndex((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));

  //   };

  const [currentIndex, setCurrentIndex] = useState(1); // Start from first actual image
  const [isTransitioning, setIsTransitioning] = useState(true);

  const handleNext = () => {
    if (currentIndex === imageArray.length) {
      setIsTransitioning(false); // Disable transition for instant reset
      setCurrentIndex(1); // Jump to first slide (duplicate)
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false); // Disable transition for instant reset
      setCurrentIndex(imageArray.length - 1); // Jump to last slide (duplicate)
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Auto sliding every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval); // Cleanup interval
  }, [currentIndex]);

  // Reset transition after jumping to duplicate slides
  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50); // Small delay to re-enable transition
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  const sliderStyle = {
    display: "flex",
    transition: isTransitioning ? "transform 0.8s ease-in-out" : "none",
    transform: `translateX(-${currentIndex * 100}%)`,
  };

  const duplicatedSlides = [
    imageArray[imageArray.length - 1], // Clone last slide at start
    ...imageArray,
    imageArray[0], // Clone first slide at end
  ];
  const headingRef = useRef(null);
  const headingRef2 = useRef(null);
  const headingRef3 = useRef(null);

  const accordianRef = useRef(null);
  const imageRef = useRef(null);
  // useEffect(() => {
  //   import("gsap").then((gsap) => {
  //     import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
  //       gsap.default.registerPlugin(ScrollTrigger);

  //       gsap.default.fromTo(
  //         headingRef.current,
  //         { y: 80, opacity: 0 },
  //         {
  //           y: 0,
  //           opacity: 1,
  //           duration: 1,
  //           ease: "power2.out",
  //           scrollTrigger: {
  //             trigger: headingRef.current,
  //             start: "top 85%",
  //             toggleActions: "play none none reverse",
  //           },
  //         }
  //       );

  //       gsap.default.fromTo(
  //         headingRef3.current,
  //         { y: 80, opacity: 0 },
  //         {
  //           y: 0,
  //           opacity: 1,
  //           duration: 1,
  //           ease: "power2.out",
  //           scrollTrigger: {
  //             trigger: headingRef3.current,
  //             start: "top 70%",
  //             toggleActions: "play none none reverse",
  //           },
  //         }
  //       );

  //       gsap.default.fromTo(
  //         headingRef2.current,
  //         { y: 80, opacity: 0 },
  //         {
  //           y: 0,
  //           opacity: 1,
  //           duration: 1.5,
  //           ease: "power2.out",
  //           scrollTrigger: {
  //             trigger: headingRef2.current,
  //             start: "top 85%",
  //             toggleActions: "play none none reverse",
  //           },
  //         }
  //       );
  //       gsap.default.fromTo(
  //         accordianRef.current,
  //         { y: 120, opacity: 0 },
  //         {
  //           y: 0,
  //           opacity: 1,
  //           duration: 2,
  //           ease: "power2.out",
  //           scrollTrigger: {
  //             trigger: accordianRef.current,
  //             start: "top 85%",
  //             toggleActions: "play none none reverse",
  //           },
  //         }
  //       );
  //       gsap.default.fromTo(
  //         imageRef.current,
  //         { y: 120, opacity: 0 },
  //         {
  //           y: 0,
  //           opacity: 1,
  //           duration: 1.5,
  //           ease: "power2.out",
  //           scrollTrigger: {
  //             trigger: imageRef.current,
  //             start: "top 85%",
  //             toggleActions: "play none none reverse",
  //           },
  //         }
  //       );
  //     });
  //   });
  // }, []);

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
          headingRef3.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef3.current,
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
            duration: 1,
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
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: getStartPosition(),
              toggleActions: "play none none reverse",
            },
          }
        );

        // ScrollTrigger.refresh();
      });
    });
  }, []);

  return (
    <Grid
      id="Redifine"
      container
      sx={{
        minHeight: "40vh",
        // border: "1px solid black",
        padding: { md: "20px 50px", xs: "10px" },
        overflow: "hidden",
      }}
    >
      {/* <Grid
        item
        xs={12}
        md={6}
        ref={imageRef}
        sx={{ display: { xs: "none", sm: "block", md: "block" } }}
      >
        <Box
          sx={{
            width: { md: "600px", xs: "100%" },
            height: { md: "600px", xs: "300px" },
            paddingTop: "20px",
            position: "relative",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <Box sx={sliderStyle}>
            {duplicatedSlides.map((img, index) => (
              <Image
                key={index}
                src={img}
                style={{
                  minWidth: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ))}
          </Box>

          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "white",
              zIndex: 10,
            }}
          >
            <ArrowBackIos />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              color: "white",
              zIndex: 10,
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Grid> */}

      <Grid
        item
        xs={12}
        md={6}
        ref={imageRef}
        sx={{ display: { xs: "none", sm: "block", md: "block" } }}
      >
        <Box
          sx={{
            width: { md: "600px", xs: "100%" },
            height: { md: "600px", xs: "300px" },
            paddingTop: "20px",
            position: "relative",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <MySwiper
            loop={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            className="mySwiper"
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
          >
            {duplicatedSlides.map((src, index) => (
              <SwiperSlide key={index}>
                <Grid
                  container
                  item
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: { md: "flex", xs: "none" },
                      width: "100%",
                      height: `600px`,
                      userSelect: "none",
                      // borderRadius: "30%",
                    }}
                  >
                    <Image
                      src={src}
                      alt="image"
                      fill
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        userSelect: "none",
                        objectFit: "contain",
                        // borderRadius: "30%",
                      }}
                    />
                  </Grid>
                </Grid>
              </SwiperSlide>
            ))}
          </MySwiper>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          p: { md: 4, xs: 0 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "28px", sm: "50px", md: "50px" },
            backgroundImage:
              "linear-gradient(90deg, rgba(21, 100, 53, 1) 30%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 75%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            lineHeight: { md: "50px" },
            padding: "10px 0",
            fontFamily: "Old Standard TT",
            marginTop: { xs: "10px", sm: "0px", md: "0px" },
          }}
          ref={headingRef3}
        >
          Redefining Sustainable Luxury
        </Typography>

        <Typography
          ref={headingRef}
          sx={{
            fontSize: { xs: "14px", sm: "18px", md: "18px" },
            width: { md: "90%", xs: "100%" },
            marginTop: { xs: "0px", sm: "20px", md: "20px" },
            marginBottom: { xs: "10px", sm: "20px", md: "20px" },
            lineHeight: { md: "27px" },
            fontFamily: "Open Sans",
          }}
        >
          Experience The Lakes Edge – where exquisite design and sustainable
          living come together to create a home that suits both your lifestyle
          and values.
        </Typography>

        <Box ref={headingRef2}>
          {accordionData.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={() => handleChange(index)}
              sx={{
                mb: 1,
                boxShadow: "none",
                background: "transparent",
                "&:before": { display: "none" },
                // border: "1px solid black",
              }}
            >
              <AccordionSummary
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0px 10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    // border: "1px solid black",
                  }}
                >
                  <ExpandMoreIcon
                    sx={{
                      transform:
                        expanded === index ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease-in-out",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                  <Typography
                    sx={{
                      color: expanded === index ? "#1252ae" : "black",
                      transition: "color 0.3s ease-in-out",
                      fontSize: { md: "18px", xs: "14px" },
                      fontFamily: "Open Sans",
                    }}
                  >
                    {item?.name}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    fontFamily: "Open Sans",
                    fontSize: { md: "14px", xs: "12px" },
                    // border: "1px solid black",
                    textAlign: "start",
                  }}
                >
                  {item?.name2}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        ref={imageRef}
        sx={{
          display: { xs: "flex", sm: "none", md: "none" },
          // border: "1px solid black",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { md: "600px", xs: "390px" },
            height: { md: "600px", xs: "390px" },
          }}
        >
          <MySwiper
            // style={{ borderRadius: "30%" }}
            loop={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            className="mySwiper"
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
          >
            {duplicatedSlides.map((src, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    width: { xs: "390px", md: "450px" },
                    height: { xs: "390px", md: "450px" },
                    borderRadius: "30%",
                  }}
                >
                  <Image
                    src={src}
                    alt="image"
                    fill
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                      userSelect: "none",
                      objectFit: "contain",
                      // borderRadius: "30%",
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </MySwiper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EcoLiving;
