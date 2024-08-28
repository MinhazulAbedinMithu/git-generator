import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import useImage from 'use-image';
import gifshot from 'gifshot';

const BannerPreview = ({ data }) => {
  const [currentView, setCurrentView] = useState('companyName');
  const [gifURL, setGifURL] = useState(null);
  const stageRef = useRef();
  const [logoImage] = useImage(data.logo);

  const captureFrame = () => {
    return stageRef.current.toDataURL({ pixelRatio: 2 }); // Higher pixel ratio for better quality
  };

  const animateScaling = async (textNode) => {
    for (let scale = 0; scale <= 1; scale += 0.01) {
      textNode.scale({ x: scale, y: scale });
      stageRef.current.batchDraw();
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  };

  const animateSpinning = async (imageNode) => {
    for (let angle = 0; angle <= 360; angle += 5) {
      imageNode.rotation(angle);
      stageRef.current.batchDraw();
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  };

  const animateTransition = async (textNode) => {
    const initialX = -textNode.width();
    const finalX = 360 - textNode.width() / 2;
    textNode.x(initialX);
    for (let x = initialX; x <= finalX; x += 5) {
      textNode.x(x);
      stageRef.current.batchDraw();
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
  };

  const createGif = async () => {
    const frames = [];
    const layer = stageRef.current.getLayers()[0];

    setCurrentView('companyName');
    await new Promise((resolve) => setTimeout(resolve, 200));
    const companyNameNode = layer.findOne('#companyName');
    await animateScaling(companyNameNode);
    frames.push(captureFrame());

    setCurrentView('logo');
    await new Promise((resolve) => setTimeout(resolve, 200));
    const logoNode = layer.findOne('#logo');
    await animateSpinning(logoNode);
    frames.push(captureFrame());

    setCurrentView('tagline');
    await new Promise((resolve) => setTimeout(resolve, 200));
    const taglineNode = layer.findOne('#tagline');
    await animateTransition(taglineNode);
    frames.push(captureFrame());

    gifshot.createGIF(
        {
          images: frames,
          interval: 0.5,
          gifWidth: 720,
          gifHeight: 90,
          numFrames: frames.length * 5,
          quality: 10, // Try increasing this value if needed
        },
        (obj) => {
          if (!obj.error) {
            setGifURL(obj.image);
          }
        }
      );
      
  };

  const startAnimation = () => {
    createGif();
  };

  return (
    <div>
      <Stage width={720} height={90} ref={stageRef} className="border">
        <Layer>
          {currentView === 'companyName' && (
            <Text
              id="companyName"
              text={data.companyName}
              fontSize={30}
              fill={data.color}
              x={360 - data.companyName.length * 10}
              y={25}
              scale={{ x: 0, y: 0 }}
              width={700}
              align="center"
            />
          )}
          {currentView === 'logo' && (
            <Image
              id="logo"
              image={logoImage}
              x={320}
              y={10}
              width={80}
              height={70}
              rotation={0}
            />
          )}
          {currentView === 'tagline' && (
            <Text
              id="tagline"
              text={data.tagline}
              fontSize={25}
              fill={data.color}
              x={-200}
              y={30}
              width={700}
              align="center"
            />
          )}
        </Layer>
      </Stage>

      {!gifURL ? (
        <button onClick={startAnimation} className="bg-green-500 text-white p-2 mt-4">
          Generate GIF
        </button>
      ) : (
        <a href={gifURL} download="banner.gif" className="bg-blue-500 text-white p-2 mt-4">
          Download GIF
        </a>
      )}
    </div>
  );
};

export default BannerPreview;
