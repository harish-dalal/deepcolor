import { Button } from "@mui/material";
import React from "react";
import detectImage from "../../Assets/detected_example.png";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "./download.css";

function Download() {
  return (
    <div className="download-container">
      <img src={detectImage} width={"500px"} style={{ marginBottom: "30px" }} />
      <Button variant="outlined" startIcon={<CloudDownloadIcon />}>
        download image
      </Button>

      <div className="requirements-box">
        <h2>Colored output detection details</h2>
        <p style={{ textAlign: "center" }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut
        </p>
      </div>
    </div>
  );
}

export default Download;
