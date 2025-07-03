import React, { useEffect, useState } from 'react';
import '../../styles/ContentsDrawer.css'; 

const ContentsDrawer = () => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [isPastThreshold, setIsPastThreshold] = useState(false);
    // Difference between : Distance from top of document to top of drawer and : Distance user has scrolled from top
    const [scrollDistance, setScrollDistance] = useState(0); 

    //track scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollDistanceFromTop = window.scrollY;
           

            // set Difference between the two.
            const drawerElement = document.getElementById('drawer-contents');
            //const topOfdrawer = drawerElement ? drawerElement.offsetTop : 0;
            const scrollDistanceFromTopOfFooter = scrollDistanceFromTop - 5000;
            setScrollDistance(scrollDistanceFromTop);

            setIsPastThreshold(scrollDistanceFromTop >= 5000); 
            console.log(scrollDistanceFromTop, "scrollPosition", scrollDistanceFromTopOfFooter , "distance betwn drawer to scrollY" )
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    },[] );



  return (
    
    <div>   
        <div className="drawer-container">
            <div  className={ `drawer-contents   ${isPastThreshold ? "past-threshold" : "" }  ` }
                style={{ 
                    position: isPastThreshold ? 'absolute' : 'fixed',
                    top: isPastThreshold ? '5000px' : 'auto',                  
                }}
            >

                <div className="drawer-header" > 
                    CONTENTS
                </div>

            </div>
        </div>
        
        <div className="footer-marker">

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