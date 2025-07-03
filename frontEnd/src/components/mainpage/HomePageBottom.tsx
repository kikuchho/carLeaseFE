import React from 'react';
import '../../styles/HomePageBottom.css';
import diagL from '../../assets/diagL.png';
import diagR from '../../assets/diagR.png';
import pt03_icon1 from '../../assets/pt03_icon1.png';
import pt03_icon2 from '../../assets/pt03_icon2.png';
import pt03_icon3 from '../../assets/pt03_icon3.png';
import pt03_icon4 from '../../assets/pt03_icon4.png';
import pt03_icon5 from '../../assets/pt03_icon5.png';
import ico_calculator from '../../assets/ico-calculator-blue.svg'; 
import ico_shop from '../../assets/ico-shop-blue.svg'; 
import bnr5 from '../../assets/bnr5.jpg'; 
import bnr6 from '../../assets/bnr6.jpg'; 
import bnr7 from '../../assets/bnr7.png'; 
import toyotimes from '../../assets/toyotimes.png'; 
import { IoIosArrowForward } from "react-icons/io"; 
import youtube_logo from '../../assets/SNS/youtube_logo.jpg'; 
import X_logo from '../../assets/SNS/X_logo.webp'; 
import Line_logo from '../../assets/SNS/LINE_logo.svg.webp'; 
import Facebook_logo from '../../assets/SNS/Facebook-logo.png'; 
import instagram_logo from '../../assets/SNS/instagram_logo.avif';

