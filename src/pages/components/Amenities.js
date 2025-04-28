"use client";

import {
  Box,
  Collapse,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  styled,
  SvgIcon,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Amenities1 from "../../../public/images/Amenities/Amenities 1.webp";
import Amenities2 from "../../../public/images/Amenities/Amenities 2.webp";
import Amenities3 from "../../../public/images/Amenities/Amenities 3.webp";
import Amenities4 from "../../../public/images/Amenities/Amenities 4.webp";
import Amenities5 from "../../../public/images/Amenities/Amenities 5.webp";
import Amenities6 from "../../../public/images/Amenities/Amenities 6.webp";
import Amenities7 from "../../../public/images/Amenities/Amenities 7.webp";
import Amenities8 from "../../../public/images/Amenities/Amenities 8.webp";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CheckIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 512 512">
    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
  </SvgIcon>
);

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

const images = [
  Amenities1,
  Amenities2,
  Amenities3,
  Amenities4,
  Amenities5,
  Amenities6,
  Amenities7,
  Amenities8,
];

const amenities = [
  [
    "Entrance area",
    "Security cabin",
    "Trim trail",
    "Children’s play area & human chess board",
    "Foot soccer pool",
    "Readers corner (work from park)",
    "Sub soccer",
    "Central courtyard",
    "Young Turks hangout",
  ],
  [
    "Lawn with amphitheatre",
    "Seating plaza",
    "Pickleball court",
    "Half basketball court",
    "Outdoor gym with trim trail",
    "Ladies’ kitty corner",
    "Zen garden with trim trail",
    "Senior citizen plaza",
    "Zen with yoga space",
  ],
  [
    "Co-working spaces in the sky",
    "Sky dining",
    "Reading lounge",
    "Swing zone",
    "Gaming zone",
    "Mini theatre",
    "Private party & barbeque",
    "Party lawn",
    "Interactive lounge",
  ],
];

export default function Amenities() {
  const [expanded, setExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const fullContainerRef = useRef(null);
  useEffect(() => {
    import("gsap").then((gsap) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.default.registerPlugin(ScrollTrigger);

        const getStartPosition = () =>
          window.innerWidth < 768 ? "top 95%" : "top 100%";

        gsap.default.fromTo(
          fullContainerRef.current,
          { y: 160, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
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
    <Grid ref={fullContainerRef}>
      <Grid
        id="amenities"
        item
        container
        xs={12}
        sx={{ backgroundColor: "#f5f5f5", justifyContent: "center" }}
      >
        <Grid
          item
          container
          xs={11}
          sx={{ paddingY: "20px", display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontSize: { md: "50px", xs: "28px" },
              fontWeight: "500",
              backgroundImage:
                "linear-gradient(90deg, rgba(21, 100, 53, 1) 30%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 75%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: { md: 3, xs: 1 },
              fontFamily: "Old Standard TT",
            }}
          >
            World-Class Comforts for a Life of Joy
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "20px", md: "20px" },
              fontWeight: "500",
              mb: { md: 5, xs: 3 },
              textAlign: "center",
              letterSpacing: "1px",
              fontFamily: "Open Sans",
            }}
          >
            Unwind and relish the joy of living with thoughtfully curated
            amenities
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              margin: "auto",
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
              spaceBetween={15}
              slidesPerView={3}
              breakpoints={{
                0: {
                  slidesPerView: 1, // Mobile screens
                },
                768: {
                  slidesPerView: 2, // Tablets
                },
                1024: {
                  slidesPerView: 3, // Desktops
                },
              }}
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: { md: "flex", xs: "none" },
                      width: "100%",
                      height: `270px`,
                    }}
                  >
                    <Image
                      onClick={() => handleImageClick(src.src)}
                      src={src}
                      alt={`Slide ${index}`}
                      fill
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        borderTopLeftRadius: "50px",
                        borderBottomRightRadius: "50px",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: { md: "none", xs: "flex" },
                      width: "100%", // Ensure parent has width
                      height: "200px", // Ensure parent has height
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      onClick={() => handleImageClick(src.src)}
                      src={src}
                      alt={`Slide ${index}`}
                      fill
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        borderTopLeftRadius: "50px",
                        borderBottomRightRadius: "50px",
                      }}
                    />
                  </Grid>
                </SwiperSlide>
              ))}
            </MySwiper>
          </Box>

          <Box
            sx={{
              width: "100%",
              maxWidth: "800px",
              margin: "auto",
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            <Grid
              item
              container
              xs={12}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                // variant="h6"
                onClick={() => setExpanded(!expanded)}
                sx={{
                  cursor: "pointer",
                  width: "fit-content",
                  backgroundColor: "#1252ae",
                  padding: "10px 20px",
                  letterSpacing: ".5px",
                  color: "white",
                  fontFamily: "Open Sans",
                }}
              >
                {expanded ? "Show Less" : "Show More"}
              </Typography>
              {/* <IconButton onClick={() => setExpanded(!expanded)}>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton> */}
            </Grid>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Grid container spacing={5} sx={{ marginTop: 2 }}>
                {amenities.map((list, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Box>
                      {list.map((item, idx) => (
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          <CheckIcon
                            sx={{ color: "#1252ae", fontSize: 15, mt: "5px" }}
                          />
                          <Typography
                            style={{
                              fontFamily: "Open Sans",
                              // border: "1px solid black",
                              textAlign: "start",
                              width: "fit-content",
                            }}
                            key={idx}
                          >
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Collapse>
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
      </Grid>
    </Grid>
  );
}
