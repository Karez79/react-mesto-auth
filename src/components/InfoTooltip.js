import {usePopupClose} from "../hooks/usePopupClose";
import successImage from '../images/info-tooltip-success.png';
import failImage from '../images/info-tooltip-fail.png';

function InfoTooltip({ isOpen, onClose, statusSuccess}) {

    usePopupClose(isOpen, onClose);

    const successText = 'Вы успешно зарегистрировались!';
    const failText = 'Что-то пошло не так!\nПопробуйте ещё раз.';

    return (
        <section
            className={`popup ${isOpen ? `popup_opened` : ''} info-tooltip`}
        >
            <div className="popup__container-info-tooltip">
                <button
                    onClick={onClose}
                    type="button"
                    className="popup__close popup__close-zoombutton"
                />
                <img
                    src={statusSuccess ? successImage : failImage}
                    className="info-tooltip__image"
                    alt={statusSuccess ? 'успех' : 'ошибка'}
                />
                <span
                    className="info-tooltip__title"
                >
                    {statusSuccess ? successText : failText}
                </span>
            </div>
        </section>
    );
}

export default InfoTooltip;
