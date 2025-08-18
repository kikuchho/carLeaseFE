import { useEffect, useState } from 'react';
import '../../styles/ContentsDrawer.css'; 
import { IoIosArrowForward } from "react-icons/io";

const ContentsDrawer = () => {

    //USE STICKY INSET INSTEAD OF ABSOLUTE / // FIXED POSITIONING

    // const [isOpen, setIsOpen] = React.useState(false);
    const [isPastThreshold1, setIsPastThreshold1] = useState(false);
    // Difference between : Distance from top of document to top of drawer and : Distance user has scrolled from top
    const [, setScrollDistance] = useState(0); 
    const [, setHorizontalScroll] = useState(0); 
    const [, setWindowWidth] = useState(window.innerWidth);
    const [footerDistanceFromTop, setFooterDistanceFromTop] = useState(5700); // Default fallback


    //track scroll position
    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            console.log("Window resized to:", window.innerWidth);
        };


        const handleScroll = () => {
            const scrollDistanceFromTop = window.scrollY;
            const scrollDistanceFromLeft = window.scrollX;

            handleResize(); 
            
            // Get the position of HomeFooterContainer-master
            const footerElement = document.querySelector('.HomeFooterContainer-master');
            let currentFooterDistance = footerDistanceFromTop; // Use current state as fallback
            
            if (footerElement) {
                // getBoundingClientRect gives position relative to viewport
                // Add current scroll position to get absolute position from document top
                currentFooterDistance =  window.scrollY;
                setFooterDistanceFromTop(currentFooterDistance);
            }
            
            const scrollDistanceFromTopOfFooter = scrollDistanceFromTop ;
            setScrollDistance(scrollDistanceFromTop);
            setHorizontalScroll(scrollDistanceFromLeft);
            setIsPastThreshold1(window.scrollY >= 6000); 

            console.log("Window resized to:", window.innerWidth);
            console.log(scrollDistanceFromTop, "scrollPosition", scrollDistanceFromTopOfFooter , "distance betwn drawer to scrollY");
            console.log("Footer distance from top:", footerDistanceFromTop);
            console.log("Horizontal scroll:", scrollDistanceFromLeft);
        };

        

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
           
        };

    },[] );



  return (
    
    <div>   
        <div className="drawer-container">
            <div  className={ `drawer-contents   ${isPastThreshold1 ? "past-threshold" : "" }  ` }
                style={{ 
                    position: isPastThreshold1 ? 'absolute' : 'fixed',
                    top: isPastThreshold1 ? `6000px` : 'auto',  
                }}
            >

                <div className="drawer-header" > 
                    CONTENTS
                </div>
                <div className="drawer-contents-body" >
                    <div className="drawer-item"> <IoIosArrowForward color='red'/> <div>新車の支払いプラン</div>  </div>
                    <div className="drawer-item"> <IoIosArrowForward color='red'/> <div> 残価設定プラン</div> </div>
                    <div className="drawer-item"> <IoIosArrowForward color='red'/> <div>残額据置払い </div> </div>
                    <div className="drawer-item"> <IoIosArrowForward color='red'/> <div>KINTO </div> </div>
                    <div className="drawer-item"> <IoIosArrowForward color='red'/> <div>乗り換え</div> </div>
                </div>
                   
            </div>
        </div>
       

    </div>

    
  );
}
export default ContentsDrawer;














// style={{ 
//                     position: isPastThreshold ? 'absolute' : 'absolute',
//                     top:  `${scrollDistance}px `,                    
//}}







// import React, { useEffect, useState } from 'react';
// import '../../styles/ContentsDrawer.css'; 

// const ContentsDrawer = () => {

//     const [isOpen, setIsOpen] = React.useState(false);
//     const [isPastThreshold, setIsPastThreshold] = useState(false);
//     // Difference between : Distance from top of document to top of drawer and : Distance user has scrolled from top
//     const [scrollDistance, setScrollDistance] = useState(0); 

//     //track scroll position
//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollDistanceFromTop = window.scrollY;
           

//             // set Difference between the two.
//             const drawerElement = document.getElementById('drawer-contents');
//             const topOfdrawer = drawerElement ? drawerElement.offsetTop : 0;
//             const scrollDistanceFromTopOfFooter = scrollDistanceFromTop - topOfdrawer;
//             setScrollDistance(scrollDistanceFromTopOfFooter);

//             setIsPastThreshold(scrollDistanceFromTop >= 5000); 
//             console.log(topOfdrawer, "scrollPosition", )
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };

//     },[] );



//   return (
    


//     <div className="drawer-container">
//         <div  className={ `drawer-contents   ${isPastThreshold ? "past-threshold" : "" }  ` }
//             style={{ 
//                 position: isPastThreshold ? 'absolute' : 'fixed',
//                 top: isPastThreshold ? '5000px' : 'auto',
                
//             }}
//         >
//             <div className="dropdown-header" > 
//                 contents
//             </div>
            
//         </div>
//     </div>
//   );
// }
// export default ContentsDrawer;