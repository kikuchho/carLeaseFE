import { useEffect, useRef, useState } from "react";
import "../styles/dropdown.css"; 
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

const Dropdown = () => { 
const [isOpen, setIsOpen] = useState(false);


    return(
    <>
        <div onClick={() => {setIsOpen(!isOpen); } } className="dropdown-button">
            <div> <GiHamburgerMenu size={"25px"}/>  </div>
        </div>

        <div className={`dropdown-content  ${isOpen ? "open" : ""}`}>  
            <div className="close-button-container"><IoMdClose className="close-button" onClick={() => setIsOpen(!isOpen)}/></div>

            <div className="dropdown-items"  >
                <p>Dropdown Item 1</p>
                <p>Dropdown Item 2</p>
            </div>
            
        </div>

        


    </>
    )
}

export default Dropdown;