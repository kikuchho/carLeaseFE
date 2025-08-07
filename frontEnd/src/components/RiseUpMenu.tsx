import { useEffect, useRef, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import "../styles/RiseUpMenu.css";
import api from "../api";
import type { SavedBookMark, Plan } from "../pages/CarPlan";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { getBookmark, getBookmarks } from "../apihelper/apihelper";
import { images } from "../assets/images";

const RiseUpMenu = () => { 
    const [isOpened, setIsOpened] = useState(false);
    const [bookmarks, setBookmarks] = useState<SavedBookMark[] | null>(null);
    const navigate = useNavigate();
    
    //------------state and logic for bookmarks----------------
    const [content, setContent] = useState<string | null>(null);
    

    useEffect(() => {
        if (isOpened) {
           document.body.style.overflow = 'hidden'; // Disable scrolling
        }
        else {
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    }, [isOpened]);


    //get bookmarks function 
    useEffect(() => {
        const fetchBookmarks = async () => {
            // const data = await getBookmarks();
            // setBookmarks(data);

            getBookmarks().then((data) => {
                const savedbookmarktemp : SavedBookMark[] = [];
                data.map((bookmark: SavedBookMark) => {
                    console.log("Bookmark carid: ", bookmark.imgname);
                    savedbookmarktemp.push(bookmark);
                        
                });
                setBookmarks(savedbookmarktemp);
                console.log("bookmarks are " + data[0]?.carid);
            }).catch((error) => {
                
                console.error("Error fetching bookmarks:", error);
            })
            
        };
        fetchBookmarks();
    }, []);

    // Extract fetchBookmarks as a named function so you can reuse it
    const fetchBookmarks = async () => {
        try {
            const data = await getBookmarks();
            const savedbookmarktemp: SavedBookMark[] = [];
            data.forEach((bookmark: SavedBookMark) => {
                savedbookmarktemp.push(bookmark);
            });
            setBookmarks(savedbookmarktemp);
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
        }
    };

    

    const oldgetBookmarks = async () => { 
    
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
                fetchBookmarks();
            }
            else{
                alert("Failed to delete a note ")
            }


         })
        .catch((err) => { console.log(err); });

         //refresh the bookmarks after deleting

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
    <div className="riseup-menu-container">
        <div onClick={() => {setIsOpened(!isOpened); setIsAnimating(true);} } className="riseup-menu-button" > 
            <CiBookmark size={"25px"}/> 
        </div>
        {isOpened || isAnimating ? 
        <div className={`riseup-menu-content ${isOpened ? "rise-up open" : "fall-down"}`} ref={menuRef}>
            <div className="riseup-menu-items">

                <div style={{paddingTop:"30px",display: "flex", justifyContent: "end", alignItems: "center"}}> 
                    <div className="riseup-close-button">
                        <IoMdClose  onClick={() => {
                            setIsOpened(false);
                            setIsAnimating(true);
                        }} size={"35px"}/>
                    </div>
                </div>
                

                <div> 
                    <h4>ブックマーク</h4>
                    <div>

                        見積りの保存期間は約12ヵ月です。経過後は自動的に削除されます。
                    </div>
                </div>
                
                <div style={{display: "flex"}}>
                    <div>
                        すべて
                    </div>
                    <div>
                        カローラ スポーツ
                    </div>
                </div>
                

                <div>
                    お気に入りにした車種
                </div>
                
                <div className="riseup-bookmark-top-container">
                    <div>
                        <div>気になったクルマをブックマークできる</div>
                        <div>ブックマーク登録しておけば、いつでもすぐ見返すことができます。</div>
                        <div>お気に入りのクルマを探す</div>
                    </div>
                    <div>
                        <img/>
                    </div>
                </div>

                <div>
                    保存した見積り
                </div>
                

                {
                    bookmarks && bookmarks.length > 0 ? 
                    bookmarks.map((bookmark: SavedBookMark) => (
                        <div key={bookmark.id} className="riseup-bookmark-item">
                            <div> 
                                <img src={images[`${ bookmark.imgname  }`]} alt="Car" className="riseup-bookmark-image" />
                            </div>
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