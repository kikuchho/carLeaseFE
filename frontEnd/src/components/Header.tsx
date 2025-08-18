import Toyota_logo from "../assets/Toyota-logo.png";

import "../styles/Header.css";
import Dropdown from "./Dropdown";
import RiseUpMenu from "./RiseUpMenu";
import { useNavigate } from "react-router-dom";
import HeaderSearch from "./HeaderSearch";

function Header({ isAuthorized }: { isAuthorized: boolean }) {

    const navigate = useNavigate()

    function handlelogout() {
        console.log("logout clicked")
        localStorage.clear()
        window.location.reload()
    }

    
    console.log("isAuthorized in header", isAuthorized)

    // No need for isAuthorizedtest, use isAuthorized directly
        
    return(
        <div>

            <div className="header-container">
                <div className="homeheader-logo-container" onClick={() => navigate("/")}>
                    <img src={Toyota_logo} className="homeheader-logo"  />
                </div>
                
                <div className="r-header-menu"> 
                     { isAuthorized ? <button className="r-header-menu-logout" onClick={()=>{handlelogout()}}> ログアウト </button> : <></>}
                    { isAuthorized ? <RiseUpMenu  /> : <div className="login-logo" onClick={() => navigate("/login") }> <div className="login-text">ログイン</div> </div> }
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