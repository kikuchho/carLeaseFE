import react_img from "../assets/react.svg"
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiBookmark } from "react-icons/ci";
import { useState } from "react";
import "../styles/Header.css";

function Header(isAuthorized: any) {

    const [isClicked, setIsClicked] = useState(false);
    const [isClicked2, setIsClicked2] = useState(false);
    

        
    return(
        <div>

            <div
                className={`H-dropdown ${isClicked ? " height: 20rem;" : ""} `} >
                <p>this is drop down</p>
            </div>
            
            <div className="Header-container">
            <div>
                <img src={react_img} className="header-logo"  />
            </div>
            <div> <CiSearch /> </div>
            <div> 
                { isAuthorized === true ? <CiBookmark onClick={ ()=> { setIsClicked2(!isClicked2)} }/> : <></> }
                <GiHamburgerMenu onClick={() => setIsClicked(!isClicked)} /> 
            </div>
               
            </div>
        </div>
        


    )
}


export default Header