const HomePageBottom = () => {

    return (
        <div className='home-page-bottom-master-container'>
            <div className="home-page-bottom-container">
                <div className='title-container'>
                    <img src={diagL} alt="L" className="titleimg" />
                    <div className='fifthpoint-title'>   まだまだあるKINTOの魅力    </div>
                    <img src={diagR} alt="R" className="titleimg" />
                </div>

                <div className='grid-container-HomePageBottom'>
                    <div className='grid-item1'>  <img src={pt03_icon1} alt="Home Page Image" className='grid-img'/> 
                        <div className='HPB-grid-text'> 
                            <div>24時間WEBから </div>
                            <div>カンタン申し込み </div>
                        </div>
                    </div>
                    <div className='grid-item2'>  <img src={pt03_icon2} alt="Home Page Image" className='grid-img'/> 
                        <div className='HPB-grid-text'> 
                            <div>クレジットカード</div>
                            <div>払いでポイントが</div>
                            <div>貯まる</div>
                        </div>
                    </div>
                    <div className='grid-item3'>  <img src={pt03_icon3} alt="Home Page Image" className='grid-img'/> 
                        <div className='HPB-grid-text'> 
                            <div>家族、友人が乗って</div>
                            <div>も保険対象</div>
                            <div>（任意保険適用）</div>
                        </div>
                    </div>
                    <div className='grid-item4'>  <img src={pt03_icon4} alt="Home Page Image" className='grid-img'/> 
                        <div className='HPB-grid-text'> 
                            <div>万が一の事故でも</div>    
                            <div>修理費用負担の上限</div>   
                            <div>は50,000円</div>   
                        </div>

                        
                    </div>
                    <div className='grid-item5'>  <img src={pt03_icon5} alt="Home Page Image" className='grid-img'/> 
                        <div className='HPB-grid-text'> 
                            <div>法人もコミコミ月額</div>
                            <div>定額で嬉しい</div>
                        </div>
                    </div>
                </div>
            
                    
            </div> 
            <div className='bottombutton-containerHPB'>
                    <div className="bottombuttonHPB"> <p className="bottombuttonTXTHPB"> 気になる車種をWEB見積り  </p> <img src={ico_calculator} className="bottombuttonimgHPB" /> </div> 
                    <div className="bottombuttonHPB"> <p className="bottombuttonTXTHPB"> 販売店に行く  </p> <img src={ico_shop} className="bottombuttonimgHPB" /> </div>    
            </div>

            <div className='ads-container'>
               
                <img src={bnr5} alt="Ad 1" className='ad-img1' />
                <img src={bnr6} alt="Ad 1" className='ad-img1' />
                <img src={bnr7} alt="Ad 1" className='ad-img1' />
            
            </div>

            <div className='termsandcond-container'>
                <div className='termsandcond1'>
                    <div> <span className="term-marker">＊1</span>  </div>
                    <div className='termsandcondtext1'> 新車1ヶ月点検及び12ヶ月法定点検を実施いたします。油脂類及び消耗品の交換補充はメンテナンスノート記載の交換時期もしくは走行距離に応じ実施いたします。</div>
                </div>
                
                <div className='termsandcond2'>
                    <div> <span className="term-marker">＊2</span>   </div>
                    <div className='termsandcondtext2'> 以下はサービスに含まれておりません。 燃料代、駐車場代、高速道路通行料、洗車代、事故修理費用、お客様の故意・過失によるトラブル対処費用、タイヤの購入及び装着費用、転居時の陸送費用、契約車両をご使用できないことで発生する費用（宿泊費用・休業保障等）</div>
                </div>

                <div className='termsandcond3'> ※掲載の内容は2025年6月現在のものです。 </div>
            </div>

            <div className='HomeFooterContainer-master'>
                <div className='HomeFooterContainer'>
                    <div className='HomeFooteritem1'> <div className='footerbutton1'> <div> FAQ ・ お問い合わせ </div>  <IoIosArrowForward />  </div> </div>
                    <div className='HomeFooteritem2'> 
                        <div className='HomeFooteritem2-column'>
                            <div className='footertext'> 関連サイト </div>
                            <div className='footersubtext'> トヨタ自動車企業サイト </div>
                            <div className='footersubtext'> トヨタイムズ </div>
                            <div className='footersubtext'> TOYOTA GAZOO Racing </div>
                        </div>
                        
                    </div>
                    <div className='HomeFooteritem3'> 

                        <div className='HomeFooteritem3-row'>
                            <div className='HomeFooteritem3-column1'>
                                <div className='footertext'>関連サービス</div>
                                <div className='footersubtext'> GAZOO</div>
                                <div className='footersubtext'> トヨタ中古車オンラインストア </div>
                                <div className='footersubtext'> クルマ買取 </div>
                                <div className='footersubtext'> トヨタレンタカー</div>
                            </div>

                            <div className='HomeFooteritem3-column2'>
                                <div className='columnempty'> </div>
                                <div className='footersubtext'> KINTO </div>
                                <div className='footersubtext' style={{height: "48px"}} > TOYOTA SHARE</div>
                                <div className='footersubtext'> トヨタのau </div>
                                <div className='footersubtext'> 法人向けカーリース </div>
                            </div>
                        

                        </div>
                    </div> 
                    <div className='HomeFooteritem4'> 
                        <div className='HomeFooteritem4-column'>
                            <div className='footertext'> 公式SNS  </div>
                            <div className='HomeFootersns-container'> 
                                <div>  <img src={Line_logo} alt="Home Page Image" className='snslogo'/>   </div>
                                <div> <img src={X_logo} alt="Home Page Image" className='snslogo'/>  </div>
                                <div> <img src={Facebook_logo} alt="Home Page Image" className='snslogo'/>  </div>
                                <div> <img src={youtube_logo} alt="Home Page Image" className='snslogo'/>  </div>
                            </div>
                            <div>
                                <div> <img src={instagram_logo} alt="Home Page Image" className='snslogo'/>  </div>
                            </div>
                            <div> 
                                <div> <img src={toyotimes} alt="Home Page Image" className=''/>  </div>
                            </div>
                            <div>
                                <div style={{width: "150px", fontSize: "16px", fontWeight: "700"}} > TOYOTA Mail Magazine </div>
                            
                                <div className='toyotamagazine footersubtext'> <div style={{marginRight: "10px"}}> 登録はこちら </div> <IoIosArrowForward /> </div>
                            </div>
                            
                        </div>
                        
                        

                    </div>

                </div>
                <div className='HomeFooteritem5'> 
                    <div> サイトマップ </div> 
                    <div> サイト利用について </div>
                    <div> 個人情報の取扱いについて </div> 
                    <div> TOYOTAアカウント利用規約 </div> 
                    <div> 反社会的勢力に対する基本方針 </div> 
                    <div> 企業情報 リコール情報 </div> 
                </div>
            </div>

    </div>
    );
}

export default HomePageBottom;