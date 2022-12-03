export const Button = (props) => {
  const { label = "", type = "" } = props;
  return `
    <div class="basicButton cP dFA jcC ${type}">
      ${label}
    </div>`;
};
