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
            <div className='logotext2Container'>
                <div className="logo-text2"> 任意保険・税金コミ</div>
                <div className='logo-text2'> 選べる2つのプラン  </div>
                <div className='logo-text2'> WEB申込み  </div>
            </div>
            <div className='logotext3Container'>
                <div className=''> 車両本体価格と合わせクルマを維持するのに必要な諸費用をコミコミにして、 </div>
                <div className=''> 月々定額でお支払いいただく、 </div>
                <div className=''> クルマの新しいサブスクリプションです。 </div>
            </div>
    
        </div >

    </div>
    
  );
}

export default FirstPoint;