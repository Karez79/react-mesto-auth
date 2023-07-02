import Main from "./Main";
import {Navigate} from "react-router-dom";

function ProtectedRoute({isLoggedIn, cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
    return (
        isLoggedIn
            ? <Main
                cards={cards}
                onEditProfile={onEditProfile}
                onAddPlace={onAddPlace}
                onEditAvatar={onEditAvatar}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
            />
            : <Navigate to="/signin" />
    );
}

export default ProtectedRoute;
