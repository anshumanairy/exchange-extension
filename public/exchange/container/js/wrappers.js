import { Button } from "/exchange/components/button/index.js";

export const LeftWrapper = (leftSection) => {
  return `
    <div>
        ${leftSection
          ?.map((leftSectionData) => {
            return `
                <div>
                <div class="heading">
                    ${leftSectionData.title}
                </div>
                <ul class="informationWrapper">
                    ${leftSectionData.information
                      .map((info) => `<li class="information">${info}</li>`)
                      .join("")}
                </ul>
                </div>`;
          })
          .join("")}
    </div>`;
};

export const RightWrapper = (rightSection) => {
  return `
      <div class="h100 dF fdC jcSB">
        <div>
          <div class="heading">
          ${rightSection?.title}
          </div>
          <p class="subtitle">${rightSection?.subtitle}</p>
          <div>
          ${rightSection?.questionsData
            .map((question) => {
              return `
                  <div>
                  ${
                    question.type === "select"
                      ? `<select key=${question.key} id="selectBoxes_${
                          question.key
                        }" ${question.disabled ? "disabled" : "!disabled"}>
                          <option selected disabled=true>${
                            question.placeholder || question.value
                          }</option>
                          ${
                            question.key !== "condition" &&
                            question.options.map(
                              (option) =>
                                `<option key=${option.key} value=${option.key}>${option.value}</option>`
                            )
                          }
                          </select>`
                      : ``
                  }
                  </div>
              `;
            })
            .join("")}
          </div>
        </div>
        <div class="bottomButtons dF jcSB">
          <div id="closeModal" data-close>
            ${Button({
              label: "Cancel",
              type: "secondaryButton",
            })}
          </div>
          <div>
            ${Button({
              label: "Get Quote",
              type: "primaryButton",
            })}
          </div>
        </div>
      </div>
    `;
};
