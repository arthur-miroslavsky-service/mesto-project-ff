import "./styles/index.css";

import { initialCards } from "./components/cards";
import { createCardElement, handleDeleteCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";

const cardTemplate = document
	.querySelector("#card-template")
	.content.querySelector(".places__item");

const cardSelectors = {
	deleteButton: ".card__delete-button",
	cardImage: ".card__image",
	cardTitle: ".card__title",
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

initialCards.forEach((data) => {
	placesWrap.append(
		createCardElement({
			cardTemplate,
			cardSelectors,
			cardData: data,
			cardHandlers: {
				onDelete: handleDeleteCard,
			},
		})
	);
});

profileEditBtn.addEventListener("click", () => {
	profileFormNameInput.value = profileName.textContent;
	profileFormDescriptionInput.value = profileJob.textContent;

	openModal(profileEditPopup);
});

cardAddBtn.addEventListener("click", () => {
	openModal(cardAddPopup);
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

profileForm.addEventListener("submit", handleProfileFormSubmit);
