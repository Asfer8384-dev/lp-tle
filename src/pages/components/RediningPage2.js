import { Grid, Typography, Box, SvgIcon } from "@mui/material";
import Image from "next/image";

import ClubhouseImage from "../../../public/ImageR/Clubhouse.jpg";
import { useEffect, useRef } from "react";

const CheckIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 512 512">
    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
  </SvgIcon>
);

export default function RedifingPage2() {
  const amenities = [
    "Co-working Spaces",
    "Supermarket",
    "Fully Equipped Gym",
    "Gaming Zone: Indoor Board Games, Table Tennis, Air Hockey",
    "Yoga, Meditation, and Aerobics Spaces",
    "Banquet Hall and Party Area with BBQ",
    "Swimming Pool and Association Room",
  ];

  const headingRef = useRef(null);
  const headingRef2 = useRef(null);

  const accordianRef = useRef(null);
  const imageRef = useRef(null);

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
          headingRef2.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
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
          { y: 50, opacity: 0 },
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
    // <Grid>
    //   <Grid sx={{ display: "flex", justifyContent: "center" }}>
    //     <Typography
    //       ref={headingRef2}
    //       sx={{
    //         fontSize: "50px",
    //         // lineHeight: "50px",
    //         backgroundImage:
    //           "linear-gradient(90deg, rgba(21, 100, 53, 1) 30%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 75%)",
    //         backgroundClip: "text",
    //         WebkitBackgroundClip: "text",
    //         color: "transparent",
    //         fontFamily: "Old Standard TT",
    //       }}
    //     >
    //       An Oasis of Leisure and Indulgence
    //     </Typography>
    //   </Grid>
    //   <Grid
    //     container
    //     sx={{ minHeight: "80vh", padding: "50px", alignItems: "center" }}
    //   >
    //     <Grid item xs={6} sx={{ paddingRight: "40px" }}>
    //       <Box
    //         sx={{ display: "flex", alignItems: "end", justifyContent: "end" }}
    //       >
    //         <Typography
    //           ref={headingRef2}
    //           sx={{
    //             fontSize: "15px",
    //             marginBottom: "40px",
    //             lineHeight: "24px",
    //             width: "95%",
    //             fontFamily: "Open Sans",
    //           }}
    //         >
    //           Welcome to the sanctuary where luxury meets leisure, offering a
    //           lifestyle that transcends the ordinary.The sprawling clubhouse in
    //           the 5-acre pristine community is equipped with a plethora of
    //           lifestyle amenities, including sports courts, entertainment zones,
    //           and lush green landscapes, bringing together comfort and
    //           recreation to create a life of unparalleled elegance.
    //         </Typography>
    //       </Box>

    //       <Box
    //         sx={{
    //           // border: "1px solid black",
    //           display: "flex",
    //           alignItems: "end",
    //           justifyContent: "end",
    //         }}
    //       >
    //         <Box sx={{ width: "85%" }} ref={headingRef2}>
    //           {amenities.map((item, index) => (
    //             <Box sx={{ display: "flex", gap: "5px" }}>
    //               <CheckIcon
    //                 sx={{ color: "#1252ae", fontSize: 13, mt: "8px" }}
    //               />
    //               <Typography
    //                 key={index}
    //                 style={{
    //                   fontSize: "16px",
    //                   marginBottom: "12px",
    //                   fontFamily: "Open Sans",
    //                 }}
    //               >
    //                 {item}
    //               </Typography>
    //             </Box>
    //           ))}
    //         </Box>
    //       </Box>
    //       <Box
    //         sx={{ display: "flex", alignItems: "end", justifyContent: "end" }}
    //         ref={headingRef}
    //       >
    //         <Typography
    //           sx={{
    //             fontSize: "15px",
    //             lineHeight: "24px",
    //             marginTop: "30px",
    //             width: "95%",
    //             fontFamily: "Open Sans",
    //           }}
    //         >
    //           Embrace a lifestyle filled with fitness, socializing, convenience,
    //           and endless possibilities. Experience a community that caters to
    //           your every aspiration with style and purpose.
    //         </Typography>
    //       </Box>
    //     </Grid>

    //     <Grid item xs={6}>
    //       <Box sx={{ width: "715px", height: "500px" }}>
    //         <Image
    //           src={ClubhouseImage}
    //           alt="Clubhouse Image"
    //           layout="responsive"
    //           // width={715}
    //           // height={500}
    //           style={{ minWidth: "100%", height: "100%", objectFit: "contain" }}
    //         />
    //       </Box>
    //     </Grid>
    //   </Grid>
    // </Grid>
    <Grid sx={{ overflow: "hidden" }}>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          ref={headingRef2}
          sx={{
            fontSize: { xs: "28px", sm: "50px", md: "50px" },
            backgroundImage:
              "linear-gradient(90deg, rgba(21, 100, 53, 1) 30%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 75%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: "Old Standard TT",
            // border: "1px solid black",
            textAlign: { xs: "center", sm: "start", md: "start" },
            marginTop: { xs: "5px", sm: "0px", md: "0px" },
          }}
        >
          An Oasis of Leisure and Indulgence
        </Typography>
      </Grid>

      <Grid
        container
        sx={{
          minHeight: "80vh",
          padding: { xs: "10px", sm: "50px", md: "50px" },
          alignItems: "center",
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ paddingRight: { md: "40px", xs: "0" } }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
              padding: { xs: "0px 5px", sm: "0px", md: "0px" },
            }}
          >
            <Typography
              ref={headingRef2}
              sx={{
                fontSize: { xs: "14px", sm: "16px", md: "16px" },
                marginBottom: "40px",
                // lineHeight: "24px",
                width: { xs: "100%", sm: "95%", md: "95%" },
                fontFamily: "Open Sans",
                // textAlign: { xs: "center", sm: "start", md: "start" },
                marginTop: { xs: "10px", sm: "0px", md: "0px" },
              }}
            >
              Welcome to the sanctuary where luxury meets leisure, offering a
              lifestyle that transcends the ordinary. The sprawling clubhouse in
              the 5-acre pristine community is equipped with a plethora of
              lifestyle amenities, including sports courts, entertainment zones,
              and lush green landscapes, bringing together comfort and
              recreation to create a life of unparalleled elegance.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
              padding: { xs: "0px 10px", sm: "0px", md: "0px" },
              // textAlign: { xs: "center", sm: "start", md: "start" },
              // border: "1px solid black",
              marginTop: { xs: "-20px", sm: "0px", md: "0px" },
            }}
          >
            <Box
              sx={{ width: { xs: "100%", sm: "85%", md: "85%" } }}
              ref={headingRef2}
            >
              {amenities.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: { xs: "8px", sm: "10px", md: "10px" },
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "#1252ae",
                      fontSize: { xs: 10, sm: 13, md: 13 },
                      mt: "6px",
                    }}
                  />
                  <Typography
                    style={{
                      fontSize: { xs: "14px", sm: "16px", md: "16px" },
                      marginBottom: "12px",
                      fontFamily: "Open Sans",
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "end", justifyContent: "end" }}
            ref={headingRef}
          >
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px", md: "16px" },
                // lineHeight: "24px",
                marginTop: { xs: "10px", sm: "30px", md: "30px" },
                width: { xs: "100%", sm: "95%", md: "95%" },
                fontFamily: "Open Sans",
                // textAlign: { xs: "center", sm: "start", md: "start" },
                padding: { xs: "0px 5px", sm: "0px", md: "0px" },
              }}
            >
              Embrace a lifestyle filled with fitness, socializing, convenience,
              and endless possibilities. Experience a community that caters to
              your every aspiration with style and purpose.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              width: { md: "95%", xs: "390px" },
              height: { md: "95%", xs: "100%" },
            }}
          >
            <Image
              src={ClubhouseImage}
              alt="Clubhouse Image"
              layout="responsive"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
