import "./styles/index.css";

import { initialCards } from "./components/cards";
import { createCardElement, handleDeleteCard } from "./components/card";

const cardTemplate = document
	.querySelector("#card-template")
	.content.querySelector(".places__item");

const cardSelectors = {
	deleteButton: ".card__delete-button",
	cardImage: ".card__image",
	cardTitle: ".card__title",
};

const placesWrap = document.querySelector(".places__list");

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
