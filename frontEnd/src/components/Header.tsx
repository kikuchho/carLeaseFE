import react_img from "../assets/react.svg"
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiBookmark } from "react-icons/ci";
import { useState } from "react";
import "../styles/Header.css";
import Dropdown from "./dropdown";
import RiseUpMenu from "./RiseUpMenu";
import { useNavigate } from "react-router-dom";
import HeaderSearch from "./HeaderSearch";

function Header({ isAuthorized }: { isAuthorized: boolean }) {

    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate()

    
    console.log("isAuthorized in header", isAuthorized)

    // No need for isAuthorizedtest, use isAuthorized directly
        
    return(
        <div>

            <div className="header-container">
                <div>
                    <img src={react_img} className="header-logo"  />
                </div>
                
                <div className="r-header-menu"> 
                    { isAuthorized ? <RiseUpMenu  /> : <button className="login-logo" onClick={() => navigate("/login") }> ログイン </button> }
                    <div> <HeaderSearch /> </div>
                    <Dropdown /> 
                </div>

                
               
            </div>
            <div className="sub-header">
                <div className="sub-header-item1"> トヨタのクルマ </div> 
                <div className="sub-header-item1"> オーナーサポート </div> 
                <div className="sub-header-item2">  |  </div>
                <div className="sub-header-item1"> カーライフ </div> 
            </div>
        </div>
        


    )
}


export default Header