import { useState } from 'react';
import {  useNavigate  } from 'react-router-dom'
import '../../styles/steptwo.css';
import RegisterHeader from '../../components/RegisterHeader';
import { useUsernameStore } from '../../store/register-store';
import { IoMdWarning } from "react-icons/io";


const Steptwo = () => {
    const [username, setUsername] = useState("")
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
    //const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    //state management 
    const userName = useUsernameStore(state => state.username);
    const setuserName = useUsernameStore(state => state.setUsername);
    //const removeuserName = useUsernameStore(state => state.removeUsername);
   

    const handleUserName = (e : any)=> {
      // Update the username state with the input value
      setUsername(e.target.value);
      
      //TODO : STORE USERNAME(EMAIL ADDRESS ) IN ZUSTAND

      setuserName(e.target.value);
      
      console.log("USERNAME", username, "UserName on zustand", userName);

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


  return (
    <div>
      <RegisterHeader /> 

      
      <div className='step-two-container'>

        <div className='stptwo-title'> <h2>新規登録</h2> </div>
        <div className='stptwo-bargauge'>   
          <div className='gaugeone'> <div className='circleone'> 1  </div>  <div style={{fontSize: "13px"}}> メールアドレスの登録 </div>  </div>         
          <div className='gaugeone'> <div className='circletwo'> 2  </div>  <div style={{fontSize: "13px"}}> 情報の入力 </div>  </div>  
          <div className='gaugeone'> <div className='circletwo'> 3  </div>  <div style={{fontSize: "13px"}}> 入力内容の確認 </div>  </div>  
          <div className='gaugeone'> <div className='circletwo'> 4  </div>  <div style={{fontSize: "13px"}}> 登録完了 </div>  </div>  
          
        </div>

        <h2 style={{marginTop: "20px"}}>メールアドレスの登録</h2>
        <div className='steptwo-text1'>
          お客さまのメールアドレスを「TOYOTAアカウント」として登録します。
          登録したいメールアドレスを入力し、［認証コードを送信］を押してください。
          本人確認のため、入力したメールアドレス宛に認証コードが送信されます。
        </div>

        <div className='steptwo-text2'>メールアドレス</div>
        <input 
          className="form-input-steptwo" 
          type="text" 
          value={username}
          onChange={ (e) =>  handleUserName(e) }
          onBlur={handleBlur}
          placeholder="例）abc@toyota.jp"
        />
        {
            invalidUsername ? 
            <div className="invalid-username-steptwo"> 
                 <IoMdWarning /> <div> 有効なメールアドレスではありません。入力したメールアドレスに間違いがないかご確認ください。</div>
            </div> 
            : 
            <>
            </>
        }
        {
            isUsernameEmpty ? 
            <div className="invalid-username-steptwo"> 
               <IoMdWarning /> <div>  メールアドレスを入力してください。</div>
            </div> 
            : 
            <>
            </>
        }

        
        <div className='steptwo-text3'> 
          <div> ※ドメイン指定受信や受信拒否設定をしている場合は「id.toyota」「support.id.toyota」からのメールを受信できるように設定してください。 </div>
          <div> ※特別な設定をしていないのにメールを受信できない場合は、「迷惑メール」などに自動振り分けされていないかご確認ください。    </div>     

        </div>
        
         
        <div className='steptwo-warning-text'> 
          <div className='steptwo-text4'>ご利用にあたって</div> 
          <div className='steptwo-text5'>
            メールアドレスの登録後、「TOYOTAアカウント」の登録に必要な情報の入力時に個人／法人の選択を行います。
            個人／法人の登録の違いで、コネクティッドサービス連携時の制約や、サービスをご利用いただくにあたっての制限事項があります。
            <div> ※法人での登録は、ご利用いただけるサービスに制限があります </div>
          </div>
         
        </div>

        <div  className="step-two-button-container"> <button onClick={() => navigate("/register/stepthree") } className="step-two-button" disabled={invalidUsername || isUsernameEmpty || username === ""} > 次へ </button> </div>

        

      </div>
      

    <div className='step-two-footer'>
        <div>©1995-2025 TOYOTA MOTOR CORPORATION. ALL RIGHTS RESERVED.</div>
    </div>


    </div>
  );
}
export default Steptwo;