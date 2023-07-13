import { GeneratedProps, VariationProps } from '../theme/types';
import { Heading } from '../theme/components/Typography';
import { colors, fonts } from '../theme/variables';
import { css, styled } from 'styled-components';
import { generateProps, variations } from 'styled-gen';
import Div from '../theme/components/Div';

const ColorBump = styled.div`
  margin: 0 16px;
  height: 16px;
  width: 16px;
`;

const colorArray: { color: keyof typeof colors; name: string }[] = [
  { color: 'n06', name: 'default' },
  { color: 'b05', name: 'branding' },
  { color: 'n03', name: 'light' }
];

const textVariations = colorArray.reduce(
  (result, { color, name }) => ({
    ...result,
    [name]: css`
      color: ${colors[color]};
    `
  }),
  {}
);

type TextType = VariationProps<{ default: any; light: any }>;

const Text = styled.div<TextType & GeneratedProps>`
  align-items: center;
  display: flex;
  font-size: 24px;
  font-weight: ${fonts.weights.semibold};

  ${variations(textVariations)};
  ${generateProps};
`;

const Variations = () => {
  return (
    <Div $pl={1} $pt={1}>
      <Heading h2>Variations</Heading>

      <Div $mt={1} $pl={1}>
        {colorArray.map(({ color, name }, index) => {
          const nameProp = `$${name}`;
          const textProps = { [nameProp]: true };

          return (
            <Text $mt={1} key={name} {...textProps}>
              This should have {name} color <ColorBump style={{ backgroundColor: colors[color] }} /> {colors[color]}
            </Text>
          );
        })}
      </Div>

      <Div $bgB05 $mt={2} $sz="10" />
    </Div>
  );
};

export default Variations;
