import logo from '../Assets/logo.jpg';
import '../Styles/Header.css';

function Header() {
    return (
        <div className="header">
            <div className="logo-container">
                <img src={logo} alt="logo" className="logo" />
            </div>
       

        </div>
    );
}

export default Header;