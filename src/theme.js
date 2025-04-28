import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    allVariants: { fontFamily: "system-ui" }, // Ensure all text uses system-ui
    h1: { fontFamily: "system-ui" },
    h2: { fontFamily: "system-ui" },
    h3: { fontFamily: "system-ui" },
    h4: { fontFamily: "system-ui" },
    h5: { fontFamily: "system-ui" },
    h6: { fontFamily: "system-ui" },
    subtitle1: { fontFamily: "system-ui" },
    subtitle2: { fontFamily: "system-ui" },
    body1: { fontFamily: "system-ui" },
    body2: { fontFamily: "system-ui" },
    button: { fontFamily: "system-ui" },
    caption: { fontFamily: "system-ui" },
    overline: { fontFamily: "system-ui" },
  },
});

export default theme;
