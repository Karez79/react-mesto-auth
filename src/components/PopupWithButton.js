import {usePopupClose} from "../hooks/usePopupClose";

function PopupWithButton({title, name, submitButtonText='Да', isOpen, onClose}) {

    usePopupClose(isOpen, onClose);

    return (
        <section
            className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ''}`}
        >
            <button onClick={onClose} className="popup__close popup__close-button" type="button"></button>
            <div className="popup__container popup__container-del-card">
                <h2 className="popup__title popup__title-del-card">{title}</h2>
                <button type="button" className="popup__button popup__button-del-card popup__submit-button">{submitButtonText}
                </button>
            </div>
        </section>
    );
}

export default PopupWithButton;
