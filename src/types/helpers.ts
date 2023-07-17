import type * as CSS from 'csstype';

type MqBoolAllowedMethods = 'from' | 'upTo';

export type Units = 'rem' | 'em' | 'px' | '%' | boolean;
export type Truthy = boolean | 'true' | 'false';

export type InterpolatedStyle = TemplateStringsArray | Function | string[] | string;
export type CSSProp = keyof CSS.PropertiesHyphen;

export type AddTransientProp<P extends string, TP> = TP extends string ? `${TP}${P}` : P;
export type GetObjectWithTransientProp<T, TP> = {
  [K in keyof T as K extends string ? AddTransientProp<K, TP> : K]: T[K];
};
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
export type BoolPropsFromArray<propsArray extends ReadonlyArray<string>> = Partial<Record<propsArray[number], Truthy>>;
export type BoolProps<T extends Object> = Partial<Record<keyof T, Truthy>>;
export type StringProps<T extends Object> = Partial<Record<keyof T, string>>;
export type MqProp<BPS extends string | number | symbol, T> = Partial<Record<BPS, T>> | T;
export type MqBoolProp<BPS> = Partial<Record<MqBoolAllowedMethods, BPS>> | Truthy;

export type PropList = XOR<string, { [prop: string]: any }>;
