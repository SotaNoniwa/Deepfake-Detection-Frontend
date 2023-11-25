/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import Slider from "./Slider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedNumbers from "react-animated-numbers"

const Home = () => {
  /* CONDITIONS FOR DETECTION */
  const [alone, setAlone] = useState(true);
  const [eye, setEye] = useState(false);
  const [lip, setIsLipOpen] = useState(false);
  const [color, setColor] = useState(false);
  const [blur, setBlur] = useState(false);
  const [voice, setVoice] = useState(false);

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <motion.h2
        className="fail"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{repeat: Infinity, duration: 2}}
      >
        Evaluation: Deepfake
      </motion.h2>

      <div className="oneline">
        <h4>The number of people validation</h4>
        {alone ? <FaCheckCircle className="pass" /> : <FaTimesCircle className="fail" />}
      </div>
      <p className="oneline">
        <AnimatedNumbers
          transitions={(index) => ({
            type: "spring",
            duration: index + 1,
          })}
          animateToNumber={15}
        />
        %
      </p>
      <motion.Box
        className="slider-box"
        variants={{
            hidden: { x: -200, opacity: 0 },
            visible: { x: 0, opacity: 1 }
          }}
        initial="hidden"
        whileInView="visible"
        transition={{duration: 1}}
        viewport={{ once: true }}
      >
        <p>0</p>
        <Slider defaultValue={0} value={15} />
        <p>100</p>
      </motion.Box>

      <div className="oneline">
        <h4>Eye validation</h4>
        {eye ? <FaCheckCircle className="pass" /> : <FaTimesCircle className="fail" />}
      </div>
      <p className="oneline">
        <AnimatedNumbers
          transitions={(index) => ({
            type: "spring",
            duration: index + 1,
          })}
          animateToNumber={15}
        />
        %
      </p>
      <motion.Box
        className="slider-box"
        variants={{
            hidden: { x: 200, opacity: 0 },
            visible: { x: 0, opacity: 1 }
          }}
        initial="hidden"
        whileInView="visible"
        transition={{duration: 1}}
        viewport={{ once: true }}
      >
        <p>0</p>
        <Slider defaultValue={0} value={15} />
        <p>100</p>
      </motion.Box>

      <div className="oneline">
        <h4>Lips validation</h4>
        {lip ? <FaCheckCircle className="pass" /> : <FaTimesCircle className="fail" />}
      </div>
      <p className="oneline">
        <AnimatedNumbers
          transitions={(index) => ({
            type: "spring",
            duration: index + 1,
          })}
          animateToNumber={15}
        />
        %
      </p>
      <motion.Box
        className="slider-box"
        variants={{
            hidden: { x: -200, opacity: 0 },
            visible: { x: 0, opacity: 1 }
          }}
        initial="hidden"
        whileInView="visible"
        transition={{duration: 1}}
        viewport={{ once: true }}
      >
        <p>0</p>
        <Slider defaultValue={0} value={15} />
        <p>100</p>
      </motion.Box>

      <div className="oneline">
        <h4>Color validation</h4>
        {color ? <FaCheckCircle className="pass" /> : <FaTimesCircle className="fail" />}
      </div>
      <p className="oneline">
        <AnimatedNumbers
          transitions={(index) => ({
            type: "spring",
            duration: index + 1,
          })}
          animateToNumber={15}
        />
        %
      </p>
      <motion.Box
        className="slider-box"
        variants={{
            hidden: { x: 200, opacity: 0 },
            visible: { x: 0, opacity: 1 }
          }}
        initial="hidden"
        whileInView="visible"
        transition={{duration: 1}}
        viewport={{ once: true }}
      >
        <p>0</p>
        <Slider defaultValue={0} value={15} />
        <p>100</p>
      </motion.Box>

      <div className="oneline">
        <h4>Blur or glare validation</h4>
        {blur ? <FaCheckCircle className="pass" /> : <FaTimesCircle className="fail" />}
      </div>
      <p className="oneline">
        <AnimatedNumbers
          transitions={(index) => ({
            type: "spring",
            duration: index + 1,
          })}
          animateToNumber={15}
        />
        %
      </p>
      <motion.Box
        className="slider-box"
        variants={{
            hidden: { x: -200, opacity: 0 },
            visible: { x: 0, opacity: 1 }
          }}
        initial="hidden"
        whileInView="visible"
        transition={{duration: 1}}
        viewport={{ once: true }}
      >
        <p>0</p>
        <Slider defaultValue={0} value={15} />
        <p>100</p>
      </motion.Box>

      <div className="oneline">
        <h4>Voice validation</h4>
        {voice ? <FaCheckCircle className="pass" /> : <FaTimesCircle className="fail" />}
      </div>
      <p className="oneline">
        <AnimatedNumbers
          transitions={(index) => ({
            type: "spring",
            duration: index + 1,
          })}
          animateToNumber={15}
        />
        %
      </p>
      <motion.Box
        className="slider-box"
        variants={{
            hidden: { x: 200, opacity: 0 },
            visible: { x: 0, opacity: 1 }
          }}
        initial="hidden"
        whileInView="visible"
        transition={{duration: 1}}
        viewport={{ once: true }}
      >
        <p>0</p>
        <Slider defaultValue={0} value={15} />
        <p>100</p>
      </motion.Box>

      <button className="retake" onClick={handleOnClick}>Retake a video</button>
    </div>
  );
}

export default Home;
