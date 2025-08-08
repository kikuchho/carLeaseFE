import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { IoFilter } from "react-icons/io5";
import { FaGasPump } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { FaCheck } from "react-icons/fa6";
import '../../styles/carplan/GradeList.css'
import type { CarOption } from '../../pages/CarPlan';



interface GradeListProps {
  grades: any[]; // Replace with your actual gradelist type
  selectedGrade: any | null;
  setSelectedGrade: (grade: any) => void;
  setSelectedColor: (color: any) => void;
  isUpFrontFee: boolean;
  monthlyPayment: number;
  calculateUpFrontFee: (monthlyPayment: number, price: number) => number;
  caroptions: CarOption ; // Optional, if you need car options for image path
}


const GradeList = ({
  grades, 
  selectedGrade, 
  setSelectedGrade, 
  setSelectedColor,
  isUpFrontFee,
  monthlyPayment,
  calculateUpFrontFee,
  caroptions,
}: GradeListProps)=> {

const [show, setShow] = useState(false);
const [selectedEngineTypes, setSelectedEngineTypes] = useState<string[]>([]);
const [selectedDriveTypes, setSelectedDriveTypes] = useState<string[]>([]);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

// Filter grades based on selected filters
const filteredGrades = grades.filter(grade => {
    // If no engine types are selected, include all
    if ( selectedEngineTypes.length === 0 ) return true;
    // Check if the grade's engine type is in the selected types
    return selectedEngineTypes.includes(grade.gasType);
}).filter(grade => {
    // If no drive types are selected, include all
    if(selectedDriveTypes.length === 0) return true;
    // Check if the grade's drive type is in the selected types
    return selectedDriveTypes.includes(grade.wheelDrive);
})

// Helper function to toggle selections
const toggleEngineType = (type: string) => {
     setSelectedEngineTypes(prev => 
     
        prev.includes(type)
            ? prev.filter(t => t !== type) // Remove if already selected
            : [...prev, type] // Add if not selected
     
     )
}

const toggleDriveType = (type: string) => {
    setSelectedDriveTypes(prev => 
        //find if the types are already selected or not 
        prev.includes(type) ? 
        prev.filter(t => t !== type)
        :
        [...prev, type]
    );
}



// Count how many grades match each filter type
const gasolineCount = grades.filter(grade => grade.gasType === "ガソリン").length;
const hybridCount = grades.filter(grade => grade.gasType === "ハイブリッド").length;
const twoWDCount = grades.filter(grade => grade.wheelDrive === "2WD").length;
const fourWDCount = grades.filter(grade => grade.wheelDrive === "4WD").length;

// Helper for display text in filter button
const getFilterDisplayText = () => {
const engineText = selectedEngineTypes.join('・');
const driveText = selectedDriveTypes.join('・');

if (engineText && driveText) {
    return `${engineText}, ${driveText}`;
}
return engineText || driveText;
};


return (
    <div>
      <h3>グレード選択:</h3>
      <div style={{color: "red", fontSize: "13px", marginBottom: "10px"}}> 
        ＜納期目処：GAS1.5～3ヶ月程度/HEV3～4ヶ月程度＞
        ※生産状況等の変化により、納期目処より遅れる可能性があります 
      </div>
      <div  style={{marginTop: "10px", marginBottom: "10px", display: "flex",justifyContent:"space-between", alignItems: "center"}}> 
      <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
        該当件数: <div style={{fontSize: "19px", fontWeight: "bold", paddingBottom: "5px"}}> {filteredGrades.length} / {grades.length} </div> 件
      </div>
      <div onClick={handleShow} className='filter-button'>
        <IoFilter /> <div style={{paddingLeft: "10px"}}> グレードを絞り込む  </div>
       {/* {(selectedEngineTypes.length > 0 || selectedDriveTypes.length > 0) && (
          <span className="filter-display-text">
            {getFilterDisplayText()}
          </span>

       )} */}
      </div>


      </div>
      

      <Modal show={show} onHide={handleClose} className="grade-filter-modal">
        <Modal.Header closeButton>
          <Modal.Title>グレード絞り込み</Modal.Title>
        </Modal.Header>
        <Modal.Body className="grade-filter-body">
          {/* All selection option */}
          <div 
            className={`filter-option ${selectedEngineTypes.length === 0 && selectedDriveTypes.length === 0 ? 'filter-option-active' : ''}`}
            onClick={() => {
              setSelectedEngineTypes([]);
              setSelectedDriveTypes([]);
            }}
          >
            <div> 全選択 </div> 
           
            {selectedDriveTypes.length === 0 && selectedEngineTypes.length === 0 ? <div className="grade-list-checkmark"><FaCheck color='white'/></div> : <div className="grade-list-unchekced"> </div> }
          </div>

          <div className='gradelist-border'> </div>

          {/* Engine type section */}
          <div className="filter-section">
            
            <div 
              className={`filter-option ${selectedEngineTypes.includes('ガソリン')  ? 'filter-option-active' : ''}`}
              onClick={() => toggleEngineType('ガソリン')}
            >
              <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}> <div> <FaGasPump /> </div> <div style={{paddingLeft:"10px"}}>  ガソリン </div>  </div>
              {selectedEngineTypes.includes('ガソリン') ? <div className="grade-list-checkmark"><FaCheck color='white'/></div> : <div className="grade-list-unchekced"> </div> }
            </div>
            <div 
              className={`filter-option ${selectedEngineTypes.includes('ハイブリッド')  ? 'filter-option-active' : ''}`}
              onClick={() => toggleEngineType('ハイブリッド')}
            >
              <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}> <div> <FaGasPump /> </div> <div style={{paddingLeft:"10px"}}>  ハイブリッド </div>  </div>
              {selectedEngineTypes.includes('ハイブリッド') ? <div className="grade-list-checkmark"><FaCheck color='white'/></div> : <div className="grade-list-unchekced"> </div> }
            </div>
          </div>

          <div className='gradelist-border'> </div>
          
          {/* Drive type section */}
          <div className="filter-section">
     
             <div 
              className={`filter-option ${selectedDriveTypes.includes('2WD') ? 'filter-option-active' : ''}`}
              onClick={() => toggleDriveType('2WD')}
            >
              <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}> <div> <GiCarWheel /> </div> <div style={{paddingLeft:"10px"}}>  2WD </div>  </div>
              {selectedDriveTypes.includes('2WD') ? <div className="grade-list-checkmark"><FaCheck color='white'/></div> : <div className="grade-list-unchekced"> </div> }
            </div>
            <div 
              className={`filter-option ${selectedDriveTypes.includes('4WD') ? 'filter-option-active' : ''}`}
              onClick={() => toggleDriveType('4WD')}
            >
              <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}> <div> <GiCarWheel /> </div> <div style={{paddingLeft:"10px"}}>  4WD </div>  </div>
              {selectedDriveTypes.includes('4WD') ? <div className="grade-list-checkmark"><FaCheck color='white'/></div> : <div className="grade-list-unchekced"> </div> }
            </div>
          </div>
          
          
        </Modal.Body>
        <Modal.Footer>
          {/* Action buttons */}
          <div className="filter-actions">
           <div className="result-count"><div style={{fontSize: "27px", fontWeight: "500"}}> {filteredGrades.length} </div> <div style={{fontSize: "12px" , paddingTop: "15px", paddingLeft:"5px"}}> 件 </div></div>
            
            <div> 
              <button 
                className="btn-reset"
                onClick={() => {
                  setSelectedEngineTypes([]);
                  setSelectedDriveTypes([]);
                }}
                disabled={selectedEngineTypes.length === 0 && selectedDriveTypes.length === 0}
              >
                条件をクリア  
              </button>
              <button className="btn-apply" onClick={handleClose}>
                絞り込む
              </button>
            </div>
            
          </div>



        </Modal.Footer>
      </Modal>

      {/* Display the filtered grades */}
      <div className="grades-container">
        {filteredGrades.length > 0 ? (
          filteredGrades.map((grade) => (
            <div 
              key={grade.id}
              className={`grade-item ${selectedGrade?.id === grade.id ? "option-selected" : ""}`}
              onClick={() => 
              {
                setSelectedGrade(grade)
                setSelectedColor(caroptions.colors[0])
              }
                
              }
            >
              <div className="grade-main-info">
                <span className="grade-name">{grade.grade}</span>
                <span className={  `grade-type ${ selectedGrade?.id === grade.id ? "grade-type-selected" : "" }`}> <div className={`grade-type-gasandtire ${ selectedGrade?.id === grade.id ? "grade-type-gasandtire-selected" : "" }`} > <FaGasPump /> {grade.gasType}  </div> 
                <div className={`grade-type-gasandtire ${ selectedGrade?.id === grade.id ? "grade-type-gasandtire-selected" : "" }`}> <GiCarWheel /> {grade.wheelDrive} </div></span>
              </div>
              <div className="grade-price-info">
                <div className="monthly-price">月額 {grade.price.toLocaleString()} 円～</div>
                {!isUpFrontFee && (
                  <div className="upfront-fee">申込金 {calculateUpFrontFee(monthlyPayment, grade.price).toLocaleString()} 円～</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">該当するグレードがありません。フィルター条件を変更してください。</div>
        )}
      </div>
    </div>
  );
}

export default GradeList;