import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/stepthree.css';
import RegisterHeader from '../../components/RegisterHeader';
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { useCustomerInfoStore, usePasswordStore, useUsernameStore } from '../../store/register-store';
import { FaCheck } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import { IoMdWarning } from 'react-icons/io';
import api from '../../api';


const Stepone = () => {
    //state management 
    const password = usePasswordStore(state => state.password);
    const setPassword = usePasswordStore(state => state.setPassword);

    const userName = useUsernameStore(state => state.username);

    // Customer info store state and actions
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



       
    //password validation usestate 
    const [invalidPassword, setInvalidPassword] = React.useState(0);
    const [invalidRetypedPassword, setInvalidRetypedPassword] = React.useState(0);
    // 0 = valid , 1 = retyped password is not matched 
    // 2 = contain invalid characters , 3 = invalid pw length , 4 = pw empty 

    //customer input validation state 
    const [invalidFirstName, setInvalidFirstName] = React.useState(false);
    const [invalidLastName, setInvalidLastName] = React.useState(false);
    const [invalidFirstNameKana, setInvalidFirstNameKana] = React.useState(false);
    const [invalidLastNameKana, setInvalidLastNameKana] = React.useState(false);
    const [invalidCompanyName, setInvalidCompanyName] = React.useState(false);
    const [invalidCompanyNameKana, setInvalidCompanyNameKana] = React.useState(false);
    
    // Name validation error types: false = valid, true = empty/invalid chars
    const [firstNameError, setFirstNameError] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState('');
    const [firstNameKanaError, setFirstNameKanaError] = React.useState('');
    const [lastNameKanaError, setLastNameKanaError] = React.useState('');
    const [companyNameError, setCompanyNameError] = React.useState('');
    const [companyNameKanaError, setCompanyNameKanaError] = React.useState('');

    // Birthdate and zip code warning states
    const [birthdateWarning, setBirthdateWarning] = React.useState('');
    const [zipCodeWarning, setZipCodeWarning] = React.useState('');

    // Corporate number state
    const [corporateNumber, setCorporateNumber] = React.useState('');
    const [isLoadingCorporateInfo, setIsLoadingCorporateInfo] = React.useState(false);

    const [invalidphoneoneWarning, setInvalidPhoneOneWarning] = React.useState('');
    const [invalidphonetwoWarning, setInvalidPhoneTwoWarning] = React.useState('');
    const [invalidphonethreeWarning, setInvalidPhoneThreeWarning] = React.useState('');
  
    //Retypedpassword cheker 
    const [retypedPassword, setRetypedPassword] = React.useState("");

    //loading state for address lookup
    const [isLoadingAddress, setIsLoadingAddress] = React.useState(false);


    const navigate = useNavigate()


    const handlePassword = (e : any) => {
      // Update the username state with the input value
      setPassword(e.target.value);
      
      console.log("Password", password);
    }


    

    //set retyped password 
    const handlePasswordRetyped = (e: any) => {
        setRetypedPassword(e.target.value);
        console.log("REtypedPassword", retypedPassword);
    }

    //zip code lookup function
    const lookupAddress = async () => {
        if (!zipCode || zipCode.length !== 7) {
            alert("7桁の郵便番号を入力してください");
            return;
        }

        setIsLoadingAddress(true);
        try {
            // Using the zipcloud API for Japanese zip code lookup
            const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`);
            const data = await response.json();
            
            if (data.status === 200 && data.results && data.results.length > 0) {
                const result = data.results[0];
                setPrefecture(result.address1);
                setCity(result.address2);
                setAddress(result.address3);
            } else {
                alert("住所が見つかりませんでした。郵便番号を確認してください。");
            }
        } catch (error) {
            console.error("Address lookup error:", error);
            alert("住所の取得に失敗しました。もう一度お試しください。");
        } finally {
            setIsLoadingAddress(false);
        }
    };

    //handle zip code input
    const handleZipCodeChange = (e: any, index: number) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
        let newZipCodeFirst = zipCodeFirst;
        let newZipCodeSecond = zipCodeSecond;

        if (index === 0) {
          if (value.length <= 3) {
            newZipCodeFirst = value;
            setZipCodeFirst(value);
          }
        } else {
           if (value.length <= 4) {
             newZipCodeSecond = value;
             setZipCodeSecond(value);
           }
        }

        const combinedZipCode = newZipCodeFirst + newZipCodeSecond;
        setZipCode(combinedZipCode);
        console.log("Zip Code:", combinedZipCode, "zip code length:", combinedZipCode.length);
        
        
    };

    // Function to check if a string is Zenkaku Kana (full-width Katakana)
    function isZenkakuKana(s: string) {

      return !!s.match(/^[ァ-ヶー　]*$/);  // 「　」は全角スペースです.
    }

    //change hiragana to katakana
    const hiraToKana = (str: string) => 
      str.replace(/[\u3041-\u3096]/g, (match) => String.fromCharCode(match.charCodeAt(0) + 0x60));

    // Birthdate warning function
    const checkBirthdateWarning = () => {
      if(!birthdateYear && !birthdateMonth && !birthdateDay) {
         setBirthdateWarning(''); // Clear warning if all are empty
      }else{
        if (!birthdateYear || !birthdateMonth || !birthdateDay) {
            setBirthdateWarning('生年月日（西暦）が入力されていません');
        } else if (birthdateYear && birthdateMonth && birthdateDay) {
            setBirthdateWarning(''); // Clear warning if all are filled
        }
      }
        
    };

    // Zip code warning function
    const checkZipCodeWarning = () => {
      if(!zipCodeFirst && !zipCodeSecond) {
         setZipCodeWarning(''); // Clear warning if properly filled
       

      }else{
        if (!zipCodeFirst || !zipCodeSecond || zipCodeFirst.length !== 3 || zipCodeSecond.length !== 4) {
            setZipCodeWarning('郵便番号が正しく入力されていません');
        } else {
            setZipCodeWarning(''); // Clear warning if properly filled
        }
      }   
    };





    // Corporate number lookup function
    const lookupCorporateInfo = async () => {
        if (!corporateNumber || corporateNumber.length !== 13) {
            alert("13桁の法人番号を入力してください");
            return;
        }

        setIsLoadingCorporateInfo(true);

        
        
        try {
            // Using the National Tax Agency Corporate Number System API
            const response = await api.get(`/api/corporate/${corporateNumber}/`);
            const data = response.data;
            
            if (data && data["hojin-infos"] && data["hojin-infos"].length > 0) {
                const corporateInfo = data["hojin-infos"][0];
                setCompanyName(corporateInfo.name || '');
                setCompanyNameKana(hiraToKana(corporateInfo.kana) || '');
                alert("法人情報を取得しました");
            } else {
                alert("法人情報が見つかりませんでした。法人番号を確認してください。");
            }



        } catch (error) {
            console.error("Corporate info lookup error:", error);
            alert("法人情報の取得に失敗しました。もう一度お試しください。");
        } finally {
            setIsLoadingCorporateInfo(false);
        }
    };

    // Handle corporate number input
    const handleCorporateNumberChange = (e: any) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
        if (value.length <= 13) {
            setCorporateNumber(value);
        }
    };


    //check if all the data entered meet the requirement 
    const checkerhandler = () => {
        // Reset invalid password state
        let isvalid = true;
       
        setInvalidPassword(0);
        setInvalidRetypedPassword(0);
        
        // Reset name validation states
        setInvalidFirstName(false);
        setInvalidLastName(false);
        setInvalidFirstNameKana(false);
        setInvalidLastNameKana(false);
        setInvalidCompanyName(false);
        setInvalidCompanyNameKana(false);

        setFirstNameError('');
        setLastNameError('');
        setFirstNameKanaError('');
        setLastNameKanaError('');
        setCompanyNameError('');
        setCompanyNameKanaError('');
        setBirthdateWarning('');
        setZipCodeWarning('');
        setInvalidPhoneOneWarning('');
        setInvalidPhoneTwoWarning('');
        setInvalidPhoneThreeWarning('');

        // Password validation - check conditions separately
        let passwordEmpty = false;
        let retypedPasswordEmpty = false;


        //change state and immidniately after that use that state in in if condition does not 
        //work because React state updates are asynchronous.
        // example of this issue:
        // setInvalidPassword(4);
        // if (invalidPassword === 4) { ... 
        // solution 
        // use let passwordEmpty = false; and use it in if statement  

        if (password === "" || password.length === 0) {
            console.log("Password is empty");
            setInvalidPassword(4);
            passwordEmpty = true;
            isvalid = false;
        }

        if (retypedPassword === "") {
            setInvalidRetypedPassword(4);
            retypedPasswordEmpty = true;
            isvalid = false;
        } 
        
        // Only check password match if both passwords are not empty
        if (!passwordEmpty && !retypedPasswordEmpty && password !== retypedPassword) {
            setInvalidRetypedPassword(1);
            isvalid = false;
        } 
        
        // Only check password format if password is not empty
        if (!passwordEmpty && !/^[a-zA-Z0-9]*$/.test(password)) {
            setInvalidPassword(2);
            isvalid = false;
        }
        
        // Only check password length if password is not empty
        if (!passwordEmpty && (password.length < 8 || password.length > 20)) {
            console.log("Password length is invalid");
            setInvalidPassword(3);
            isvalid = false;
        } 

        // Customer type validation
        if (customerType === 0) {
            isvalid = false;
        }

        // Individual customer validation
        if (customerType === 1) {
            if ( !firstName ) {
                setInvalidFirstName(true);
                setFirstNameError('名を入力してください。');
                isvalid = false;
            } else {
                // Check for invalid characters in firstName
                const invalidChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`]/;
                if (invalidChars.test(firstName)) {
                    setInvalidFirstName(true);
                    setFirstNameError('名に無効な文字が含まれています。');
                    isvalid = false;
                }
            }

            if( !lastName ){
                setInvalidLastName(true);
                setLastNameError('姓を入力してください。');
                isvalid = false;
            } else {
                // Check for invalid characters in lastName
                const invalidChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`]/;
                if (invalidChars.test(lastName)) {
                    setInvalidLastName(true);
                    setLastNameError('姓に無効な文字が含まれています。');
                    isvalid = false;
                }
            }
            
            if (!firstNameKana) {
                setInvalidFirstNameKana(true);
                setFirstNameKanaError('メイを入力してください。');
                isvalid = false;
            } else {
                // Check for invalid characters in firstNameKana (should be katakana)
                const invalidChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`]/;
                if (invalidChars.test(firstNameKana)) {
                    setInvalidFirstNameKana(true);
                    setFirstNameKanaError('メイに無効な文字が含まれています。');
                    isvalid = false;
                }

                if (!isZenkakuKana(firstNameKana)) {
                    setInvalidFirstNameKana(true);
                    setFirstNameKanaError('メイは全角カタカナで入力してください。');
                    isvalid = false;
                }

            }

            if (!lastNameKana) {
                setInvalidLastNameKana(true);
                setLastNameKanaError('セイを入力してください。');
                isvalid = false;
            } else {
                // Check for invalid characters in lastNameKana (should be katakana)
                const invalidChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`]/;
                if (invalidChars.test(lastNameKana)) {
                    setInvalidLastNameKana(true);
                    setLastNameKanaError('セイに無効な文字が含まれています。');
                    isvalid = false;
                }
                if (!isZenkakuKana(lastNameKana)) {
                    setInvalidFirstNameKana(true);
                    setFirstNameKanaError('セイは全角カタカナで入力してください。');
                    isvalid = false;
                }
            }
            
            if (!gender) {
              //optional
                //isvalid = false;
            }
            
            if (!birthdateYear || !birthdateMonth || !birthdateDay) {
              //optional
                //isvalid = false;
            }
        }

        // Company customer validation
        if (customerType === 2) {
            if (!companyName) {
                setInvalidCompanyName(true);
                setCompanyNameError('会社名を入力してください。');
                console.log("Company name is empty");
                isvalid = false;
            }else {
                
                const invalidChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`]/;
                if (invalidChars.test(companyName)) {
                    setInvalidCompanyName(true);
                    setCompanyNameError('会社名に無効な文字が含まれています。');
                    isvalid = false;
                }
            }
            
            
            if (!companyNameKana) {
              setInvalidCompanyNameKana(true);
              setCompanyNameKanaError('会社名（カナ）を入力してください。');
                isvalid = false;
            }else{
                const invalidChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`]/;
                if (invalidChars.test(companyNameKana)) {
                    setInvalidCompanyNameKana(true);
                    setCompanyNameKanaError('会社名（カナ）に無効な文字が含まれています。');
                    isvalid = false;
                }
                
                if (!isZenkakuKana(companyNameKana)) {
                    setInvalidCompanyNameKana(true);
                    setCompanyNameKanaError('会社名（カナ）は全角カタカナで入力してください。');
                    isvalid = false;
                }
            }

            // Company department validation (optional)
            if (companydepartment) {
                const invalidChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`]/;
                if (invalidChars.test(companydepartment)) {
                    // Add error handling for department if needed
                    //isvalid = false;
                }
            }

            if (companydepartmentKana) {
                const invalidChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`]/;
                if (invalidChars.test(companydepartmentKana)) {
                    //isvalid = false;
                }
                
                if (!isZenkakuKana(companydepartmentKana)) {
                    //isvalid = false;
                }
            }

            // Person in charge validation (optional)
            if (personinChargeFirstName) {
                const invalidChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`]/;
                if (invalidChars.test(personinChargeFirstName)) {
                    //isvalid = false;
                }
            }

            if (personinChargeLastName) {
                const invalidChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`]/;
                if (invalidChars.test(personinChargeLastName)) {
                    //isvalid = false;
                }
            }

            if (personinChargeFirstNameKana) {
                const invalidChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`]/;
                if (invalidChars.test(personinChargeFirstNameKana)) {
                    //isvalid = false;
                }
                
                if (!isZenkakuKana(personinChargeFirstNameKana)) {
                    //isvalid = false;
                }
            }

            if (personinChargeLastNameKana) {
                const invalidChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`]/;
                if (invalidChars.test(personinChargeLastNameKana)) {
                    //isvalid = false;
                }
                
                if (!isZenkakuKana(personinChargeLastNameKana)) {
                    //isvalid = false;
                }
            }


            
        }

        if(customerType === 1 ) {
            checkBirthdateWarning(); 
            checkZipCodeWarning();

        }

        // Address validation (common for both individual and company)
        if (!zipCodeFirst || !zipCodeSecond || zipCode.length !== 7) {
            //isvalid = false;
        }
        
        if (!prefecture) {
           //isvalid = false;
        }
        
        if (!city) {
            //isvalid = false;
        }
        
        if (!address) {
            //isvalid = false;
        }
        
        if (!buildingNumber) {
            //isvalid = false;
        }

        // Phone number validation
        if (!phoneFirst || !phoneSecond || !phoneThird) {
            //isvalid = false;
        }
        
        
        if((phoneFirst.length < 3 || phoneSecond.length < 4 || phoneThird.length < 4) && (phoneFirst.length > 0 || phoneSecond.length > 0 || phoneThird.length > 0)){
            setInvalidPhoneOneWarning('電話番号が正しく入力されていません');
          isvalid = false;
        }

        if((phonetwoFirst.length < 3 || phonetwoSecond.length < 4 || phonetwoThird.length < 4) && (phonetwoFirst.length > 0 || phonetwoSecond.length > 0 || phonetwoThird.length > 0)){
            setInvalidPhoneTwoWarning('電話番号が正しく入力されていません');
          isvalid = false;
        }

        if((phonethreeFirst.length < 3 || phonethreeSecond.length < 4 || phonethreeThird.length < 4) && (phonethreeFirst.length > 0 || phonethreeSecond.length > 0 || phonethreeThird.length > 0)){
          setInvalidPhoneThreeWarning('電話番号が正しく入力されていません');  
          isvalid = false;
        }

        // All validations passed
        console.log("All form data is valid:", isvalid);
        return isvalid;
    }


  return (
    <div>
       <RegisterHeader /> 
      <div className='step-three-container'>
        <div className='stpthree-title'> 
          <h2> 新規登録 </h2>
        </div>


       

        <div className='stpthree-bargauge'>   
          <div className='gaugethree'> <div className='stpthreecircleone'> <FaCheck /> </div>  <div style={{fontSize: "13px"}}> メールアドレスの登録 </div>  </div>         
          <div className='gaugethree'> <div className='stpthreecircleone'> 2  </div>  <div style={{fontSize: "13px"}}> 情報の入力 </div>  </div>  
          <div className='gaugethree'> <div className='stpthreecircletwo'> 3  </div>  <div style={{fontSize: "13px"}}> 入力内容の確認 </div>  </div>  
          <div className='gaugethree'> <div className='stpthreecircletwo'> 4  </div>  <div style={{fontSize: "13px"}}> 登録完了 </div>  </div>  
        </div>

        <div className='stpthree-subtitle1'>
          <MdOutlineMarkEmailRead size={"90px"}/>
          {userName}
          <h2>メールアドレスの確認が完了しました。</h2>
          

          <div className='stpthree-subtitle2'>  続けて、「TOYOTAアカウント」の登録に必要な情報の入力に進みます。必須項目を入力し、［確認］を押してください。 </div> 
        </div>
        
     
      <div className='stpthree-redline'>  </div>
      <div className='stpthree-subtitle3'> ログイン情報 </div>

      <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>必須</div> <div>パスワード</div> </div>
      <input 
        className='form-input-stepthree'
        type="password"
        placeholder='パスワードを入力してください'
        onChange={ (e) =>  handlePassword(e) }
      
      />
      {
        invalidPassword === 2 ? (
          <div className='invalid-input-stepthree'> 
            <IoMdWarning />
            パスワードは半角英数字のみ使用してください。
          </div>
        ) : invalidPassword === 3 ? (
          <div className='invalid-input-stepthree'> 
            <IoMdWarning />
            パスワードは8～20文字で入力してください。
          </div>
        ) : invalidPassword === 4 ? (
          <div className='invalid-input-stepthree'> 
            <IoMdWarning />
            パスワードを入力してください。
          </div>
        ) : null
      }

       <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>必須</div> <div>パスワード （確認用）</div> </div>
      <input 
        className='form-input-stepthree'
        type="password"
        placeholder='パスワードをもう一度入力'
        onChange={ (e) =>  handlePasswordRetyped(e) } 

        />
        {
        invalidRetypedPassword === 1 ? (
          <div className='invalid-input-stepthree'> 
            <IoMdWarning />
            パスワードが一致しません。
          </div>
        )  : invalidRetypedPassword === 4 ? (
          <div className='invalid-input-stepthree'> 
            <IoMdWarning />
            パスワードを入力してください。
          </div>
        ) : null
        }

      <div className='stpthree-subtitle5'> 登録できるパスワードについて </div>
      <div> ■ 8～20文字で作成してください。 </div>
      <div> ■ 使用可能文字は、半角英数、一部の記号※となります。 </div>
      <div> ■ 安全性を高めるために、パスワードは必ず半角数字と半角英字の両方を使用してください（※一部の記号は任意）。 </div>
      <div> ※：「-」、「*」、「_」、「!」、「#」、「$」、「%」 </div> 

        <div className='stpthree-redline'>  </div>
      <div className='stpthree-subtitle3'> お客さま情報 </div>
      <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>必須</div> <div> お客さま種別 </div> </div>
      <div className='stpthree-subtitle6-container'>  

        <div onClick={ () => setCustomerType(1)} className='stpthree-subtitle6'> <div className={  `stpthreecircleradio  ${customerType === 1 ?   "onclicked" : ""  }` }> <FaCheck /> </div> <div style={{fontWeight: "bold"}}>個人 </div>  </div>
        <div onClick={ () => setCustomerType(2)} className='stpthree-subtitle6'> <div className={  `stpthreecircleradio  ${customerType === 2 ?   "onclicked" : ""  }` }> <FaCheck /> </div>  <div style={{fontWeight: "bold"}}> 法人 </div> </div>

      </div>
      
      <div> ・ コネクティッドサービスを法人として契約している場合、［法人］を選択してください。</div>
      <div> ・ お客さま種別を［法人］で登録後、お客さま種別の変更はできません。</div>
      <div> ・ 入力中にお客さま種別の変更を行うと、入力中のデータはクリアされます。</div>
      <div> ・ お客さま種別により、ご利用できるサービスに制限があります。 </div>


      { 
        customerType === 0 ? (
          // Display nothing when no customer type is selected
          null
        ) : customerType === 1 ? (
          // Display form for individual customer (個人)
            <div> 
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>必須</div> <div>名前</div> </div>
              <div className='stpthree-input-container1'>
                <div className='form-input-stepthree1-container'>
                  <input 
                  className='form-input-stepthreename'
                  type="text"
                  placeholder='姓'
                  value={lastName}
                  onChange={ (e) =>  setLastName(e.target.value) } 
                  style={{ marginRight: '10px' }}
                  />
                  { invalidLastName ? (
                    <div className='invalid-input-stepthreename'>
                      <IoMdWarning />
                      {lastNameError}
                      </div> ) : <></> 
                  }
                </div>
                
                <div className='form-input-stepthree1-container'>
                   <input 
                    className='form-input-stepthreename'
                    type="text"
                    placeholder='名'
                    value={firstName}
                    onChange={ (e) =>  setFirstName(e.target.value) } 
                    />
                    { invalidFirstName ? (
                      <div className='invalid-input-stepthreename'>
                        <IoMdWarning />
                        {firstNameError}
                        </div> ) : <></> 
                    }
                </div>
               
              </div>

              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>必須</div> <div>名前（カナ）</div> </div>
              <div className='stpthree-input-container1'> 
                <div className='form-input-stepthree1-container'>
                  <input 
                  className='form-input-stepthreename'
                  type="text"
                  placeholder='セイ'
                  value={lastNameKana}
                  onChange={ (e) =>  setLastNameKana(e.target.value) } 
                  style={{ marginRight: '10px' }}
                  />
                  { invalidLastNameKana ? (
                    <div className='invalid-input-stepthreename'>
                      <IoMdWarning />
                      {lastNameKanaError}
                      </div> ) : <></> 
                  }

                </div>
                
                <div className='form-input-stepthree1-container'>
                  <input 
                  className='form-input-stepthreename'
                  type="text"
                  placeholder='メイ'
                  value={firstNameKana}
                  onChange={ (e) =>  setFirstNameKana(e.target.value) } 
                  />
                  { invalidFirstNameKana ? (
                    <div className='invalid-input-stepthreename'>
                      <IoMdWarning />
                      {firstNameKanaError}
                      </div> ) : <></> 
                  }
                </div>
              
              </div>
            

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>性別</div> </div>
              <div className='stpthree-subtitle6-container'>  

                <div  onClick={ () => setGender("male")} className='stpthree-subtitle6'> <div className={  `stpthreecircleradio  ${gender === 'male' ?   "onclicked" : ""  }` }> <FaCheck /> </div> <div style={{fontWeight: "bold"}}> 男性 </div>  </div>
                <div  onClick={ () => setGender('female')} className='stpthree-subtitle6'> <div className={  `stpthreecircleradio  ${gender === 'female' ?   "onclicked" : ""  }` }> <FaCheck /> </div>  <div style={{fontWeight: "bold"}}> 女性 </div> </div>

              </div>

              {/* <div>
                <input 
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male">男性</label>
                </div>
                <div>
                <input 
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female">女性</label>
              </div> */}

            </div>
            
            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>生年月日（西暦）</div> </div>
              <div className='stpthree-input-container2'> 
                <div>     
                  <Form.Select 
                    aria-label="年"
                    value={birthdateYear}
                    onChange={ (e) =>  setBirthdateYear(e.target.value) }
                    //onBlur={checkBirthdateWarning}
                    defaultValue=""
                    style={{ 
                      position: 'static',
                      zIndex: 'auto',
                      width: '243px',
                    }}
                    >
                    <option value="" disabled>年</option>
                    {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                    <option key={year} value={year}>
                      {year}年
                    </option>
                    );
                    })}
                  </Form.Select>
                </div>


                <div>
                  <Form.Select 
                    aria-label="月"
                    value={birthdateMonth}
                    onChange={ (e) =>  setBirthdateMonth(e.target.value) }
                    //onBlur={checkBirthdateWarning}
                    defaultValue=""
                    style={{ 
                      position: 'static',
                      zIndex: 'auto',
                      width: '243px',
                    }}
                  >
                    <option value="" disabled>月</option>
                    {Array.from({ length: 12 }, (_, i) => {
                    const month = 12 - i  ;
                    return (
                    <option key={month} value={month}>
                      {month}月
                    </option>
                    );
                    })}
                  </Form.Select>
               </div>

                <div>
                  <Form.Select 
                    aria-label="日"
                    value={birthdateDay}
                    onChange={ (e) =>  setBirthdateDay(e.target.value) }
                    //onBlur={checkBirthdateWarning}
                    defaultValue=""
                    style={{ 
                      position: 'static',
                      zIndex: 'auto',
                      width: '243px',
                    }}
                  >
                    <option value="" disabled>日</option>
                    {Array.from({ length: 31 }, (_, i) => {
                    const day = 31 - i;
                    return (
                    <option key={day} value={day}>
                      {day}日
                    </option>
                    );
                    })}
                  </Form.Select>
                </div>

              </div>
             
            </div>

            

            {/* Birthdate warning message */}
            {birthdateWarning && (
              <div style={{ color: 'red', display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                <IoMdWarning style={{ marginRight: '5px' }} />
                {birthdateWarning}
              </div>
            )}

            <div style={{fontWeight: "bold", fontSize: "20px"}}>  <div>住所</div> </div>

            <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div>   <div>郵便番号</div></div>

            <div className='stpthree-input-container3'>
              
              <input 
                className='form-input-stepthreezipcode'
                type="text"
                placeholder='例) 123'
                value={zipCodeFirst}
                onChange={(e) => handleZipCodeChange(e,0)}
                maxLength={7}
               
              />
              -
              <input 
                className='form-input-stepthreezipcode'
                type="text"
                placeholder='例) 1234'
                value={zipCodeSecond}
                onChange={(e) => handleZipCodeChange(e,1)}
                maxLength={7}
                
              />

                

              <button 
                type="button"
                onClick={lookupAddress}
                disabled={isLoadingAddress || zipCode.length  !== 7}
                style={{ 
                  marginLeft: '10px',
                  padding: '8px 16px',
                  backgroundColor: isLoadingAddress ||  zipCode.length !== 7 ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isLoadingAddress || zipCode.length !== 7 ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoadingAddress ? '取得中...' : '住所自動入力'}
              </button>
            </div>

            {/* Zip code warning message */}
            {zipCodeWarning && (
              <div style={{ color: 'red', display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                <IoMdWarning style={{ marginRight: '5px' }} />
                {zipCodeWarning}
              </div>
            )}

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>都道府県</div></div>
              <Form.Select
                className='step-three-input'
                value={prefecture}
                onChange={(e) => setPrefecture(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="">都道府県を選択</option>
                <option value="北海道">北海道</option>
                <option value="青森県">青森県</option>
                <option value="岩手県">岩手県</option>
                <option value="宮城県">宮城県</option>
                <option value="秋田県">秋田県</option>
                <option value="山形県">山形県</option>
                <option value="福島県">福島県</option>
                <option value="茨城県">茨城県</option>
                <option value="栃木県">栃木県</option>
                <option value="群馬県">群馬県</option>
                <option value="埼玉県">埼玉県</option>
                <option value="千葉県">千葉県</option>
                <option value="東京都">東京都</option>
                <option value="神奈川県">神奈川県</option>
                <option value="新潟県">新潟県</option>
                <option value="富山県">富山県</option>
                <option value="石川県">石川県</option>
                <option value="福井県">福井県</option>
                <option value="山梨県">山梨県</option>
                <option value="長野県">長野県</option>
                <option value="岐阜県">岐阜県</option>
                <option value="静岡県">静岡県</option>
                <option value="愛知県">愛知県</option>
                <option value="三重県">三重県</option>
                <option value="滋賀県">滋賀県</option>
                <option value="京都府">京都府</option>
                <option value="大阪府">大阪府</option>
                <option value="兵庫県">兵庫県</option>
                <option value="奈良県">奈良県</option>
                <option value="和歌山県">和歌山県</option>
                <option value="鳥取県">鳥取県</option>
                <option value="島根県">島根県</option>
                <option value="岡山県">岡山県</option>
                <option value="広島県">広島県</option>
                <option value="山口県">山口県</option>
                <option value="徳島県">徳島県</option>
                <option value="香川県">香川県</option>
                <option value="愛媛県">愛媛県</option>
                <option value="高知県">高知県</option>
                <option value="福岡県">福岡県</option>
                <option value="佐賀県">佐賀県</option>
                <option value="長崎県">長崎県</option>
                <option value="熊本県">熊本県</option>
                <option value="大分県">大分県</option>
                <option value="宮崎県">宮崎県</option>
                <option value="鹿児島県">鹿児島県</option>
                <option value="沖縄県">沖縄県</option>
              </Form.Select>
            </div>

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>市区町村</div></div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='市区町村'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
               <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>町域</div></div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='町域'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>番地</div></div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='番地'
                value={buildingNumber}
                onChange={(e) => setBuildingNumber(e.target.value)}
              />
            </div>

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>建物名</div></div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='建物名'
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
              />
            </div>

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>連絡用電話番号</div> </div>
              <input 
                className='form-input-stepthreephonenumber'
                type="text" 
                placeholder="例) 090"
                maxLength={3}
                value={phoneFirst || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 3) setPhoneFirst(val);
                }}
                style={{}}
              />
              -
              <input 
                className='form-input-stepthreephonenumber'
                type="text"
                placeholder="1234"
                maxLength={4}
                value={phoneSecond || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 4) setPhoneSecond(val);
                }}
                style={{ marginLeft: '20px' }}
              />
              -
              <input 
                className='form-input-stepthreephonenumber'
                type="text"
                placeholder="5678"
                maxLength={4}
                value={phoneThird || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 4) setPhoneThird(val);
                }}
                style={{ marginLeft: '20px'}}
              />
              {
                invalidphoneoneWarning && (
                  <div className='invalid-input-stepthree'> 
                    <IoMdWarning />
                    <div>{invalidphoneoneWarning}</div>
                  </div>
                )
              }
            </div>

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>携帯電話番号</div> </div>
              <input 
                className='form-input-stepthreephonenumber'
                type="text" 
                placeholder="例) 090"
                maxLength={3}
                value={phonetwoFirst || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 3) setPhonetwoFirst(val);
                }}
                style={{  }}
              />
              -
              <input 
                className='form-input-stepthreephonenumber'
                type="text"
                placeholder="1234"
                maxLength={4}
                value={phonetwoSecond || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 4) setPhonetwoSecond(val);
                }}
                style={{ marginLeft: '20px' }}
              />
              -
              <input 
                className='form-input-stepthreephonenumber'
                type="text"
                placeholder="5678"
                maxLength={4}
                value={phonetwoThird || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 4) setPhonetwoThird(val);
                }}
                style={{ marginLeft: '20px' }}
              />
               {
                invalidphonetwoWarning && (
                  <div className='invalid-input-stepthree'> 
                    <IoMdWarning />
                    <div>{invalidphonetwoWarning}</div>
                  </div>
                )
              }
            </div>

            <div>
             <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div>  <div>勤務先電話番号</div> </div>
              <input 
                className='form-input-stepthreephonenumber'
                type="text" 
                placeholder="例) 090"
                maxLength={3}
                value={phonethreeFirst || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 3) setPhonethreeFirst(val);
                }}
                style={{  }}
              />
              -
              <input 
                className='form-input-stepthreephonenumber'
                type="text"
                placeholder="1234"
                maxLength={4}
                value={phonethreeSecond || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 4) setPhonethreeSecond(val);
                }}
                style={{ marginLeft: '20px' }}
              />
              -
              <input 
                className='form-input-stepthreephonenumber'
                type="text"
                placeholder="5678"
                maxLength={4}
                value={phonethreeThird || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 4) setPhonethreeThird(val);
                }}
                style={{ marginLeft: '20px' }}
              />
              {
                invalidphonethreeWarning && (
                  <div className='invalid-input-stepthree'> 
                    <IoMdWarning />
                    <div>{invalidphonethreeWarning}</div>
                  </div>
                )
              }


            </div>

            <div>
            <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div>     <div>勤務先</div> </div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='例) トヨタ自動車株式会社'
                value={workplaceName}
                onChange={(e) => setworkplaceName(e.target.value)}
              />
            </div>
            <div>※お勤め先がない方は「なし」と入力してください。</div>

            </div>
        ) : customerType === 2 ? (







          // Display form for company customer (法人)







         <div> 
            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>法人番号</div></div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='例) 1234567890123'
                value={corporateNumber}
                onChange={handleCorporateNumberChange}
                maxLength={13}
                style={{ width: '500px' }}
              />
              <button 
                type="button"
                onClick={lookupCorporateInfo}
                disabled={isLoadingCorporateInfo || corporateNumber.length !== 13}
                style={{ 
                  marginLeft: '10px',
                  padding: '8px 16px',
                  backgroundColor: isLoadingCorporateInfo || corporateNumber.length !== 13 ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isLoadingCorporateInfo || corporateNumber.length !== 13 ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoadingCorporateInfo ? '取得中...' : '法人情報自動入力'}
              </button>

              <div> ※法人番号は、国税庁が各法人に対して付与する13桁の番号です。法人番号を入力し［自動入力］を押すと、法人番号にひも付く法人情報を呼び出して入力欄に自動反映させることができます。 </div>
            </div>
            
            <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>必須</div> <div>法人名</div></div>
            <input 
            className='form-input-stepthreeaddress'
            type="text"
            placeholder='法人名'
            value={companyName}
            onChange={ (e) =>  setCompanyName(e.target.value) } 
            />
            { invalidCompanyName ? (
              <div className='invalid-input-stepthree'>
                <IoMdWarning />
                {companyNameError}
                </div> ) : <></> 
            }

            <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>必須</div> <div>法人名（カナ）</div></div>

            <input 
            className='form-input-stepthreeaddress'
            type="text"
            placeholder='法人名（カナ）'
            value={companyNameKana}
            onChange={ (e) =>  setCompanyNameKana(e.target.value) } 
            />
            { invalidCompanyNameKana ? (
              <div className='invalid-input-stepthree'>
                <IoMdWarning />
                {companyNameKanaError}
                </div> ) : <></> 
            }

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>部署名</div></div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='部署名'
                value={companydepartment}
                onChange={ (e) =>  setcompanydepartment(e.target.value) } 
              />
            </div>

            <div>
               <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div><div>部署名（カナ）</div></div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='部署名（カナ）'
                value={companydepartmentKana}
                onChange={ (e) =>  setcompanydepartmentKana(e.target.value) } 
              />
            </div>

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div><div>担当者名</div></div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='姓'
                value={personinChargeLastName}
                onChange={ (e) =>  setpersoninChargeLastName(e.target.value) } 
                style={{ marginRight: '50px', width: '325px' }}
              />
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='名'
                value={personinChargeFirstName}
                onChange={ (e) =>  setpersoninChargeFirstName(e.target.value) } 
                style={{  width: '325px' }}
              />
            </div>

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div><div>担当者名（カナ）</div></div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='セイ'
                value={personinChargeLastNameKana}
                onChange={ (e) =>  setpersoninChargeLastNameKana(e.target.value) } 
                style={{ marginRight: '50px', width: '325px' }}
              />
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='メイ'
                value={personinChargeFirstNameKana}
                onChange={ (e) =>  setpersoninChargeFirstNameKana(e.target.value) } 
                style={{  width: '325px' }}
              />
            </div>


             <div style={{fontWeight: "bold", fontSize: "20px"}}>  <div>住所</div> </div>
           <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>郵便番号</div></div>

            <div className='stpthree-input-container3'>
              
              <input 
                className='form-input-stepthreezipcode'
                type="text"
                placeholder='例) 123'
                value={zipCodeFirst}
                onChange={(e) => handleZipCodeChange(e,0)}
                maxLength={7}
               
              />
              -
              <input 
                className='form-input-stepthreezipcode'
                type="text"
                placeholder='例) 1234'
                value={zipCodeSecond}
                onChange={(e) => handleZipCodeChange(e,1)}
                maxLength={7}
                
              />

                

              <button 
                type="button"
                onClick={lookupAddress}
                disabled={isLoadingAddress || zipCode.length  !== 7}
                style={{ 
                  marginLeft: '10px',
                  padding: '8px 16px',
                  backgroundColor: isLoadingAddress ||  zipCode.length !== 7 ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isLoadingAddress || zipCode.length !== 7 ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoadingAddress ? '取得中...' : '住所自動入力'}
              </button>
            </div>

            {/* Zip code warning message */}
            {zipCodeWarning && (
              <div style={{ color: 'red', display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                <IoMdWarning style={{ marginRight: '5px' }} />
                {zipCodeWarning}
              </div>
            )}

            <div>
             <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div>   <div>都道府県</div> </div>
              <Form.Select
                className='step-three-input'
                value={prefecture}
                onChange={(e) => setPrefecture(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="">都道府県を選択</option>
                <option value="北海道">北海道</option>
                <option value="青森県">青森県</option>
                <option value="岩手県">岩手県</option>
                <option value="宮城県">宮城県</option>
                <option value="秋田県">秋田県</option>
                <option value="山形県">山形県</option>
                <option value="福島県">福島県</option>
                <option value="茨城県">茨城県</option>
                <option value="栃木県">栃木県</option>
                <option value="群馬県">群馬県</option>
                <option value="埼玉県">埼玉県</option>
                <option value="千葉県">千葉県</option>
                <option value="東京都">東京都</option>
                <option value="神奈川県">神奈川県</option>
                <option value="新潟県">新潟県</option>
                <option value="富山県">富山県</option>
                <option value="石川県">石川県</option>
                <option value="福井県">福井県</option>
                <option value="山梨県">山梨県</option>
                <option value="長野県">長野県</option>
                <option value="岐阜県">岐阜県</option>
                <option value="静岡県">静岡県</option>
                <option value="愛知県">愛知県</option>
                <option value="三重県">三重県</option>
                <option value="滋賀県">滋賀県</option>
                <option value="京都府">京都府</option>
                <option value="大阪府">大阪府</option>
                <option value="兵庫県">兵庫県</option>
                <option value="奈良県">奈良県</option>
                <option value="和歌山県">和歌山県</option>
                <option value="鳥取県">鳥取県</option>
                <option value="島根県">島根県</option>
                <option value="岡山県">岡山県</option>
                <option value="広島県">広島県</option>
                <option value="山口県">山口県</option>
                <option value="徳島県">徳島県</option>
                <option value="香川県">香川県</option>
                <option value="愛媛県">愛媛県</option>
                <option value="高知県">高知県</option>
                <option value="福岡県">福岡県</option>
                <option value="佐賀県">佐賀県</option>
                <option value="長崎県">長崎県</option>
                <option value="熊本県">熊本県</option>
                <option value="大分県">大分県</option>
                <option value="宮崎県">宮崎県</option>
                <option value="鹿児島県">鹿児島県</option>
                <option value="沖縄県">沖縄県</option>
              </Form.Select>
            </div>

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>市区町村</div> </div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='市区町村'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>町域</div> </div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='町域'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>番地</div>  </div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='番地'
                value={buildingNumber}
                onChange={(e) => setBuildingNumber(e.target.value)}
              />
            </div>

            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>建物名</div> </div>
              <input 
                className='form-input-stepthreeaddress'
                type="text"
                placeholder='建物名'
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
              />
            </div>


            <div>
              <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div> <div>連絡用電話番号</div> </div>
              <input 
                className='form-input-stepthreephonenumber'
                type="text"
                placeholder="例) 090"
                maxLength={3}
                value={phoneFirst || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 3) setPhoneFirst(val);
                }}
                style={{  }}
              />
              -
              <input 
                className='form-input-stepthreephonenumber'
                type="text"
                placeholder="1234"
                maxLength={4}
                value={phoneSecond || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 4) setPhoneSecond(val);
                }}
                style={{ marginLeft: '20px'}}
              />
              -
              <input 
                className='form-input-stepthreephonenumber'
                type="text"
                placeholder="5678"
                maxLength={4}
                value={phoneThird || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 4) setPhoneThird(val);
                }}
                style={{ marginLeft: '20px' }}
              />

               {
                invalidphoneoneWarning && (
                  <div className='invalid-input-stepthree'> 
                    <IoMdWarning />
                    <div>{invalidphoneoneWarning}</div>
                  </div>
                )
              }

            </div>

            <div>
             <div className='stpthree-subtitle4-container'> <div className='stpthree-subtitle4'>任意</div>  <div>携帯電話番号</div> </div>
              <input 
                className='form-input-stepthreephonenumber'
                type="text" 
                placeholder="例) 090"
                maxLength={3}
                value={phonetwoFirst || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 3) setPhonetwoFirst(val);
                }}
                style={{}}
              />
              -
              <input 
                className='form-input-stepthreephonenumber'
                type="text"
                placeholder="1234"
                maxLength={4}
                value={phonetwoSecond || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 4) setPhonetwoSecond(val);
                }}
                style={{marginLeft: '20px'}}
              />
              -
              <input 
                className='form-input-stepthreephonenumber'
                type="text"
                placeholder="5678"
                maxLength={4}
                value={phonetwoThird || ''}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 4) setPhonetwoThird(val);
                }}
                style={{marginLeft: '20px' }}
              />
               {
                invalidphonetwoWarning && (
                  <div className='invalid-input-stepthree'> 
                    <IoMdWarning />
                    <div>{invalidphonetwoWarning}</div>
                  </div>
                )
              }
            </div>

            </div>
        ) : null
      }
      
      <div  className="step-three-button-container"> <button onClick={() => {  
        //if all inputs are valid, navigate to next page 
        if( checkerhandler() ){
              navigate("/register/stepfour")
        }}
        } className="step-three-button"> 確認 </button> </div>
    
      
     </div>
      <div className='step-three-footer'>
        <div>©1995-2025 TOYOTA MOTOR CORPORATION. ALL RIGHTS RESERVED.</div>
      </div>
    </div>
  );
}
export default Stepone;