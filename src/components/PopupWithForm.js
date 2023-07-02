import {useContext} from "react";
import { AppContext } from '../contexts/AppContext.js';
import {usePopupClose} from "../hooks/usePopupClose";

function PopupWithForm({title, name, submitButtonText="Сохранить", children, isOpen, onClose, onSubmit}) {
    const isLoading = useContext(AppContext);
    usePopupClose(isOpen, onClose);

    return (
        <section
            className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ''}`}
        >
            <button
                onClick={onClose}
                className="popup__close popup__close-button"
                type="button"
            />
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form
                    name={name}
                    className="popup__form"
                    onSubmit={onSubmit}
                >
                    {children}
                    <button
                        type="submit"
                        className="popup__button popup__submit-button"
                    >
                        {isLoading ? 'Сохранение...' : submitButtonText}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;
