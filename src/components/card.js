const createCard = (params) => {
	const {
		cardTemplate,
		cardSelectors = {},
		cardHandlers = {},
		cardData = {},
	} = params;

	if (!(cardTemplate instanceof HTMLElement)) {
		throw new Error("Incorrect type of cardTemplate element");
	}

	const cardElement = cardTemplate.cloneNode(true);

	const cardImage = cardElement.querySelector(cardSelectors.cardImage);
	const cardTitle = cardElement.querySelector(cardSelectors.cardTitle);
	const deleteButton = cardElement.querySelector(cardSelectors.deleteButton);
	const likeButton = cardElement.querySelector(cardSelectors.likeButton);

	if (cardImage) {
		cardImage.src = cardData.link || "";
		cardImage.alt = cardData.name || "";
	}

	if (cardTitle) {
		cardTitle.textContent = cardData.name || "";
	}

	if (deleteButton && cardHandlers.onDelete) {
		deleteButton.addEventListener("click", () =>
			cardHandlers.onDelete(cardElement)
		);
	}

	if (
		likeButton &&
		cardSelectors.activeLikeButton &&
		cardHandlers.onToggleLike
	) {
		likeButton.addEventListener("click", () =>
			cardHandlers.onToggleLike(
				likeButton,
				cardSelectors.activeLikeButton
			)
		);
	}

	if (cardImage && cardHandlers.onOpenImageModal) {
		cardImage.addEventListener("click", () =>
			cardHandlers.onOpenImageModal({
				src: cardData.link,
				alt: cardData.name,
				name: cardData.name,
			})
		);
	}

	return cardElement;
};

const handleDeleteCard = (cardElement) => cardElement.remove();

const handleToggleLike = (likeBtn, activeClass) => {
	likeBtn.classList.toggle(activeClass);
};

export { createCard, handleDeleteCard, handleToggleLike };
