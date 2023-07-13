import { AddTransientProp, GetObjectWithTransientProp, MqBoolProp, MqProp } from './helpers';
import { NamedProp, VariableProp } from './main';
import { spaceNames } from '../constants/spaceNames';

type IndexKeys<T> = Exclude<keyof T, keyof []>;
type ListObjectValidation = { prefix?: undefined; list: object };
type ListObjectWithPrefix = { prefix: string; list: object };
type GetNamesWithPrefix<P> = P extends ListObjectWithPrefix ? keyof P['list'] : never;
type GetListKeys<P> = P extends VariableProp ? keyof P['list'] : never;
type GetPrefixName<P> = P extends { prefix: string } ? P['prefix'] : never;

type GetVariablePropName<P, TP> = P extends VariableProp ? AddTransientProp<P['name'], TP> : never;

type GetNamedPropName<P, TP> = P extends { prefix: string }
  ? AddTransientProp<`${GetPrefixName<P>}${Capitalize<string & GetNamesWithPrefix<P>>}`, TP>
  : P extends ListObjectValidation
  ? keyof GetObjectWithTransientProp<P['list'], TP>
  : never;

type VariableProps<V extends ReadonlyArray<VariableProp>, BPS extends string | number | symbol, TP> = {
  [i in IndexKeys<V> as GetVariablePropName<V[i], TP>]?: V[i] extends { list: object }
    ? MqProp<BPS, GetListKeys<V[i]>>
    : MqProp<BPS, string | number>;
};

type NamedProps<N extends ReadonlyArray<NamedProp>, BPS extends string | number | symbol, TP> = {
  [i in IndexKeys<N> as GetNamedPropName<N[i], TP>]?: MqBoolProp<BPS>;
};

type SpaceProps<BPS extends string | number | symbol, TP> = Partial<
  Record<AddTransientProp<(typeof spaceNames)[number], TP>, MqProp<BPS, number | string>>
>;

export type GeneratorProps<
  N extends ReadonlyArray<NamedProp>,
  V extends ReadonlyArray<VariableProp>,
  BPS extends string | number | symbol,
  TP extends string | boolean | undefined = ''
> = NamedProps<N, BPS, TP> & SpaceProps<BPS, TP> & VariableProps<V, BPS, TP>;
