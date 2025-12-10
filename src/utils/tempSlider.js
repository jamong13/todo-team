export const tempToSlider = (t) => {
  if (t <= 0) return 10;
  if (t <= 9) return 30;
  if (t <= 20) return 50;
  if (t <= 29) return 70;
  return 90;
};
