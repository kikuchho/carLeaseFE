import React, { useEffect, useState } from 'react';
import '../../styles/FixedFooter.css';
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { FaCalculator } from "react-icons/fa";

const FixedFooter = () => {
    const [isPastThreshold, setIsPastThreshold] = useState(false);

    //track scroll position
        useEffect(() => {
    
            
    
    
            const handleScroll = () => {
                const scrollDistanceFromTop = window.scrollY;
               
                setIsPastThreshold(scrollDistanceFromTop >= 6000); 
    
                console.log(scrollDistanceFromTop, "scrollPosition");
            };
    
            
    
            window.addEventListener('scroll', handleScroll);
            
            return () => {
                window.removeEventListener('scroll', handleScroll);
               
            };
    
        },[] );


    return (
       <div className="fixed-footer-marker-container">
            <div className="fixed-footer-marker" style={{ 
                    position: isPastThreshold ? 'absolute' : 'fixed',
                    top: isPastThreshold ? '6555px' : 'auto',  
                    }}>
                <div className='fixed-footer-item'> 
                    <div className='fixed-footer-text'> 
                    <div>気になる車種をWEB見積り </div> <FaCalculator color={"red"}/> </div>
                </div>
                <div className='fixed-footer-item'> 
                    <div className='fixed-footer-text'> <div>販売店に行く</div> <HiOutlineBuildingStorefront color={"red"} size={"20px"}/> </div>
                </div>
            </div>
        </div>
    );
}

export default FixedFooter;