import { useNavigate } from "react-router-dom";
import { BiIdCard } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import RegisterHeader from "../../components/RegisterHeader";
import "../../styles/Stepfive.css";
import { useUsernameStore } from "../../store/register-store";

const Stepfive = () => {
    const navigate = useNavigate()
    
    const username = useUsernameStore(state => state.username);
    return (
        <div>
            <RegisterHeader /> 
            <div className="register-container">
                <div className="stpfive-substitle"> 新規登録 </div> 
                <div className='register-bargauge' style={{marginTop: "30px"}}>   
                    <div className='registegauge'> <div className='registercircleone'> <FaCheck /> </div>  <div style={{fontSize: "13px"}}> メールアドレスの登録 </div>  </div>         
                    <div className='registegauge'> <div className='registercircleone'> <FaCheck />  </div>  <div style={{fontSize: "13px"}}> 情報の入力 </div>  </div>  
                    <div className='registegauge'> <div className='registercircleone'> <FaCheck /> </div>  <div style={{fontSize: "13px"}}> 入力内容の確認 </div>  </div>  
                    <div className='registegauge'> <div className='registercircleone'> <FaCheck />  </div>  <div style={{fontSize: "13px"}}> 登録完了 </div>  </div>  
                </div>
                
                <div className="register-container1"> 
                    <BiIdCard size={"100px"}/>
                    <h1>TOYOTAアカウントの登録が完了しました</h1>
                </div>

                <div className="register-container2">
                    <div className=".register-container1">
                        <div>メールアドレス</div>
                        <div>{username}</div>
                    </div>
                   
                </div>
               
                <div className="register-container1" style={{margin: "30px"}}>  
                    <button onClick={() => navigate('/login')  } className="register-button">ログイン</button>
                </div>
                



              

            </div>
            <div className='step-four-footer'>
                <div> ©1995-2025 TOYOTA MOTOR CORPORATION. ALL RIGHTS RESERVED. </div>
            </div>
        </div>
        
       
    );
}

export default Stepfive;