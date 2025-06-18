import { useEffect, useRef, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import "../styles/RiseUpMenu.css";

const RiseUpMenu = () => { 
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
                <p>Rise Up Item 1</p>
                <p>Rise Up Item 2</p>
                <p>Rise Up Item 3</p>
            </div>
        </div>
        : null
        }


    </div>
    )
}

export default RiseUpMenu;