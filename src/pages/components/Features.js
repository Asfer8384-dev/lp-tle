import { Box, Card, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Home, Weekend, Spa, Storefront } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styled from "@emotion/styled";
import { Autoplay, Navigation } from "swiper/modules";

const features = [
  {
    icon: <Weekend fontSize="large" />,
    title: "Elevated High-Rise Living:",
    description:
      "Discover luxury in 2 BHK and 3 BHK apartments (998 sq.ft. - 1598 sq.ft.) with elegant designs, stylish interiors, and excellent ventilation, offering a perfect blend of style, comfort, and beauty.",
  },
  {
    icon: <Home fontSize="large" />,
    title: "A Private Oasis in the City:",
    description:
      "Enjoy a congestion-free lifestyle with an 18,600 sq. ft. lush green park, a serene haven for relaxation. Embrace privacy with homes designed with no common walls, offering unmatched peace and comfort.",
  },
  {
    icon: <Spa fontSize="large" />,
    title: "Unmatched Amenities for Dream Lifestyle:",
    description:
      "Indulge in 100+ world-class amenities, including a 26,800 sq. ft. clubhouse and 22,000 sq. ft. of rooftop spaces. Thoughtfully designed spaces for children promote joyful living.",
  },
  {
    icon: <Storefront fontSize="large" />,
    title: "Welcome to Sustainable Living:",
    description:
      "IGBC Gold Certified homes ensure eco-friendly living with energy-efficient designs, rainwater harvesting, and EV charging points for a greener, more sustainable lifestyle.",
  },
];

export default function Features() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cardsRef = useRef([]);

  const singleCard = useRef(null);

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

  // useEffect(() => {
  //   import("gsap").then((gsap) => {
  //     import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
  //       gsap.default.registerPlugin(ScrollTrigger);

  //       const getStartPosition = () =>
  //         window.innerWidth < 768 ? "top 100%" : "top 85%";

  //       gsap.default.fromTo(
  //         cardsRef.current,
  //         { y: 160, opacity: 0 },
  //         {
  //           y: 0,
  //           opacity: 1,
  //           duration: 0.5,
  //           ease: "power2.out",
  //           scrollTrigger: {
  //             trigger: cardsRef.current,
  //             start: getStartPosition(),
  //             toggleActions: "play none none reverse",
  //           },
  //         }
  //       );
  //       gsap.default.fromTo(
  //         singleCard.current,
  //         { y: 160, opacity: 0 },
  //         {
  //           y: 0,
  //           opacity: 1,
  //           duration: 0.5,
  //           ease: "power2.out",
  //           scrollTrigger: {
  //             trigger: singleCard.current,
  //             start: getStartPosition(),
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

        cardsRef.current.forEach((card, index) => {
          gsap.default.fromTo(
            card,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: getStartPosition(),
                toggleActions: "play none none reverse",
              },
              delay: index * 0.2,
            }
          );
        });
        gsap.default.fromTo(
          singleCard.current,
          { y: 160, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: singleCard.current,
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
      sx={{ py: 3, px: 2, textAlign: "center", background: "#f5f5f5" }}
      id="features"
    >
      {!isMobile ? (
        // Desktop Grid Layout
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              sx={{
                p: 3,
                textAlign: "center",
                height: "320px",
                width: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ color: "primary.main", mb: 2 }}>{feature.icon}</Box>
              <Typography
                sx={{
                  color: "rgb(4, 63, 112)",
                  fontSize: "24px",
                  lineHeight: "30px",
                  marginBottom: "15px",
                  fontWeight: "500",
                  fontFamily: "Old Standard TT",
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  color: "#000000",
                  fontSize: "15.5px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                }}
              >
                {feature.description}
              </Typography>
            </Card>
          ))}
        </Box>
      ) : (
        // Mobile Swiper Layout
        <MySwiper
          ref={singleCard}
          slidesPerView={1}
          loop={true}
          spaceBetween={15}
          pagination={{ clickable: true }}
          // modules={[Pagination]}
          style={{ paddingBottom: "20px" }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          // pagination={{ clickable: true }}
          navigation={true} // Enable navigation arrows
          modules={[Navigation, Autoplay]} // Pass modules
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <Card
                sx={{
                  p: 3,
                  textAlign: "center",
                  height: "320px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{ color: "primary.main", mb: 2 }}>{feature.icon}</Box>
                <Typography
                  sx={{
                    color: "rgb(4, 63, 112)",
                    fontSize: "20px",
                    lineHeight: "30px",
                    marginBottom: "15px",
                    fontWeight: "500",
                    fontFamily: "Old Standard TT",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    color: "#000000",
                    fontSize: "15px",
                    fontWeight: "400",
                    fontFamily: "Open Sans",
                  }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </SwiperSlide>
          ))}
        </MySwiper>
      )}
    </Box>
  );
}
