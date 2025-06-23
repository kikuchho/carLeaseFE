import React, { lazy, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../api";
import "../styles/CardSlider.css";
import noah from "../assets/noah.png";
import raize from "../assets/raize.png";
import yaris from "../assets/yaris.png";
import arrowleft from "../assets/arrowleft.svg";
import arrowright from "../assets/arrowright.svg";


type Car = {
    id: number;
    name: string;
    price: number;
    grade: string;
    imgname: string;
    paylist1: number;
    paylist2: number;
    paylist3: number;
    paylist4: number;
}

type Paylist = {
    id: number;
    name: string;
    price: number;
    grade: string;
    imgname: string;
    paylist1: number;
    paylist2: number;
    paylist3: number;
    paylist4: number;
}

function CardSlider() {

    
    
  //----------------------get car list--------------------///
    
   
    //paylist (installments plan) for all cars
    const [paylist, setPaylist] = useState<Paylist[]>([]);
    // State to track current slide index
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(1);

    const [loading, setLoading] = useState<boolean>(true);

    // State to track if it's the first change in currentSlideIndex
    const [firstchange, setFirstChange] = useState<boolean>(true);


    // Logging whenever currentSlideIndex changes
    useEffect(() => {
      console.log("Current slide index updated:", currentSlideIndex);
      // You can perform additional operations here based on the index

      fetchPaylist(); // Fetch paylist whenever the slide changes


    }, [currentSlideIndex]);

    useEffect( ()=> {

      fetchPaylist();

    } ,[] )

    // Initial data fetch before rendering
    useEffect(() => {
        const initData = async () => {
            setLoading(true);
            await fetchPaylist();
            setLoading(false);
        };
        
        initData();
    }, []);


      // api.get("/api/cars/")
      // .then((res) => { setCarList(res.data[0].price); console.log("carList2", carList, res.data); } )
      // .catch((err) => { alert(err) } )
           
    //fetch  data for each car needed for this component
    const fetchPaylist = async () => {
      
      const cardataList: Paylist[] = []; // Assuming cars is an array of Car objects

      try {

          // in this case repeat fetch for 3 times 
          for (let i = 1; i <= 3; i++) {
            const res = await api.get(`/api/cars/${i}/`); 
            const formattedList =  {
              id: res.data.id, 
              name: res.data.name, 
              price: res.data.price,
              grade: res.data.grade,
              imgname: res.data.imgname,
              paylist1: res.data.paylist1, 
              paylist2: res.data.paylist2, 
              paylist3: res.data.paylist3, 
              paylist4: res.data.paylist4
            };
            
            cardataList.push(formattedList);
          }
          
  
          setPaylist(cardataList);

          console.log('paylist state:', paylist);

      } catch (error) {
          console.error('Error fetching cars:', error);
      }
    };

    
    //----------------------end of get car list--------------------///

    const carImages: { [key: number]: string } = {
      1: raize,
      2: yaris,
      3: noah
    };

    function CustomSlide({ index }: { index: number }) {
    
    const imageSource = carImages[index] || noah; // Fallback to noah if not found
    return (
        <div className="slider-item">
            <img className="slider-img" src={imageSource} alt={`Slide ${index}`} />
        </div>
    );
    }

    //----------------------slick-arrow-functions--------------------///

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
    //----------------------end of slick-arrow-functions--------------------///

    


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current: number) => {
      // This function runs after slide changes
        if(firstchange === true) {
          setCurrentSlideIndex(current + 1);
          setFirstChange(false);
          console.log("in firstchange Current car index!!!!!!!!!!!!!!!!!!!!!!:",  current);
        }else{
          if(current === 3) {
              setCurrentSlideIndex(0);
          }else{
                setCurrentSlideIndex(current + 1);
          }

        
        }
        
        
        
        fetchPaylist();
        
      console.log("in afterchange Current car index:",  current);
      fetchPaylist();

    }
  };

  // Render loading state or content
    if (loading || paylist.length < 3) {
        return <div className="slider-main-wrapper">Loading...</div>;
    }

  //handler for line 230 - 240 
  function currentSlideIndexHandler(index: number): number {

    if(index === 3) {
      return 0;
    }
    if(index === -1) {
      return 2 ;
    }
    return index;
  }


  return (
    <div className="slider-main-wrapper"> 
      <div className="slider-container">
        <Slider {...settings}>
        
          {/* <CustomSlide index={paylist[currentSlideIndex + 1  ].id} />
          <CustomSlide index={paylist[currentSlideIndex - 1].id} /> 
          <CustomSlide index={paylist[currentSlideIndex  ].id} /> */}
          <CustomSlide index={paylist[currentSlideIndexHandler(currentSlideIndex + 1)  ].id} />
          <CustomSlide index={paylist[currentSlideIndex - 1].id} /> 
          <CustomSlide index={paylist[currentSlideIndexHandler(currentSlideIndex) ].id} />

          {/* <CustomSlide index={paylist[(currentSlideIndex + 1) % 3].id} />
          <CustomSlide index={paylist[(currentSlideIndex + 2) % 3].id} /> 
          <CustomSlide index={paylist[currentSlideIndex % 3].id} /> */}
 
        </Slider>
      </div>

      <div className="price-sheet-container">
        <div className="price-sheets">
          <div className="price-sheet-item1">
            <div>ボーナス月 </div>
            <div>なしの場合 </div>
          </div>
          <div className="price-sheet-item2">
            <div> 月額  {`¥ ${paylist[currentSlideIndex - 1]?.paylist1 }`}</div> 
          </div>
        </div>
        <div className="price-sheets">
          <div className="price-sheet-item1">
            <div>ボーナス月 </div>
            <div>なしの場合 </div>
          </div>
          <div className="price-sheet-item2">
            <div> 月額  {`¥ ${paylist[currentSlideIndex - 1]?.paylist2}`} 円 (税込み)</div> 
          </div >
        </div>
        <div className="price-sheets">
          <div className="price-sheet-item1">
            <div>ボーナス月 </div>
            <div>なしの場合 </div>
          </div>
          <div className="price-sheet-item2">
            <div> 月額  {`¥ ${paylist[currentSlideIndex -  1]?.paylist3}`}</div> 
          </div>
        </div>
      </div>





    </div>
    



  );
}

export default CardSlider;