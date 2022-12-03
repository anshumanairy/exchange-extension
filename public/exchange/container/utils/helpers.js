import { isVisible } from "/exchange/container/utils/constants.js";

export const closeModal = () => {
  document.querySelector(".modal.is-visible").classList.remove(isVisible);
};
