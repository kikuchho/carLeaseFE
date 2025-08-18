import toyota_letters_logo from "../assets/toyota_letters_logo.png"
import "../styles/RegisterHeader.css";

const RegisterHeader = () => {
  return (
     <div className="register-header">
        <img src={toyota_letters_logo} alt="Toyota Logo" className="register-logo" />
        <div> TOYOTAアカウント </div>
    </div>
  );
}
export default RegisterHeader;