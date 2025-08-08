import { useEffect, useState } from "react";
import ProtetecdRoute from "../components/ProtectedRoutes";
import api from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/CarPlan.css";
import CarPlanHeader from "../components/carPlan/CarPlanHeader";
import { images } from "../assets/images";
import FixedFooterCarPay from "../components/carPlan/FixedFooterCarPay";
import { FaCheck } from "react-icons/fa6";
import GradeList from "../components/carPlan/gradelist";
import FreeUpFrontFee from "../components/carPlan/FreeUpFrontFee";


// REMINDER ! 
//1 TTHIS PAGE IS WRAPPED IN PROTECTED ROUTE COMPONENT
// SO IT CAN ONLY BE ACCESSED BY AUTHORIZED USERS
//AND WHEN USER IS NOT AUTHORIZED, IT WILL REDIRECT TO PATH "CARPLANLOGGEDOUT"
//YOU CAN SET YOUR OWN PATH IN PROTECTED ROUTE COMPONENT , BY DEFAULT IT IS "/login"
//THE PROTECTED ROUTE IS WRAPPING THE RETURN STATMENT IN HERE 
//2  : NAME IN MODELS SUCH AS GRADELISt AND COLOR ARE USSED TO IDENTIFY THE IMAGE PATHS 
// OR TO SIGNIFY THAT IT IS ONLY AVAILABLE FOR CERTAIN GRADE OF THE CAR 
//3 : FOR COLOR IN JSON DATA, IF SUBNAME IS NONE , THEN THE SUBNAME WILL NOT BE SHOWN 
//4 : css class "optionselected" is being used in other component even though it is defined in the carplan.css
 
interface gradelist
{
    id: number;
    grade: string;
    gasType: string;
    wheelDrive: string;
    name: string;    //name will be used to idnetify image path car appearense change based on the  grade  
    car_id: number;
    price: number; 
}

interface colors
{
    id: number;
    color: string;
    color_hex: string;
    subname: string;
    name: string;
    car_id: number;
    price: number;
}

interface interiors
{
    id: number;
    interior: string;
    interiorcolor: string;
    seat: string;
    imgname: string;
    name: string;
    car_id: number;
    price: number;
}

interface option_packages
{
    id: number;
    optionpackage: string;
    name: string;
    title: string;
    subtitle: string[];
    listItems: {
        id: number;
        item: string;
        price: number;
        url: string;
    }[];
    comment: string;
    car_id: number;
    price: number;
}


interface interiorExteriorUpgrade
{
    id: number;
    Interior_exterior_upgrade: string;
    imgurl: string;
    is_exterior: boolean;
    name: string;
    car_id: number;
    price: number;
}

interface tireUpgrade 
{
    id: number;
    Tire_upgrade: string;
    name: string;
    title: string;
    description: string;
    car_id: number;
    price: number;
}

interface numberPlate 
{
    id: number;
    title: string;
    imgurl: string;
    numberplate: string;
    car_id: number;
    price: number;
}




export interface CarOption 
{    
    id: number;  
    name: string; 
    price: number;
    imgname: string;
    grades:gradelist[];
    colors: colors[];
    interiors: interiors[];
    option_packages: option_packages[];
    interior_exterior_upgrades: interiorExteriorUpgrade[];
    tire_upgrades: tireUpgrade[];
    numberplates: numberPlate[];
}

export interface Plan
{
    plan_id: number;
    contractTermLength: string;
    bonusPayment: string;
}

export interface SavedBookMark 
{
    id: number;
    author: number;
    carid: number;
    isupFrontFee: boolean; // true for initial fee free plan, false for cancellation fee free plan
    color_id: number;
    contract_year: number;
    created_at: string;
    grade_id: number;
    imgname: string;
    interior_exterior_upgrade_ids: number[];
    interior_id: number;
    numberplate_number: string;
    option_package_id: number;
    option_package_listitems: option_packages;
    plan: Plan[];
    tire_upgrade_ids: number[];
    totalprice: number;
    updated_at: string;
}





