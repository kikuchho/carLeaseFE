import React, { lazy, use, useEffect, useState } from "react";
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
import ico_link_arrow from "../assets/icon_arrow.png";
import { useNavigate } from "react-router-dom";



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

  const navigate = useNavigate();
    
  //----------------------get car list--------------------///
    
   
    //paylist (installments plan) for all cars
    const [paylist, setPaylist] = useState<Paylist[]>([]);
    // State to track current slide index
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(1);

    const [loading, setLoading] = useState<boolean>(true);

    // State to track if it's the first change in currentSlideIndex
    const [firstchange, setFirstChange] = useState<boolean>(true);
    const firstRef = React.useRef<boolean>(true);

    // State to track the target slide index for animations
    const [isanimating, setIsAnimating] = useState<boolean>(false);

   // Create a non-state variable to track animation without causing re-renders
    const animationRef = React.useRef<boolean>(false);
    const nextslideRef = React.useRef<number>(0);

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

    

    function CustomSlide({ index }: { index: number }) {
    
    // Find the car in paylist that matches the index
    const car = paylist.find(car => car.id === index);
    
    // Create a mapping from image names to imported image variables
    const imageMap: { [key: string]: string } = {
        "noah": noah,
        "raize": raize,
        "yaris": yaris
    };

  
    // Get image based on car imgname or fallback to noah
    let imageSource = noah;
    if (car?.imgname) {
        const imgName = car.imgname.toString().toLowerCase();
        imageSource = imageMap[imgName] || noah;
    }

   
    // Check if this slide is centered or becoming centered
    //const isCurrentCentered = currentSlideIndex === index;
    // const isCurrentCentered = animationRef.current === index;
    // const isCentered = isCurrentCentered || isanimating;

    const isCurrentCentered = currentSlideIndex === index;
    const isAnimating = animationRef.current;
    const nextslide = nextslideRef.current;
    

    return (
    
    <div>
       
        
        <div className={`slider-item  ${ isCurrentCentered  ? "" : "notcentered"} `}   >
        {/* <div className={`slider-item `} > */}
            <img className="slider-img" src={imageSource} alt={`Slide ${index}`} />
            <div> {paylist[index - 1].name}  </div>
            <div> {paylist[index - 1].grade}  </div>
        </div> 

      
    </div>
      
        
    );
  }

    //----------------------slick arrow on click--------------------///
    const clickref = React.useRef<HTMLDivElement>(null);
    // Create a handler that updates target slide immediately
    const handleClick = () => {
      

      //setIsAnimating(!isanimating);
      console.log("test1111111111111111111111111111"+ isanimating);
    };

    useEffect(() => {
      clickref.current?.addEventListener("click", handleClick);
    },[]);
  

    //----------------------slick-arrow-functions--------------------///

    

    function SampleNextArrow(props :any) {
      const { className, style, onClick } = props;

      
      return (
        
        <div >
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
    centerMode: true,
  
    beforeChange: (currentSlide: number, nextSlide: number) => {

      // Set animation flag but DON'T update state
      animationRef.current = true;
      nextslideRef.current = nextSlide; // Store the target slide index for animation
      console.log("Animation starting", currentSlide, "to", nextSlide, "animationRef:", animationRef.current);
      
      // animationRef.current = nextSlide; // Store the target slide index for animation
      // console.log("Animation starting", currentSlide, "to", nextSlide, "animationRef:", animationRef.current);
      // if(firstRef.current === true) {
      //     //setCurrentSlideIndex(nextSlide + 1);
      //     animationRef.current = nextSlide + 1
      //     //setFirstChange(false);
      //     firstRef.current = false;
      //     console.log("in firstchange Current car index!!!!!!!!!!!!!!!!!!!!!!:",  nextSlide);
      //   }else{
      //     if(nextSlide === 3) {
      //         //setCurrentSlideIndex(0);
      //         animationRef.current = 0;
      //     }else{
      //           //setCurrentSlideIndex(nextSlide + 1);
      //           animationRef.current = nextSlide + 1;
      //     }

        
      //   }
     
      // console.log("in afterchange Current car index:",  nextSlide);
      // fetchPaylist();
    },
    afterChange: (current: number) => {
      //This function runs after slide changes
      // Reset animation flag
      animationRef.current = false;
      console.log("Animation ended, current slide index:", current, "animationRef:", animationRef.current);

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
     
      console.log("in afterchange Current car index:",  current);
      fetchPaylist();
    }
  };

  // Render loading state or content
    if (loading || paylist.length < 3) {
        return <div className="slider-main-wrapper">Loading...</div>;
    }

  
  return (
    <div>
        <div className="master-container">
        <div className="title_header"> 
          <div className="slidertitle1"> トヨタの人気車種が勢ぞろい </div>
          <div className="slidertitle2"> 例えば人気車種が月々この金額で！ </div>
        </div>
        
        
        <div className="slider-main-wrapper"> 
          <div className="slider-container">
            <Slider {...settings}>
              
              <CustomSlide index={3} />
              <CustomSlide index={1} /> 
              <CustomSlide index={2} />
              {/* <CustomSlide index={paylist[currentSlideIndexHandler(currentSlideIndex + 1)  ].id} />
              <CustomSlide index={paylist[currentSlideIndex - 1].id} /> 
              <CustomSlide index={paylist[currentSlideIndexHandler(currentSlideIndex) ].id} /> */}

              {/* <CustomSlide index={paylist[(currentSlideIndex + 1) % 3].id} />
              <CustomSlide index={paylist[(currentSlideIndex + 2) % 3].id} /> 
              <CustomSlide index={paylist[currentSlideIndex % 3].id} /> */}
    
            </Slider>
          </div>

          <div className="price-sheet-container">
            <div className="border-top-line">  </div>

            <div className="price-sheets">
              <div className="price-sheet-item1">
                <div>ボーナス月 </div>
                <div>なしの場合 </div>
              </div>
              <div className="price-sheet-item2">
                <div> 月額  <span className="price-number"> {paylist[currentSlideIndex - 1]?.paylist1}</span> 円 (税込み) ~</div> 
              </div>
            </div>
            <div className="price-sheets">
              <div className="price-sheet-item1">
                <div>ボーナス月 </div>
                <div>55,000円 (税込み) の場合</div>
              </div>
              <div className="price-sheet-item2">
                <div> 月額  <span className="price-number"> {paylist[currentSlideIndex - 1]?.paylist2}</span> 円 (税込み) ~ </div> 
              </div >
            </div>
            <div className="price-sheets">
              <div className="price-sheet-item1">
                <div>ボーナス月 </div>
                <div>110,000円 (税込み) の場合 </div>
              </div>
              <div className="price-sheet-item2">
                <div> 月額  <span className="price-number"> {paylist[currentSlideIndex - 1]?.paylist3}</span> 円 (税込み) ~</div> 
              </div>
            </div>
          </div>
          

          
        </div>
          <div className="buttombuttoncontainer">    
            <div className="buttombutton"> <p className="buttonbuttomTXT">一括払い、ローンとKINTOを比較する </p> <img src={ico_link_arrow} className="buttonbuttomimg" /> </div> 
            <div className="buttombutton" onClick={() => navigate(`/carplan?carId=${paylist[currentSlideIndex - 1]?.id}`)}> <p className="buttonbuttomTXT">この車種をKINTOでWEB見積り </p> <img src={ico_link_arrow} className="buttonbuttomimg" /> </div>      
            
          </div>
      </div>

      <div className="FirstPointContainer3">
        <div className='bottomText1'> 契約満了時は </div>
        <div className='bottomText1'>「乗り換え」  「再契約」  「ご返却」の３つから選択！ </div>
        <div className='bottomText2'> 契約満了時は、KINTOで新たなクルマをご契約いただくことも、</div>
        <div className='bottomText2'> 今のおクルマを再契約いただくことも、そのままご返却いただくこともできます。 </div>
      </div>

    </div>
    
    
  );
}

export default CardSlider;

// const CardSlider = () => {
//   const [currentActiveSlide, setCurrentActiveSlide] = useState(0);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     beforeChange: (oldIndex, newIndex) => {
//       // beforeChangeでは、新しいスライドのインデックスをすぐに適用せず、
//       // afterChangeで適用することで、アニメーションが完了した後にopacityを切り替える
//     },
//     afterChange: (current) => {
//       setCurrentActiveSlide(current);
//     }
//   };

//   const slides = [
//     { id: 1, content: 'スライド 1' },
//     { id: 2, content: 'スライド 2' },
//     { id: 3, content: 'スライド 3' },
//     { id: 4, content: 'スライド 4' },
//   ];

//   return (
//     <div style={{ width: '80%', margin: '0 auto' }}>
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             style={{
//               opacity: index === currentActiveSlide ? 1 : 0.3,
//             }}
//           >
//             <h3 style={{
//               height: '200px',
//               backgroundColor: '#f0f0f0',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               margin: '10px',
//               border: '1px solid #ccc'
//             }}>
//               {slide.content}
//             </h3>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default CardSlider;


