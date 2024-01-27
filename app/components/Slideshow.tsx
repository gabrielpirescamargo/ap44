import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import img1 from '../img/ap1.jpg';
import img2 from '../img/ap2.jpg';
import img3 from '../img/ap3.jpg';
import Image from 'next/image';
const images = [img1, img2, img3];

export const Slideshow = () => {
  return (
    <div className='slide-container'>
      <Zoom scale={0.4}>
        {images.map((each, index) => (
          <Image
            alt={'Apto 44 imagem'}
            key={index}
            style={{ height: 400 }}
            src={each}
          />
        ))}
      </Zoom>
    </div>
  );
};
