import { useEffect, useMemo, useRef, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import "../styles/RiseUpMenu.css";
import api from "../api";
import { type SavedBookMark} from "../pages/CarPlan";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { getBookmarks } from "../apihelper/apihelper";
import { images } from "../assets/images";

// [
//     {
//         "id": 1,
//         "name": "ライズ",
//         "price": 4000000,
//         "grade": "X GAS 1.2L 2WD",
//         "imgname": "raize"
//     },
//     {
//         "id": 2,
//         "name": "ヤリス",
//         "price": 3000000,
//         "grade": "X GAS 1.0L 2WD",
//         "imgname": "yaris"
//     },
//     {
//         "id": 3,
//         "name": "ノア",
//         "price": 5000000,
//         "grade": "X GAS 2.0L 2WD",
//         "imgname": "noah"
//     }
// ]

interface carlist {
    id: number;
    name: string;
    price: number;
    grade: string;
    imgname: string;
}

const RiseUpMenu = () => { 
    const [isOpened, setIsOpened] = useState(false);
    const [bookmarks, setBookmarks] = useState<SavedBookMark[] | null>(null);
    const [carlists, setCarlist] = useState<carlist[] | null>(null);
    const navigate = useNavigate();
    
    //------------state and logic for bookmarks----------------
    // const [content, setContent] = useState<string | null>(null);

    const uniqueCarNames = getUniqueCarNames(bookmarks, carlists);

    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    
    // define filtered bookmarks
    const filteredBookmarks = useMemo(() => {
    if (!activeFilter || !bookmarks || !carlists) return bookmarks;
    
    return bookmarks.filter(bookmark => {
        const car = carlists.find(car => car.id === bookmark.carid);
        return car && car.name === activeFilter;
    });
    }, [bookmarks, carlists, activeFilter]);

    



    useEffect(() => {
        let originalY = 0;
    
    if (isOpened) {
        originalY = window.scrollY;
        document.body.dataset.scrollLock = originalY.toString();
        document.body.style.overflow = 'hidden'; // Disable scrolling
        document.body.style.position = 'fixed';
        document.body.style.top = `-${originalY}px`;
    } else {
        // unlock
        const prevY = parseInt(document.body.dataset.scrollLock || '0', 10);
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.dataset.scrollLock = '';
        window.scrollTo(0, prevY);
    }
    
    // This cleanup function runs when:
    // 1. Component unmounts
    // 2. Before effect runs again with changed dependencies
    return () => {
        // Always restore normal body behavior when unmounting
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        
        // If we had scrollLock data, restore the scroll position
        if (document.body.dataset.scrollLock) {
            const prevY = parseInt(document.body.dataset.scrollLock, 10);
            document.body.dataset.scrollLock = '';
            window.scrollTo(0, prevY);
        }
    };
    }, [isOpened]);

    console.log("bookmarks are ", bookmarks);


    //get bookmarks and carlists
    useEffect(() => {
       
        

        const fetchBookmarks = async () => {
            // const data = await getBookmarks();
            // setBookmarks(data);

            const caridsTemp : number[] = [];

            //get bookmarks 
            getBookmarks().then((data) => {
                const savedbookmarktemp : SavedBookMark[] = [];
                data.map((bookmark: SavedBookMark) => {
                    console.log("Bookmark carid: ", bookmark.imgname);
                    savedbookmarktemp.push(bookmark);
                    caridsTemp.push(bookmark.carid); 
                });
                setBookmarks(savedbookmarktemp);
                console.log("bookmarks are " + caridsTemp);
                console.log("Fetched bookmarks price!!!!!!!!!:", savedbookmarktemp[0].totalprice);
                


            }).catch((error) => {
                
                console.error("Error fetching bookmarks:", error);
            })

            
            
        };
        fetchBookmarks();

        fetchCarList();

    }, []);

   



    const fetchCarList = async () => {
       
        api.get("/api/cars/").then((res) => {
            const response = res.data;
            const carlisttemp: carlist[] = response.map((car: any) => ({
                id: car.id,
                name: car.name,
                price: car.price,
                grade: car.grade,
                imgname: car.imgname
            }));
            setCarlist(carlisttemp);
            console.log("!!!!!!!!Car list fetched successfully!!!!!!!:", carlisttemp);
        }).catch((err) => { 
            console.log("Error fetching car list: ", err);
        });
    }

   
    

    // Extract fetchBookmarks as a named function so you can reuse it
    const fetchBookmarks = async () => {
        try {
            const data = await getBookmarks();
            const savedbookmarktemp: SavedBookMark[] = [];
            data.forEach((bookmark: SavedBookMark) => {
                savedbookmarktemp.push(bookmark);
            });
            console.log("Fetched bookmarks!!!!!!!!!:", savedbookmarktemp);
            setBookmarks(savedbookmarktemp);
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
        }
    };

    


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

                <div style={{paddingTop:"10px",display: "flex", justifyContent: "end", alignItems: "center"}}> 
                    <div className="riseup-close-button">
                        <IoMdClose  onClick={() => {
                            setIsOpened(false);
                            setIsAnimating(true);
                        }} size={"35px"}/>
                    </div>
                </div>
                

                <div className="riseup-bookmark-header" > 
                    <h4>ブックマーク</h4>
                    <div style={{paddingBottom: "20px", paddingTop: "20px"}}>

                        見積りの保存期間は約12ヵ月です。経過後は自動的に削除されます。
                    </div>
                </div>
                
                <div style={{display: "flex", fontWeight: "bold", fontSize: " 18px ", paddingBottom: "40px", paddingTop: "20px"}}>
                    <div 
                    style={{ paddingRight: "10px"}}
                    onClick={() => setActiveFilter(null)}
                    >
                        すべて
                    </div>
                    <div >
                        {
                            uniqueCarNames.map(carName => ( 

                                <button
                                key={carName}
                                className={`car-filter-button ${activeFilter === carName ? 'active' : ''}`}
                                
                                >
                                {carName}
                                </button>
                              ))
                        }
                    </div>
                </div>


                

                <h4 style={{paddingBottom: "20px"}}>
                    お気に入りにした車種
                </h4>
                
                <div className="riseup-bookmark-top-container">
                    <div style={{padding: "40px"}}>
                        <h4 style={{paddingBottom: "20px"}}>気になったクルマをブックマークできる</h4>
                        <div style={{fontSize: "18px"}}>ブックマーク登録しておけば、いつでもすぐ見返すことができます。</div>
                        <div className="riseup-bookmark-top-container-button">お気に入りのクルマを探す</div>
                    </div>
                    <div style={{width: "400px", paddingRight: "20px"}}>
                        
                        <img src={images["bookcaricon"]} alt="bookmarkcar" />
                    </div>
                </div>

                <h4 style={{paddingTop: "50px", paddingBottom: "20px", fontWeight: "bold"}}>
                    保存した見積り
                </h4>
                

                {
                    filteredBookmarks && filteredBookmarks.length > 0 ? 
                    filteredBookmarks.map((bookmark: SavedBookMark) => (
                        <div key={bookmark.id} className="riseup-bookmark-item">
                             <div style={{paddingTop:"10px",display: "flex", justifyContent: "end", alignItems: "center"}}> 
                                <div className="riseup-close-button">
                                    <IoMdClose  onClick={() => {
                                        deleteBookmarks(bookmark.id);
                                    }} size={"20px"}/>
                                </div>
                            </div>
                            <div> {formatDate(bookmark.created_at)} </div>
                            <div style={{fontWeight: "bold"}}> メーカー参考価格 </div>
                            <div className="riseup-bookmark-item-img-container"> 
                                <img src={images[`${ bookmark.imgname  }`]} alt="Car" className="riseup-bookmark-image" />
                            </div>
                            <div> {  } </div>
                            <p> 
                                {carlists?.map((car) => {
                                if(car.id === bookmark.carid){
                                    return car.name;
                                }})
                                }
                            </p>

                            <div className="riseup-priceinfo-wrapper">
                                <div style={{fontWeight: "bold", fontSize: "16px", display: "flex", alignItems: "baseline"}}> <div>車両本体価格</div> </div>  

                                <div style={{fontWeight: "bold", fontSize: "16px", display: "flex", alignItems: "baseline", justifyContent: "end"}}>
                                    {carlists?.map((car) => {
                                        if(car.id === bookmark.carid){
                                            return <div style={{fontSize: "29px", fontWeight: "bold", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "0px"}}> {car.price.toLocaleString() } </div>;
                                        }})
                                    } 円 
                                </div>
                                
                    
                                <p style={{fontWeight: "bold", fontSize: "16px", display: "flex", alignItems: "baseline" }}
                                >オプション価格 </p>
                                <div style={{fontWeight: "bold", fontSize: "16px", display: "flex", alignItems: "baseline", justifyContent: "end"}}> 
                                    <div style={{fontSize: "29px", fontWeight: "bold", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "20px"}}> {bookmark.totalprice} </div> 円 
                                </div>
                                
                            </div>
                           
                            <p>
                                お支払い方法：現金一括払い
                            </p>
                            <button onClick={() =>navigate(`/carplan?carId=${bookmark.carid}&bookmark=${bookmark.id}`) } className="riseup-menu-button">この料金見積りをする</button>
                            <button className="riseup-bookmark-item-testdrive" style={{width:"90%", height: "50px", margin: "20px"}}>試乗予約する</button>
                        </div>

                        
                    )) 
                    : 
                    <div className="riseup-bookmark-top-container">
                        <div style={{padding: "40px"}}>
                            <h4 style={{paddingBottom: "20px"}}>クルマの見積りを保存</h4>
                            <div style={{fontSize: "18px"}}>クルマの見積りを簡単ステップでシミュレーションし、販売店に見積りを送付して相談することができます。</div>
                            <div className="riseup-bookmark-top-container-button">見積りシミュレーションをする</div>
                        </div>
                        <div style={{width: "400px", paddingRight: "20px"}}>
                            
                            <img src={images["simulationicon"]} alt="simulationicon" />
                        </div>
                    </div>
                } 
               
               
               
            </div>
        </div>
        : null
        }


    </div>
    )
}

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  
  // Get components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  // Get day of week in Japanese
  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
  const dayOfWeek = daysOfWeek[date.getDay()];
  
  // Create formatted string
  return `${year}/${month}/${day} (${dayOfWeek}) ${hours}:${minutes}`;
};

