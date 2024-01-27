import React from 'react';
import { Fade, Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import img1 from '../img/ap1.jpg';
import img2 from '../img/ap2.jpg';
import img3 from '../img/ap3.jpg';
import Image from 'next/image';
const images = [img1, img2, img3];

export const Slideshow = () => {
  const properties = {
    duration: 5000,
    autoplay: false,
    transitionDuration: 500,
    infinite: true,
  };
  return (
    <div className='slide-container'>
      <Fade {...properties}>
        {images.map((each, index) => (
          <Image
            alt={'Apto 44 imagem'}
            key={index}
            style={{ height: 600 }}
            src={each}
          />
        ))}
      </Fade>
    </div>
  );
};
