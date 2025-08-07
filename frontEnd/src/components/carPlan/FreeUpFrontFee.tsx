
import react from 'react';
import '../../styles/carplan/FreeUpFrontFee.css';

interface FreeUpFrontFeeProps {
    contractTerm: number;
    setContractTerm: (contractTerm : any) => void;
    bonusPayment: number;
    setBonusPayment: (bonusPayment : any) => void;
    isUpFrontFee?: boolean;
}


const FreeUpFrontFee = ({ contractTerm, setContractTerm, bonusPayment, setBonusPayment, isUpFrontFee     } : FreeUpFrontFeeProps) => {
    return (
        <>
            {isUpFrontFee ? (
            <div className='free-up-front-fee-container' >
                <h4> ご契約期間 </h4>
                <div className='free-up-front-fee-options' style={{ marginBottom: '50px' }}> 
                    <div className={`free-up-front-fee-button ${contractTerm === 3? "option-selected" : ""} `} onClick={() => {  return (setContractTerm(3) ) } }>
                        <div > 3年 </div>
                    </div>
                    <div className={`free-up-front-fee-button ${contractTerm === 5? "option-selected" : ""} `} onClick={() =>{  return (setContractTerm(5) ) }    }>
                        5年
                    </div>
                    <div className={`free-up-front-fee-button ${contractTerm === 7? "option-selected" : ""} `} onClick={() => {  return (setContractTerm(7) ) } }>
                        7年
                    </div>
                </div>
                
                <h4> ボーナス月加算額 </h4>
                <div className='free-up-front-fee-options' > 
                    <div className={`free-up-front-fee-button ${bonusPayment === 0? "option-selected" : ""} `} onClick={() => setBonusPayment(0)}>
                        なし
                    </div>
                    <div className={`free-up-front-fee-button ${bonusPayment === 55000? "option-selected" : ""}`} onClick={() => setBonusPayment(55000)}>
                        5.5万円 
                    </div>
                    <div className={`free-up-front-fee-button ${bonusPayment === 110000? "option-selected" : ""}`} onClick={() => setBonusPayment(110000)}>
                        11万円
                    </div>
                </div>
                <div style={{fontSize: "12px"}}>※法人名義の場合はボーナス併用払いをご利用いただけません</div>
                <div style={{fontSize: "12px"}}>※ボーナス月(1月・7月)は、月額利用料＋ボーナス月加算額の設定額をお支払いいただきます</div>
            </div>
            ):(
                <div className='free-up-front-fee-container' >
                    <h4> ご契約期間 </h4>
                    <div className='free-up-front-fee-options' style={{ marginBottom: '50px' }}> 
                    
                        <div className={`free-up-front-fee-button ${contractTerm === 3? "option-selected" : ""} `} onClick={() => {  return (setContractTerm(3) ) } }>
                            <div > 3年 </div>
                        </div>
                    </div>
                </div>
            )}
        </>
        
    )
}

export default FreeUpFrontFee;