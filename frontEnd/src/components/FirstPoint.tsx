import '../styles/FirstPoint.css'; 
import mv_pc from '../assets/mv_pc.jpg'; 
import logo from '../assets/logo.png'; 
import point1 from '../assets/point01.png'; 
import point2 from '../assets/point02.png';
import pt01_icon1 from '../assets/pt01_icon1.png';
import pt01_icon2 from '../assets/pt01_icon2.png';
import pt01_icon3 from '../assets/pt01_icon3.png';
import pt01_icon4 from '../assets/pt01_icon4.png';
import pt01_icon5 from '../assets/pt01_icon5.png';
import pt01_icon6 from '../assets/pt01_icon6.png';
import pt02_icon1 from '../assets/pt02_icon1.png';
import pt02_icon2 from '../assets/pt02_icon2.png';
import pt02_icon3 from '../assets/pt02_icon3.png';
import pt02_icon4 from '../assets/pt02_icon4.png';
import pt02_omakase from '../assets/pt02_omakase.png';

const FirstPoint = () => {
  return (
    <div  className="masterContainer">
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
                    <div className='logo-text3'> 車両本体価格と合わせクルマを維持するのに必要な諸費用をコミコミにして、 </div>
                    <div className='logo-text3'> <span className="yellow-underline">月々定額</span>でお支払いいただく、 </div>
                    <div className='logo-text3'> クルマの新しいサブスクリプションです。 </div>
                </div>
        
            </div >
        </div>


        <div className="FirstPointContainer2 secondcontainer">
            <img src={point1} alt={point1} className="image-container2" /> 

            <div className='title2-container'> 
                <p className='title2'> コミコミ定額! </p>
                <p className='title2-subtext'> <span className="yellow-underline2"> クルマに関わる諸経費、全てを含んだ月々定額です！</span> </p>   
            </div>

            {/* first grid */}
            <div className='text2-bg-container'>
                <div  className='text2-container'>
                    <div className="text2-grid"> <img src={pt01_icon1} alt={pt01_icon2} className="image-text2-grid" /> <p className='imgsubtext2'> 故障修理 </p>  </div>
                    <div className="text2-grid"> <img src={pt01_icon2} alt={pt01_icon2} className="image-text2-grid" /> <p className='imgsubtext2'> 自動車税 </p>  </div>
                    <div className="text2-grid"> <img src={pt01_icon3} alt={pt01_icon2} className="image-text2-grid" /> <p className='imgsubtext2'> 車両代・オプション代 </p> </div>
                    <div className="text2-grid"> <img src={pt01_icon4} alt={pt01_icon2} className="image-text2-grid" /> <p className='imgsubtext2'> 任意保険 </p> </div>
                    <div className="text2-grid"> <img src={pt01_icon5} alt={pt01_icon2} className="image-text2-grid" /> 
                        <p className='imgsubtext2-6'> 車検・ </p>
                        <p className='imgsubtext2-6 subtext1'> メンテナンス費用<span> *1 </span> </p>
                    </div>
                    <div className="text2-grid"> <img src={pt01_icon6} alt={pt01_icon2} className="image-text2-grid" /> <p className='imgsubtext2'> 登録諸費用 </p> </div>
                </div>
                <p className='text2-subtext'>  諸経費はすべて月額料金に！ </p>
            </div>
        </div>

        <div className="FirstPointContainer2">
            <img src={point2} alt={point2} className="image-container2" /> 

            <div className='title2-container'> 
                <p className='title2'> 面倒丸投げ！ </p>
                <p className='title2-subtext'> <span className="yellow-underline2"> クルマ購入における様々な面倒が不要になります！</span> </p>   
            </div>

            {/* 2nd grid  */}
            <div className='text3-bg-container'>
                <div  className='text3-container'>
                    <div className="text3-grid"> <img src={pt02_icon1} alt={pt01_icon2} className="image-text3-grid" /> <p className='imgsubtext3'> 来店・商談 </p>  </div>
                    <div className="text3-grid"> <img src={pt02_icon2} alt={pt01_icon2} className="image-text3-grid" /> <p className='imgsubtext3'> 自動車税 </p>  </div>
                    <div className="text3-grid"> <img src={pt02_icon3} alt={pt01_icon2} className="image-text3-grid" /> <p className='imgsubtext3'> 車両代・オプション代 </p> </div>
                    <div className="text3-grid"> <img src={pt02_icon4} alt={pt01_icon2} className="image-text3-grid" /> <p className='imgsubtext3'> 任意保険 </p> </div>
                </div>
            </div>
            <img src={pt02_omakase} alt={pt02_omakase} className="image-omakase" /> 
            
           
        </div>

       


    </div>
   
    
  );
}

export default FirstPoint;