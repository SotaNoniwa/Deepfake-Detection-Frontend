import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { styled, alpha, Box } from '@mui/system';
import Slider from "./Slider";

const Home = () => {
  /* CONDITIONS FOR DETECTION */
  const [alone, setAlone] = useState(true);
  const [eye, setEye] = useState(false);
  const [lip, setIsLipOpen] = useState(false);
  const [color, setColor] = useState(false);
  const [blur, setBlur] = useState(false);
  const [voice, setVoice] = useState(false);

  return (
    <div className="container">
      <h2 className="fail">
        Evaluation: Deepfake
      </h2>
      <div className="oneline">
        <h4>The number of people validation</h4>
        {alone ? <FaCheckCircle className="pass" /> : <FaTimesCircle className="fail" />}
      </div>
      <p>75%</p>
      <Box className="slider-box">
        <p>0</p>
        <Slider defaultValue={75} />
        <p>100</p>
      </Box>

      <div className="oneline">
        <h4>Eye validation</h4>
        {eye ? <FaCheckCircle className="pass" /> : <FaTimesCircle className="fail" />}
      </div>
      <p>75%</p>
      <Box className="slider-box">
        <p>0</p>
        <Slider defaultValue={75} />
        <p>100</p>
      </Box>

      <div className="oneline">
        <h4>Lips validation</h4>
        {lip ? <FaCheckCircle className="pass" /> : <FaTimesCircle className="fail" />}
      </div>
      <p>75%</p>
      <Box className="slider-box">
        <p>0</p>
        <Slider defaultValue={75} />
        <p>100</p>
      </Box>

      <div className="oneline">
        <h4>Color validation</h4>
        {color ? <FaCheckCircle className="pass" /> : <FaTimesCircle className="fail" />}
      </div>
      <p>75%</p>
      <Box className="slider-box">
        <p>0</p>
        <Slider defaultValue={75} />
        <p>100</p>
      </Box>

      <div className="oneline">
        <h4>Blur or glare validation</h4>
        {blur ? <FaCheckCircle className="pass" /> : <FaTimesCircle className="fail" />}
      </div>
      <p>75%</p>
      <Box className="slider-box">
        <p>0</p>
        <Slider defaultValue={75} />
        <p>100</p>
      </Box>

      <div className="oneline">
        <h4>Voice validation</h4>
        {voice ? <FaCheckCircle className="pass" /> : <FaTimesCircle className="fail" />}
      </div>
      <p>75%</p>
      <Box className="slider-box">
        <p>0</p>
        <Slider defaultValue={75} />
        <p>100</p>
      </Box>
    </div>
  );
}

export default Home;
