import { isVisible } from "/exchange/container/utils/constants.js";

export const closeModal = () => {
  document.querySelector(".modal.is-visible").classList.remove(isVisible);
  document.body.style.overflow = "auto";
};

export const isMobile = () => {
  var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  return width <= 768;
};
