import React, { useEffect } from 'react';
import '../../styles/carplan/CarPlanHeader.css';
import kintplogo from '../../assets/carplan/kinto-logo.svg';

const CarPlanHeader = () => {

    const [isAtTop, setIsAtTop] = React.useState(true);

    useEffect(() => {
        const handleScroll = () => {
            //const scrollDistanceFromTop = window.scrollY;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setIsAtTop(scrollTop === 0);

            console.log("Scroll position:", scrollTop);

        }

        window.addEventListener('scroll', handleScroll);
    
    
    
    },[]);


    return (
        <div className={`car-plan-header-container  ${isAtTop ? '' : 'closed'}`}>


            <img src={kintplogo} alt="Kinto Logo" className="kinto-logo" />

            
        </div> 
    );
}

export default CarPlanHeader;