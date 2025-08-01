import { useEffect, useRef, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import "../styles/RiseUpMenu.css";
import api from "../api";
import type { SavedBookMark, Plan } from "../pages/CarPlan";
import { useNavigate } from "react-router-dom";

const RiseUpMenu = () => { 
    const [isOpened, setIsOpened] = useState(false);

    const navigate = useNavigate();
    
    //------------state and logic for bookmarks----------------
    const [content, setContent] = useState<string | null>(null);
    const [bookmarks, setBookmarks] = useState<SavedBookMark[] | null>(null);



    //get bookmarks function 
    useEffect(() => {
        getBookmarks();
        console.log("bookmarks are " + bookmarks);
    }, []);

    

    const getBookmarks = async () => { 
    
        try{

                api
            .get("/api/bookmarks/")
            .then((res) => { 
                
                
                const response = res.data;

                
                const PlanTemp: Plan[] = response.map((bookmark: any) => ({
                    plan_id: bookmark.plan[0].plan_id,
                    contractYear: bookmark.plan[0].contractYear,
                    bonusPayment: bookmark.plan[0].bonusPayment
                }));

                const bookmarktemp: SavedBookMark[] = response.map((bookmark: any) => ({
                    id: bookmark.id,
                    author: bookmark.author,
                    carid: bookmark.carid,
                    color_id: bookmark.color_id,
                    contract_year: bookmark.contract_year,
                    created_at: bookmark.created_at,
                    grade_id: bookmark.grade_id,
                    imgname: bookmark.imgname,
                    interior_exterior_upgrade_id: bookmark.interior_exterior_upgrade_id,
                    interior_id: bookmark.interior_id,
                    numberplate_number: bookmark.numberplate_number,
                    option_package_id: bookmark.option_package_id,
                    option_package_listitems: bookmark.option_package_listitems,
                    plan: PlanTemp,
                    tire_upgrade_id: bookmark.tire_upgrade_id,
                    updated_at: bookmark.updated_at
                }));

                console.log("bookmark response are " , res.data);

                setBookmarks(bookmarktemp);
            })
            .catch((err) => { console.log(err); });




        }catch (error) {
            console.log("Error fetching bookmarks: ", error);
        }
        
        // .then((res) => res.data )
        // .then((data) => setBookmarks(data))   
        // .catch((err) => alert(err));
    }
    

    const deleteBookmarks = async (id: number) => {
         api
        .delete(`/api/bookmarks/delete/${id}/`)
        .then((res) => { 

            if(res.status === 204) {
                alert(`note id = ${id} deleted `)
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
                {
                    bookmarks && bookmarks.length > 0 ? 
                    bookmarks.map((bookmark: SavedBookMark) => (
                        <div key={bookmark.id} className="riseup-bookmark-item">
                            <p>Car ID: {bookmark.carid}</p>
                            <p>color id: {bookmark.color_id}</p>
                            {/* <p>Plan: {bookmark.plan.map((p: any) => p.name).join(", ")}</p> */}
                            <p>bonus payment Plan: {bookmark.plan[0].bonusPayment}  </p>
                            <button onClick={() =>navigate(`/carplan?carId=${bookmark.carid}&bookmark=${bookmark.id}`) } className="riseup-menu-button">この料金見積りをする</button>
                            <button onClick={() => deleteBookmarks(bookmark.id)} className="riseup-menu-button">Delete Bookmark</button>
                        </div>





                        
                    )) 
                    : <p>No bookmarks available</p>
                } 
               
               
                <button onClick={createBookmark} className="riseup-menu-button">Create Bookmark</button>
            </div>
        </div>
        : null
        }


    </div>
    )
}

export default RiseUpMenu;






// const getBookmarks = async () => { 
    //     try {
    //          api
    //     .get("/api/bookmarks/")
    //     .then((res) => { 
    //         const response = res.data;
    //         console.log("Response data:", response[0]);
    //         const bookmarkTemp = res.data.map((bookmark: any) => ({
    //             id: bookmark.id,
    //             plan: bookmark.plan,
    //             contract_year: bookmark.contract_year,
    //             carid: bookmark.carid
    //         }));
           
    //         setBookmarks(bookmarkTemp);
    //         console.log(res.data);
    //     })
    //     .catch((err) => { console.log(err); });
    //     }catch (error) {
    //         console.error("Error fetching bookmarks:", error);
    //     }
    
       

    //     // .then((res) => res.data )
    //     // .then((data) => setBookmarks(data))   
    //     // .catch((err) => alert(err));
    // }