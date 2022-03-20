import React, { useRef, useState } from "react";
import bandw from "../../Assets/bandw_example.png";
import upload_icon from "../../Assets/upload_icon.png";
import right_arrow from "../../Assets/right_arrow.png";
import color from "../../Assets/color_example.png";
import "./Upload.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Upload() {
  const inputref = useRef(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const fileHandler = async (event) => {
    setFile(event.target.files[0]);
  };

  const discardImage = () => {
    setFile(null);
  };

  const uploadImage = async () => {
    const base64 = await convertBase64(file);
    // console.log(base64);
    // fetch("http://localhost:5001/").then((resp) => console.log(resp));
    fetch("http://localhost:5001/upload", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageBase64: base64 }),
    });
    // navigate("/download");
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="upload-container">
      <div>
        <input
          type="file"
          ref={inputref}
          onChange={fileHandler}
          style={{ display: "none" }}
        ></input>
        {file ? (
          <div className="image-preview">
            <img
              src={file ? URL.createObjectURL(file) : null}
              alt={file ? file.name : null}
              width={"500px"}
              style={{ marginBottom: "10px" }}
            />
            <div>
              <Button onClick={discardImage}>discard</Button>
              <Button onClick={uploadImage}>upload</Button>
            </div>
          </div>
        ) : (
          <div className="upload-box" onClick={() => inputref.current.click()}>
            <img src={upload_icon} height={"100px"} />
            <p>Upload your thermal image (max 5MB)</p>
          </div>
        )}
      </div>
      <div className="example-image-box">
        <img src={bandw} />
        <ArrowForwardIcon fontSize="large" />
        <img src={color} />
      </div>
      <div className="requirements-box">
        <h2>Input Image Requirements</h2>
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

export default Upload;
