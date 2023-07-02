import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithButton from './PopupWithButton';
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";

import {useEffect, useState} from 'react';
import {api} from "../utils/api";
import {auth} from "../utils/auth";

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {AppContext} from '../contexts/AppContext.js';
import {AuthContext} from '../contexts/AuthContext.js';

import {
    Route,
    Routes,
    useNavigate,
    Navigate,
} from "react-router-dom";

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
    const [isDeleteCardPopupOpen, setDeleteCardPopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
    const [infoTooltipPopupStatusSuccess, setInfoTooltipPopupStatusSuccess] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('token');
    const [currentUser, setCurrentUser] = useState({
        name: 'Жак-Ив Кусто',
        about: 'Исследователь океана',
        avatar: 'https://karez79.github.io/mesto/993f3d93348c99403d38.png'
    });
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            auth.getUser(token)
                .then((result) => {
                    Promise.all([api.getProfile(), api.getInitialCards()])
                        .then(([userData, cards]) => {
                            setCurrentUser(userData);
                            setCards(cards);

                            setLoggedIn(true);
                            setEmail(result.data.email);
                            navigate('/');
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [token, navigate]);

    function handleEditAvatarClick() {
        setEditAvatarPopup(true)
    }

    function handleEditProfileClick() {
        setEditProfilePopup(true)
    }

    function handleAddPlaceClick() {
        setAddPlacePopup(true)
    }

    function closeAllPopups() {
        setEditProfilePopup(false);
        setAddPlacePopup(false);
        setEditAvatarPopup(false);
        setDeleteCardPopup(false);
        setIsImagePopupOpen(false);
        setInfoTooltipPopupOpen(false);
        setSelectedCard({});
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card)
    }

    function openInfoTooltipPopupOpen(successStatus) {
        setInfoTooltipPopupOpen(true);
        setInfoTooltipPopupStatusSuccess(successStatus);
    }

    function handleSubmit(request) {
        setIsLoading(true);
        request()
            .then(closeAllPopups)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        function makeRequest() {
            return api.changeCardLikeStatus(card._id, isLiked)
                .then(newCard => {
                    const cardsCopy = [...cards];
                    setCards(cardsCopy.map(c => c._id === card._id ? newCard : c))
                })
        }

        handleSubmit(makeRequest);
    }

    function handleCardDelete(card) {
        function makeRequest() {
            return api.deleteCard(card._id)
                .then(() => {
                    setCards(state => state.filter(item => item._id !== card._id))
                })
        }

        handleSubmit(makeRequest);
    }

    function handleUpdateUser(profile) {
        function makeRequest() {
            return api.editProfile(profile)
                .then(setCurrentUser)
        }

        handleSubmit(makeRequest);
    }

    function handleUpdateAvatar(link) {
        function makeRequest() {
            return api.editAvatar(link)
                .then(setCurrentUser)
        }

        handleSubmit(makeRequest);
    }

    function handleAddPlace(card) {
        function makeRequest() {
            return api.addCard(card)
                .then(newCard => {
                    setCards([newCard, ...cards]);
                })
        }

        handleSubmit(makeRequest);
    }

    function onSignup(user) {
        auth.signup(user)
            .then(() => {
                openInfoTooltipPopupOpen(true);
                navigate('/signin');
            })
            .catch((err) => {
                openInfoTooltipPopupOpen(false);
                console.log(err);
            });
    }

    function onLogin(user) {
        auth.signin(user)
            .then((result) => {
                localStorage.setItem('token', result.token);
                setLoggedIn(true);
                setEmail(user.email);
                navigate('/');
            })
            .catch((err) => {
                openInfoTooltipPopupOpen(false);
                console.log(err);
            });
    }

    function onSignout(user) {
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/signin');
    }

    return (
        <div className="page">
            <AuthContext.Provider value={isLoggedIn}>
                <AppContext.Provider value={isLoading}>
                    <CurrentUserContext.Provider value={currentUser}>
                        <Header signOut={onSignout} email={email}/>

                        <Routes>
                            <Route path="/" element={
                                <ProtectedRoute
                                    element={Main}
                                    isLoggedIn={isLoggedIn}
                                    cards={cards}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                />
                            }
                            />
                            
                            <Route path="signin" element={<Login isSignup={false} onSubmit={onLogin}/>}/>
                            <Route path="signup" element={<Register isSignup={true} onSubmit={onSignup}/>}/>
                            <Route path="/*" element={<Navigate to="/signin" replace />} />
                        </Routes>

                        <Footer/>

                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
                        />

                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar}
                        />

                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onAddPlace={handleAddPlace}
                        />

                        <PopupWithButton
                            title={'Вы уверены?'}
                            name={'cardDelete'}
                            isOpen={isDeleteCardPopupOpen}
                            onClose={closeAllPopups}
                        />

                        <ImagePopup
                            card={selectedCard}
                            isOpen={isImagePopupOpen}
                            onClose={closeAllPopups}
                        />

                        <InfoTooltip
                            statusSuccess={infoTooltipPopupStatusSuccess}
                            isOpen={isInfoTooltipPopupOpen}
                            onClose={closeAllPopups}
                        />
                    </CurrentUserContext.Provider>
                </AppContext.Provider>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
