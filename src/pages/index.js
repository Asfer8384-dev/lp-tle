import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Button, Grid, Typography } from "@mui/material";
import Head from "next/head";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CallRounded from "@mui/icons-material/CallRounded";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import RedifiningPage from "./components/RedifiningPage";
import RedifingPage2 from "./components/RediningPage2";
import DiscoverPage from "./components/DiscoverPage";
const Popupenquire = dynamic(() => import("./components/Popupenquire"));
const FooterSection = dynamic(() => import("./components/Footer"));
const ContactForm = dynamic(() => import("./components/Form"));
const AboutUrbanrise = dynamic(() => import("./components/AboutUrbanrise"));
const Gallery = dynamic(() => import("./components/Gallery"));
const Amenities = dynamic(() => import("./components/Amenities"));
const MasterPlanSection = dynamic(() => import("./components/Plans"));
const LocationDetails = dynamic(() => import("./components/LocationDetails"));
const Details = dynamic(() => import("./components/Details"));
const Features = dynamic(() => import("./components/Features"));
const VideoSection = dynamic(() => import("./components/VideoSection"));
const Overview = dynamic(() => import("./components/Overview"));
const BottomEnquire = dynamic(() => import("./components/BottomEnquire"));
import GetAppIcon from "@mui/icons-material/GetApp";
import PriceTable from "./components/Price";
import ContactForm2 from "./components/ContactForm2";
import WalkThrough from "./components/WalkThrough";

export const getUtmParams = (pageQueryParams) => {
  const source = pageQueryParams?.utm_source || "Direct Traffic";
  const medium = pageQueryParams?.utm_medium;
  const campaign = pageQueryParams?.utm_campaign;
  const content = pageQueryParams?.utm_content;
  const houseSize = pageQueryParams?.utm_ad;
  // const ad = pageQueryParams?.utm_ad;

  return {
    source,
    medium,
    campaign,
    content,
    // ad,
  };
};

const sources = {
  text: "Google-Text",
  desc: "Google-DG",
  yAds: "Youtube-Ads",
  wdigi: "Whatsapp-Digital",
  sms: "SMS Digital",
};

