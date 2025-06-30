import React from 'react';
import '../../styles/HomePageBottom.css';
import diagL from '../../assets/diagL.png';
import diagR from '../../assets/diagR.png';
import pt03_icon1 from '../../assets/pt03_icon1.png';
import pt03_icon2 from '../../assets/pt03_icon2.png';
import pt03_icon3 from '../../assets/pt03_icon3.png';
import pt03_icon4 from '../../assets/pt03_icon4.png';
import pt03_icon5 from '../../assets/pt03_icon5.png';

const HomePageBottom = () => {

    return (
        <div className="home-page-bottom-container">
            <div className='title-container'>
                <img src={diagL} alt="L" className="titleimg" />
                <div className='fifthpoint-title'> まだまだあるKINTOの魅力 </div>
                <img src={diagR} alt="R" className="titleimg" />
            </div>

            <div className='grid-container'>
                <div>  <img src={pt03_icon1} alt="Home Page Image" className='grid-img'/> </div>
                <div>  <img src={pt03_icon2} alt="Home Page Image" className='grid-img'/> </div>
                <div>  <img src={pt03_icon3} alt="Home Page Image" className='grid-img'/> </div>
                <div>  <img src={pt03_icon4} alt="Home Page Image" className='grid-img'/> </div>
                <div>  <img src={pt03_icon5} alt="Home Page Image" className='grid-img'/> </div>
            </div>
            
            <div className="bottom-image">
                <img src="/path/to/image.jpg" alt="Home Page Image" />
            </div>
        </div>
    );
}

export default HomePageBottom;