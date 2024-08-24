import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type CalculationResult = { 'ok' : number } |
  { 'err' : string };
export type Operation = { 'add' : null } |
  { 'multiply' : null } |
  { 'divide' : null } |
  { 'subtract' : null };
export interface _SERVICE {
  'calculate' : ActorMethod<[number, number, Operation], CalculationResult>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
