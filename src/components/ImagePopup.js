import {usePopupClose} from "../hooks/usePopupClose";

function ImagePopup({card, isOpen, onClose}) {

    usePopupClose(isOpen, onClose);

    const cardName = card && card.name ? card.name : '';
    const cardLink = card && card.link ? card.link : '';

    return (
        <section
            className={`popup ${isOpen ? `popup_opened` : ''}`}
            id="zoomfoto"
        >
            <div className="popup__container-zoom">
                <button
                    onClick={onClose}
                    type="button"
                    className="popup__close popup__close-zoombutton"
                ></button>
                <h3 className="popup__title-zoom">{cardName}</h3>
                <img src={cardLink} className="popup__zoom" alt={`${cardName}`}/>
            </div>
        </section>
    );
}

export default ImagePopup;
