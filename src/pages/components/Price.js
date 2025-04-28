import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Typography, useMediaQuery } from "@mui/material";

function createData(type, area, price) {
  return { type, area, price };
}

const rows = [
  createData("2 BHK", "- Sq.Ft.", "85 Lakhs* Onwards"),
  createData("3 BHK", "- Sq.Ft.", "1.04 Cr* Onwards"),
];

export default function PriceTable({ setOpenEnquiry }) {
  const isMobile = useMediaQuery("(max-width:600px)");

  const fullContainerRef = React.useRef(null);
  React.useEffect(() => {
    import("gsap").then((gsap) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.default.registerPlugin(ScrollTrigger);

        const getStartPosition = () =>
          window.innerWidth < 768 ? "top 100%" : "top 85%";

        gsap.default.fromTo(
          fullContainerRef.current,
          { y: 160, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
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
    <Grid
      id="price"
      sx={{
        padding: isMobile ? "10px" : "20px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        ref={fullContainerRef}
        sx={{
          marginBottom: { md: "30px", xs: "10px" },
          marginTop: { md: "00px", xs: "10px" },
          fontSize: { xs: "24px", sm: "40px", md: "50px" },
          fontWeight: 500,
          backgroundImage:
            "linear-gradient(90deg, rgba(21, 100, 53, 1) 30%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 75%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontFamily: "Old Standard TT",
          textAlign: "center",
        }}
      >
        Pricing Details
      </Typography>
      <TableContainer
        ref={fullContainerRef}
        component={Paper}
        sx={{
          maxWidth: { xs: "950%", md: "70%" },
          overflowX: "auto",
          boxShadow: "none",
          border: "1px solid lightgray",
        }}
      >
        <Table aria-label="simple table" sx={{ border: "0px solid gold" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#212529" }}>
              <TableCell
                sx={{ fontSize: { xs: "12px", md: "14px" }, color: "white" }}
              >
                Type
              </TableCell>
              <TableCell
                sx={{ fontSize: { xs: "12px", md: "14px" }, color: "white" }}
              >
                AREA
              </TableCell>
              <TableCell
                sx={{ fontSize: { xs: "12px", md: "14px" }, color: "white" }}
              >
                PRICE
              </TableCell>
              <TableCell
                sx={{ fontSize: { xs: "12px", md: "14px" }, color: "white" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: { xs: "12px", md: "14px" } }}>
                  {row.type}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "12px", md: "14px" } }}>
                  {row.area}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "12px", md: "14px" } }}>
                  {row.price}
                </TableCell>
                <TableCell
                  onClick={setOpenEnquiry}
                  sx={{
                    fontSize: { xs: "12px", md: "14px" },
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      width: "fit-content",
                      padding: "4px 8px",
                      borderRadius: "10px",
                    }}
                  >
                    {" "}
                    Unlock
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
