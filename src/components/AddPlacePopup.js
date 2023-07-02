import PopupWithForm from "./PopupWithForm";
import {useEffect, useState} from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link,
        });
    }

    return (
        <PopupWithForm
            title={'Новое место'}
            name={'cardADD'}
            submitButtonText={'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                minLength="2"
                maxLength="30"
                className="popup__input popup__input_type_name"
                name="name"
                placeholder="Название"
                required
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <span
                className="popup__input-error popup__input-error_type_name"
            />
            <input
                type="url"
                className="popup__input popup__input_type_link"
                name="link"
                placeholder="Ссылка на картинку"
                required
                value={link}
                onChange={e => setLink(e.target.value)}
            />
            <span
                className="popup__input-error popup__input-error_type_link"
            />
        </PopupWithForm>
    );
}

export default AddPlacePopup;