export default function Home() {
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const [getSourceFromQuery, setGetSourceFromQuery] = useState(null);

  const [isSelectForm, setIsSelectForm] = useState(false);

  // console.log(isSelectForm, "isSelectForm");

  const pageQueryParams = router?.query;
  const urlParams = getUtmParams(pageQueryParams);
  const source = urlParams?.source?.toLowerCase();
  useEffect(() => {
    const text = sources?.text?.toLowerCase();
    const desc = sources?.desc?.toLowerCase();
    const yAds = sources?.yAds.toLowerCase();
    const wdigi = sources?.wdigi.toLowerCase();
    const sms = sources?.sms.toLowerCase();
    setGetSourceFromQuery(source);
    if (source === text) {
      setPhoneNumber("");
    } else if (source === desc) {
      setPhoneNumber("");
    } else if (source === yAds) {
      setPhoneNumber("");
    } else if (source === wdigi) {
      setPhoneNumber("");
    } else if (source === sms) {
      setPhoneNumber("");
    }
  }, [router?.query]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setOpenEnquiry(true);
  //   }, 2000);
  // }, []);

  // console.log(source, "source");

  return (
    <>
      <Head>
        <title>
          Urbanrise The Lakes Edge | Flats/Apartments in Madhavaram, Chennai
        </title>
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Urbanrise – The Lake's Edge | Premium Lakeview Apartments in Madhavaram, Chennai"
        />
        <meta
          property="og:description"
          content="Discover 2 & 3 BHK lakeview apartments at Urbanrise – The Lake’s Edge, Madhavaram. Modern amenities, nature-filled surroundings, and a lifestyle of comfort await you."
        />
        <meta
          property="og:url"
          content="https://www.urbanrisethelakesedge.com/"
        />
        <meta
          property="og:image"
          content="https://www.urbanrisethelakesedge.com/images/og-image.jpg"
        />
        <meta property="og:site_name" content="Urbanrise – The Lake's Edge" />
        <meta
          name="description"
          content="Looking for a luxury lakeview 2/3 BHK apartment in Madhavaram? Discover Urbanrise The Lakes Edge gated community with top amenities and a world-class clubhouse! Book your visit."
        />
        <meta
          name="keywords"
          content="Urbanrise The Lakes Edge, Lakefront Apartments Chennai,Apartments in Madhavaram, Flats in Madhavaram, Premium Apartments in Madhavaram"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo/favicon.webp" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Urbanrise The Lake Edge",
              url: "https://www.urbanrisethelakesedge.com/",
              logo: "https://www.urbanrisethelakesedge.com/images/logo.png",
              description:
                "Urbanrise – The Lake’s Edge offers premium residential apartments in Madhavaram, Chennai. A perfect blend of luxury, nature, and modern lifestyle.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Urbanrise The Lakes Edge, Madhavaram",
                addressLocality: "Chennai",
                addressRegion: "Tamil Nadu",
                postalCode: "600060",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-8447363040",
                contactType: "Sales",
                areaServed: "IN",
                availableLanguage: ["English", "Tamil"],
              },
              sameAs: [
                "https://www.facebook.com/UrbanriseOfficial",
                "https://www.instagram.com/urbanrisehomes/",
                "https://www.linkedin.com/company/urbanrise/",
              ],
            }),
          }}
        />
        {/* <link rel="canonical" href="https://www.urbanrisethelakesedge.com/" /> */}
      </Head>

      <Popupenquire openEnquiry={openEnquiry} setOpenEnquiry={setOpenEnquiry} />
      <Navbar phoneNumber={phoneNumber} setOpenEnquiry={setOpenEnquiry} />
      <Grid
        item
        container
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          width: "220px",
          height: "40px",
          position: "fixed",
          top: "50%",
          right: "-200px",
          zIndex: "100",
          background: "#1252ae",
          color: "white",
          cursor: "pointer",
          justifyContent: "center",
          alignContent: "center",
          transform: "translate(-50%, -50%) rotate(270deg)",
          // borderRadius: "7px",
          // padding: "20px 0px",
        }}
        onClick={() => setOpenEnquiry(true)}
      >
        <Typography
          item
          sx={{
            paddingBottom: "25px",
            paddingTop: "22px",
            fontWeight: "600",
            textTransform: "none",
            transform: "rotate(180deg)",
            fontSize: "18px",
            letterSpacing: ".5px",
            fontFamily: "Open Sans",
          }}
        >
          Schedule a Site Visit
        </Typography>
      </Grid>
      {/* <HeroSection setOpenEnquiry={setOpenEnquiry} /> */}
      {/* <VideoSection /> */}
      {/* <ContactForm2 /> */}
      <Overview setOpenEnquiry={setOpenEnquiry} />
      {/* <WalkThrough /> */}
      <Features />
      {/* <PriceTable /> */}
      <Details setOpenEnquiry={setOpenEnquiry} />
      <LocationDetails />
      <RedifiningPage />
      <RedifingPage2 />
      <DiscoverPage setOpenEnquiry={setOpenEnquiry} />
      <MasterPlanSection setOpenEnquiry={setOpenEnquiry} />
      <Amenities />
      <Gallery />
      {/* <AboutUrbanrise /> */}
      <ContactForm />
      <FooterSection />
      <Grid
        item
        xs={12}
        sx={{
          display: { xs: "none", sm: "block" },
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: "10",
        }}
      >
        <BottomEnquire setIsSelectForm={setIsSelectForm} />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: "10",
        }}
      >
        <Button
          onClick={() => window.open(`tel:${phoneNumber}`)}
          style={{
            display: !phoneNumber ? "none" : "flex",
            width: "50%",
            height: "50px",
            background:
              "linear-gradient(90deg, rgba(21,100,53,1) 0%, rgba(0,162,216,1) 50%)",
            textTransform: "capitalize",
            color: "#FFFFFF",
            textTransform: "capitalize",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "14px",
          }}
          variant="contained"
        >
          <CallRounded
            sx={{
              fontSize: 25,
              color: "#ffffff",
              marginRight: "10px",
            }}
          />{" "}
          Call Us
        </Button>
        <Button
          onClick={() => setOpenEnquiry(true)}
          style={{
            width: !phoneNumber ? "100%" : "50%",
            height: "50px",
            backgroundColor: "#1976d2",
            textTransform: "capitalize",
            color: "#FFFFFF",
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: "14px",
          }}
          variant="contained"
        >
          <GetAppIcon
            sx={{
              fontSize: 25,
              color: "white",
              marginRight: "10px",
            }}
          />{" "}
          <Typography sx={{ fontSize: "20px" }}>Get Brochure.</Typography>
        </Button>
        <Button
          onClick={() => setOpenEnquiry(true)}
          style={{
            width: !phoneNumber ? "100%" : "50%",
            height: "50px",
            backgroundColor: "#000000",
            textTransform: "capitalize",
            color: "#FFFFFF",
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: "14px",
          }}
          variant="contained"
        >
          <EmailRoundedIcon
            sx={{
              fontSize: 25,
              color: "white",
              marginRight: "10px",
            }}
          />{" "}
          <Typography sx={{ fontSize: "20px" }}> Enquire Now</Typography>
        </Button>
      </Grid>
    </>
  );
}
