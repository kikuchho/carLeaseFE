import { useEffect, useState } from "react";
import ProtetecdRoute from "../components/ProtectedRoutes";
import api from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/CarPlan.css";
import CarPlanHeader from "../components/carPlan/CarPlanHeader";
// REMINDER ! 
//TTHIS PAGE IS WRAPPED IN PROTECTED ROUTE COMPONENT
// SO IT CAN ONLY BE ACCESSED BY AUTHORIZED USERS
//AND WHEN USER IS NOT AUTHORIZED, IT WILL REDIRECT TO PATH "CARPLANLOGGEDOUT"
//YOU CAN SET YOUR OWN PATH IN PROTECTED ROUTE COMPONENT , BY DEFAULT IT IS "/login"
//THE PROTECTED ROUTE IS WRAPPING THE RETURN STATMENT IN HERE 


interface gradelist
{
    id: number;
    grade: string;
    gasType: string;
    wheelDrive: string;
    name: string;
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
        item: string;
        price: number;
        url: string;
    }[];
    comment: string;
    car_id: number;
    price: number;
}


interface CarOption 
{    
    id: number;  
    name: string; 
    price: number;
    imgname: string;
    grades:gradelist[];
    colors: colors[];
    interiors: interiors[];
    option_packages: option_packages[];
}