const CarPlan = ({isAuthorized}: {isAuthorized: boolean}) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const carId = searchParams.get("carId");
    const bookmarkId = searchParams.get("bookmark");



    const [imagePath, setImagePath] = useState<string>("");
    const [optionpackageImagePath, setOptionPackageImagePath] = useState<string>("no_image_option");
    const [content, setContent] = useState<string | null>(null);
    //bookmark contain a one bookmark object that is fetched from getCarOptionDetail, null if the user came from cardslider component 
    // should not be empty if the user came from RiseUpMenu component
    const [bookmark, setBookmark] = useState<SavedBookMark| null>(null);
    const [carOptions, setCarOptions] = useState<CarOption | null>(null);
    const [firstRender, setFirstRender] = useState<boolean>(true);
    const [isOptionDetailClicked, setIsOptionDetailClicked] = useState<boolean>(false);

    const [totalcarprice, setTotalcarPrice] = useState<number>(0);
    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
    const [monthlyPaymentwithoption, setMonthlyPaymentwithOption] = useState<number>(0);
    const [bonusPayment, setBonusPayment] = useState<number>(0); //how much extra money he will pay from his bonus 
    //!!!!!!!!!!!!! contarct term = CONTRACT TERM LENGTH !!!!!!!!!!
    const [contractTerm, setContractTerm] = useState<number>(3); // contract term in years , 3 ,5, or 7
    const [upfrontfee, setUpfrontfee] = useState<number>(0); // upfront fee is calculated based on monthly payment with options * 5.6 , it is used to calculate the monthly payment with options

    //for calcluating monthly payment with options
    const [isUpFrontFee, setIsUpFrontFee] = useState<boolean>(true); // "initial" or "cancellation"
    const [selectedGrade, setSelectedGrade] = useState<gradelist | null>(null);
    const [selectedColor, setSelectedColor] = useState<colors | null>(null);
    const [selectedInterior, setSelectedInterior] = useState<interiors | null>(null);
    const [selectedOptionPackage, setSelectedOptionPackage] = useState<option_packages | null>(null);
    const [selectedOptionPackagelistid, setSelectedOptionPackagelistid] = useState<number >(0); //index of option_package_listitems since index start counting from 0, 
    // listItems: {
    //     id: number;   <- it will be diefferent from this id
    //    ...
    // }[];
    
    // array of id of interiorExteriorUpgrade
    const [selectedInteriorExteriorUpgrade, setSelectedInteriorExteriorUpgrade] = useState<number[] | null>(null);
    const [selectedTireUpgrades, setSelectedTireUpgrades] = useState<number[] | null>(null);
    const [selectedNumberPlates, setSelectedNumberPlates] = useState<numberPlate | null>(null);
    const [numberplateNumber, setNumberplateNumber] = useState<string>("");
    const [numberPlateOptionClicked, setNumberPlateOptionClicked] = useState<boolean>(false);

    // useeffect for calculating monthly payment WITH OPTIONS
    useEffect(() => {
        let monthlyPaymentTemp = 0
    if (carOptions) {

    
        
        // Set default selections when car options load
        if (!selectedGrade && carOptions.grades.length > 0) {
        setSelectedGrade(carOptions.grades[0]);
        }
        if (!selectedColor && carOptions.colors.length > 0) {
        setSelectedColor(carOptions.colors[0]);
        }
        if (!selectedInterior && carOptions.interiors.length > 0) {
        setSelectedInterior(carOptions.interiors[0]);
        }
        if(!selectedOptionPackage && carOptions.option_packages.length > 0) {
        setSelectedOptionPackage(carOptions.option_packages[0]);
        }

        console.log("selectedOptionPackagelistitem id is " + selectedOptionPackagelistid);

        //in first render set if bookmark id is not -1 , which mean user came from RiseupMenu component, set the each 
        //value (set select...) to the value from bookmark at line 156 , whose values were fetched from 
        if(firstRender) {
            let foundGradeTemp : any = null;

            // in caroption.imgname contains a car name such as "yaris, raize" and this default name indicate teh default image for each car
            setImagePath(`${carOptions.imgname || ""}`); // Set initial image path based on grade and color



            if( bookmarkId !== "-1" && bookmark?.isupFrontFee === false ){
                setIsUpFrontFee(false);
            }

            if(bookmarkId !== "-1" && bookmark?.plan[0]?.bonusPayment){
                const foundBonusPayment = Number(bookmark?.plan[0]?.bonusPayment);
                //console.log("foundBonusPayment is " + foundBonusPayment);
                if (foundBonusPayment) {
                    setBonusPayment(foundBonusPayment);
                }
            }

            if(bookmarkId !== "-1" && bookmark?.plan[0]?.contractTermLength){
                const foundContractTerm = Number(bookmark?.plan[0]?.contractTermLength);
                //console.log("foundContractTerm is " + foundContractTerm);
                if (foundContractTerm) {
                    setContractTerm(foundContractTerm);
                }
            }

            if(bookmarkId !== "-1" && bookmark?.grade_id){
                const foundGrade = carOptions.grades.find(grade => grade.id === bookmark.grade_id);
                foundGradeTemp = foundGrade; // Store the found grade temporarily
                if (foundGrade) {
                    setSelectedGrade(foundGrade);
                    setImagePath(foundGrade.name || "");
                }
            }

            if(bookmarkId !== "-1" && bookmark?.color_id){
                const foundColor = carOptions.colors.find(color => color.id === bookmark.color_id);
                if (foundColor) {
                    setSelectedColor(foundColor);
                    setImagePath(`${foundGradeTemp?.name}_${foundColor.name}`|| ""); 
                }
            }

            if(bookmarkId !== "-1" && bookmark?.interior_id){
                const foundInterior = carOptions.interiors.find(interior => interior.id === bookmark.interior_id);
                if (foundInterior) {
                    setSelectedInterior(foundInterior);
                }
            }

            if(bookmarkId !== "-1" && bookmark?.option_package_listitems.id){
                
                
                //step 1 : set the  SelectedOptionPackage to indetify which optionpackage user has selected previosuly 
                const bookmarkedOptionPackage = carOptions.option_packages.find(option => option.id === bookmark.option_package_id)
                console.log("!!!!!!!!!!!!!!!!!!foundOptionPackage id, listitems id " + bookmark.option_package_listitems.id + " , " + bookmark.option_package_id);
                //step 2 : set the SelectedOptionPackagelistid to indetify which listitem user has selected previosuly 
                const bookmarkedlisteditem1 = bookmarkedOptionPackage?.listItems.find(item => item.id === bookmark.option_package_listitems.id); 
                console.log("!!!!!!!!!!!!!!!!!!bookmarkedlisteditem1  id, price " + bookmarkedlisteditem1?.id + " , " + bookmarkedlisteditem1?.price);

                //step 3 : set those values in state
                if(bookmarkedOptionPackage){
                    setSelectedOptionPackage(bookmarkedOptionPackage);
                    setSelectedOptionPackagelistid(bookmarkedlisteditem1?.id || 0); 
                    console.log("!!!!!!!!!!!!!!!!!!SelectedOptionPackage SelectedOptionPackagelistid set ");
                }
               
                
            }

            if(bookmarkId !== "-1" && bookmark?.interior_exterior_upgrade_ids && bookmark.interior_exterior_upgrade_ids.length > 0){


                 // Filter out all interior/exterior upgrades that match IDs in the bookmark array
                const matchingUpgradeIds = carOptions.interior_exterior_upgrades
                    .filter(upgrade => bookmark.interior_exterior_upgrade_ids.includes(upgrade.id))
                    .map(upgrade => upgrade.id);

                
                    if (matchingUpgradeIds.length > 0) {
                        setSelectedInteriorExteriorUpgrade(matchingUpgradeIds);
                    }
            }

            if(bookmarkId !== "-1" && bookmark?.tire_upgrade_ids && bookmark.tire_upgrade_ids.length > 0){
                 // Filter out all interior/exterior upgrades that match IDs in the bookmark array
                const matchingTireIds = carOptions.tire_upgrades
                    .filter(tire => bookmark.tire_upgrade_ids.includes(tire.id))
                    .map(tire => tire.id);

                
                    if (matchingTireIds.length > 0) {
                        setSelectedTireUpgrades(matchingTireIds);
                    }
            }


            if(bookmarkId !== "-1" && bookmark?.numberplate_number){
                setNumberplateNumber(bookmark.numberplate_number);
            }
            //this is to prevent the asyncrnous issue where it dosen't use the appropriate issue (concurrent issue)
            const contractTermttemp = Number(bookmark?.plan[0]?.contractTermLength) || 3; 
            const bonusPaymentTemp = Number(bookmark?.plan[0]?.bonusPayment) || 0;

            monthlyPaymentTemp = calculateMonthlyPayment(carOptions.price, bonusPaymentTemp, contractTermttemp);
            

            setFirstRender(false);
        }else{
            monthlyPaymentTemp = calculateMonthlyPayment(carOptions.price, bonusPayment, contractTerm);
        }
       setMonthlyPayment(monthlyPaymentTemp);
        
        
        // Calculate total price with options
        let totalPrice = monthlyPaymentTemp;
        
        // Add selected options prices
        if (selectedGrade) totalPrice += selectedGrade.price;
        if (selectedColor) totalPrice += selectedColor.price;
        if (selectedInterior) totalPrice += selectedInterior.price;

        if (selectedOptionPackage) totalPrice += selectedOptionPackage.price || 0; 


        //step 1 : find the optionpackage user  clicked when adding to bookmark, 
        //         the bookmarkedOptionPackage contain one option_package object , carOptions.option_packages is an array 
        const bookmarkedOptionPackage = carOptions.option_packages.find(option => option.id === selectedOptionPackage?.id);
        //step 2 : next, in optionpakage, it contins a array called lisitems , we will find the one item that was clicked by user
        const bookmarkedlisteditem = bookmarkedOptionPackage?.listItems.find(item => item.id === selectedOptionPackagelistid);
        if (selectedOptionPackage) totalPrice += bookmarkedlisteditem?.price || 0  
       
        if (selectedInteriorExteriorUpgrade){
            totalPrice += selectedInteriorExteriorUpgrade.reduce((sum, upgradeId) => {
                const upgrade = carOptions.interior_exterior_upgrades.find(u => u.id === upgradeId);
                return sum + (upgrade ? upgrade.price : 0);
            }, 0);
        } 
        if (selectedTireUpgrades){
            totalPrice += selectedTireUpgrades.reduce((sum, tireId) => {
                const tire = carOptions.tire_upgrades.find(t => t.id === tireId);
                return sum + (tire ? tire.price : 0);
            }, 0);
        }
        if (selectedNumberPlates){
            totalPrice += selectedNumberPlates.price;
        } 

        // Calculate payments
        //const basePayment = calculateMonthlyPayment(carOptions.price, bonusPayment, contractTerm);
        const optionPayment = totalPrice;

        setTotalcarPrice(totalPrice);
        
        console.log(" selectedoptionpackage price " + selectedOptionPackage?.listItems.find(item => item.id === selectedOptionPackagelistid)?.price);
        console.log("optionPayment is " + optionPayment, "selectedGrade/color/interior.price " + selectedGrade?.price, selectedColor?.price, selectedInterior?.price );
       
        //setMonthlyPayment(basePayment);
        setMonthlyPaymentwithOption(optionPayment);
        // Calculate upfront fee
        const upFrontFeeTemp = calculateUpFrontFee(optionPayment);
        setUpfrontfee(upFrontFeeTemp);
    }
    }, [contractTerm, bonusPayment,carOptions, selectedGrade, selectedColor, selectedInterior, bonusPayment, contractTerm, selectedOptionPackage, selectedOptionPackagelistid, selectedInteriorExteriorUpgrade, selectedTireUpgrades, selectedNumberPlates]);

    //get bookmarks function 
    useEffect(() => {
        // Reset body styles when page loads
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        
        if (document.body.dataset.scrollLock) {
            document.body.dataset.scrollLock = '';
        }


        getBookmark();
            //getCarOptionDetail();

            // Call the function and update state with the result
            const fetchCarOptions = async () => {
            const options = await getCarOptionDetail(carId);
            if (options) {
                setCarOptions(options);
            }
        };
        
        fetchCarOptions();
            console.log("carId is " + carId);
            console.log("carOptions is " + carOptions);
    }, []);


    //update monthly payment when carOptions changes
    // useEffect(() => {
    //     //TODO: 
    //     if (carOptions){

    //         const monthlyPaymentTemp = calculateMonthlyPayment(carOptions.price, bonusPayment, contractTerm);
    //         setMonthlyPayment(monthlyPaymentTemp);
    //     }
        
    // }, [contractTerm, bonusPayment, carOptions]);

    const getBookmark = async () => { 
    

        try{

             api
            .get(`/api/bookmarks/${bookmarkId}/`)
            .then((res) => { 
                
                console.log("getbookmark response are " , res.data);
                const response = res.data;
                

                // Line 261
                const PlanTemp: Plan[] = res.data.plan.map((plan: any) => ({
                    plan_id: plan.plan_id || 0,
                    contractTermLength: plan.contractTermLength || '0',
                    bonusPayment: plan.bonusPayment || '0'
                }));

                const interiorExteriorUpgradeIds : number[] = [] ;

                console.log(response.interior_exterior_upgrade_ids + " !!!!!!!!!!!!is response.interior_exterior_upgrade_id");

                const bookmarktemp: SavedBookMark = {
                    id: response.id,
                    author: response.author,
                    carid: response.carid,
                    isupFrontFee: response.is_upFrontFee, // true for initial fee free plan, false for cancellation fee free plan
                    color_id: response.color_id,
                    contract_year: response.contract_year,
                    created_at: response.created_at,
                    grade_id: response.grade_id,
                    imgname: response.imgname,
                    interior_exterior_upgrade_ids: response.interior_exterior_upgrade_ids,
                    interior_id: response.interior_id,
                    numberplate_number: response.numberplate_number,
                    option_package_id: response.option_package_id,
                    option_package_listitems: response.option_package_listitems,
                    plan: PlanTemp,
                    tire_upgrade_ids: response.tire_upgrade_ids,
                    totalprice: response.totalprice,
                    updated_at: response.updated_at,
                    
                };

                setBookmark(bookmarktemp);

                 console.log("savedbookmark response are " , bookmarktemp.totalprice);
            })
            .catch((err) => { console.log(err); });




        }catch (error) {
            console.log("Error fetching bookmark: ", error);
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

        getBookmark(); //refresh the bookmarks after deleting

    }

    const createBookmark = async (e :any) => {
        e.preventDefault();
        
        
        const plan = [
                {"plan_id": 1,  "contractTermLength" : `${contractTerm}`, "bonusPayment": `${bonusPayment}`},
        ]

        if( selectedInteriorExteriorUpgrade && selectedInteriorExteriorUpgrade.length > 0) {
            let selectedInteriorExteriorUpgradeTemp : any = [];
            console.log(selectedInteriorExteriorUpgrade + " is selectedInteriorExteriorUpgrade!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            for (let i = 0; i < selectedInteriorExteriorUpgrade.length; i++) {
               
            }
        }
       
        const contract_year = 2015 
        const carid = carOptions?.id || 0; 
        const imgname = `${selectedGrade?.name}_${selectedColor?.name}` || ""; 
        const is_upFrontFee = isUpFrontFee; // true for initial fee free plan, false for cancellation fee free plan
        const grade_id = selectedGrade?.id || 0;
        const color_id = selectedColor?.id || 0; 
        const interior_id = selectedInterior?.id || 0; 
        //option_package_id is not the id of the option_package_listitems, it is the that hold it
        const option_package_id = selectedOptionPackage?.id || 0; 
        const option_package_listitems = selectedOptionPackage?.listItems.find(item => item.id === selectedOptionPackagelistid) || { id: 1, item: "error", price: 0, url: "error" }; // Ensure option_package_listitems is an object with default values
        const interior_exterior_upgrade_ids = selectedInteriorExteriorUpgrade || []; // Ensure interior_exterior_upgrade_ids is an array, default to empty array if undefined
        const tire_upgrade_ids = selectedTireUpgrades || []; // Ensure tire_upgrade_id is a number, default to 0 if undefined
        const totalprice = totalcarprice || 0;
        
        const numberplate_number = numberplateNumber || ""; // Ensure numberplate_number is a string, default to empty string if undefined
        
        console.log(totalprice + "!!!!!!!!!!!!! is totalprice");

        api.post("api/bookmarks/", { plan, contract_year, carid,imgname, is_upFrontFee, grade_id, color_id, interior_id,option_package_id, option_package_listitems ,interior_exterior_upgrade_ids,tire_upgrade_ids, numberplate_number, totalprice }).then((res) => {
            if( res.status === 201) {
                alert("Bookmark created successfully");
               
            }else{
                alert("Failed to create a bookmark");
            }
        }).catch((err) => alert(err)); 

        getBookmark(); 
    }

    


    return (
        <ProtetecdRoute path="/carplanloggedout">
        <div style={{ height: "3000px"}}>
            <CarPlanHeader />
            {carOptions ? (
            <div className="car-plan-content"> 
                {/* carimage */}
                <div>

                    

                    
                   <div className="car-image-container">
                        <img 
                            className="carimage" 
                            src={images[`${imagePath}`] || images["default"]} 
                            alt={selectedGrade?.grade || "Car Image"} 
                        />
                    </div>


                </div>
                {/* car details */}
                <div>

                    <h2 style={{paddingTop: "100px"}}>見積り</h2>



                    






                        <div>
                            <div className="car-top-title">
                                <h4>{carOptions.name}</h4>
                                <div style={{fontSize: "12px"}}> ※価格は全て税込表示です </div>
                            </div>
                           
                              

                            <h4>プランの選択</h4>
                            <div className="plan-options-container">
                                <div className={`plan-options-container-item ${isUpFrontFee  === true ? "option-selected" : "" }` } 
                                onClick={()=>{setIsUpFrontFee(true)}} 
                                style={{"color": "#00a65e"}}
                                >
                                    <div>初期費用</div>
                                    <div> フリープラン  </div>
                                </div>
                                <div onClick={()=>{  
                                    setIsUpFrontFee(false)
                                    setContractTerm(3)
                                    setBonusPayment(0)
                                    } } 
                                    style={{"color": "#00708d"}}
                                    className={` plan-options-container-item ${isUpFrontFee  === false ? "option-selected" : ""}  `  } >
                                    <div>解約金</div>
                                    <div>  フリープラン </div>
                                </div>
                            </div>


                           {/* ご契約期間　ボーナス月加算額 */}
                            <FreeUpFrontFee
                            contractTerm={contractTerm}
                            setContractTerm={(contractTerm) =>  setContractTerm(contractTerm)}
                            bonusPayment={bonusPayment}
                            setBonusPayment={setBonusPayment}
                            isUpFrontFee={isUpFrontFee}
                            />

                           {/* グレード選択: */}
                            <GradeList 
                            grades={carOptions.grades}
                            selectedGrade={selectedGrade}
                            setSelectedGrade={(grade) => {
                                setSelectedGrade(grade);
                                setImagePath(grade.name || ""); // Set image path based on grade name
                            }}
                            setSelectedColor={(color) => setSelectedColor(color)}
                            isUpFrontFee={isUpFrontFee}
                            monthlyPayment={monthlyPayment}
                            calculateUpFrontFee={calculateUpFrontFee}
                            caroptions={carOptions}
                            />
                            
                           
                            
                            <h3>カラー選択:</h3>
                            <div>


                                <div>  {selectedColor?.color}  </div>
                                <div className="car-color-image-container">  

                                    {carOptions.colors.map((color) => (

                                    <div key={color.id} 
                                       className="color-option-item"
                                        onClick={() => {
                                            setSelectedColor(color)
                                            setImagePath(`${selectedGrade?.name}_${color.name}`|| ""); 
                                        
                                        }}
                                    >
                                        <div>
                                            {
                                                color.subname && color.subname !== "none" ? (
                                                    <div className="color-subname"> {color.subname} </div>
                                                ) : (
                                                    <div className="color-subname-empty"></div>
                                                )
                                            }
                                            
                                            <div className={` outercolorsample ${selectedColor?.id === color.id ? "selected-color" : ""}  ` }  >  <div className="innercolorsample" style={{ backgroundColor: color.color_hex }}> </div>  </div>
                                            <div className="color-price-info"> 
                                               <div>月額 +{color.price} 円  </div>
                                               { !isUpFrontFee   ? <div>申込金 +{calculateUpFrontFee(monthlyPayment, color.price )} 円</div> : <div></div>}
                                            </div>
                                        </div> 
                                    </div>
                                    ))}
                                </div>
                                
                            </div>
                               
                            

                            <h3>インテリアカラー</h3>
                            
                                {carOptions.interiors.length > 0 ? (
                                    carOptions.interiors.map((interior, index) => (
                                        <div key={index}
                                       
                                        >
                                        
                                        <div>
                                            <img className="interior-img" src={images[`${interior.imgname}`] || images["no_image_option"]} alt={interior.interior} />
                                        </div>
                                        <div> 表記凡例 内装色：基調色（差し色）、シート：素材・カラー </div>

                                        <div style={{ display: "flex", flexDirection: "row" , justifyContent: "space-between", alignItems: "center", padding: "10px", marginTop: "30px", marginBottom: "30px"}} 
                                            className={selectedInterior?.id === interior.id ? "option-selected" : ""}
                                            onClick={() => setSelectedInterior(interior)}
                                        >
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div> 内装色 : {interior.interior}    </div>
                                                <div> シート : {interior.seat}   </div>
                                            </div>
                                            
                                            <div style={{ textAlign: "end", width: "150px", height: "auto", display: "flex", flexDirection: "column", justifyContent: "end", fontSize: "13px" }}>
                                                <div>月額＋{interior.price} 円</div>
                                                <div style={{  display: "flex", flexDirection: "row", justifyContent: "flex-end" }}> { !isUpFrontFee   ? <div >申込金＋ {calculateUpFrontFee(monthlyPayment, interior.price )} 円</div> : <div></div>}  </div>
                                            </div>

                                        </div>

                                        
                                            
                                        
                                        </div>
                                    ))
                                ) : (
                                    <li>インテリアカラーはありません。</li>
                                )}
                            

                            <h3>KINTOオプションパッケージ</h3>
                            {
                                carOptions.option_packages.length > 0 ? (
                                    <div>
                                        {carOptions.option_packages.map((option) => (
                                            <div
                                            key={option.id}
                                            style={{marginBottom: "10px"}}
                                            className={` ${selectedOptionPackage?.id === option.id ? "option-selected-optionpackage" : "optiondeselected" }     `}
                                            onClick={() => {
                                                // Only set the package and default list item if it's not already selected
                                                if (selectedOptionPackage?.id !== option.id) {
                                                    setSelectedOptionPackage(option);
                                                    setSelectedOptionPackagelistid(option.listItems[0].id); // Only triggers on new selection
                                                }
                                            }}
                                            >
                                                <div className="optionpackage-title">
                                                    <h4>{option.title}</h4>
                                                    <div style={{width: "190px", textAlign: "end", paddingRight: "10px"}}> 月額+ {option.price}円～  { !isUpFrontFee   ? <div>申込金+ {calculateUpFrontFee(monthlyPayment, option.price )} 円～</div> : <div></div>}     </div>
                                                </div>
                                               
                                                
                                                <p>{option.subtitle.map((title, index) => {
                                                    return <span style={{paddingLeft: "10px"}} key={index}>{title}  </span>
                                                }   )}</p>

                                               
                                                <div className={`${selectedOptionPackage?.id === option.id ? "show" : "hide" }`}>

                                                  

                                                    <div>
                                                        {
                                                        
                                                            option.listItems.map((item, index) => (
                                                            <div key={index}

                                                            className={`
                                                                        ${selectedOptionPackage?.listItems.find(item => item.id === selectedOptionPackagelistid)?.id === item.id ? "show" : "hide"}
                                                                        `} 
                                                            onClick={() => {
                                                                setSelectedOptionPackagelistid(item.id)
                                                                //setIsOptionDetailClicked(false)
                                                            }}
                                                            >
                                                                
                                                                <div className="optionselecteditem">
                                                                    <div>
                                                                        <div style={{fontSize: "13px", fontWeight: "bold", paddingBottom: "10px"}}> {option.name}  </div>
                                                                        <img className="optionpackageimg" src={images[`${item.url}`] || images["no_image_option"]} alt={option.title} />
                                                                    </div>
                                                                    
                                                                    {item.item} 
                                                                    <button className={"optiondetailbutton"} onClick={()=>setIsOptionDetailClicked(!isOptionDetailClicked)} > 変更 </button>
                                                                </div>
                                                                
                                                            </div>
                                                            ))
                                                        
                                                        }
                                                            {/* below will be shown when user clicks button "変更" */}
                                                        {
                                                            isOptionDetailClicked ?
                                                            <div className="optionselectitem-container" >
                                                                {
                                                                  option.listItems.map((item, index) => (
                                                                    <div key={index}

                                                                    className={`optionselectitem
                                                                                ${isOptionDetailClicked === true && selectedOptionPackage?.listItems.find(item => item.id === selectedOptionPackagelistid)?.id === item.id ? "option-selected" : ""} 
                                                                                ${!isOptionDetailClicked ? (selectedOptionPackage?.listItems.find(item => item.id === selectedOptionPackagelistid)?.id === item.id ? "show" : "hide"): ""} `} 
                                                                    onClick={() => {
                                                                        setSelectedOptionPackagelistid(item.id)
                                                                        setIsOptionDetailClicked(false)
                                                                    }}
                                                                    >
                                                                    <div className="optionselecteditem">
                                                                        
                                                                           
                                                                        <img style={{paddingTop: "10px"}}  className="optionpackageimg-sub" src={images[`${item.url}`] || images["no_image_option"]} alt={option.title} />
                                                                        
                                                                        <div>
                                                                            {item.item} 
                                                                        </div>
                                                                        <div>
                                                                            
                                                                                
                                                                            <div style={{width: "170px", textAlign: "end", fontSize:"12px"}}> 月額+ {option.price}円～  { !isUpFrontFee   ? <div>申込金+ {calculateUpFrontFee(monthlyPayment, option.price )} 円～</div> : <div></div>}     </div>
                                                                            
                                                                        </div>
                                                                        
                                                                       
                                                                    </div>
                                                                    </div>
                                                                    ))   
                                                                }
                                                                
                                                                
                                                            </div>
                                                            :
                                                            <div> 

                                                            </div>
                                                        }
                                                       
                                                    </div>
                                                  

                                                </div>
                                                
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>オプションパッケージはありません。</p>
                                )
                            }

                            <h4 style={{paddingTop: "15px", paddingBottom: "15px"}}>追加いただける単品オプション</h4>
                            {
                                carOptions.interior_exterior_upgrades.length > 0 ? (
                                    <>
                                    <div>
                                        <div className="interiorexteriorupgrade-title">
                                           内外装
                                        </div>
                                        
                                        {carOptions.interior_exterior_upgrades.map((upgrade, index) => (
                                            <>
                                            <div className={upgrade.is_exterior ? "show" : "hide"}>  
                                                <div key={index} 
                                                    // any row (entry) that has "all" in name field will always be shown  
                                                    className={ `
                                                                ${ (upgrade.name === "all") ? `show`: ((upgrade.name === selectedGrade?.name) ? `show` : `hide`)   }
                                                                interiorexteriorupgrade-option
                                                                `}

                                                    onClick={() => {
                                                        //click to select or deselect the upgrade
                                                        if(selectedInteriorExteriorUpgrade?.includes(upgrade.id)) {
                                                            setSelectedInteriorExteriorUpgrade(
                                                                selectedInteriorExteriorUpgrade.filter(id => id !== upgrade.id)
                                                            )
                                                        } else {
                                                            setSelectedInteriorExteriorUpgrade(
                                                                selectedInteriorExteriorUpgrade ? [...selectedInteriorExteriorUpgrade, upgrade.id] : [upgrade.id]
                                                            )
                                                        }
                                                        
                                                        }}
                
                                                >   


                                                  
                                                     <div className="interiorexterior-item"> 
                                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                            <img className="interiorexteriorupgrade-img" src={images[`${upgrade.imgurl}`] || images["no_image_option"]} alt={upgrade.Interior_exterior_upgrade} />
                                                            <p>{upgrade.Interior_exterior_upgrade}</p>
                                                        </div>
                                                       
                                                        
                                                        <div className="interiorexteriorupgrade-container1">
                                                            <div className="price-container" style={{ width: "150px", fontSize: "13px" }}>
                                                                <div className={ `  `}>  月額＋ {upgrade.price} 円  </div>
                                                                <div style={{  display: "flex", flexDirection: "row" }}> { !isUpFrontFee   ? <div>申込金＋ {calculateUpFrontFee(monthlyPayment, upgrade.price )} 円</div> : <div></div>}  </div>
                                                            </div>

                                                            <div className={ ` checkbox   ${upgrade.is_exterior && selectedInteriorExteriorUpgrade?.includes(upgrade.id) ? "checked" : ""} `}>  <FaCheck color="white" />   </div>
                                                        </div>
                                                        
                                                    </div>
                                                    {/* <p>{upgrade.name}</p>
                                                    
                                                    <p>{upgrade.is_exterior ? "内外装向上" : "快適･利便性向上"}</p> */}

                                                </div>
                                            </div>
                                           
                                            </>
                                            
                                        ))}
                                    </div>

                                    <div >
                                        <div className="interiorexteriorupgrade-title">
                                            快適･利便性向上
                                        </div>
                                       
                                        {carOptions.interior_exterior_upgrades.map((upgrade, index) => (
                                            <>
                                            <div className={!upgrade.is_exterior ? "show" : "hide"}>  
                                                <div key={index} 
                                                    // any row (entry) that has "all" in name field will always be shown  
                                                    className={ `
                                                                ${ (upgrade.name === "all") ? `show`: ((upgrade.name === selectedGrade?.name) ? `show` : `hide`)   }
                                                                interiorexteriorupgrade-option
                                                            `}

                                                    onClick={() => {
                                                        //click to select or deselect the upgrade
                                                        if(selectedInteriorExteriorUpgrade?.includes(upgrade.id)) {
                                                            setSelectedInteriorExteriorUpgrade(
                                                                selectedInteriorExteriorUpgrade.filter(id => id !== upgrade.id)
                                                            )
                                                        } else {
                                                            setSelectedInteriorExteriorUpgrade(
                                                                selectedInteriorExteriorUpgrade ? [...selectedInteriorExteriorUpgrade, upgrade.id] : [upgrade.id]
                                                            )
                                                        }
                                                        }}
                
                                                >
                                                   

                                                    <div className="interiorexterior-item"> 
                                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                            <img className="interiorexteriorupgrade-img" src={images[`${upgrade.imgurl}`] || images["no_image_option"]} alt={upgrade.Interior_exterior_upgrade} />
                                                            <p>{upgrade.Interior_exterior_upgrade}</p>
                                                        </div>
                                                       
                                                        
                                                        <div className="interiorexteriorupgrade-container1">
                                                            <div className="price-container" style={{ width: "150px", fontSize: "13px" }}>
                                                                <div className={ `  `}>  月額＋ {upgrade.price} 円  </div>
                                                                <div style={{  display: "flex", flexDirection: "row" }}> { !isUpFrontFee   ? <div>申込金＋ {calculateUpFrontFee(monthlyPayment, upgrade.price )} 円</div> : <div></div>}  </div>
                                                            </div>

                                                            <div className={ ` checkbox   ${!upgrade.is_exterior && selectedInteriorExteriorUpgrade?.includes(upgrade.id) ? "checked" : ""} `}>  <FaCheck color="white" />   </div>
                                                        </div>
                                                        
                                                    </div>

                                                </div>
                                            </div>
                                            </>
                                            
                                        ))}
                                    </div>
                                    </>
                                ) : (
                                    <p>内外装向上オプションはありません。</p>
                                )
                            }

                            <h4 style={{paddingTop: "15px", paddingBottom: "15px"}}>寒冷地仕様・冬タイヤ</h4>
                            {
                                carOptions.tire_upgrades.length > 0 ? (
                                    <div>
                                        {carOptions.tire_upgrades.map((tire, index) => (
                                            
                                            <div key={tire.id}
                                                className={"tireupgrade-item"}
                                                onClick={() => {
                                                if(selectedTireUpgrades?.includes(tire.id)) {
                                                    setSelectedTireUpgrades(
                                                        selectedTireUpgrades.filter(id => id !== tire.id)
                                                    )
                                                } else {
                                                    setSelectedTireUpgrades(
                                                        selectedTireUpgrades ? [...selectedTireUpgrades, tire.id] : [tire.id]
                                                    )
                                                }
                                                
                                                }}
                                                
                                            >   
                                                <div className="tireupgrade-container1">  
                                                    <div style={{ fontSize: "17px" , fontWeight: "bold"  }}>{tire.Tire_upgrade}</div>

                                                    <div className="tireupgrade-container2">
                                                        <div className="price-container">
                                                            <div>月額＋{tire.price} 円</div>
                                                            <div style={{  display: "flex", flexDirection: "row" }}> { !isUpFrontFee   ? <div>申込金＋ {calculateUpFrontFee(monthlyPayment, tire.price )} 円</div> : <div></div>}  </div>
                                                        </div>

                                                        <div className={ ` checkbox   ${selectedTireUpgrades?.includes(tire.id)   ? "checked" : ""} `}>  <FaCheck color="white" />   </div>

                                                    </div>
                                                    
                                                    
                                                    
                                                </div>

                                                    <div style={ { left: "0px", fontSize: "11px" } }>
                                                        <div >{tire.description}</div>
                                                    </div>

                                                <div>
                                                     
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>寒冷地仕様・冬タイヤはありません。</p>
                                )
                            }
                            <h4 style={{paddingTop: "15px", paddingBottom: "15px"}}>希望ナンバー</h4>
                            {   
                                carOptions.numberplates.length > 0 ? (
                                    <div>
                                        {carOptions.numberplates.map((plate) => (
                                            <div key={plate.id}
                                            className = {"numberplate-container"}
                                            

                                            >   
                                                <div className="numberplate-container2"
                                                onClick={() => {
                                                console.log(" numberplate clicked ");
                                                setNumberPlateOptionClicked(!numberPlateOptionClicked)
                                                if(plate === selectedNumberPlates) {
                                                    setSelectedNumberPlates(null)
                                                } else {
                                                    setSelectedNumberPlates(plate)
                                                }
                                            }}
                                                
                                                >
                                                    <img className="numberplate-img" src={images[`${plate.imgurl}`] || images["no_image_option"]} alt={plate.title} />
                                                    <div style={{ fontSize: "15px" , width: "150px"  }} className="numberplate-title">
                                                        {plate.title}
                                                    </div>
                                                    <div className="numberplate-container3">
                                                        <div> 
                                                            <div>  月額＋ {plate.price} 円 </div> 
                                                            <div>  { !isUpFrontFee   ? <div> 申込金＋ {calculateUpFrontFee(monthlyPayment, plate.price )} 円 </div> : <div></div>} </div>
                                                        </div>
                                                        
                                                        <div  className={ ` checkbox   ${selectedNumberPlates?.id === plate.id ? "checked" : ""} `}>  <FaCheck color="white" />   </div>
                                                    </div>
                                                   
                                                </div>

                                                <div className={` ${numberplateNumber !== "" || numberPlateOptionClicked === true ? "show" : "hide" }`   }>
                                                    <div style={{display: "flex", gap: "10px", marginBottom:"10px"}}> <div style={{backgroundColor: "orange", width: "50px" , height:"auto", textAlign: "center", borderRadius: "5px" }}>必須</div> 第一志望 </div>
                                                    <input type="text" value={numberplateNumber} className={` numberplateinput  ${numberplateNumber !== "" || numberPlateOptionClicked === true ? "show" : "hide" }`   } 
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setNumberplateNumber(e.target.value)}} />
                                                    <div style={{fontSize: "12px", color: "gray"}}>
                                                        ※0からはじまるナンバーを入力された場合は、・で登録されます（例：「0120」⇒「・120」）
                                                        ※図柄入りプレートや字光式プレートは装着できません。
                                                        ※抽選対象番号は原則受け付けられませんので、一般社団法人全国自動車標板協議会でご確認ください。
                                                    </div>
                                                </div>
                                               
                                                
                                            </div>
                                        ))}
                                    
                                    </div>
                                ) : (
                                    <p>希望ナンバーはありません。</p>
                                )
                            }

                            
                           
                            <FixedFooterCarPay 
                                monthlypay={monthlyPaymentwithoption}
                                carname={carOptions.name}
                                cargrade={selectedGrade?.grade || ""}
                                bonuspay={bonusPayment}
                                isUpFrontFee={isUpFrontFee}
                                upFrontFee={upfrontfee}
                            />

                            <div className="car-plan-notice">
                                <div style={{color:"red", fontWeight: "500", marginTop:"50px"}}> 【ご留意ください】 </div>
                                <div style={{fontSize: "12px"}}>一部の装備のご利用には、別途対応可能なスマートフォンが必要です。
                                対象となる装備・車種、動作確認済スマートフォンの一覧はこちらからご確認ください。</div>
                            </div>


                            {
                                isAuthorized ? (
                                    <> 
                                    
                                    <div  className="final-step-container">
                                    <div className="save-estimate-button">
                                        <div onClick={createBookmark} >
                                        見積りを保存する
                                        </div>
                                       
                                    </div>
                                    

                                    <div className="save-estimate-button rightbutton">
                                    次へ: 販売店選択
                                    </div>
                                    </div>
                                    <div style={{fontSize: "12px", paddingLeft: "50px"}}> {"(My KINTOへのログインが必要です)" }</div>
                                    </>
                                    
                                ) : (
                                    <div onClick={() =>  navigate("/login")  } className="save-estimate-button rightbutton">  
                                        ログインして見積りを保存する
                                    </div>
                                )
                            }   



                            <img className="bottombanner" src={images["kintocarplan_footerlogo"]} alt="KINTO Logo" />



                        </div>
                   

                </div>

            </div>
            ) : (
                    <p>Loading car options...</p>
                )}

           

        </div>
        </ProtetecdRoute>
       
    );
}
export default CarPlan;

export const calculateUpFrontFee = ( monthlyPaymentwithoutoption: number, optionprice? : number): number => {
    //contract term : unit is in years
    //bonus : we asssume that bonus is paid twice a year
    //price : total price of the car
    let upffontfeeTempStep1 = 0; //initial value
    if(optionprice === undefined) {
        upffontfeeTempStep1 = monthlyPaymentwithoutoption * 5.6
    }else{
        upffontfeeTempStep1 = optionprice * 5.6;
    }
    
    const upffontfeeTempStep2 = Math.ceil(upffontfeeTempStep1) ;
    const upffontfeeTempStep3 = Math.ceil(upffontfeeTempStep2 / 10) * 10; //rounding up the first digit to the nearest 10
    return upffontfeeTempStep3 ;
}

export const calculateMonthlyPayment = (price: number,  bonus: number, contractTerm: number): number => {
    //contract term : unit is in years
    //bonus : we asssume that bonus is paid twice a year
    //price : total price of the car
    
    //how the calculation works:
    //totall price will differ based on contract term 
    // ex: yaris : 
    // 7 years : the user will pay 300,0000 yen in total 
    // 5 years : the user will pay 75% of 300,0000 yen , which is 225,0000 yen in total
    // 3 years : the user will pay 60%(3/5) of 225,0000 yen, which is 135,0000  in total
    // this price stay same no matter what bonus the user chooses

    //step0 
    const bonusTemp = bonus; 
    const contractTermTemp = contractTerm; 
    let adjustedPrice = price; // This price will be adjusted based on contract term

    if(contractTerm === 5) {
        adjustedPrice =  price * 0.75
    }
    if(contractTerm === 3) {
        adjustedPrice =  price * 0.75 * 0.65
    }
   
    console.log("adjustedPrice is " + adjustedPrice + " bonusTemp is " + bonusTemp + " contractTermTemp is " + contractTermTemp);

    //step1
    const monthlyPayment1 = adjustedPrice - (bonusTemp * 2 * contractTermTemp);
    console.log("monthlyPayment1 is " + monthlyPayment1);
    //step2
    const monthlyPayment2 = monthlyPayment1/(12 * contractTermTemp);
    console.log("monthlyPayment2 is " + monthlyPayment2 );
    //step3: rounding up the monthly payment to the nearest integer
    const roundedUpToInteger = Math.ceil(monthlyPayment2);
    
    //step4: rounding up the first digit to the nearest 10
    const roundedToTens = Math.ceil(roundedUpToInteger / 10) * 10;
    

    return  roundedToTens; 
}


export const getCarOptionDetail = async (carId: string | null): Promise<CarOption | null> => {
    if (!carId) return null; // Guard clause to prevent API calls with undefined carId
    
    try {
        const response = await api.get(`/api/cars/${carId}/options/`);

        const gradelists: gradelist[] = response.data.grades.map((grade: any) => ({
            id: grade.id,
            grade: grade.grade,
            gasType: grade.gasType,
            wheelDrive: grade.wheelDrive,
            name: grade.name,
            car_id: grade.car_id,
            price: grade.price
        }));

        const colorlists: colors[] = response.data.colors.map((color: any) => ({
            id: color.id,
            color: color.color,
            color_hex: color.color_hex,
            subname: color.subname,
            name: color.name,
            car_id: color.car_id,
            price: color.price
        }));

        const interiorlists: interiors[] = response.data.interiors.map((interior: any) => ({
            id: interior.id,
            interior: interior.interior,
            interiorcolor: interior.interiorcolor,
            seat: interior.seat,
            imgname: interior.imgname,
            name: interior.name,
            car_id: interior.car_id,
            price: interior.price
        }));

        const optionPackages: option_packages[] = response.data.option_packages.map((option: any) => ({
            id: option.id,
            optionpackage: option.optionpackage,
            name: option.name,
            title: option.title,
            subtitle: option.subtitle,
            listItems: option.listItems.map((item: any) => ({
                id: item.id,
                item: item.item,
                price: item.price,
                url: item.url
            })),
            comment: option.comment,
            car_id: option.car_id,
            price: option.price
        }));

        const interiorExteriorUpgrades: interiorExteriorUpgrade[] = response.data.interior_exterior_upgrades.map((upgrade: any) => ({
            id: upgrade.id,
            Interior_exterior_upgrade: upgrade.interior_exterior_upgrade,
            imgurl: upgrade.imgurl,
            is_exterior: upgrade.is_exterior,
            name: upgrade.name,
            car_id: upgrade.car_id,
            price: upgrade.price
        }));

        const tireUpgrades: tireUpgrade[] = response.data.tire_upgrades.map((tire: any) => ({
            id: tire.id,
            Tire_upgrade: tire.tire_upgrade,
            name: tire.name,
            title: tire.title,
            description: tire.description,
            car_id: tire.car_id,
            price: tire.price
        }));

        const numberPlates: numberPlate[] = response.data.numberplates.map((plate: any) => ({
            id: plate.id,
            title: plate.title,
            imgurl: plate.imgurl,
            numberplate: plate.numberplate,
            car_id: plate.car_id,
            price: plate.price
        }));

        const carOptionTemp: CarOption = {
            id: response.data.id,
            name: response.data.name,
            price: response.data.price,
            imgname: response.data.imgname,
            grades: gradelists,
            colors: colorlists,
            interiors: interiorlists,
            option_packages: optionPackages,
            interior_exterior_upgrades: interiorExteriorUpgrades,
            tire_upgrades: tireUpgrades,
            numberplates: numberPlates
        }

        console.log("Car options loaded:", carOptionTemp, "caroptions", optionPackages);
        return carOptionTemp;
        
    } catch (err) {
        console.error("Error fetching car options:", err);
        return null;
    }
}






// carOptions.interior_exterior_upgrades.length > 0 ? (
//                                     <ul>
//                                         {carOptions.interior_exterior_upgrades.map((upgrade, index) => (
//                                             <>
//                                             <li key={upgrade.id}
//                                             // any row (entry) that has "all" in name field will always be shown  
//                                             className={ `${selectedInteriorExteriorUpgrade?.id === upgrade.id ? "option-selected" : ""}
//                                                         ${ (upgrade.name === "all") ? `show`: ((upgrade.name === selectedGrade?.name) ? `show` : `hide`)   }
//                                             ` }
//                                             onClick={() => {
//                                                 //click to select or deselect the upgrade
//                                                 if(upgrade === selectedInteriorExteriorUpgrade) {
//                                                     setSelectedInteriorExteriorUpgrade(null)
//                                                 } else {
//                                                     setSelectedInteriorExteriorUpgrade(upgrade)
//                                                 }
                                                
//                                                 }}
//                                             >   
//                                                 <span className="interiorexteriorupgrade-exterior">内外装向上</span>
//                                                 {
//                                                     upgrade.is_exterior ? (
//                                                         <>
//                                                         <img className="interiorexteriorupgrade-img" src={images[`${upgrade.imgurl}`] || images["no_image_option"]} alt={upgrade.Interior_exterior_upgrade} />
//                                                         <p>{upgrade.Interior_exterior_upgrade}</p>
//                                                         <p>{upgrade.name}</p>
//                                                         <p>Price: {upgrade.price} JPY</p>
//                                                         <p>{upgrade.is_exterior ? "内外装向上" : "快適･利便性向上"}</p>
//                                                         </>
                                                        
//                                                     ) : (
//                                                      <></>
//                                                     )
//                                                 }
                                               
//                                             </li>

//                                             <li key={upgrade.id}
//                                             // any row (entry) that has "all" in name field will always be shown  
//                                             className={ `${selectedInteriorExteriorUpgrade?.id === upgrade.id ? "option-selected" : ""}
//                                                         ${ (upgrade.name === "all") ? `show`: ((upgrade.name === selectedGrade?.name) ? `show` : `hide`)   }
//                                             ` }
//                                             onClick={() => {
//                                                 //click to select or deselect the upgrade
//                                                 if(upgrade === selectedInteriorExteriorUpgrade) {
//                                                     setSelectedInteriorExteriorUpgrade(null)
//                                                 } else {
//                                                     setSelectedInteriorExteriorUpgrade(upgrade)
//                                                 }
                                                
//                                                 }}
//                                             >
                                                
//                                                 <img className="interiorexteriorupgrade-img" src={images[`${upgrade.imgurl}`] || images["no_image_option"]} alt={upgrade.Interior_exterior_upgrade} />
//                                                 <p>{upgrade.Interior_exterior_upgrade}</p>
//                                                 <p>{upgrade.name}</p>
//                                                 <p>Price: {upgrade.price} JPY</p>
//                                                 <p>{upgrade.is_exterior ? "内外装向上" : "快適･利便性向上"}</p>
//                                             </li>
//                                             </>
                                            
//                                         ))}
//                                     </ul>
//                                 ) : (
//                                     <p>内外装向上オプションはありません。</p>
//                                 )
//                             }



// const fetchPaylist = async () => {
          
    //       const cardataList: Paylist[] = []; // Assuming cars is an array of Car objects
    
    //       try {
    
    //           // in this case repeat fetch for 3 times 
    //           for (let i = 1; i <= 3; i++) {
    //             const res = await api.get(`/api/cars/${i}/`); 
    //             const formattedList =  {
    //               id: res.data.id, 
    //               name: res.data.name, 
    //               price: res.data.price,
    //               grade: res.data.grade,
    //               imgname: res.data.imgname,
    //               paylist1: res.data.paylist1, 
    //               paylist2: res.data.paylist2, 
    //               paylist3: res.data.paylist3, 
    //               paylist4: res.data.paylist4
    //             };
                
    //             cardataList.push(formattedList);
    //           }
              
      
    //           setPaylist(cardataList);
    
    //           console.log('paylist state:', paylist);
    
    //       } catch (error) {
    //           console.error('Error fetching cars:', error);
    //       }
    // };
    
// {
//     "id": 2,
//     "name": "ヤリス",
//     "price": 3000000,
//     "grade": "X GAS 1.0L 2WD",
//     "imgname": "yaris",
//     "grades": [
//         {
//             "id": 1,
//             "grade": "X GAS 1.0L 2WD(5人)",
//             "gasType": "ガソリン",
//             "wheelDrive": "2WD",
//             "name": "yaris",
//             "car_id": 2,
//             "price": 0
//         },
//         {
//             "id": 2,
//             "grade": "X GAS 1.5L 2WD(5人)",
//             "gasType": "ガソリン",
//             "wheelDrive": "2WD",
//             "name": "yaris",
//             "car_id": 2,
//             "price": 5000
//         }
//        
//     ],
//     "colors": [
//        {
//     "id": 1,
//     "color": "プラチナホワイトパールマイカ",
//     "color_hex": "#ededf6",
//     "subname": "特別価格",
//     "name": "プラチナホワイトパールマイカ",
//     "car_id": 2,
//     "price": 0
//  },
//  {
//     "id": 2,
//     "color": "スーパーホワイトⅡ",
//     "color_hex": "#ededf6",
//     "subname": "標準色",
//     "name": "スーパーホワイトⅡ",
//     "car_id": 2,
//     "price": 0
//  }, ]
// "interiors": [
//         {
//             "id": 1,
//             "interior": "ブラック",
//             "interiorcolor": "ブラック",
//             "seat": "ファブリック･ブラック(フロントシート:ヘッドレスト一体型)",
//             "imgname": "yaris_interior_ex",
//             "name": "1",
//             "car_id": 2,
//             "price": 0
//         }
//     ],
//     
//     "option_packages": [
//     {
//         "id": 1,
//         "optionpackage": "standard",
//         "name": "フロアマット種類の選択",
//         "title": "標準仕様",
//         "subtitle": [
//             "• フロアマット種類の選択"
//         ],
//         "listItems": [
//             {
//                 "item": "フロアマットなし",
//                 "price": 0,
//                 "url": ""
//             },
//             {
//                 "item": "フロアマット(ベーシック)",
//                 "price": 330,
//                 "url": "floormat_basic"
//             },
//             {
//                 "item": "フロアマット(デラックス)",
//                 "price": 550,
//                 "url": "floormat_deluxe"
//             }
//         ],
//         "comment": "",
//         "car_id": 2,
//         "price": 0
//     }
// ]
// }












// const getBookmarks = async () => { 
    

//         try{

//              api
//             .get("/api/bookmarks/")
//             .then((res) => { 
                
                
//                 const response = res.data;

//                 const PlanTemp: Plan[] = response.map((bookmark: any) => ({
//                     plan_id: bookmark.plan[0].plan_id,
//                     contractYear: bookmark.plan[0].contractYear,
//                     bonusPayment: bookmark.plan[0].bonusPayment
//                 }));

//                 const bookmarktemp: SavedBookMark[] = response.map((bookmark: any) => ({
//                     id: bookmark.id,
//                     author: bookmark.author,
//                     carid: bookmark.carid,
//                     color_id: bookmark.color_id,
//                     contract_year: bookmark.contract_year,
//                     created_at: bookmark.created_at,
//                     grade_id: bookmark.grade_id,
//                     imgname: bookmark.imgname,
//                     interior_exterior_upgrade_id: bookmark.interior_exterior_upgrade_id,
//                     interior_id: bookmark.interior_id,
//                     numberplate_number: bookmark.numberplate_number,
//                     option_package_id: bookmark.option_package_id,
//                     option_package_listitems: bookmark.option_package_listitems,
//                     plan: PlanTemp,
//                     tire_upgrade_id: bookmark.tire_upgrade_id,
//                     updated_at: bookmark.updated_at
//                 }));

//                 setBookmarks(bookmarktemp);

//                 console.log("getbookmark response are " , res.data);
//             })
//             .catch((err) => { console.log(err); });




//         }catch (error) {
//             console.log("Error fetching bookmarks: ", error);
//         }
       
//         // .then((res) => res.data )
//         // .then((data) => setBookmarks(data))   
//         // .catch((err) => alert(err));
//     }

//     const deleteBookmarks = async (id: string) => {
//          api
//         .get("/api/bookmarks/delete/${id}/")
//         .then((res) => { 

//             if(res.status === 204) {
//                 alert("note deleted ")
//             }
//             else{
//                 alert("Failed to delete a note ")
//             }


//          })
//         .catch((err) => { console.log(err); });

//         getBookmarks(); //refresh the bookmarks after deleting

//     }



// const getCarOptionDetail = async () => {

//         // api
//         // .get(`/api/cars/${carId}/options/`)
//         // .then((res) => {setCarOptions(res.data); console.log(res.data) })
//         // .catch((err) => { console.log(err); });

//         if (!carId) return; // Guard clause to prevent API calls with undefined carId
    
//         try {

           
//             const response = await api.get(`/api/cars/${carId}/options/`);

//             const gradelists: gradelist[] = response.data.grades.map((grade: any) => ({
//                 id: grade.id,
//                 grade: grade.grade,
//                 gasType: grade.gasType,
//                 wheelDrive: grade.wheelDrive,
//                 name: grade.name,
//                 car_id: grade.car_id,
//                 price: grade.price
//             }));

//             const colorlists: colors[] = response.data.colors.map((color: any) => ({
//                 id: color.id,
//                 color: color.color,
//                 color_hex: color.color_hex,
//                 subname: color.subname,
//                 name: color.name,
//                 car_id: color.car_id,
//                 price: color.price
//             }));

//             const interiorlists: interiors[] = response.data.interiors.map((interior: any) => ({
//                 id: interior.id,
//                 interior: interior.interior,
//                 interiorcolor: interior.interiorcolor,
//                 seat: interior.seat,
//                 imgname: interior.imgname,
//                 name: interior.name,
//                 car_id: interior.car_id,
//                 price: interior.price
//             }));

//             const optionPackages: option_packages[] = response.data.option_packages.map((option: any) => ({
//                 id: option.id,
//                 optionpackage: option.optionpackage,
//                 name: option.name,
//                 title: option.title,
//                 subtitle: option.subtitle,  //  option.subtitle is an array and option_packages.subtitle is also an array
//                 listItems: option.listItems.map((item: any) => ({
//                     item: item.item,
//                     price: item.price,
//                     url: item.url
//                 })),
//                 comment: option.comment,
//                 car_id: option.car_id,
//                 price: option.price
//             }));

//             const interiorExteriorUpgrades: interiorExteriorUpgrade[] = response.data.interior_exterior_upgrades.map((upgrade: any) => ({
//                 id: upgrade.id,
//                 Interior_exterior_upgrade: upgrade.Interior_exterior_upgrade,
//                 imgurl: upgrade.imgurl,
//                 is_exterior: upgrade.is_exterior,
//                 name: upgrade.name,
//                 car_id: upgrade.car_id,
//                 price: upgrade.price
//             }));

//             const tireUpgrades: tireUpgrade[] = response.data.tire_upgrades.map((tire: any) => ({
//                 id: tire.id,
//                 Tire_upgrade: tire.Tire_upgrade,
//                 name: tire.name,
//                 title: tire.title,
//                 description: tire.description,
//                 car_id: tire.car_id,
//                 price: tire.price
//             }));

//             const numberPlates: numberPlate[] = response.data.numberplates.map((plate: any) => ({
//                 id: plate.id,
//                 title: plate.title,
//                 imgurl: plate.imgurl,
//                 numberplate: plate.numberplate,
//                 car_id: plate.car_id,
//                 price: plate.price
//             }));

           

//             const carOptionTemp : CarOption = {
//                 id: response.data.id,
//                 name: response.data.name,
//                 price: response.data.price,
//                 imgname: response.data.imgname,
//                 grades: gradelists,
//                 colors: colorlists,
//                 interiors: interiorlists,
//                 option_packages: optionPackages,
//                 interior_exterior_upgrades: interiorExteriorUpgrades,
//                 tire_upgrades: tireUpgrades,
//                 numberplates: numberPlates
//             } 
    
//             setCarOptions(carOptionTemp); // This stores the entire object



//             console.log("Car options loaded:", response.data, "caroptions", optionPackages     );
//         } catch (err) {
//             console.error("Error fetching car options:", err);
//         }


//     }





        //     isOptionDetailClicked ? (
        //     option.listItems.map((item, index) => (
        //     <li key={index}

        //     className={`${selectedOptionPackage?.listItems.find(item => item.id === selectedOptionPackagelistid)?.id === item.id ? "option-selected" : ""} 
        //                 `}
        //     onClick={() => setSelectedOptionPackagelistid(item.id)}
        //     >
        //         {item.item} - Price: {item.price} JPY - {item.url}
        //     </li>
        //     ))
        // ) : (
        //     option.listItems.map((item, index) => (
        //     <li key={index}

        //     className={`${selectedOptionPackage?.listItems.find(item => item.id === selectedOptionPackagelistid)?.id === item.id ? "option-selected" : ""} 
        //                 ${isOptionDetailClicked ? (selectedOptionPackage?.listItems.find(item => item.id === selectedOptionPackagelistid)?.id === item.id ? "show" : "hide"): ""} `} 
        //     onClick={() => setSelectedOptionPackagelistid(item.id)}
        //     >
        //         {item.item} - Price: {item.price} JPY - {item.url}
        //     </li>
        //     ))
        // )