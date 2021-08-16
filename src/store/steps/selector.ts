import { State } from '../index';

export const getSteps = (state: State): { base: string; type: string } =>
  state.steps;
