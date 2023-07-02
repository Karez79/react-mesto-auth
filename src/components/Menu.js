import { Routes, Route } from "react-router-dom";
import MenuLink from "./MenuLink";

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';

function Menu({email, isBurgerActive, setBurgerActive, signOut}) {
    const isLoggedIn = useContext(AuthContext);

    function handleBurger() {
        setBurgerActive();
    }

    return (
        <div className="menu">
            {isLoggedIn
                ? <>
                    <button
                        onClick={handleBurger}
                        className={`menu__burger-button ${isBurgerActive ? 'menu__burger-button_active' : ''}`}
                        type='button'
                    >
                        <span
                            className="menu__burger-button-inner"
                        />
                        <span
                            className="menu__burger-button-inner"
                        />
                        <span
                            className="menu__burger-button-inner"
                        />
                    </button>
                    <div className={`menu__container ${isBurgerActive ? 'menu__container_active' : ''}`}>
                        <span className="menu__text">
                            {email}
                        </span>
                        <button
                            className="menu__link menu__link_pale"
                            type='button'
                            onClick={signOut}
                        >
                            Выйти
                        </button>
                    </div>
                </>
                :
                    <Routes>
                        <Route path="/signup" element={<MenuLink text={'Войти'} link={'/signin'}/>} />
                        <Route path="/signin" element={<MenuLink text={'Регистрация'} link={'/signup'} />} />
                    </Routes>
            }

        </div>
    );
}

export default Menu;