const CarPlan = ({isAuthorized}: {isAuthorized: boolean}) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const carId = searchParams.get("carId");

    const [content, setContent] = useState<string | null>(null);
    const [bookmarks, setBookmarks] = useState<string[]>([]);
    const [carOptions, setCarOptions] = useState<CarOption | null>(null);

    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
    const [monthlyPaymentwithoption, setMonthlyPaymentwithOption] = useState<number>(0);
    const [bonusPayment, setBonusPayment] = useState<number>(0);
    const [contractTerm, setContractTerm] = useState<number>(3);


    //for calcluating monthly payment with options
    const [selectedGrade, setSelectedGrade] = useState<gradelist | null>(null);
    const [selectedColor, setSelectedColor] = useState<colors | null>(null);
    const [selectedInterior, setSelectedInterior] = useState<interiors | null>(null);
    const [selectedOptionPackage, setSelectedOptionPackage] = useState<option_packages | null>(null);
     const [selectedOptionPackageindex, setSelectedOptionPackageindex] = useState<number >(0);

    // useeffect for calculating monthly payment WITH OPTIONS
    useEffect(() => {
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
        
        // Calculate total price with options
        let totalPrice = monthlyPayment;
        
        // Add selected options prices
        if (selectedGrade) totalPrice += selectedGrade.price;
        if (selectedColor) totalPrice += selectedColor.price;
        if (selectedInterior) totalPrice += selectedInterior.price;
        if (selectedOptionPackage) totalPrice += selectedOptionPackage.listItems[selectedOptionPackageindex].price; // Assuming you want to add the price of the first item in the option package
        
        // Calculate payments
        //const basePayment = calculateMonthlyPayment(carOptions.price, bonusPayment, contractTerm);
        const optionPayment = totalPrice;
        
        console.log(" selectedoptionpackage price " + selectedOptionPackage?.listItems[selectedOptionPackageindex].price)
        console.log("optionPayment is " + optionPayment, "selectedGrade/color/interior.price " + selectedGrade?.price, selectedColor?.price, selectedInterior?.price );
        //setMonthlyPayment(basePayment);
        setMonthlyPaymentwithOption(optionPayment);
    }
    }, [carOptions, selectedGrade, selectedColor, selectedInterior, bonusPayment, contractTerm, selectedOptionPackage, selectedOptionPackageindex]);

    //get bookmarks function 
    useEffect(() => {
        getBookmarks();
        getCarOptionDetail();
        console.log("carId is " + carId);
        console.log("carOptions is " + carOptions);
    }, []);


    //update monthly payment when carOptions changes
    useEffect(() => {
        //TODO: 
        if (carOptions){

            const monthlyPaymentTemp = calculateMonthlyPayment(carOptions.price, bonusPayment, contractTerm);
            setMonthlyPayment(monthlyPaymentTemp);
        }
        
    }, [contractTerm, bonusPayment, carOptions]);

    const getBookmarks = async () => { 
    
        api
        .get("/api/bookmarks/")
        .then((res) => { setBookmarks(res.data); console.log(res.data) })
        .catch((err) => { console.log(err); });

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

    
    const getCarOptionDetail = async () => {

        // api
        // .get(`/api/cars/${carId}/options/`)
        // .then((res) => {setCarOptions(res.data); console.log(res.data) })
        // .catch((err) => { console.log(err); });

        if (!carId) return; // Guard clause to prevent API calls with undefined carId
    
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
                subtitle: option.subtitle,  //  option.subtitle is an array and option_packages.subtitle is also an array
                listItems: option.listItems.map((item: any) => ({
                    item: item.item,
                    price: item.price,
                    url: item.url
                })),
                comment: option.comment,
                car_id: option.car_id,
                price: option.price
            }));


           

            const carOptionTemp : CarOption = {
                id: response.data.id,
                name: response.data.name,
                price: response.data.price,
                imgname: response.data.imgname,
                grades: gradelists,
                colors: colorlists,
                interiors: interiorlists,
                option_packages: optionPackages
            } 
            
                
            
            
            
            setCarOptions(carOptionTemp); // This stores the entire object



            console.log("Car options loaded:", response.data, "caroptions", optionPackages     );
        } catch (err) {
            console.error("Error fetching car options:", err);
        }


    }

    const author = "test1111" 
    const plan = [
            {"plan_id": 1, "name": "Basic", "amount": 500},
            {"plan_id": 2, "name": "Premium", "amount": 1000}
        ]
    const contract_year = 2015 
    const carid = 1 



    





    return (
        <ProtetecdRoute path="/carplanloggedout">
        <div style={{ height: "3000px"}}>
            <CarPlanHeader />
            
            <div className="car-plan-content"> 
                {/* carimage */}
                <div>



                </div>
                {/* car details */}
                <div>


                   
                    {carOptions ? (
                        <div>
                            
                            <h2>{carOptions.name}</h2>
                            <p>Price: {carOptions.price} JPY</p>   

                            ご契約期間
                            <button onClick={() => {  return (setContractTerm(3) ) } }>
                                3年
                            </button>
                            <button onClick={() =>{  return (setContractTerm(5) ) }    }>
                                5年
                            </button>
                            <button onClick={() => {  return (setContractTerm(7) ) } }>
                                7年
                            </button>

                            ボーナス月加算額
                            <button onClick={() => setBonusPayment(0)}>
                                なし
                            </button>
                            <button onClick={() => setBonusPayment(55000)}>
                                5.5万円 
                            </button>
                            <button onClick={() => setBonusPayment(110000)}>
                                11万円
                            </button>





                            <h3>グレード選択:</h3>
                            <ul>
                                {carOptions.grades.map((grade) => (
                                    <li key={grade.id}
                                        className={selectedGrade?.id === grade.id ? "option-selected" : ""}
                                        onClick={() => setSelectedGrade(grade)}
                                    >
                                        {grade.grade} - {grade.gasType} - {grade.wheelDrive} - Price: {grade.price} JPY
                                    </li>
                                ))}
                            </ul>

                            
                            <h3>カラー選択:</h3>
                            <ul>
                                {carOptions.colors.map((color) => (
                                    <li key={color.id} style={{ color: color.color_hex }}
                                        className={selectedColor?.id === color.id ? "option-selected" : ""}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {color.name} - {color.subname} - Price: {color.price} JPY
                                        
                                    </li>
                                ))}
                            </ul>

                            <h3>インテリアカラー</h3>
                            <ul>
                                {carOptions.interiors.length > 0 ? (
                                    carOptions.interiors.map((interior, index) => (
                                        <li key={index}
                                        onClick={() => setSelectedInterior(interior)}
                                        >{interior.seat} - Price: {interior.price} JPY</li>
                                    ))
                                ) : (
                                    <li>インテリアカラーはありません。</li>
                                )}
                            </ul>

                            <h3>KINTOオプションパッケージ</h3>
                            {
                                carOptions.option_packages.length > 0 ? (
                                    <ul>
                                        {carOptions.option_packages.map((option) => (
                                            <li 
                                            key={option.id}
                                            onClick={() => setSelectedOptionPackage(option)}
                                            >
                                                <h4>{option.name}</h4>
                                                <p>{option.title}</p>
                                                <p>{option.subtitle[0]}</p>
                                                <ul>
                                                    {option.listItems.map((item, index) => (
                                                        <li key={index}
                                                        onClick={() => setSelectedOptionPackageindex(index)}
                                                        >
                                                            {item.item} - Price: {item.price} JPY - {item.url}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>オプションパッケージはありません。</p>
                                )
                            }

                            <h3>monthlyPayment {monthlyPayment} yen </h3>
                            <h3>monthlyPayment with options {monthlyPaymentwithoption} yen </h3>

                        </div>
                    ) : (
                        <p>Loading car options...</p>
                    )}

                </div>

            </div>
          

            {
                isAuthorized ? (
                    <div onClick={createBookmark} >
                       見積りを保存する
                    </div>
                ) : (
                    <div onClick={() =>  navigate("/login")  } > 
                        ログインして見積りを保存する
                    </div>
                )
            }

        </div>
        </ProtetecdRoute>
       
    );
}
export default CarPlan;



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
   
    console.log("adjustedPrice is " + adjustedPrice);

    //step1
    const monthlyPayment1 = adjustedPrice - (bonusTemp * 2 * contractTermTemp);
    console.log("monthlyPayment1 is " + monthlyPayment1);
    //step2
    const monthlyPayment2 = monthlyPayment1/(12 * contractTermTemp);
    console.log("monthlyPayment2 is " + monthlyPayment2);
    //step3: rounding up the monthly payment to the nearest integer
    const roundedUpToInteger = Math.ceil(monthlyPayment2);
    
    //step4: rounding up the first digit to the nearest 10
    const roundedToTens = Math.ceil(roundedUpToInteger / 10) * 10;
    

    return  roundedToTens; 
}



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