import { padding, margin, position, size } from 'polished';

// sets named properties
// to be auto generated
// in component ex:
// <MyComp primary />
// or
// <MyComp primary="md" />
const namedProps = [
    { suffix: '', list: 'colors', cssProp: 'color', units: ''},
    { suffix: 'bg', list: 'colors', cssProp: 'background-color', units: ''},
    { suffix: '', list: 'fonts.weights', cssProp: 'font-weight', units: ''},
    { suffix: '', list: 'fonts.sizes', cssProp: 'font-size', units: 'px'},
];

// sets space properties to
// be used with variables properties
// ex for margin-left:
// <MyComp ml={{xs: 1, md: 3}} />
// or
// <MyComp ml={2} />
// or, if you pass a list
// list: {small: 1, large: 5}
// <MyComp ml="large" />
const spaceProps = [
    { prop: 'padding', list: '', units: 'px' },
    { prop: 'margin', list: '', units: 'rem' },
];

// sets variables properties
// to be auto generated
// in component
// ex:
// <MyComp color={{xs: 'red', md: 'primary}} />
// or
// <MyComp color="red"} />
// if you use a helper function
// cssProp will be ditched and
// prop will be use it like this:
// <MyComp padding="1 1 null" />
// will add ${padding(1, 1, null)}
const variableProps = [
    // using css props
    { name: 'color', list: 'colors', cssProp: 'color', units: '' },
    { name: 'fontSize', list: 'fonts.sizes', cssProp: 'font-size', units: 'px' },
    { name: 'display', cssProp: 'display' },
    // using helper functions
    { name: 'margin', helperFn: margin, units: 'rem' },
    { name: 'padding', helperFn: padding, units: 'px' },
    { name: 'position', helperFn: position , units: 'px' },
    { name: 'size', helperFn: size, units: 'px' },
];

const generator = {
    namedProps,
    variableProps,
    spaceProps,
};

export default generator;