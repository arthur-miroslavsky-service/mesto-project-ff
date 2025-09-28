const createCardElement = (params) => {
	const {
		cardTemplate,
		cardSelectors = {},
		cardData = {},
		cardHandlers = {},
	} = params;

	if (!(cardTemplate instanceof HTMLElement)) {
		throw new Error("Incorrect type of cardTemplate element");
	}

	const cardElement = cardTemplate.cloneNode(true);

	const deleteButton = cardElement.querySelector(cardSelectors.deleteButton);
	const cardImage = cardElement.querySelector(cardSelectors.cardImage);
	const cardTitle = cardElement.querySelector(cardSelectors.cardTitle);

	if (cardImage) {
		cardImage.src = cardData.link || "";
		cardImage.alt = cardData.name || "";
	}

	if (cardTitle) {
		cardTitle.textContent = cardData.name || "";
	}

	if (deleteButton && cardHandlers.onDelete) {
		deleteButton.addEventListener("click", (evt) =>
			cardHandlers.onDelete(evt, cardElement)
		);
	}

	return cardElement;
};

const handleDeleteCard = (cardElement) => cardElement.remove();

export { createCardElement, handleDeleteCard };
