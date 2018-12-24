const weights = {
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
}

const families = {
    sans: 'IBM Plex Sans',
}

const config = [
    { family: 'IBM Plex Sans', path: 'fonts/IBMPlexSans', prefix: 'IBMPlexSans-', weights }
]

const sizes = {
    sm: 14,
    base: 16,
    lg: 18,
    xxl: 30,
};

const fonts = {
    config,

    weights,
    sizes,
    families
};

export default fonts