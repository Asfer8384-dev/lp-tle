import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Container,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  styled,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MasterPlan1 from "../../../public/ImageR/Plan/MasterPlan.png";
import FloorPlan1 from "../../../public/ImageR/Plan/One.png";
import FloorPlan2 from "../../../public/ImageR/Plan/Two.png";
import FloorPlan3 from "../../../public/ImageR/Plan/Three.png";
import FloorPlan4 from "../../../public/ImageR/Plan/Four.png";
import FloorPlan5 from "../../../public/ImageR/Plan/Five.png";
import FloorPlan6 from "../../../public/ImageR/Plan/Six.png";
import FloorPlan7 from "../../../public/ImageR/Plan/Seven.png";
import FloorPlan8 from "../../../public/ImageR/Plan/Eight.png";
import FloorPlan9 from "../../../public/ImageR/Plan/Nine.png";
import FloorPlan10 from "../../../public/ImageR/Plan/Ten.png";

const MySwiper = styled(Swiper)({
  position: "relative",

  "& .swiper-button-next, & .swiper-button-prev": {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s, visibility 0.3s",
    color: "black",
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

const masterPlanImages = [{ src: MasterPlan1, caption: "Master Plan" }];

const floorPlanImages = [
  FloorPlan1,
  FloorPlan2,
  FloorPlan3,
  FloorPlan4,
  FloorPlan5,
  FloorPlan6,
  FloorPlan7,
  FloorPlan8,
  FloorPlan9,
  FloorPlan10,
];

export default function MasterPlanSection({ setOpenEnquiry }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const hedingRef = useRef(null);

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
      });
    });
  }, []);

  return (
    <Container
      id="floorPlans"
      sx={{ marginBottom: { xs: "15px", sm: "10px", md: "15px" } }}
    >
      <Typography
        ref={hedingRef}
        variant="h4"
        align="center"
        gutterBottom
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
        Master Plan and Floor Plan
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        centered
      >
        <Tab sx={{ fontFamily: "Open Sans" }} label="Master Plan" />
        <Tab sx={{ fontFamily: "Open Sans" }} label="Floor Plan" />
      </Tabs>

      {tabIndex === 0 && (
        <Box mt={3}>
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
            // spaceBetween={15}
            slidesPerView={1}
            breakpoints={{
              0: {
                slidesPerView: 1, // Mobile screens
              },
              768: {
                slidesPerView: 1, // Tablets
              },
              1024: {
                slidesPerView: 1, // Desktops
              },
            }}
          >
            {masterPlanImages.map((src, index) => (
              <SwiperSlide key={index}>
                <Grid
                  container
                  item
                  xs={12}
                  md={12}
                  sx={{
                    display: { md: "flex", xs: "none" },
                    width: "100%",
                    height: `500px`,
                    // border: "1px solid black",
                  }}
                >
                  <Image
                    onClick={() => handleImageClick(src.src)}
                    src={src.src}
                    alt={`Floor Plan ${index + 1}`}
                    fill
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                      objectFit: "contain",
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
                  }}
                >
                  {" "}
                  <Image
                    onClick={() => handleImageClick(src.src)}
                    src={src.src}
                    alt={`Floor Plan ${index + 1}`}
                    fill
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  />
                </Grid>
              </SwiperSlide>
            ))}
          </MySwiper>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              onClick={() => setOpenEnquiry(true)}
              variant="contained"
              color="primary"
              sx={{ fontFamily: "Open Sans" }}
            >
              Get Master Plans
            </Button>
          </Box>
        </Box>
      )}

      {tabIndex === 1 && (
        <Box mt={3}>
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
            slidesPerView={2}
            breakpoints={{
              0: {
                slidesPerView: 1, // Mobile screens
              },
              768: {
                slidesPerView: 2, // Tablets
              },
              1024: {
                slidesPerView: 2, // Desktops
              },
            }}
          >
            {floorPlanImages.map((src, index) => (
              <SwiperSlide key={index}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: { md: "flex", xs: "none" },
                    width: "100%",
                    height: `350px`,
                  }}
                >
                  <Image
                    onClick={() => handleImageClick(src)}
                    src={src}
                    alt={`Floor Plan ${index + 1}`}
                    fill
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
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
                  }}
                >
                  {" "}
                  <Image
                    onClick={() => handleImageClick(src)}
                    src={src}
                    alt={`Floor Plan ${index + 1}`}
                    fill
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  />
                </Grid>
              </SwiperSlide>
            ))}
          </MySwiper>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              onClick={() => setOpenEnquiry(true)}
              variant="contained"
              color="primary"
            >
              Get Floor Plans
            </Button>
          </Box>
        </Box>
      )}

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
    </Container>
  );
}
