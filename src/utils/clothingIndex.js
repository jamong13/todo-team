export const getClothingIndex = (sliderValue) =>
  sliderValue <= 20
    ? 0
    : sliderValue <= 40
    ? 1
    : sliderValue <= 60
    ? 2
    : sliderValue <= 80
    ? 3
    : 4;
