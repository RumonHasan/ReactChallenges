import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './style.css';
const Example = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);

  return (
    <div className="primary-wrapper">
      <h1 className="header">Welcome To My Home Page</h1>
      <div className="wrapper">
        <motion.div
          className="container"
          style={{
            scale,
          }}
        >
          <motion.div
            className="item"
            style={{
              scaleY: scrollYProgress,
            }}
          />
          <h1>This is About Page</h1>
        </motion.div>
      </div>
    </div>
  );
};

export default Example;
