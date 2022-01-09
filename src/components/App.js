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
import * as Auth from './Auth';
import InfoTooltip from "./InfoTooltip";

function App() {
  const history = useHistory()
  
  const[loggedIn, setLoggedIn] = React.useState(false);

  const[isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const[messageInfoTooltip, setMessageInfoTooltip] = React.useState(false)

  const [isPersonalEmailHeader, setIsPersonalEmailHeader] =
    React.useState(false);

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
    tokenCheck();
    Promise.all([api.getInfoDate(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        addCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleLogin(){
    setLoggedIn(true)
  }

  function handleSubmitRegister(email, password) {
    Auth.register(email, password)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        if(res) {
          setMessageInfoTooltip(true);
          history.push('/sign-in');
        }
      })
      .catch(() => {
        setMessageInfoTooltip(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      Auth.getContent(jwt)
      .then((res) => {
        if(res) {
          setIsPersonalEmailHeader(res.data.email)
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
    api
      .saveInfoDate(user)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .saveCard(newCard)
      .then((newCard) => {
        addCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        addCards(newCards);
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
            personalEmail = {isPersonalEmailHeader}  
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
             <Login handleLogin={handleLogin} setPersonalEmail={setIsPersonalEmailHeader}/>
            </Route>
      

            
          </Switch>
          <Footer />

          <InfoTooltip isOpen ={isInfoTooltipOpen} messageInfoTooltip = {messageInfoTooltip} onClose={closeAllPopups}/>
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
            isOpen={isAddProfilePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmitDeleteCard = {handleCardDelete}
            card={cardToDelete}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
