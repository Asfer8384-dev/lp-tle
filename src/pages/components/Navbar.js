"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import Image from "next/image";
import LOGO from "../../../public/Logo/LakesEdgeLogoBgNone.png";
import Link from "next/link";

const pages = [
  { name: "About the Project", id: "about" },
  { name: "Features", id: "features" },
  { name: "Reimagining Luxury", id: "Redifine" },
  { name: "Location Advantage", id: "locationAdv" },
  { name: "Floor Plans", id: "floorPlans" },
  { name: "Amenities", id: "amenities" },
  { name: "Gallery", id: "gallery" },
  { name: "Contact Us", id: "contact" },
  { name: "Location", id: "footer" },
  // { name: "Price", id: "price" },
];

export default function Navbar({ phoneNumber, setOpenEnquiry }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event?.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const scrollToView = (target) => {
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setDrawerOpen(false); // Close the drawer after clicking
    }
  };

  const [bgColor, setBgColor] = useState("rgba(255, 255, 255, 0.10)");
  const [boxShadow, setBoxShadow] = useState("none");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setBgColor("#FFFFFF");
        setBoxShadow("0px 4px 10px rgba(0, 0, 0, 0.2)"); // Box shadow after 80vh
      } else {
        setBgColor("rgba(255, 255, 255, 0.5)");
        setBoxShadow("none"); // No shadow before 80vh
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        sx={{
          top: "0px",
          left: "0px",
          background: { xs: "white", md: "white" },
          boxShadow: { xs: "0px 4px 10px rgba(0, 0, 0, 100%)", md: boxShadow },
          height: { xs: "8vh", md: "11vh" },
          // position: { xs: "sticky", md: "fixed" },
          position: "sticky",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            // paddingY: "5px",
            display: "flex",
            justifyContent: "space-between",
            paddingX: { xs: "20px", md: "50px" },
            alignItems: "center",
          }}
        >
          {/* Desktop Navbar */}
          <Box
            sx={{
              display: { md: "flex", xs: "none" },
              alignItems: "center",
              width: "100%",
              // border: "1px solid black",
            }}
          >
            <Box sx={{ width: "20%" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ border: "0px solid black" }}
              >
                <MenuIconColor color="#000" size={35} />
              </IconButton>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                // border: "1px solid black",
              }}
            >
              <Image src={LOGO} alt="logo" width={250} height={80} priority />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                // border: "1px solid black",
              }}
            >
              {phoneNumber && (
                <Button
                  sx={{
                    borderRadius: "30px",
                    backgroundColor: "#1252ae",
                    padding: "10px 30px",
                    fontSize: "14px",
                    letterSpacing: ".5px",
                    fontFamily: "Open Sans",
                  }}
                  variant="contained"
                  // startIcon={
                  //   <PhoneIcon
                  //     sx={{
                  //       width: "15px",
                  //       height: "15px",
                  //       // border: "1px solid white",
                  //     }}
                  //   />
                  // }
                  href={`tel:${phoneNumber}`}
                >
                  {phoneNumber}
                </Button>
              )}
              <Button
                sx={{
                  borderRadius: "22px",
                  backgroundColor: "#1252ae",
                  padding: "10px 30px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#1252ae" },
                  fontSize: "14px",
                  letterSpacing: ".5px",
                  fontFamily: "Open Sans",
                }}
                variant="contained"
                onClick={() => setOpenEnquiry(true)}
              >
                Get Brochure
              </Button>
              <Button
              
                sx={{
                  borderRadius: "22px",
                  backgroundColor: "#000000",
                  padding: "10px 30px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#000000" },
                  fontSize: "14px",
                  letterSpacing: ".5px",
                  fontFamily: "Open Sans",
                }}
                variant="contained"
                onClick={() => setOpenEnquiry(true)}
              >
                Enquire Now
              </Button>
            </Box>
          </Box>

          {/* Mobile Navbar */}
          <Box
            sx={{
              display: { md: "none", xs: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              // border: "1px solid black",
            }}
          >
            <Image
              src={LOGO}
              alt="logo"
              width={150}
              height={50}
              priority
              // style={{ border: "1px solid black" }}
            />
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ paddingRight: "20px" }}
            >
              <MenuIconColor color="#000" size={20} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {pages.map((page) => (
            <ListItem
              button
              key={page.id}
              onClick={() => scrollToView(`#${page.id}`)}
            >
              <ListItemText
                sx={{ fontFamily: "Open Sans" }}
                primary={page.name}
              />
            </ListItem>
          ))}
          <ListItem>
            <Link
              href="https://madhavaramapartments.com/"
              target="_blank"
              style={{
                fontSize: { xs: "12px", lg: "16px" },
                // textTransform: "uppercase",
                fontFamily: "Open Sans",
                marginBottom: { md: "5px", xs: "8px" },
                cursor: "pointer",
                color: "rgba(0, 0, 0, 0.87)",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
                // border: "1px solid black",
                width: "100%",
                // padding: "8px 16px",
                // marginTop: "5px",
              }}
            >
              Blog
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

// SVG Menu Icon Component
const MenuIconColor = ({ color = "#fff", size = 36 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={(size / 36) * 23.516} // Maintain aspect ratio
    viewBox="0 0 35.995 23.516"
    style={{ fill: color }}
  >
    <path
      d="M34.871,99.182H1.125a1.523,1.523,0,0,1,0-2.939H34.871a1.523,1.523,0,0,1,0,2.939Z"
      transform="translate(0 -96.243)"
    />
    <path
      d="M1.125,180.455H34.871a1.523,1.523,0,0,1,0,2.939H1.125a1.523,1.523,0,0,1,0-2.939Z"
      transform="translate(0 -170.167)"
    />
    <path
      d="M121.579,264.667H147.1a1.484,1.484,0,0,1,0,2.939H121.579a1.484,1.484,0,0,1,0-2.939Z"
      transform="translate(-120.303 -244.09)"
    />
  </svg>
);
