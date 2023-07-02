import Card from './Card'

import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-box">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля."/>
                    <button onClick={onEditAvatar} className="profile__avatar-button" type="button"></button>
                </div>

                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={onEditProfile} className="profile__edit-button" type="button"></button>
                    </div>
                    <p className="profile__about">{currentUser.about}</p>
                </div>

                <button onClick={onAddPlace} className="profile__add-button" type="button"></button>
            </section>

            <section className="elements">
                <ul className="cards">
                    {cards.map(card => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
