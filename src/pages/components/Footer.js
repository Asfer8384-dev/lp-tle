import React from "react";
import { Grid, Typography, Link, Button, Box } from "@mui/material";
import Image from "next/image";
import LOGO from "../../../public/Logo/LakesEdgeLogo.jpg";

function FooterSection() {
  const menuItems = [
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

  const scrollToView = (id) => {
    const element = document.querySelector(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // <Grid sx={{ backgroundColor: "#21201E" }}>
    //   <Grid
    //     id="location"
    //     container
    //     sx={{
    //       backgroundColor: "#21201E",
    //       color: "#fff",
    //       paddingBottom: "1.5rem",
    //       padding: { md: "30px", xs: "20px" },
    //     }}
    //   >
    //     <Grid
    //       container
    //       sx={{
    //         justifyContent: "space-around",
    //         marginTop: "20px",
    //         rowGap: { xs: "20px", md: "0" }, // Adds spacing between rows for mobile
    //       }}
    //     >
    //       {/* Explore Section */}
    //       <Grid item xs={6} sm={6} md={2}>
    //         <Box
    //           sx={{
    //             flexGrow: 1,
    //             display: "flex",
    //             justifyContent: "center",
    //             // border: "1px solid black",
    //           }}
    //         >
    //           <Image src={LOGO} alt="logo" width={280} height={80} priority />
    //         </Box>
    //       </Grid>
    //       <Grid item xs={6} sm={6} md={4} sx={{ display: "flex", gap: "50px" }}>
    //         <Box>
    //           <Typography
    //             sx={{
    //               fontSize: { xs: "24.44px", lg: "32px" },
    //               marginBottom: "15px",
    //               fontWeight: "500",
    //               fontFamily: "Old Standard TT",
    //             }}
    //           >
    //             Explore
    //           </Typography>
    //           <ul
    //             style={{
    //               listStyle: "none",
    //               padding: 0,
    //               margin: 0,
    //             }}
    //           >
    //             {[
    //               { name: "About the Project", id: "about" },
    //               { name: "Features", id: "features" },
    //               { name: "Reimagining Luxury", id: "luxury" },
    //               { name: "Location Advantage", id: "locationAdv" },
    //               { name: "Floor Plans", id: "floorPlans" },
    //               { name: "Amenities", id: "amenities" },
    //               { name: "Gallery", id: "gallery" },
    //               { name: "Contact Us", id: "contact" },
    //               { name: "Location", id: "location" },
    //             ].map((item, index) => (
    //               <Grid container item xs={12} key={item.name}>
    //                 <Typography
    //                   onClick={() => {
    //                     scrollToView(`#${item.id}`);
    //                   }}
    //                   color="inherit"
    //                   underline="hover"
    //                   sx={{
    //                     fontSize: {
    //                       xs: "16px",
    //                       lg: "14px",
    //                       textTransform: "uppercase",
    //                       fontFamily: "Open Sans",
    //                     },
    //                     padding: "0px",
    //                     marginBottom: { md: "5px", xs: "8px" },
    //                     cursor: "pointer",
    //                     textTransform: "none",
    //                   }}
    //                 >
    //                   {item.name}
    //                 </Typography>
    //               </Grid>
    //             ))}
    //           </ul>
    //         </Box>
    //         <Box>
    //           <Typography
    //             fontWeight={500}
    //             // mt={2}
    //             sx={{
    //               fontSize: { xs: "24.44px", lg: "32px" },
    //               marginBottom: "10px",
    //               fontFamily: "Old Standard TT",
    //             }}
    //           >
    //             Corporate Address
    //           </Typography>
    //           <Typography
    //             variant="body2"
    //             sx={{
    //               fontSize: { xs: "16px", lg: "16px" },
    //               fontWeight: 400,
    //               fontFamily: "Open Sans",
    //             }}
    //           >
    //             Urbanrise, RD Vasantha,
    //             <br />
    //             Survey No : 68 & 69,
    //             <br />
    //             Premises No : 1, Plot No : 74,
    //             <br />
    //             Jubilee Enclave, Madhapur,
    //             <br />
    //             Ranga Reddy District, Hyderabad,
    //             <br />
    //             Telangana – 500081.
    //           </Typography>
    //         </Box>
    //       </Grid>

    //       {/* Map Section */}
    //       <Grid
    //         item
    //         xs={12}
    //         md={5}
    //         sx={{
    //           width: "100%",
    //         }}
    //       >
    //         <Typography
    //           fontWeight={600}
    //           sx={{
    //             fontSize: { xs: "18px", lg: "24px" },
    //             marginBottom: "10px",
    //             marginTop: { md: 0, xs: "20px" },
    //             fontFamily: "Old Standard TT",
    //           }}
    //         >
    //           Location
    //         </Typography>
    //         <iframe
    //           src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3804.550204326316!2d78.3642778!3d17.528972199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDMxJzQ0LjMiTiA3OMKwMjEnNTEuNCJF!5e0!3m2!1sen!2sin!4v1734935743921!5m2!1sen!2sin"
    //           width="100%"
    //           height="350"
    //           style={{ border: 0 }}
    //           // height={{ xs: 300, sm: "380px", md: "380" }}
    //           loading="lazy"
    //           title="Location Map"
    //         />
    //       </Grid>
    //     </Grid>
    //   </Grid>

    //   <Typography
    //     sx={{
    //       backgroundColor: "#21201E",
    //       color: "#fff",
    //       paddingY: "20px",
    //       width: "100%",
    //       textAlign: "center",
    //       fontSize: { md: "14px", xs: "10px" },
    //       borderTop: "1px solid #fff",
    //       fontFamily: "Open Sans",

    //       // marginBottom: { md: "60px", xs: "40px" },
    //     }}
    //   >
    //     © 2025 Urbanrise Opulence | TS Rera – PO2200008688
    //   </Typography>
    // </Grid>
    <Grid
      id="footer"
      container
      sx={{ backgroundColor: "#21201E", color: "#fff" }}
    >
      <Grid
        container
        sx={{
          padding: { md: "30px", xs: "20px" },
          paddingBottom: "1.5rem",
          justifyContent: "space-around",
          rowGap: { xs: "20px", md: "0" },
        }}
      >
        {/* Logo Section */}
        <Grid
          item
          xs={12}
          sm={6}
          md={2}
          display="flex"
          justifyContent="start"
          sx={{
            display: { xs: "none", sm: "block", md: "block" },
            // border: "1px solid white",
          }}
        >
          <Image src={LOGO} alt="logo" width={240} height={80} priority />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={2}
          display="flex"
          justifyContent="start"
          sx={{
            display: { xs: "block", sm: "none", md: "none" },
            // border: "1px solid white",
          }}
        >
          <Image src={LOGO} alt="logo" width={220} height={70} priority />
        </Grid>

        {/* Explore & Address Section */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: "flex",
            gap: "50px",
            flexDirection: { xs: "column", sm: "row", md: "row" },
          }}
        >
          {/* Explore Section */}
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "28px", lg: "32px" },
                marginBottom: "10px",
                fontWeight: 500,
                fontFamily: "Old Standard TT",
                marginTop: { xs: "-10px", sm: "0px", md: "0px" },
              }}
            >
              Explore
            </Typography>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Typography
                    onClick={() => scrollToView(`#${item.id}`)}
                    sx={{
                      fontSize: { xs: "12px", lg: "14px" },
                      textTransform: "uppercase",
                      fontFamily: "Open Sans",
                      marginBottom: { md: "5px", xs: "8px" },
                      cursor: "pointer",
                    }}
                  >
                    {item.name}
                  </Typography>
                </li>
              ))}
              {/* <li> */}
              <Link
                href="https://madhavaramapartments.com/"
                target="_blank"
                sx={{
                  fontSize: { xs: "12px", lg: "14px" },
                  textTransform: "uppercase",
                  fontFamily: "Open Sans",
                  marginBottom: { md: "5px", xs: "8px" },
                  cursor: "pointer",
                  color: "white",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Blog
              </Link>
              {/* </li> */}
            </ul>
          </Box>

          {/* Corporate Address Section */}
          <Box>
            <Box sx={{ marginTop: { xs: "-35px", sm: "0px", md: "0px" } }}>
              <Typography
                sx={{
                  fontSize: { xs: "28px", lg: "32px" },
                  marginBottom: "10px",
                  fontFamily: "Old Standard TT",
                }}
              >
                Corporate Address
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "12px", lg: "14px" },
                  fontWeight: 400,
                  fontFamily: "Open Sans",
                }}
              >
                Plot No A, No 36, 1,
                <br /> Gandhi Mandapam Road,
                <br /> Kotturpurm,
                <br /> Chennai, Tamil Nadu 600085
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: { xs: "20px", sm: "0px", md: "30px" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "28px", lg: "32px" },
                  marginBottom: "10px",
                  fontFamily: "Old Standard TT",
                }}
              >
                Site Office Address
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "12px", lg: "14px" },
                  fontWeight: 400,
                  fontFamily: "Open Sans",
                }}
              >
                VS Mani Nagar,
                <br /> Madhavaram, Chennai,
                <br /> Tamil Nadu 600060
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/* Map Section */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{ marginTop: { xs: "-10px", sm: "0px", md: "0px" } }}
        >
          <Typography
            sx={{
              fontSize: { xs: "28px", lg: "32px" },
              marginBottom: "10px",
              marginTop: { md: 0, xs: "20px" },
              fontFamily: "Old Standard TT",
            }}
          >
            Location
          </Typography>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.206441978341!2d80.2158135!3d13.1493743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265582f5a89c7%3A0xbdc99ff5f42dd797!2sUrbanrise%20The%20Lakes%20Edge!5e0!3m2!1sen!2sin!4v1744952927726!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0 }}
            loading="lazy"
            title="Location Map"
          />
        </Grid>
      </Grid>

      {/* Footer Section */}
      <Typography
        sx={{
          paddingY: "20px",
          width: "100%",
          textAlign: "center",
          fontSize: { md: "14px", xs: "10px" },
          borderTop: "1px solid #fff",
          fontFamily: "Open Sans",
        }}
      >
        © 2025 Urbanrise The Lakes Edge | TN/29/Building/0083/2025
      </Typography>
    </Grid>
  );
}

export default FooterSection;
