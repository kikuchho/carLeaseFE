import '../../styles/ThirdPoint.css' ;
import point3 from '../../assets/point03.png';
import point4 from '../../assets/point04.png';
import pt03_reason from '../../assets/pt03_reason.png';
import ico_link_arrow from "../../assets/icon_arrow.png";
import pt04_detail_pc from '../../assets/pt04_detail_pc.png'; // Assuming you have this image for the fourth point

const ThirdPoint = () => {


return (
    <div className='ThirdPointMasterContainer'>

        <div className='ThirdPointContainer'> 
            <img src={point3} alt={point3} className="image-container3" /> 

            <div className='title1-container'> 
                    <p className='title1'> 若い人ほど </p>   
                    <p className='title1-2'> KINTOがおトク！ </p>     
            </div>

            <div className='pt3info-container'>  <img src={pt03_reason} alt={pt03_reason} className="pt3info" />   </div>

            
            <div className='bottomTXT1'> KINTOは、若者に負担になりがちの </div>  
            <div className='bottomTXT2'> 任意保険 <span className='btmsub1'> や </span> 税金 <span className='btmsub1'> などの </span> <span className='btmsub2 yellow-underline'> 諸経費もコミコミ </span> <span className='btmsub1'> で </span> </div>
            <div className='bottomTXT2'> <span className='btmsub2 yellow-underline'>月額1万円台</span>～人気車種に乗れちゃいます </div>

            <div className='bottombutton-container'> 
                <div className="bottombutton"> <p className="bottombuttonTXT"> KINTOのラインアップを詳しく見る  </p> <img src={ico_link_arrow} className="bottombuttonimg" /> </div>     
            </div>
        
        </div>

        <div className='FourthPointContainer'>
            <div className='FourthPointContainerbg'> 
                <img src={point4} alt={point4} className="image-container3" /> 
                <div className='title1-container'> 
                        <p className='title1'> 東京・愛知・長野・大阪限定 </p>       
                </div>
                <div className='pt4info-container'>
                    <img src={pt04_detail_pc} alt={pt04_detail_pc} className="image-container4" /> 
                </div>

            </div>
            <div className='bottombutton-container'> 
                <div className="bottombutton"> <p className="bottombuttonTXT"> 在庫一覧を見る  </p> <img src={ico_link_arrow} className="bottombuttonimg" /> </div>     
            </div>
        </div>

    </div>
    

)

}

export default ThirdPoint;