import React from 'react';
import '../../styles/carplan/FixedFooterCarPlay.css';

interface FixedFooterCarPayProps {
    monthlypay: number;
    isUpFrontFee?: boolean;
    upFrontFee?: number; // upfront fee is calculated based on monthly payment with options * 5.6 , it is used to calculate the monthly payment with options
    carname: string;
    cargrade: string;
    bonuspay: number;
}

const FixedFooterCarPay = ({ monthlypay, carname,  cargrade, bonuspay, isUpFrontFee, upFrontFee }: FixedFooterCarPayProps) => {

    // const upfrontfee = 0;
    
    // if( isUpFrontFee === false ) {
    //     setupfrontfee(bonuspay*5.6) 
    // }

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!isUpFrontFee", isUpFrontFee , monthlypay*5.6);

    return (
        <div className="fixed-footer-carplay">
            <div className="footer-header">
                <div className="footer-header-left"> 
                    <div>
                        {carname}
                    </div>
                    <div>
                        {cargrade}
                    </div>
                    
                </div>

                <div className="footer-header-right">
                    <div>
                        月額{monthlypay}円
                    </div>

                    {
                        isUpFrontFee ? (
                            <div>
                                ボーナス月加算額{bonuspay}円
                            </div>
                        ) : (
                            <div>
                                申込金{upFrontFee}円
                            </div>
                        )
                    }
                   
                    
                </div>
            </div>

            
            
        </div>      
    );


}

export default FixedFooterCarPay;