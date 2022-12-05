import { LeftWrapper, RightWrapper } from "/exchange/container/js/wrappers.js";
import { isVisible } from "/exchange/container/utils/constants.js";
import { closeModal } from "/exchange/container/utils/helpers.js";

export const appendCss = (themeData) => {
  var element = document.createElement("link");
  element.setAttribute("rel", "stylesheet");
  element.setAttribute("type", "text/css");
  element.setAttribute(
    "href",
    "http://localhost:3000/exchange/container/css/exchange.css"
  );

  Object.keys(themeData).map((styleData) => {
    Object.keys(themeData[styleData]).map((style) =>
      document.documentElement.style.setProperty(
        style,
        themeData[styleData][style]
      )
    );
  });

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

  exchangeInformation.rightSection.questionsData.map((question) => {
    let element = document.getElementById(`selectBoxes_${question.key}`);
    if (element) {
      element.addEventListener("change", function () {
        handleChange(question.key, element.value, rightSection);
      });
    }
  });
};

const handleChange = (type, value, rightSectionInfo) => {
  // Handle Brands Selection
  if (type === "brand") {
    let modelsObject = rightSectionInfo?.questionsData.find(
      (model) => model.key === "model"
    );

    if (modelsObject?.options?.length > 0) {
      let modelsData = modelsObject?.options.filter(
        (model) => model.parentKey === value
      );

      if (modelsData && modelsData.length > 0) {
        let model = document.getElementById("selectBoxes_model");
        model.innerHTML = `
            <option selected disabled=true>Select Model</option>
            ${modelsData.map(
              (option) =>
                `<option key=${option.key} value=${option.key}>${option.value}</option>`
            )}
        `;
        model.disabled = false;
      }
    }
  } else if (type === "model") {
    // Handle Model Selection
    // let conditioning = document.getElementById("conditioning");
    // currentSelectedModel = exchangeData?.data?.exchangeData?.models.find(
    //   (model) => model.id === selectValue
    // );
    // if (currentSelectedModel) {
    //   console.log(currentSelectedModel, exchangeData.information);
    //   conditioning.innerHTML = `
    //         <div class="conditionHeading">
    //           ${exchangeData?.information?.conditioningInformation?.title}
    //         </div>
    //         <p class="information">
    //           ${exchangeData?.information?.conditioningInformation?.subtitle}
    //         </p>
    //       `;
    // }
  }
};
