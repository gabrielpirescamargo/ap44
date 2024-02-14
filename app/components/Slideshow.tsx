import React from 'react';
import { Fade, Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import img1 from '../img/ap1.jpeg';
import img2 from '../img/ap2.jpeg';
import img3 from '../img/ap3.jpeg';
import img4 from '../img/ap4.jpeg';
import img5 from '../img/ap5.jpeg';
import img6 from '../img/ap6.jpeg';
import img7 from '../img/ap7.jpeg';
import img8 from '../img/ap8.jpeg';
import img9 from '../img/ap9.jpeg';
import img10 from '../img/ap10.jpeg';
import img11 from '../img/ap11.jpeg';
import img12 from '../img/ap12.jpeg';
import img13 from '../img/ap13.jpeg';
import img14 from '../img/ap14.jpeg';
import img15 from '../img/ap15.jpeg';
import img16 from '../img/ap16.jpeg';
import img17 from '../img/ap17.jpeg';
import img18 from '../img/ap18.jpeg';
import Image from 'next/image';
const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
];

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
