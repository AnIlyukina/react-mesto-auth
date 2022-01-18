import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import api from "../utils/Api";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import { CurrentUserContext } from "./../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';
import InfoTooltip from "./InfoTooltip";


function App() {


  const history = useHistory()
  
  const[loggedIn, setLoggedIn] = React.useState(false);

  const[isLoading, setIsLoading] = React.useState(false)

  const[isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const[messageInfoTooltip, setMessageInfoTooltip] = React.useState(false)

  const [userEmail, setUserEmail] = React.useState('');

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddProfilePopupOpen, setIsAddProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, addCards] = React.useState([]);

  const [cardToDelete, setCardToDelete] = React.useState({});


  React.useEffect(() => {
    checkToken();
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        addCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  function handleSubmitRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        if(res) {
          setMessageInfoTooltip(true);
          handleSubmitLogin(password, email)
        }
      })
      .catch(() => {
        setMessageInfoTooltip(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleSubmitLogin (password, login){
    auth.authorize(password, login)
    .then((res) => {
      setLoggedIn(true)
      history.push('/')
      localStorage.setItem('jwt', res.token);
      setUserEmail(login)
    })
    .catch(error => console.log(error))
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.getToken(jwt)
      .then((res) => {
        if(res) {
          setUserEmail(res.data.email)
        };
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setLoggedIn(false)

  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleConfirmDeleteClick(card) {
    setIsConfirmDeletePopupOpen(true);
    setCardToDelete(card)
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false)
    setIsEditProfilePopupOpen(false);
    setIsAddProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false)
    setSelectedCard({ name: "", link: "" });
    setCardToDelete({ name: "", link: "" });
  }

  function handleUpdateUser(user) {
    setIsLoading(true)
    api
      .saveUserData(user)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        setIsLoading(false)
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true)
    api
      .changeAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        setIsLoading(false)
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true)
    api
      .saveCard(newCard)
      .then((newCard) => {
        addCards([newCard, ...cards]);
        setIsLoading(false)
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true)
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        addCards(newCards);
        setIsLoading(false)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        addCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header 
            userEmail = {userEmail}  
            loggedIn ={loggedIn}
            signOut = {signOut}
            
            />
          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmDeleteClick}
            />
            <Route path='/sign-up'>
              <Register handleSubmitRegister ={handleSubmitRegister}/>
            </Route>
            <Route path='/sign-in'>
             <Login handleSubmitLogin={handleSubmitLogin} />
            </Route>
          </Switch>
          <Footer />
          <InfoTooltip isOpen ={isInfoTooltipOpen} messageInfoTooltip = {messageInfoTooltip} onClose={closeAllPopups}/>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading = {isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading = {isLoading}
          />
          <AddPlacePopup
            isOpen={isAddProfilePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading = {isLoading}
          />
          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmitDeleteCard = {handleCardDelete}
            card={cardToDelete}
            isLoading = {isLoading}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}


export default App;
