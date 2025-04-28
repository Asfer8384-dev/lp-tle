import React, { useEffect } from "react";

function Brochure() {
  useEffect(() => {
    window.location.href = "/Pdf/Tle.pdf";
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Opening brochure...</p>
    </div>
  );
}

export default Brochure;
