import { Button, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React, { Component } from "react";
// import { NotificationManager } from "react-notifications";
// import { largeTime } from './../../../Utils/notificationTime';
// import imageCompression from 'browser-image-compression';
import { b64toBlob } from "./baseToblob";


export class Capture extends Component {
  base64Image = "";
  streamObject;

  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
  };



  componentDidMount() {
    console.log("props", this.props);
    try {
      const constraints = {
        video: true,
      };

      const video = document.querySelector("#videoCap");
      const image = document.querySelector("#imageShow");
      const canvas = document.createElement("canvas");
      const capBtn = document.getElementById("capBtn");
      const imageContainer = document.getElementById("imageContainer");

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          console.log(stream);
          video.srcObject = stream;
          this.streamObject = stream;
        })
        .catch((err) => {
          console.log(err);
          // NotificationManager.warning("Camera device not Found", "Click to Remove", largeTime);
        });

      capBtn.onclick = video.onclick = async () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        let imageRaw = canvas.toDataURL("image/png");
        this.base64Image = imageRaw.split(",")[1];
        let blob = b64toBlob(this.base64Image);
        console.log(`originalFile size ${blob.size / 1024 / 1024} MB`);
        
      };
    } catch (error) {
      console.log("camera Error", error.response);
    }
  }

  componentWillUnmount() {
    try {
      console.log("*****In unmount*****");
      this.streamObject.getTracks().forEach(function (track) {
        track.stop();
      });
    } catch (error) {
      console.log("error", error.response);
    }
  }

  onCapture = (e) => {
    console.log("show Func", this.props.onConfirm());
    this.props.onConfirm(this.base64Image);
  };

  render() {
    return (

        <Grid xs={12} md={12} sm={12} container>
          
          <Grid xs={12} md={12} sm={12} sx={{ textAlign: "center" }}>
            <video
              autoPlay
              width="340px"
              height="250px"
              id="videoCap"
            ></video>
            <br />
            <Button
              id="capBtn"
              variant="outlined"
              onClick={this.onCapture}
            >
              ফ্রেমিং করুন
            </Button>
          </Grid>
        </Grid>
    );
  }
}

export default Capture;
