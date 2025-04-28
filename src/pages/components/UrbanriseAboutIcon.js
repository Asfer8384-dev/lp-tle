import { Grid, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
// import { responsive } from "../pages";

export default function PioneersSection() {
  const cardsRef = useRef([]);

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
              duration: 0.5,
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
      });
    });
  }, []);

  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        justifyContent: "center",
        gap: { xs: "3.6rem", md: "0.6rem" },
        display: { xs: "flex", lg: "flex" },
        marginTop: "40px",
        minHeight: { md: "60vh", xs: "90vh" },
      }}
    >
      {pioneerData.map((item, index) => (
        <Grid
          ref={(el) => (cardsRef.current[index] = el)}
          item
          xs={4}
          sm={6}
          md={2.5}
          key={index}
          sx={{
            textAlign: "center",
            position: "relative",
            animation: `fadeUp 1s ease-out ${0.2 * index}s forwards`,
            "&:after": {
              content: '""',
              display: {
                md: item.hasBorder ? "block" : "none",
                xs: item.hasBorder ? "none" : "none",
              },
              position: "absolute",
              height: "65px",
              width: "0.5px",
              background: "#C2C2C2",
              right: 0,
              top: "25%",
            },
          }}
        >
          <img
            src={item.icon}
            alt={item.title}
            style={{ marginBottom: "0.25rem" }}
          />
          <Typography
            component="p"
            sx={{
              lineHeight: "28px",
              color: item.color,
              fontWeight: "600",
              display: "block",
              fontFamily: "Open Sans",
            }}
          >
            {item.highlight}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: "14px",
              lineHeight: "22px",
              color: "#212529",
              fontFamily: "Open Sans",
            }}
          >
            {item.description}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}

const pioneerData = [
  {
    icon: "https://urbanriseopus96.com/assets/images/home/pioneers-icon1.svg",
    highlight: "21+ Years of Excellence",
    description: "in the Real Estate Industry",
    color: "#7855BD",
    hasBorder: true,
  },
  {
    icon: "https://urbanriseopus96.com/assets/images/home/pioneers-icon2.svg",
    highlight: "South India’s Largest",
    description: "Real Estate Developer",
    color: "#8AA027",
    hasBorder: true,
  },
  {
    icon: "https://urbanriseopus96.com/assets/images/home/pioneers-icon3.svg",
    highlight: "72 Million sq. ft.",
    description: "Under Development",
    color: "#17D2D5",
    hasBorder: true,
  },
  {
    icon: "https://urbanriseopus96.com/assets/images/home/pioneers-icon4.svg",
    highlight: "22,000+",
    description: "Happy Customers",
    color: "#55B08C",
    hasBorder: false,
  },
  {
    icon: "https://urbanriseopus96.com/assets/images/home/pioneers-icon6.svg",
    highlight: "51,000cr",
    description: "Real Estate Portfolio",
    color: "#E80EA2",
    hasBorder: true,
  },
  {
    icon: "https://urbanriseopus96.com/assets/images/home/pioneers-icon7.svg",
    highlight: "Projects Funded",
    description: "By World Leading Financial Institutions",
    color: "#DBC80C",
    hasBorder: false,
  },
];
