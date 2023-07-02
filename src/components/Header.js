import logo from '../images/logo/logo.svg';
import Menu from "./Menu";
import {useState} from "react";

function Header({signOut, email}) {

    const [isBurgerActive, setBurgerActive] = useState(false);
    function handleBurger() {
        setBurgerActive(!isBurgerActive);
    }

    return (
        <header className={`header ${isBurgerActive ? 'header_menu' : ''}`}>
            <a className="header__link" href="https://karez79.github.io/mesto/">
                <img
                    src={logo}
                    className="header__logo" alt="Логотип Место."/>
            </a>
            <Menu email={email} isBurgerActive={isBurgerActive} setBurgerActive={handleBurger} signOut={signOut}/>
        </header>
    );
}

export default Header;