export default RiseUpMenu;


const getUniqueCarNames = (bookmarks: SavedBookMark[] | null, carlists: carlist[] | null): string[] => {

    if (!bookmarks || !carlists) return [];

    // Create a Set to automatically handle uniqueness
    // Using a Set to store unique car names 
    const uniqueCarNames = new Set<string>();

    bookmarks.forEach(bookmark => {
        const car = carlists.find(car => car.id === bookmark.carid);
        if (car) {
            uniqueCarNames.add(car.name);
        }
    })

    // Convert Set back to an array
    return Array.from(uniqueCarNames);
}





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



    // <div style={{display: "flex", fontWeight: "bold", fontSize: " 18px ", paddingBottom: "40px", paddingTop: "20px"}}>
    //                 <div style={{ paddingRight: "10px"}}>
    //                     すべて
    //                 </div>
    //                 <div >
    //                     カローラ スポーツ
    //                 </div>
    //             </div>
                

    //             <h4 style={{paddingBottom: "20px"}}>
    //                 お気に入りにした車種
    //             </h4>
                
    //             <div className="riseup-bookmark-top-container">
    //                 <div style={{padding: "40px"}}>
    //                     <h4 style={{paddingBottom: "20px"}}>気になったクルマをブックマークできる</h4>
    //                     <div style={{fontSize: "18px"}}>ブックマーク登録しておけば、いつでもすぐ見返すことができます。</div>
    //                     <div className="riseup-bookmark-top-container-button">お気に入りのクルマを探す</div>
    //                 </div>
    //                 <div style={{width: "400px", paddingRight: "20px"}}>
                        
    //                     <img src={images["bookcaricon"]} alt="bookmarkcar" />
    //                 </div>
    //             </div>

    //             <h4 style={{paddingTop: "50px", paddingBottom: "20px", fontWeight: "bold"}}>
    //                 保存した見積り
    //             </h4>
                

    //             {
    //                 bookmarks && bookmarks.length > 0 ? 
    //                 bookmarks.map((bookmark: SavedBookMark) => (
    //                     <div key={bookmark.id} className="riseup-bookmark-item">
    //                          <div style={{paddingTop:"10px",display: "flex", justifyContent: "end", alignItems: "center"}}> 
    //                             <div className="riseup-close-button">
    //                                 <IoMdClose  onClick={() => {
    //                                     deleteBookmarks(bookmark.id);
    //                                 }} size={"20px"}/>
    //                             </div>
    //                         </div>
    //                         <div> {formatDate(bookmark.created_at)} </div>
    //                         <div style={{fontWeight: "bold"}}> メーカー参考価格 </div>
    //                         <div className="riseup-bookmark-item-img-container"> 
    //                             <img src={images[`${ bookmark.imgname  }`]} alt="Car" className="riseup-bookmark-image" />
    //                         </div>
    //                         <div> {  } </div>
    //                         <p> 
    //                             {carlists?.map((car) => {
    //                             if(car.id === bookmark.carid){
    //                                 return car.name;
    //                             }})
    //                             }
    //                         </p>
    //                         <p style={{fontWeight: "bold", fontSize: "16px", display: "flex", alignItems: "baseline"}}>車両本体価格   {carlists?.map((car) => {
    //                             if(car.id === bookmark.carid){
    //                                 return <div style={{fontSize: "29px", fontWeight: "bold", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "20px"}}> {car.price.toLocaleString() } </div>;
    //                             }})
    //                             } 円 </p>
    //                         {/* <p>Plan: {bookmark.plan.map((p: any) => p.name).join(", ")}</p> */}
    //                         <p>bonus payment Plan: {bookmark.totalprice}  </p>
    //                         <button onClick={() =>navigate(`/carplan?carId=${bookmark.carid}&bookmark=${bookmark.id}`) } className="riseup-menu-button">この料金見積りをする</button>
    //                         <button className="riseup-bookmark-item-testdrive" style={{width:"90%", height: "50px", margin: "20px"}}>試乗予約する</button>
    //                     </div>




    //  <div>
    //                             <p style={{fontWeight: "bold", fontSize: "16px", display: "flex", alignItems: "baseline"}}>車両本体価格   
    //                                 {carlists?.map((car) => {
    //                                     if(car.id === bookmark.carid){
    //                                         return <div style={{fontSize: "29px", fontWeight: "bold", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "0px"}}> {car.price.toLocaleString() } </div>;
    //                                     }})
    //                                 } 円 
    //                             </p>
    //                             {/* <p>Plan: {bookmark.plan.map((p: any) => p.name).join(", ")}</p> */}
    //                             <p style={{fontWeight: "bold", fontSize: "16px", display: "flex", alignItems: "baseline"}}
    //                             >オプション価格: <div style={{fontSize: "29px", fontWeight: "bold", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "20px"}}> {bookmark.totalprice} </div> 円 </p>
    //                         </div>






    
    // const oldgetBookmarks = async () => { 
    
    //     try{

    //             api
    //         .get("/api/bookmarks/")
    //         .then((res) => { 
                
                
    //             const response = res.data;

                
    //             const PlanTemp: Plan[] = response.map((bookmark: any) => ({
    //                 plan_id: bookmark.plan[0].plan_id,
    //                 contractYear: bookmark.plan[0].contractYear,
    //                 bonusPayment: bookmark.plan[0].bonusPayment
    //             }));

    //             const bookmarktemp: SavedBookMark[] = response.map((bookmark: any) => ({
    //                 id: bookmark.id,
    //                 author: bookmark.author,
    //                 carid: bookmark.carid,
    //                 color_id: bookmark.color_id,
    //                 contract_year: bookmark.contract_year,
    //                 created_at: bookmark.created_at,
    //                 grade_id: bookmark.grade_id,
    //                 imgname: bookmark.imgname,
    //                 interior_exterior_upgrade_id: bookmark.interior_exterior_upgrade_id,
    //                 interior_id: bookmark.interior_id,
    //                 numberplate_number: bookmark.numberplate_number,
    //                 option_package_id: bookmark.option_package_id,
    //                 option_package_listitems: bookmark.option_package_listitems,
    //                 plan: PlanTemp,
    //                 tire_upgrade_id: bookmark.tire_upgrade_id,
    //                 updated_at: bookmark.updated_at
    //             }));

    //             console.log("bookmark response are " , res.data);

    //             setBookmarks(bookmarktemp);
    //         })
    //         .catch((err) => { console.log(err); });




    //     }catch (error) {
    //         console.log("Error fetching bookmarks: ", error);
    //     }
        
    //     // .then((res) => res.data )
    //     // .then((data) => setBookmarks(data))   
    //     // .catch((err) => alert(err));
    // }
    