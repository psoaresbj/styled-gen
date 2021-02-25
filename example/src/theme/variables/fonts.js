const weights = {
  bold: 700,
  extralight: 200,
  light: 300,
  medium: 500,
  regular: 400,
  semibold: 600,
  thin: 100
};

const families = {
  sans: 'IBM Plex Sans'
};

const config = [{ family: 'IBM Plex Sans', path: 'fonts/IBMPlexSans', prefix: 'IBMPlexSans-', weights }];

const sizes = {
  base: 16,
  lg: 18,
  sm: 14,
  xxl: 30
};

const fonts = {
  config,

  families,
  sizes,
  weights
};

export default fonts;
