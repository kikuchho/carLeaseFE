import React from 'react';
import '../../styles/HomePageBottom.css';
import diagL from '../../assets/diagL.png';
import diagR from '../../assets/diagR.png';


const HomePageBottom = () => {

    return (
        <div className="home-page-bottom-container">
            <div className='title-container'>
                <img src={diagL} alt="L" className="titleimg" />
                <div className='fifthpoint-title'> まだまだあるKINTOの魅力 </div>
                <img src={diagR} alt="R" className="titleimg" />
            </div>
            
            <div className="bottom-image">
                <img src="/path/to/image.jpg" alt="Home Page Image" />
            </div>
        </div>
    );
}

export default HomePageBottom;