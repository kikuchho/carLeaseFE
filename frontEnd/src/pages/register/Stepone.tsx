import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/stepone.css'; 
import RegisterHeader from '../../components/RegisterHeader';
import { GoLinkExternal } from "react-icons/go";
import { RiExternalLinkFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const Stepone = () => {

    const [isAgreed, setIsAgreed] = React.useState(false);
    const [show, setShow] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Clean up effect to ensure body scroll is restored when component unmounts
    React.useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);




  return (
    <div>
        <RegisterHeader /> 
        
        <div className='step-one-header-container'> <div className='step-one-header'> 利用規約の同意  </div> </div>
        <div className='step-one-container'>
            
           

            <div> 
            「TOYOTAアカウント」は、トヨタグループが提供するさまざまなサービスを安全・快適にご利用いただけるお客さま認証サービスです。
            サービスをご利用いただく前に、本規約を必ずお読みください。
            </div>

            <div className="terms-link-container" > 
                <div 
                className="terms-link" 
                onClick={handleShow}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                > 
                    TOYOTAアカウント利用規約 

                     {isHovered ? 
                            <RiExternalLinkFill size={"20px"} /> : 
                            <GoLinkExternal size={"20px"} />
                    }



                </div>
            </div>
            

                <div className='modal-container' onClick={e => e.stopPropagation()}> 
                {/* Modal */}
                    <Modal show={show} onHide={handleClose} dialogClassName="toyota-modal">
                        <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body className="toyota-modal-body" style={{ height: "1000px" }}>
                            <div className='termandcond-container'>

                                <h2> TOYOTAアカウント利用規約 </h2>
                                <p>
                                    TOYOTAアカウント利用規約（以下「本規約」といいます。）は、トヨタ自動車株式会社（以下「当社」といいます。）が発行する「TOYOTAアカウント」（以下「本アカウント」といいます。）利用条件を定めるものです。
                                </p>
                                <div className='termandcondone'> 第1条 （本規約の適用）  </div>

                                <div>1: 本規約は、本アカウントをご利用になるお客様（以下「利用者」といいます。）と当社との関係一切に適用されます。</div>
                                <div>2: 利用者は、本アカウントを用いて、当社または提携事業者が提供する提携サービス（第2条にて定義します。）にログインし、またはこれらを利用することができます。利用者は、提携サービスをご利用になる場合は、本規約に加えて、提携サービスの利用規約および細則等を遵守するものとします。</div>
                                <div>3: 本アカウントは、日本国内での利用に限定されます。</div>

                                <div className='termandcondone'> 第2条 （定義）  </div>
                                <div> 本規約において使用する用語は、次の各号に定める意味を有するものとします。  </div>

                                <div> 1:「提携サービス」とは、当社または提携事業者が提供する、本アカウントを用いてログインまたは利用することのできる所定のサービスをいいます。</div>
                                <div> 2: 「提携事業者」とは、提携サービスを提供する当社以外の事業者をいいます。</div>
                                <div> 3: 「提携サービスID」とは、提携サービスにて利用者を識別するためにお客様に発行している識別子のうち、当社が指定するものをいいます。</div>
                                <div> 4: 「個人利用者」とは、本規約第5条に基づき本アカウントの利用登録を行う際に「個人区分」を選択した利用者をいいます。</div>
                                <div> 5: 「法人利用者」とは、本規約第5条に基づき本アカウントの利用登録を行う際に「法人区分」を選択した利用者をいいます。</div>
                                <div> 6: 「コネクティッドサービス」とは、当社およびトヨタコネクティッド株式会社が提供する自動車向け情報通信サービス（「T-Connect」「G-Link」等）をいいます。</div>
                                <div> 7: 「コネクティッドサービス契約者」とは、利用者のうち、当社およびトヨタコネクティッド株式会社との間でコネクティッドサービスの利用契約を締結している者をいいます。</div>
                                <div> 8: 「個人情報」とは、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができるものを含みます。）をいいます。</div>

                                <div className='termandcondone'> 第3条（アカウントサービス）  </div>
                                <div> 当社は、本アカウントをご登録された利用者に対して、次の各号に定めるサービス（以下「アカウントサービス」といいます。）を提供いたします。サービス内容は、予告なく追加・変更される場合があります。 </div>

                            </div>
                            
                        </Modal.Body>

                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
               

            

           


            
            <label className="radiocheckcontainer">
                利用規約に同意する
                <input 
                    type="checkbox"
                    checked={isAgreed}
                    onChange={() => setIsAgreed(!isAgreed)}
                />
                <span className="checkmark"></span>
            </label>

            <div  className="step-one-button-container"> 
                <button onClick={() => navigate("/register/steptwo") } className="step-one-button" disabled={!isAgreed} > 次へ </button> 
            </div>


           

        </div>

        <div className='step-one-footer'>
            <div>©1995-2025 TOYOTA MOTOR CORPORATION. ALL RIGHTS RESERVED.</div>
        </div>
        
       
    </div> 
  );
}
export default Stepone;