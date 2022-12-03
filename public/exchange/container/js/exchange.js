let exchangeData = {};
let appendingDivID = "exchange";

async function exchangeFunction(newExchangeData) {
  const { appendCss, appendHTML } = await import(
    "/exchange/container/utils/utils.js"
  );

  exchangeData = newExchangeData;
  appendCss();
  appendHTML(appendingDivID, exchangeData);
}
