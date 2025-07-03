import { useEffect, useRef, useState } from "react";
import "../styles/dropdown.css"; 
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

import Toyota_logo from "../assets/Toyota-logo.png"; // Adjust the path as necessary
import arrowleft from "../assets/arrowleft.svg"; // Adjust the path as necessary
import arrowright from "../assets/arrowright.svg"; // Adjust the path as necessary




const Dropdown = () => { 
const [isOpen, setIsOpen] = useState(false);

 useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            
        }
    }, [isOpen]);


    return(
    <div className="dropdown-container">
        <div onClick={() => {setIsOpen(!isOpen); } } className="dropdown-button">
            <div> <GiHamburgerMenu size={"25px"}/>  </div>
        </div>

        <div className={`dropdown-content  ${isOpen ? "open" : ""}`}>  

            <div className="dropdown-sidescroll">

                <div className="dropdown-header">   
                    <img src={Toyota_logo} className="header-logo"  />    
                    <div className="close-button-container"><IoMdClose className="close-button" onClick={() => setIsOpen(!isOpen)}/></div>
                </div> 
            

                <div className="dropdown-items"  >
                    
                    <div className="dropdown-column1"> 
                        <div className="dropdown-item-button"> <div> トヨタのクルマ  </div> <img src={arrowright} className="arrow-logo"  />  </div>
                        <div className="dropdown-item-button"> 見積りシミュレーション <img src={arrowright} className="arrow-logo"  /> </div>
                        <div className="dropdown-item-button"> 販売店検索 <img src={arrowright} className="arrow-logo"  /> </div>
                        <div className="dropdown-item-button"> 試乗車・展示車検索 <img src={arrowright} className="arrow-logo"  /> </div>
                        <div className="dropdown-item-button"> 認定中古車  <img src={arrowright} className="arrow-logo"  />  </div>
                        <div className="dropdown-item-button"> 選べる新車の支払いプラン  <img src={arrowright} className="arrow-logo"  />  </div>
                        <div className="dropdown-item-button"> トヨタの技術 <img src={arrowright} className="arrow-logo"  /> </div>
                    </div>
                    <div className="dropdown-column1">
                        <div className="dropdown-item-button"> オーナーサポート <img src={arrowright} className="arrow-logo"  />  </div>
                        <div className="dropdown-item-button"> クルマ購入ガイド <img src={arrowright} className="arrow-logo"  />  </div>
                        <div className="dropdown-item-button"> コネクティッドサービス <img src={arrowright} className="arrow-logo"  /> </div>
                        <div className="dropdown-item-button"> アフターサービス <img src={arrowright} className="arrow-logo"  /> </div>
                        <div className="dropdown-item-button"> アクセサリー <img src={arrowright} className="arrow-logo"  /> </div>
                        <div className="dropdown-item-button"> 取扱説明書 <img src={arrowright} className="arrow-logo"  /> </div>
                        <div className="dropdown-item-button"> 旧車情報 <img src={arrowright} className="arrow-logo"  /> </div>
                    </div>
                    <div className="dropdown-column2">
                        <div className="dropdown-item-button"> カーライフ <img src={arrowright} className="arrow-logo"  /> </div>  
                    </div>

                </div>
                <div className="dropdown-footer"  >
                    <div className="dropdown-item-button"> FAQ・お問い合わせ <img src={arrowright} className="arrow-logo"  /> </div>  
                    <div className="dropdown-item-button"> リコール情報 <img src={arrowright} className="arrow-logo"  /> </div>  
                    <div className="dropdown-item-button2"> 
                        <div className="grid-container-dropdown">
                            <div className="dditem1"> TOYOTA アカウントセンター   </div>
                            <div className="dditem2"> <img src={arrowright} className="arrow-logo"  /> </div>
                            <div className="dditem3"> TOYOTAアカウント 登録情報の確認・編集ができます。 </div>
                            <div className="dditem4">  </div>
                        </div>
                     
                        
                    </div>  
                </div>

           
            </div>
            
            
        </div>

        


    </div>
    )
}

export default Dropdown;