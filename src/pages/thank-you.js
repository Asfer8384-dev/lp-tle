import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import LOGO from "../../public/Logo/LakesEdgeLogo.jpg";

export default function ThankYouPage() {
  return (
    <Grid
      container
      item
      xs={12}
      minHeight={"100vh"}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
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
        <Image
          src={LOGO}
          alt="logo"
          width={270}
          height={80}
          style={{ width: "200px", height: "auto" }}
          className="logo-image"
        />
      </Grid>
      <Grid
        item
        container
        xs={11}
        sx={{ padding: "70px 0 0 0" }}
        justifyContent={"center"}
      >
        <Typography
          component="h1"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: { md: "2rem", xs: "1.7rem" },
            fontFamily: "'Old Standard TT'",
            background:
              "linear-gradient(90deg, rgba(21, 100, 53, 1) 0%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 100%)",
            backgroundClip: "text",
            // WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          Thank you for contacting us.
        </Typography>
      </Grid>
      <Grid item container xs={12} justifyContent={"center"}>
        <Typography
          component="h2"
          sx={{
            textAlign: "center",
            padding: "10px 0 30px 0",
            fontSize: "15px",
            color: "#333",
          }}
        >
          Our team will get back to you shortly.
        </Typography>
      </Grid>

      {/* <Grid container item xs={12} justifyContent="center">
        <Link href="https://urbanrise.in/">Visit Website</Link>
      </Grid> */}
    </Grid>
  );
}
