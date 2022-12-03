import { LeftWrapper, RightWrapper } from "/exchange/container/js/wrappers.js";
import { isVisible } from "/exchange/container/utils/constants.js";
import { closeModal } from "/exchange/container/utils/helpers.js";

let currentSelectedModel = {};

export const appendCss = () => {
  var element = document.createElement("link");
  element.setAttribute("rel", "stylesheet");
  element.setAttribute("type", "text/css");
  element.setAttribute(
    "href",
    "http://localhost:3000/exchange/container/css/exchange.css"
  );
  document.getElementsByTagName("head")[0].appendChild(element);
};

export const appendHTML = (appendingDivID) => {
  fetch("http://localhost:3000/exchange/container/html/exchange.html")
    .then((response) => response.text())
    .then((htmlTextResponse) => {
      let appendingElement = document.getElementById(appendingDivID);
      appendingElement.innerHTML = htmlTextResponse;
    })
    .then(() => {
      handleModal(exchangeData);
    });
};

const handleModal = (exchangeData) => {
  const openEls = document.querySelectorAll("[data-open]");
  const closeEls = document.querySelectorAll("[data-close]");

  for (const el of openEls) {
    el.addEventListener("click", function () {
      const modalId = this.dataset.open;
      document.getElementById(modalId).classList.add(isVisible);
      populateInformation(exchangeData);
    });
  }

  for (const el of closeEls) {
    el.addEventListener("click", function (e) {
      this.parentElement.parentElement.parentElement.classList.remove(
        isVisible
      );
    });
  }

  document.addEventListener("click", (e) => {
    if (
      e.target == document.querySelector(".modal.is-visible") ||
      e.target.parentElement.id === "closeModal"
    ) {
      closeModal();
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
      closeModal();
    }
  });
};

const populateInformation = (data) => {
  const { exchangeInformation } = data;
  const { leftSection, rightSection } = exchangeInformation;

  let leftWrapper = document.getElementById("left-wrapper");
  let rightWrapper = document.getElementById("right-wrapper");

  leftWrapper.innerHTML = LeftWrapper(leftSection);
  rightWrapper.innerHTML = RightWrapper(rightSection);
};

const handleChange = (type) => {
  let selectValue = document.getElementById(type).value;
  if (type === "brands") {
    let model = document.getElementById("models");

    let modelsData = exchangeData?.data?.exchangeData?.models.filter(
      (model) => model.parentId === selectValue
    );

    model.innerHTML = `
        <option selected disabled=true>Select Model</option>
        ${modelsData.map(
          (model) => `<option value=${model.id}>${model.name}</option>`
        )}
      `;

    model.disabled = false;
  } else if (type === "models") {
    let conditioning = document.getElementById("conditioning");
    currentSelectedModel = exchangeData?.data?.exchangeData?.models.find(
      (model) => model.id === selectValue
    );

    if (currentSelectedModel) {
      console.log(currentSelectedModel, exchangeData.information);

      conditioning.innerHTML = `
          <div class="conditionHeading">
            ${exchangeData?.information?.conditioningInformation?.title}
          </div>
          <p class="information">
            ${exchangeData?.information?.conditioningInformation?.subtitle}
          </p>
        `;
    }
  }
};
