import { AddTransientProp, MqBoolProp } from './helpers';
import { Variations } from './main';

export type VariationProps<V extends Readonly<Variations>, BPS, TP extends string | boolean | undefined = ''> = {
  [T in keyof V as T extends string ? AddTransientProp<T, TP> : never]?: MqBoolProp<BPS>;
};
