import React from 'react';
import '../styles/FirstPoint.css'; // Assuming you have a CSS file for styles
import mv_pc from '../assets/mv_pc.jpg'; 
import logo from '../assets/logo.png'; 
const FirstPoint = () => {
  return (
    <div className="FirstPointContainer">
        <div className='topimageContainer'>
            <img src={mv_pc} alt={mv_pc} className="image-container" />
        </div>
        <div className="logoContainer">
            <div className='logotextContainer'>
                <h2 className="logo-text">面倒な手間無し、コミコミ定額！</h2>
                <h2 className="logo-text">クルマのサブスク</h2>
            </div>
           
            <img src={logo} alt={logo} className="logo-image" />
        </div >

    </div>
    
  );
}

export default FirstPoint;