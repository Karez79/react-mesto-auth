import PopupWithForm from "./PopupWithForm";
import { useRef } from 'react';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm
            title={'Обновить аватар'}
            name={'avatarEdit'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                className="popup__input popup__input_type_avatar"
                name="avatarRef"
                placeholder="Ссылка на аватар"
                required
                ref={avatarRef}
            />
            <span
                className="popup__input-error popup__input-error_type_avatar"
            />
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
