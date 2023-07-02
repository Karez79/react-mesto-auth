import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about,
        });
    }

    return (
        <PopupWithForm
            title={'Редактировать профиль'}
            name={'profileEdit'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="popup__input popup__input_type_name"
                name="name"
                placeholder="Ваше имя"
                minLength="2"
                maxLength="40"
                required
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <span
                className="popup__input-error popup__input-error_type_name"
            />
            <input
                type="text"
                className="popup__input popup__input_type_about"
                name="about"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
                value={about}
                onChange={e => setAbout(e.target.value)}
            />
            <span
                className="popup__input-error popup__input-error_type_about"
            />
        </PopupWithForm>
    );
}

export default EditProfilePopup;
