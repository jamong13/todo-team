export const getGradientColor = (value) => {
  if (value <= 50) {
    const ratio = value / 50;
    return `rgb(${70 + 30 * ratio}, ${100 + 50 * ratio}, 150)`;
  } else {
    const ratio = (value - 50) / 50;
    return `rgb(${100 + 144 * ratio}, ${150 + 21 * ratio}, ${
      150 - 57 * ratio
    })`;
  }
};
