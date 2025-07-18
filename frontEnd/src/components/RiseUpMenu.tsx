import { useEffect, useRef, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import "../styles/RiseUpMenu.css";
import api from "../api";


interface Bookmark {
    id: string;
    plan: [];
    contract_year: number;
    carid: number;
}

const RiseUpMenu = () => { 
    const [isOpened, setIsOpened] = useState(false);
    
    //------------state and logic for bookmarks----------------
    const [content, setContent] = useState<string | null>(null);
    const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);



    //get bookmarks function 
    useEffect(() => {
        getBookmarks();
        console.log("bookmarks are " + bookmarks);
    }, []);

    const getBookmarks = async () => { 
        try {
             api
        .get("/api/bookmarks/")
        .then((res) => { 
            const response = res.data;
            console.log("Response data:", response[0]);
            const bookmarkTemp = res.data.map((bookmark: any) => ({
                id: bookmark.id,
                plan: bookmark.plan,
                contract_year: bookmark.contract_year,
                carid: bookmark.carid
            }));
           
            setBookmarks(bookmarkTemp);
            console.log(res.data);
        })
        .catch((err) => { console.log(err); });
        }catch (error) {
            console.error("Error fetching bookmarks:", error);
        }
    
       

        // .then((res) => res.data )
        // .then((data) => setBookmarks(data))   
        // .catch((err) => alert(err));
    }

    const deleteBookmarks = async (id: string) => {
         api
        .get("/api/bookmarks/delete/${id}/")
        .then((res) => { 

            if(res.status === 204) {
                alert("note deleted ")
            }
            else{
                alert("Failed to delete a note ")
            }


         })
        .catch((err) => { console.log(err); });

        getBookmarks(); //refresh the bookmarks after deleting

    }

    const createBookmark = async (e :any) => {
        e.preventDefault();

        api.post("api/bookmarks/", { plan, contract_year, carid}).then((res) => {
            if( res.status === 201) {
                alert("Bookmark created successfully");
               
            }else{
                alert("Failed to create a bookmark");
            }
        }).catch((err) => alert(err)); 

        getBookmarks(); 
    }

    const author = "test1111" 
    const plan = [
            {"plan_id": 1, "name": "Basic", "amount": 500},
            {"plan_id": 2, "name": "Premium", "amount": 1000}
        ]
    const contract_year = 2015 
    const carid = 1 
    //------------end of bookmarks logic----------------


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
                <p> {bookmarks && bookmarks.length > 0 && bookmarks[0].contract_year} </p>
               
                <button onClick={createBookmark} className="riseup-menu-button">Create Bookmark</button>
            </div>
        </div>
        : null
        }


    </div>
    )
}

export default RiseUpMenu;