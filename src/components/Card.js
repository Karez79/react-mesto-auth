import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`card__info-likes-button ${isLiked && 'card__info-likes-button_active'}`);
    function handleClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li
            className="card"
        >
            {isOwn && <button
                onClick={handleDeleteClick}
                className="cards__delete-photo"
                type="button"
            />}
            <img
                onClick={handleClick}
                src={card.link} className="cards__image"
                alt="card"
            />
            <div className="card__info">
                <h2 className="card__info-title">{card.name}</h2>
                <div className="card__info-likes">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}
                    />
                    <span className="card__info-likes-counter">{card.likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;
