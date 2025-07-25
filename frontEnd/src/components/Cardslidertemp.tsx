
import React, { lazy, use, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../api";
//import "../styles/CardSlidertemp.css";
import noah from "../assets/noah.png";
import raize from "../assets/raize.png";
import yaris from "../assets/yaris.png";
import arrowleft from "../assets/arrowleft.svg";
import arrowright from "../assets/arrowright.svg";



const CardSlidertemp = () => {
  const [currentActiveSlide, setCurrentActiveSlide] = useState(0);

  const settings = {
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => {
      // beforeChangeでは、新しいスライドのインデックスをすぐに適用せず、
      // afterChangeで適用することで、アニメーションが完了した後にopacityを切り替える
    },
    afterChange: (current) => {
      setCurrentActiveSlide(current);
    }
  };

  const slides = [
    { id: 1, content: 'スライド 1' },
    { id: 2, content: 'スライド 2' },
    { id: 3, content: 'スライド 3' },
    { id: 4, content: 'スライド 4' },
  ];

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              opacity: index === currentActiveSlide ? 1 : 0.3,
            }}
          >
            <h3 style={{
              height: '200px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '10px',
              border: '1px solid #ccc'
            }}>
              {slide.content}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlidertemp;