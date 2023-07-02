import {useContext, useEffect, useState} from "react";
import {AppContext} from "../contexts/AppContext";
import MenuLink from "./MenuLink";

function Signup({onSubmit, isSignup}) {

    const isLoading = useContext(AppContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formName = isSignup ? 'signup' : 'signin';
    const title = isSignup ? 'Регистрация' : 'Вход';
    const submitButtonText = isSignup ? 'Зарегистрироваться' : 'Войти';

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, [isSignup]);

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            email,
            password,
        });
    }

    return (
        <main className="content">
            <section
                className="signup"
            >
                <h2 className="signup__title">{title}</h2>
                <form
                    name={formName}
                    className="signup__form"
                    onSubmit={handleSubmit}
                >
                    <fieldset className="signup__fieldset">
                        <div className="signup__inner-box">
                            <input
                                type="text"
                                className="signup__input signup__input_type_name"
                                name="email"
                                placeholder="Email"
                                minLength="2"
                                maxLength="40"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <span
                                className="signup__input-error signup__input-error_type_name"
                            />
                        </div>
                        <div className="signup__inner-box">
                            <input
                                type="password"
                                className="signup__input signup__input_type_about"
                                name="password"
                                placeholder="Пароль"
                                minLength="2"
                                maxLength="200"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <span
                                className="signup__input-error signup__input-error_type_about"
                            />
                        </div>
                    </fieldset>
                    <button
                        type="submit"
                        className="signup__button"
                    >
                        {isLoading ? 'Сохранение...' : submitButtonText}
                    </button>
                </form>
                {isSignup ? <div className="signup__go-to-signin">
                    <span
                        className="signup__go-to-signin-text"
                    >
                        Уже зарегистрированы?
                    </span>
                    &nbsp;
                    <MenuLink
                        className="signup__go-to-signin-text signup__go-to-signin-text--link"
                        text={'Войти'}
                        link={'/signin'}
                    />
                </div>: ''}
            </section>
        </main>
    );
}

export default Signup;
