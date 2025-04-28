import { Grid, Typography, Box, SvgIcon, styled } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Slide1 from "../../../public/ImageR/Discover/1.jpg";
import Slide2 from "../../../public/ImageR/Discover/2.jpg";
import Slide3 from "../../../public/ImageR/Discover/3.jpg";
import Slide4 from "../../../public/ImageR/Discover/4.jpg";

const imageArray = [Slide1, Slide2, Slide3, Slide4];

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
    fontSize: "30px !important",
    fontWeight: "bold",
  },

  "&:hover .swiper-button-next, &:hover .swiper-button-prev": {
    opacity: 1,
    visibility: "visible",
  },

  "& .swiper-button-prev": {},
});

const CheckIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 512 512">
    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
  </SvgIcon>
);

export default function DiscoverPage({ setOpenEnquiry }) {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageArray.length ? 1 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, []);

  const sliderStyle = {
    display: "flex",
    transition:
      currentIndex === 0 || currentIndex === imageArray.length
        ? "none"
        : "transform 0.6s ease-in-out",
    transform: `translateX(-${currentIndex * 100}%)`,
    borderRadius: "30%",
  };

  const amenities = [
    "Zen Garden With Trim Trail",
    "Senior Citizen Plaza",
    "Young Turks Hangout Corner",
    "Readers Corner",
    "Central Courtyard",
    "Outdoor Gym With Trim Trail",
    "Party Lawn",
    "Ladies Kitty Corner",
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    import("gsap").then((gsap) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.default.registerPlugin(ScrollTrigger);

        const getStartPosition = () =>
          window.innerWidth < 768 ? "top 95%" : "top 85%";

        gsap.default.fromTo(
          containerRef.current,
          { y: 180, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
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
      container
      sx={{
        minHeight: "80vh",
        padding: { xs: "10px", md: "50px" },
        flexDirection: { xs: "column", md: "row" },
        overflow: "hidden",
      }}
      ref={containerRef}
    >
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          p: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "28px", sm: "50px", md: "50px" },
            marginBottom: "10px",
            backgroundImage:
              "linear-gradient(90deg, rgba(21, 100, 53, 1) 30%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 75%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            // lineHeight: { xs: "40px", md: "50px" },
            fontFamily: "Old Standard TT",
            lineHeight: { xs: "32px", sm: "32px", md: "65px" },
          }}
        >
          Step Outside and Embrace Serenity
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "16px" },
            // lineHeight: "24px",
            marginBottom: "20px",
            fontFamily: "Open Sans",
          }}
        >
          At Urbanrise The Lakes Edge, a lakefront residence where nature greets
          you with fresh air, lush greenery, and peaceful views, offering the
          perfect harmony of calm and comfort right at your doorstep.
        </Typography>
        <Box
          sx={{
            textAlign: { xs: "center", sm: "start", md: "start" },
            marginBottom: "5px",
          }}
        >
          <Typography
            onClick={setOpenEnquiry}
            sx={{
              width: "fit-content",
              padding: "10px 20px",
              borderRadius: "20px",
              backgroundColor: "#1252ae",
              color: "white",
              fontSize: "14px",
              fontFamily: "Open Sans",
              margin: "0 auto",
              cursor: "pointer",
            }}
          >
            Contact Us
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: { xs: "0px", md: "25px" },
        }}
      >
        <Box
          sx={{
            // border: "1px solid black",
            width: { xs: "340px", md: "450px" },
            height: { xs: "340px", md: "450px" },
            borderRadius: "50%",
            // border: "1px solid black",
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
            {imageArray.map((src, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    width: { xs: "340px", md: "450px" },
                    height: { xs: "340px", md: "450px" },
                    borderRadius: "50%",
                    // border: "1px solid black",
                  }}
                >
                  <Image
                    src={src}
                    alt="image"
                    fill
                    // sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                      userSelect: "none",
                      objectFit: "cover",
                      borderRadius: "30%",
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </MySwiper>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        sx={{
          p: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "28px", md: "50px", sm: "50px" },
            marginBottom: "20px",
            lineHeight: { xs: "40px", md: "50px" },
            backgroundImage:
              "linear-gradient(90deg, rgba(21, 100, 53, 1) 30%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 75%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: "Old Standard TT",
          }}
        >
          Discover a World Beyond Your Doorstep
        </Typography>
        <Box
          sx={{
            width: { xs: "100%", md: "85%" },
            paddingLeft: { xs: 0, md: "30px" },
          }}
        >
          {amenities.map((item, index) => (
            <Box sx={{ display: "flex", gap: "10px", justifyContent: "start" }}>
              <CheckIcon sx={{ color: "#1252ae", fontSize: 13, mt: "6px" }} />
              <Typography
                key={index}
                style={{
                  fontSize: { xs: "14px", sm: "18px", md: "18px" },
                  marginBottom: "12px",
                  fontFamily: "Open Sans",
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
