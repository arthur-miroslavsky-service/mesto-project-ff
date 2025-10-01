import "./styles/index.css";

import { initialCards } from "./components/cards";
import {
	createCard,
	addCard,
	handleDeleteCard,
	handleToggleLike,
} from "./components/card";
import { openModal, closeModal } from "./components/modal";

const cardTemplate = document
	.querySelector("#card-template")
	.content.querySelector(".places__item");

const cardSelectors = {
	cardImage: ".card__image",
	cardTitle: ".card__title",
	deleteButton: ".card__delete-button",
	likeButton: ".card__like-button",
	activeLikeButton: "card__like-button_is-active",
};

const placesWrap = document.querySelector(".places__list");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const profileEditBtn = document.querySelector(".profile__edit-button");
const cardAddBtn = document.querySelector(".profile__add-button");

const profileEditPopup = document.querySelector(".popup_type_edit");
const cardAddPopup = document.querySelector(".popup_type_new-card");

const profileForm = document.forms["edit-profile"];
const profileFormNameInput = profileForm.elements.name;
const profileFormDescriptionInput = profileForm.elements.description;

const cardForm = document.forms["new-place"];
const cardFormNameInput = cardForm.elements["place-name"];
const cardFormLinkInput = cardForm.elements.link;

initialCards.forEach((data) => {
	placesWrap.append(
		createCard({
			cardTemplate,
			cardSelectors,
			cardData: data,
			cardHandlers: {
				onDelete: handleDeleteCard,
				onToggleLike: handleToggleLike,
			},
		})
	);
});

document.querySelectorAll(".popup").forEach((popup) => {
	const closeButton = popup.querySelector(".popup__close");

	if (closeButton) {
		closeButton.addEventListener("click", () => closeModal(popup));
	}
});

const handleProfileFormSubmit = (evt) => {
	evt.preventDefault();

	profileName.textContent = profileFormNameInput.value;
	profileJob.textContent = profileFormDescriptionInput.value;

	closeModal(profileEditPopup);
};

const handleCardFormSubmit = (evt) => {
	evt.preventDefault();

	addCard({
		cardsContainer: placesWrap,
		cardTemplate,
		cardSelectors,
		cardData: {
			name: cardFormNameInput.value,
			link: cardFormLinkInput.value,
		},
	});

	cardForm.reset();
	closeModal(cardAddPopup);
};

profileEditBtn.addEventListener("click", () => {
	profileFormNameInput.value = profileName.textContent;
	profileFormDescriptionInput.value = profileJob.textContent;

	openModal(profileEditPopup);
});

cardAddBtn.addEventListener("click", () => {
	openModal(cardAddPopup);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
