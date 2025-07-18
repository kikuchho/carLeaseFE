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
//     "colors": [],
//     "interiors": [],
//     "option_packages": []
// }
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


interface CarOption 
{    
    id: number;  
    name: string; 
    price: number;
    imgname: string;
    grades:gradelist[];
    colors: any[];
    interiors: any[];
    option_packages: any[];
}



const CarPlan = ({isAuthorized}: {isAuthorized: boolean}) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const carId = searchParams.get("carId");

    const [content, setContent] = useState<string | null>(null);
    const [bookmarks, setBookmarks] = useState<string[]>([]);
    const [carOptions, setCarOptions] = useState<CarOption | null>(null);


    //get bookmarks function 
    useEffect(() => {
        getBookmarks();
        getCarOptionDetail();
        console.log("carId is " + carId);
        console.log("carOptions is " + carOptions);
    }, []);

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



            const carOptionTemp : CarOption = {
                id: response.data.id,
                name: response.data.name,
                price: response.data.price,
                imgname: response.data.imgname,
                grades: gradelists,
                colors: [],
                interiors: [],
                option_packages: []
            } 
                
            
            
            
            setCarOptions(carOptionTemp); // This stores the entire object



            console.log("Car options loaded:", response.data, "caroptions", response.data.grades[0].gasType     );
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
                            <h3>Grades:</h3>
                            <ul>
                                {carOptions.grades.map((grade) => (
                                    <li key={grade.id}>
                                        {grade.grade} - {grade.gasType} - {grade.wheelDrive} - Price: {grade.price} JPY
                                    </li>
                                ))}
                            </ul>
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