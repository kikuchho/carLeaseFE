import React, { useState } from 'react';
import RegisterHeader from '../../components/RegisterHeader';
import '../../styles/stepfour.css';
import { useCustomerInfoStore, usePasswordStore, useUsernameStore } from '../../store/register-store';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { FaCheck } from 'react-icons/fa';

const Stepone = () => {
  const password = usePasswordStore(state => state.password);

  const username = useUsernameStore(state => state.username);
  

   const {
          firstName, lastName, firstNameKana, lastNameKana,
          birthdateYear, birthdateMonth, birthdateDay,
          gender, zipCode, zipCodeFirst, zipCodeSecond,
          prefecture, city, address, buildingNumber, buildingName,
          phoneFirst, phoneSecond, phoneThird, 
          phonetwoFirst, phonetwoSecond, phonetwoThird, 
          phonethreeFirst, phonethreeSecond, phonethreeThird, workplaceName,
          companyName, companyNameKana, companydepartment, companydepartmentKana,personinChargeFirstName ,personinChargeLastName,
          personinChargeFirstNameKana, personinChargeLastNameKana, customerType,
          setFirstName, setLastName, setFirstNameKana, setLastNameKana,
          setBirthdateYear, setBirthdateMonth, setBirthdateDay,
          setGender, setZipCode, setZipCodeFirst, setZipCodeSecond,
          setPrefecture, setCity, setAddress, setBuildingNumber, setBuildingName,
          setPhoneFirst, setPhoneSecond, setPhoneThird,
          setPhonetwoFirst, setPhonetwoSecond, setPhonetwoThird,
          setPhonethreeFirst, setPhonethreeSecond, setPhonethreeThird, setworkplaceName,
          setCompanyName, setCompanyNameKana, setcompanydepartment,setcompanydepartmentKana ,setpersoninChargeFirstName ,
          setpersoninChargeLastName ,setpersoninChargeFirstNameKana ,setpersoninChargeLastNameKana , setCustomerType
      } = useCustomerInfoStore();
  
      const navigate = useNavigate()
      const [loading, setLoading] = useState(false)


      const handleRegiter = () => {
      try{
          console.log("Registering user with username:", username, " and password:", password);

          setLoading(true);
          const res = api.post("api/user/register/", {
          username, 
          password })

          console.log("Registration success:");
          navigate("/register/stepfive");

        } catch (error) {

          console.error("Registration error:", error);
          alert("登録中に問題が発生しました。もう一度お試しください。");
          navigate("/register/stepone")

        } finally{
            setLoading(false)
        }
        
       
      }

  return (
    <div>
      <RegisterHeader /> 

      <div className='step-four-container'>
        <div className='stpfour-title'> 
            <h2> 新規登録 </h2>
        </div>

        <div className='register-bargauge'>   
          <div className='registegauge'> <div className='registercircleone'> <FaCheck /> </div>  <div style={{fontSize: "13px"}}> メールアドレスの登録 </div>  </div>         
          <div className='registegauge'> <div className='registercircleone'> <FaCheck />  </div>  <div style={{fontSize: "13px"}}> 情報の入力 </div>  </div>  
          <div className='registegauge'> <div className='registercircleone'> 3 </div>  <div style={{fontSize: "13px"}}> 入力内容の確認 </div>  </div>  
          <div className='registegauge'> <div className='registercircletwo'> 4  </div>  <div style={{fontSize: "13px"}}> 登録完了 </div>  </div>  
        </div>

        <div className='step-four-subtitle1'> 
          <div style={{fontSize: "26px", fontWeight: "bold"}}> 入力内容の確認 </div>
          <div> 内容に誤りがないか確認のうえ、［登録］を押してください。  </div>
        </div>

           <div>
              <div className='stpfive-redline'> </div>
              <div className='stp-four-subtext1'> ログイン情報 </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'> メールアドレス </div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div> {username} </div>   
           
                </div>
                
              </div>
              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>パスワード</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div> {password} </div>   

                </div>
                
              </div>
            </div>
       

        {
          customerType === 1 ? 
          <div className='step-four-container2'>
            
           



            

            <div className='step-four-content'>
              <div className='stpfive-redline'> </div>
              <div className='stp-four-subtext1'>お客様情報</div>
              
              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>お客さま種別</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  { 
                    customerType === 1 ? <div> 個人 </div> : 
                    customerType === 2 ? <div> 法人 </div> : null 
                  }
                </div>
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>お名前</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div> {firstName} </div>   
                  <div style={{ marginLeft: "20px" }}> {lastName}  </div>
                </div>
                
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>お名前（カナ）</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div> {firstNameKana} </div>   
                  <div style={{ marginLeft: "20px" }}> {lastNameKana}  </div>
                </div>
                
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>生年月日</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div> {birthdateYear} </div> 年
                  <div style={{ marginLeft: "20px" }}> {birthdateMonth}  </div>月
                  <div style={{ marginLeft: "20px" }}> {birthdateDay}  </div>日
                </div>
                
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>性別</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div> {gender} </div>   
                </div>
                
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>郵便番号</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div style={{ marginRight: "20px" }}> {zipCodeFirst} </div> -  
                  <div style={{ marginLeft: "20px" }}> {zipCodeSecond}  </div>
                </div>
                
              </div>


              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>住所</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div style={{ }}> {prefecture} </div> 
                  <div style={{ marginLeft: "20px" }}> {city}  </div>
                  <div style={{ marginLeft: "20px" }}> {address}  </div>
                  <div style={{ marginLeft: "20px" }}> {buildingNumber}  </div>
                  <div style={{ marginLeft: "20px" }}> {buildingName}  </div>
                </div>
                
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>連絡用電話番号</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div style={{ marginRight: "20px" }}> {phoneFirst} </div>  -
                  <div style={{ marginLeft: "20px", marginRight: "20px" }}> {phoneSecond}  </div> -
                  <div style={{ marginLeft: "20px" }}> {phoneThird}  </div>
                 
                </div>
                
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>携帯電話番号</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div style={{ marginRight: "20px" }}> {phonetwoFirst} </div>  -
                  <div style={{ marginLeft: "20px", marginRight: "20px" }}> {phonetwoSecond}  </div> -
                  <div style={{ marginLeft: "20px" }}> {phonetwoThird}  </div>
                 
                </div>
                
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>勤務先</div>

                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div style={{ marginRight: "20px" }}> {workplaceName} </div> 
                </div>
                
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>勤務先電話番号</div>
                
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div style={{ marginRight: "20px" }}> {phonethreeFirst} </div>  -
                  <div style={{ marginLeft: "20px", marginRight: "20px" }}> {phonethreeSecond}  </div> -
                  <div style={{ marginLeft: "20px" }}> {phonethreeThird}  </div>
                </div>
                
              </div>
  
            </div>
            
          </div> 
          : 
          customerType === 2 ?  
           <div className='step-four-container2'>

            <div className='step-four-content'>
              <div className='step-four-subtitle'>お客様情報</div>
              
              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>お客さま種別</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div> 法人 </div> 
                </div>
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>法人名</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div> {companyName} </div>   
                </div>
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>法人名（カナ）</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div> {companyNameKana} </div>   
                </div>
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>部署名</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div> {companydepartment} </div>   
                </div>
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>部署名（カナ））</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div> {companydepartmentKana} </div>   
                </div>
              </div>

              
              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>担当者名</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div> {personinChargeFirstName} </div>   
                  <div style={{ marginLeft: "20px" }}> {personinChargeLastName}  </div>
                </div>
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>担当者名（カナ）</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div> {personinChargeFirstNameKana} </div>   
                  <div style={{ marginLeft: "20px" }}> {personinChargeLastNameKana}  </div>
                </div>
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>郵便番号</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div style={{ marginRight: "20px" }}> {zipCodeFirst} </div> -  
                  <div style={{ marginLeft: "20px" }}> {zipCodeSecond}  </div>
                </div>
                
              </div>


              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>住所</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div style={{ }}> {prefecture} </div> 
                  <div style={{ marginLeft: "20px" }}> {city}  </div>
                  <div style={{ marginLeft: "20px" }}> {address}  </div>
                  <div style={{ marginLeft: "20px" }}> {buildingNumber}  </div>
                  <div style={{ marginLeft: "20px" }}> {buildingName}  </div>
                </div>
                
              </div>
              
              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>連絡用電話番号</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div style={{ marginRight: "20px" }}> {phoneFirst} </div>  -
                  <div style={{ marginLeft: "20px", marginRight: "20px" }}> {phoneSecond}  </div> -
                  <div style={{ marginLeft: "20px" }}> {phoneThird}  </div>
                 
                </div>
                
              </div>

              <div className=' stp-four-text-container ' > 
                <div className='step-four-subtitle2'>携帯電話番号</div>
                <div style={{ display: 'flex', flexDirection: 'row'  }}>
                  <div style={{ marginRight: "20px" }}> {phonetwoFirst} </div>  -
                  <div style={{ marginLeft: "20px", marginRight: "20px" }}> {phonetwoSecond}  </div> -
                  <div style={{ marginLeft: "20px" }}> {phonetwoThird}  </div>
                 
                </div>
                
              </div>
              
  
            </div>
            
          </div> 
         : 
          null
        }
       
        <div  className="step-four-button-container">
          <button onClick={() => { navigate("/register/stepthree") }} className="register-button-black" style={{marginBottom: "40px"}}> 
          前の画面に戻る
          </button>
          
          <button onClick={() => {  
          if (username === "") {
            alert("問題がおきました。前の画面に戻ってください。");
            navigate("/register/stepone")
          }else{
            handleRegiter();
            
          }
          } }
          className="register-button" style={{marginBottom: "40px"}}> 登録 
          </button> 
          
        </div>


      </div>

      <div className='step-four-footer'>
        <div>©1995-2025 TOYOTA MOTOR CORPORATION. ALL RIGHTS RESERVED.</div>
      </div>
    </div>
  );
}
export default Stepone;