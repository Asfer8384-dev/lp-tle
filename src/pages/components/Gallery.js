"use client";

import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Exterior1 from "../../../public/ImageR/exterior/1.jpg";
import Exterior2 from "../../../public/ImageR/exterior/2.jpg";
import Exterior3 from "../../../public/ImageR/exterior/3.jpg";
import Exterior4 from "../../../public/ImageR/exterior/4.jpg";

import Interior1 from "../../../public/ImageR/Interior/1.jpg";
import Interior2 from "../../../public/ImageR/Interior/2.jpg";
import Interior3 from "../../../public/ImageR/Interior/6.jpg";
import Interior4 from "../../../public/ImageR/Interior/27.jpg";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

const interiorImages = [Interior1, Interior2, Interior3, Interior4];
const exteriorImages = [Exterior1, Exterior2, Exterior3, Exterior4];

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
                  height: `420px`,
                  userSelect: "none",
                }}
              >
                <Image
                  onClick={() => handleImageClick(src.src)}
                  src={src}
                  alt={title}
                  fill
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
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
                  userSelect: "none",
                }}
              >
                <Image
                  onClick={() => handleImageClick(src.src)}
                  src={src}
                  alt={title}
                  fill
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
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
          fontFamily: "Open Sans",
          userSelect: "none",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default function Gallery() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const hedingRef = useRef(null);
  const hedingRef2 = useRef(null);

  const imageRef = useRef(null);

  useEffect(() => {
    import("gsap").then((gsap) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.default.registerPlugin(ScrollTrigger);

        const getStartPosition = () =>
          window.innerWidth < 768 ? "top 95%" : "top 85%";

        gsap.default.fromTo(
          hedingRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: hedingRef.current,
              start: getStartPosition(),
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.default.fromTo(
          hedingRef2.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: hedingRef2.current,
              start: getStartPosition(),
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.default.fromTo(
          imageRef.current,
          { y: 160, opacity: 0 },
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
    <>
      <Box id="gallery" sx={{ textAlign: "center", padding: "20px 20px" }}>
        <Box textAlign="center" mb={4}>
          <Typography
            ref={hedingRef2}
            // variant="h4"
            // component="h1"
            sx={{
              fontSize: { md: "50px", xs: "28px" },
              fontWeight: "500",
              backgroundImage:
                "linear-gradient(90deg, rgba(21, 100, 53, 1) 30%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 75%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontFamily: "Old Standard TT",
            }}
          >
            Where Every Corner Inspires
          </Typography>
          <Typography
            ref={hedingRef2}
            variant="h6"
            component="h3"
            mt={2}
            sx={{
              fontSize: { md: "20px", xs: "14px" },
              fontWeight: 400,
              color: "rgb(0, 0, 0)",
              fontFamily: "Open Sans",
            }}
          >
            Experience a perfect blend of modern elegance and timeless beauty
          </Typography>
        </Box>
        <Grid item container xs={12} justifyContent={"center"} ref={hedingRef}>
          <Box
            sx={{
              width: { md: "85%", xs: "100%" },
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                flex: 1,
                minWidth: 400,
                mb: { md: 0, xs: 3 },
              }}
            >
              <ImageCarousel
                images={interiorImages}
                title="Interior"
                handleImageClick={handleImageClick}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 400 }}>
              <ImageCarousel
                images={exteriorImages}
                title="Exterior"
                handleImageClick={handleImageClick}
              />
            </Box>
          </Box>
        </Grid>
        {/* Dialog for full-size image */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={() => setOpenDialog(false)}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "white",
                background: "rgba(0,0,0,0.5)",
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Full Size Plan"
                width={800}
                height={600}
                style={{
                  maxWidth: "100%",
                  height: "auto", // Maintain aspect ratio
                  maxHeight: "90vh", // Prevent overflow on small screens
                  objectFit: "contain", // Ensure full image is visible
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
