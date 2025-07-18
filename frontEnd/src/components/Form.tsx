import {useState} from "react"
import api from "../api"
import { Navigate, useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import toyota_letters_logo from "../assets/toyota_letters_logo.png"
import "../styles/Form.css"

type FormProps = {
    route: string;
    method: string;
};

function Form({route, method}: FormProps){
    //REMINDER!! USERNAME = EMAILADDRESS
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [autoLogin, setAutoLogin] = useState(false);
    const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
    const [isLoginUnsuccessful, setIsLoginUnsuccessful] = useState(false);

    const name = method === "login" ? "ログイン" : "新規登録" 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true); 
        e.preventDefault();

        try {
            const res = await api.post(route, {username, password})
            if(method === "login" ) { 
                localStorage.setItem(ACCESS_TOKEN , res.data.access);
                if(autoLogin){
                   
                    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                }
                
                navigate("/")
            } else {
                navigate("/login")
            }

        } catch (error){
            setIsLoginUnsuccessful(true);
            alert(error)
        } finally{
            setLoading(false)
        }
    }

    // const handleUserName = (e : any)=> {
        
    //     if(e.target.value.includes('@') && e.target.value.includes('.com')) {
    //         setUsername(e.target.value);
    //         setInvalidUsername(false);
    //     }
    //     else {
    //         setInvalidUsername(true); 
    //         setUsername(e.target.value);
    //     }
       
    // }

    const handleUserName = (e : any)=> {
        setUsername(e.target.value);
        
        // Only validate during typing if there's some value
            if (e.target.value) {
                //validateEmail(e.target.value);
            }
        }

        const validateEmail = (email: string) => {
            if (email.includes('@') && email.includes('.com')) {
                setInvalidUsername(false);
            } else {
                setInvalidUsername(true);
            }
        }

        const handleBlur = () => {
        // Only validate on blur if there's some input
        if (username) {
            setIsUsernameEmpty(false);
            validateEmail(username);
        }

        if(username === "") {
            setIsUsernameEmpty(true);
            setInvalidUsername(false);
        }
    }




    



    return(
        <div>

            <div className="form-header">
                <img src={toyota_letters_logo} alt="Toyota Logo" className="form-logo" />
                <div> TOYOTAアカウント </div>
            </div>

            

            <div className="form-body">

                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-sub-header"> 
                        <div > {name} </div>
                    </div>
                    
                    {
                        isLoginUnsuccessful ? 
                        <div className="invalid-username"> 
                            <p>Login was unsuccessful. There was an error in either the entered e-mail address or password.</p>
                        </div> 
                        : 
                        <>
                        </>
                    }
                   
                    
                    <div>  メールアドレス  </div>
                    <input 
                        className="form-input"
                        type="text" 
                        value={username}
                        onChange={ (e) =>  handleUserName(e) }
                        onBlur={handleBlur}
                        placeholder="メールアドレスを入力"
                    />
                    {
                        invalidUsername ? 
                        <div className="invalid-username"> 
                            <p>有効なメールアドレスではありません。入力したメールアドレスに間違いがないかご確認ください。</p>
                        </div> 
                        : 
                        <>
                        </>
                    }
                    {
                        isUsernameEmpty ? 
                        <div className="invalid-username"> 
                            <p>メールアドレスを入力してください。</p>
                        </div> 
                        : 
                        <>
                        </>
                    }



                    <div className="form-subtext2">携帯電話番号を利用したログイン機能は廃止となりました。ログインにはメールアドレスを入力してください。</div>

                    <div className="form-subtext"> パスワード </div>
                    <input 
                        className="form-input"
                        type="password" 
                        value={password}
                        onChange={ (e) => setPassword(e.target.value)  }
                        placeholder="パスワードを入力"
                    />
                   
                   
                    <label className="radiocheckcontainer">
                        次回から自動ログインにする
                        <input 
                            type="checkbox"
                            checked={autoLogin}
                            onChange={() => setAutoLogin(!autoLogin)}
                        />
                        <span className="checkmark"></span>
                    </label>

                   

                    <button className="form-button" type="submit">
                        {name} 
                    </button>

                </form>
                



                <div className="form-subtext3-container">
                    <div className="form-subtext4"> TOYOTAアカウントの登録がお済みでない方 </div>
                    <div className="form-subtext3"> 
                        「TOYOTAアカウント」は、トヨタグループが提供するさまざまなサービスを安全・快適にご利用いただけるお客さま認証サービスです。
                        会員登録していただくことにより、コミュニティサービスのご利用や、「T-Connect ID／レクサスオーナーズカードID／
                        レクサスサービスカードID／G-Link Lite ID」へのログイン※が可能になるほか、カタログ請求やキャンペーンなどの各種お申込みがスムーズにご利用いただけます。
                    </div>
                    <div className="form-subtext3"> ※「TOYOTAアカウント」で各サービスにログインするには、別途連携が必要になります。 </div>
                    <div  className="form-button2-container"> <button onClick={() => navigate("/register/stepone") } className="form-button2"> 新規登録（無料）  </button> </div>
                </div>
                <div>
                    {method === "login"  ?
                    <div> 
                        <p> click here to register instead </p>
                        <button onClick={() => navigate("/register") } > register  </button>
                    </div>  
                    :  
                    <div> 
                        <p>click here to login instead </p>
                        <button onClick={() => navigate("/login") }> login  </button>
                    </div> 
                    }
                    
                </div>
                

            </div>

           
        </div>
    
    );

}

export default Form














// import {useState} from "react"
// import api from "../api"
// import { Navigate, useNavigate } from "react-router-dom"
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"


// type FormProps = {
//     route: string;
//     method: string;
// };

// function Form({route, method}: FormProps){
//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")
//     const [loading, setLoading] = useState(false)
//     const navigate = useNavigate()

//     const name = method === "login" ? "Login" : "Register" 

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         setLoading(true); 
//         e.preventDefault();

//         try {
//             const res = await api.post(route, {username, password})
//             if(method === "login") {
//                 localStorage.setItem(ACCESS_TOKEN , res.data.access);
//                 localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
//                 navigate("/")
//             } else {
//                 ("/login")
//             }

//         } catch (error){
//             alert(error)
//         } finally{
//             setLoading(false)
//         }



//     }


//     return(
//         <div>
//             <form onSubmit={handleSubmit} className="form-container">
//                 <h1> {name} </h1>
//                 <input 
//                     className="form-input"
//                     type="text" 
//                     value={username}
//                     onChange={ (e) => setUsername(e.target.value)  }
//                     placeholder="Username"
//                 />
//                 <input 
//                     className="form-input"
//                     type="password" 
//                     value={password}
//                     onChange={ (e) => setPassword(e.target.value)  }
//                     placeholder="Password"
//                 />
//                 <button className="form-button" type="submit">
//                     {name} 
//                 </button>

//             </form>

//             <div>
//                 {method === "login"  ?
//                 <div> 
//                    <p> click here to register instead </p>
//                    <button onClick={() => navigate("/register") }> register  </button>
//                 </div>  
//                 :  
//                 <div> 
//                     <p>click here to login instead </p>
//                     <button onClick={() => navigate("/login") }> login  </button>
//                 </div> 
//                 }
                
//             </div>
            
//         </div>
    
//     );

// }

// export default Form