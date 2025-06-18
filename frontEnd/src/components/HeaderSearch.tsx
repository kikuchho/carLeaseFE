import { useEffect, useRef, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import "../styles/HeaderSearch.css";

const HeaderSearch = () => { 
    const [isOpened, setIsOpened] = useState(false);
    
    //--------optional------------ 
    const [isAnimating, setIsAnimating] = useState(false);
    //add a ref and assign it to the drawer so that we can listen for animation-related events:
    const menuRef = useRef<HTMLDivElement>(null);
    //event listener 
    useEffect( () =>{
        menuRef.current?.addEventListener("animationcancel", () => {
            setIsAnimating(false);
        });
    
        menuRef.current?.addEventListener("animationend", () => {
            setIsAnimating(false);
        } )
    
    
    }, [])
    

    return(
    <div>
        <div onClick={() => {setIsOpened(!isOpened); setIsAnimating(true);} } className="riseup-menu-button" > 
            <CiBookmark size={"25px"}/> 
        </div>
        {isOpened || isAnimating ? 
        <div className={`riseup-menu-content ${isOpened ? "rise-up open" : "fall-down"}`} ref={menuRef}>
            <div className="riseup-menu-items">
              <input type="text" placeholder="Search..." className="search-input" />
              <button className="search-button">Search</button>
            </div>
        </div>
        : null
        }


    </div>
    )
}

export default HeaderSearch;