import "./styles/index.css";

import { initialCards } from "./components/cards";
import {
	createCard,
	handleDeleteCard,
	handleToggleLike,
} from "./components/card";
import {
	openModal,
	handleOpenImageModal,
	closeModal,
} from "./components/modal";

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

const profileEditModal = document.querySelector(".popup_type_edit");
const cardAddModal = document.querySelector(".popup_type_new-card");

const profileForm = document.forms["edit-profile"];
const profileFormNameInput = profileForm.elements.name;
const profileFormDescriptionInput = profileForm.elements.description;

const cardForm = document.forms["new-place"];
const cardFormNameInput = cardForm.elements["place-name"];
const cardFormLinkInput = cardForm.elements.link;

const imageModalContainer = document.querySelector(".popup_type_image");
const imageModalImg = imageModalContainer.querySelector(".popup__image");
const imageModalCaption = imageModalContainer.querySelector(".popup__caption");

const getCardTemplateDefaultData = () => {
	return {
		cardTemplate,
		cardSelectors,
		cardHandlers: {
			onDelete: handleDeleteCard,
			onToggleLike: handleToggleLike,
			onOpenImageModal: (params) =>
				handleOpenImageModal(params, openModal),
		},
		imageModalElements: {
			imageModalContainer,
			imageModalImg,
			imageModalCaption,
		},
	};
};

const addCard = (data) => {
	if (!(placesWrap instanceof HTMLElement)) {
		throw new Error("Incorrect type of placesWrap element");
	}

	const newCard = createCard({
		...getCardTemplateDefaultData(),
		cardData: data,
	});

	placesWrap.prepend(newCard);
};

initialCards.forEach((data) =>
	placesWrap.append(
		createCard({ ...getCardTemplateDefaultData(), cardData: data })
	)
);

document.querySelectorAll(".popup").forEach((modal) => {
	const closeButton = modal.querySelector(".popup__close");

	if (closeButton) {
		closeButton.addEventListener("click", () => closeModal(modal));
	}
});

const handleProfileFormSubmit = (evt) => {
	evt.preventDefault();

	profileName.textContent = profileFormNameInput.value;
	profileJob.textContent = profileFormDescriptionInput.value;

	closeModal(profileEditModal);
};

const handleCardFormSubmit = (evt) => {
	evt.preventDefault();

	addCard({
		name: cardFormNameInput.value,
		link: cardFormLinkInput.value,
	});

	cardForm.reset();
	closeModal(cardAddModal);
};

profileEditBtn.addEventListener("click", () => {
	profileFormNameInput.value = profileName.textContent;
	profileFormDescriptionInput.value = profileJob.textContent;

	openModal(profileEditModal);
});

cardAddBtn.addEventListener("click", () => {
	openModal(cardAddModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
