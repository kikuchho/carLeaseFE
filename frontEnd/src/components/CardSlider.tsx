import React, { lazy, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../api";
import "../styles/CardSlider.css";
import noah from "../assets/noah.png"
import arrowleft from "../assets/arrowleft.svg";
import arrowright from "../assets/arrowright.svg";

type Car = {
    id: number;
    name: string;
    price: number;
}

function CardSlider() {

    
    
  //----------------------get car list--------------------///
    const [cars, setCars] = useState<Car[]>([]);
    useEffect( ()=> {
        fetchCars();
    } ,[] )

            // api.get("/api/cars/")
            // .then((res) => { setCarList(res.data[0].price); console.log("carList2", carList, res.data); } )
            // .catch((err) => { alert(err) } )
           
    const fetchCars = async () => {
            try {
    
                const res = await api.get("/api/cars/"); // Replace with your actual endpoint
                 const formattedCars = res.data.map((data: any) => ({ 
                    id: data.id, 
                    name: data.name, 
                    price: data.price 
                }));
        
                console.log('Fetched cars:', formattedCars);
                setCars(formattedCars);

                console.log('cars state:', cars);

            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };
    //----------------------end of get car list--------------------///


    function CustomSlide(props : { index: number }) {
    const { index } = props;
    return (
        <div className="slider-item">
            <img className="slider-img" src={noah} alt={`Slide ${index}`} />
        </div>
    );
    }

    function SampleNextArrow(props :any) {
      const { className, style, onClick } = props;
      return (
        
        <div>
          <div 
            className={`${className} custom-next-arrow`}
            style={{ ...style,  display: "block", visibility: "hidden"  , zIndex: 1,right: "-25px" }}
            onClick={onClick}>
            <img src={arrowright} alt="Next" style={{ visibility: "visible", width: "30px", height: "30px" }}/>
          </div>
            
        </div>
      );
    }

    function SamplePrevArrow(props :any) {
      const { className, style, onClick } = props;
      return (
        <div
            className={`${className} custom-prev-arrow`}
            style={{ ...style, display: "block",visibility: "hidden"  , background: "white" }}
            onClick={onClick}>
          <img src={arrowleft} alt="Next" style={{ visibility: "visible", width: "30px", height: "30px" }}/>
        </div>
        
       
      );
    }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className="slider-main-wrapper"> 
      <div className="slider-container">
        <Slider {...settings}>
        
          <CustomSlide index={0} />
          <CustomSlide index={1} /> 
          <CustomSlide index={2} />

        </Slider>
      </div>

      <div className="price-sheet-container">
        <div className="price-sheets">
          <div className="price-sheet-item1">
            <div>ボーナス月 </div>
            <div>なしの場合 </div>
          </div>
          <div className="price-sheet-item2">
            <div> 月額  {`¥ ${cars[1]?.price}`}</div> 
          </div>
        </div>
        <div className="price-sheets">
          <div className="price-sheet-item1">
            <div>ボーナス月 </div>
            <div>なしの場合 </div>
          </div>
          <div className="price-sheet-item2">
            <div> 月額  {`¥ ${cars[1]?.price}`} 円 (税込み)</div> 
          </div >
        </div>
        <div className="price-sheets">
          <div className="price-sheet-item1">
            <div>ボーナス月 </div>
            <div>なしの場合 </div>
          </div>
          <div className="price-sheet-item2">
            <div> 月額  {`¥ ${cars[1]?.price}`}</div> 
          </div>
        </div>
      </div>





    </div>
    



  );
}

export default CardSlider;