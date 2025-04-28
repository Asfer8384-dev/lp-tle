import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Grid, styled } from "@mui/material";
import { useTheme } from "@emotion/react";
import DesktopOne from "../../../public/ImageR/Banner/Banner1D.png";
import DesktopTwo from "../../../public/ImageR/Banner/2D.jpg";
import DesktopThree from "../../../public/ImageR/Banner/3D.jpg";
import DesktopFour from "../../../public/ImageR/Banner/4D.jpg";

import mobileOne from "../../../public/ImageR/Banner/Banner1M.png";
import mobileTwo from "../../../public/ImageR/Banner/2M.jpg";
import mobileThree from "../../../public/ImageR/Banner/3M.jpg";
import mobileFour from "../../../public/ImageR/Banner/4M.jpg";

const elevationImages = [
  { src: DesktopOne, desktopSrc: mobileOne, alt: "First" },
];

const MySwiper = styled(Swiper)({
  position: "relative",

  "& .swiper-button-next, & .swiper-button-prev": {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s, visibility 0.3s",
    color: "lightgrey",
  },

  "&:hover .swiper-button-next, &:hover .swiper-button-prev": {
    opacity: 1,
    visibility: "visible",
  },

  "& .swiper-button-prev": {
    left: 0,
  },
});

const scrollToView = (target) => {
  const section = document.querySelector(target);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function HeroSection({ setOpenEnquiry }) {
  const theme = useTheme();
  return (
    <Box>
      <MySwiper
        loop={true}
        className="mySwiper"
        navigation={true}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
      >
        {(elevationImages || [])?.map((image, index) => (
          <SwiperSlide key={index}>
            <Grid
              id="back-to-top-anchor"
              item
              container
              xs={12}
              sx={{
                position: "relative",
                width: "100%",
                gap: { xs: "20px", md: "0px" },
              }}
            >
              <Grid
                // onClick={setOpenEnquiry}
                item
                xs={12}
                sx={{
                  display: { md: "flex", xs: "none" },
                  width: "100%",
                  height: `90vh`,
                  // cursor: "pointer",
                }}
              >
                <Image
                  // onClick={() => scrollToView(`#overview`)}
                  // onClick={setOpenEnquiry}
                  src={image.src}
                  alt="banner"
                  fill
                  // sizes="100vw"
                  style={{ width: "100%", height: "100%" }}
                />
              </Grid>
              <Grid
                // onClick={setOpenEnquiry}
                item
                xs={12}
                sx={{
                  display: { md: "none", xs: "flex" },
                  width: "100%", // Ensure parent has width
                  height: "10vh",
                  overflow: "hidden",
                  marginTop: { xs: "50vh", md: "0px" },
                }}
              >
                <Image
                  onClick={() => scrollToView(`#overview`)}
                  src={image.desktopSrc}
                  alt="banner"
                  fill
                  // sizes="100vw"
                  style={{
                    // objectFit: "cover",
                    // cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    // marginTop: { xs: "10vh", md: "0px" },
                  }}
                />
              </Grid>
            </Grid>
          </SwiperSlide>
        ))}
      </MySwiper>
    </Box>
  );
}
