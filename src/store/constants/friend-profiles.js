import {
  LOADING_G as PAGINATED_LOADING_G,
  HAS_RESULTS_G as PAGINATED_HAS_RESULTS_G,
  SEARCH_M as PAGINATED_SEARCH_M,
  CURRENT_M as PAGINATED_CURRENT_M,
  LIST_A as PAGINATED_LIST_A,
} from './paginated';

const namespace = 'friendProfiles';
export default namespace;

// public constants, to be used by clients of this module
export const LOADING_G = `${namespace}/${PAGINATED_LOADING_G}`;
export const HAS_RESULTS_G = `${namespace}/${PAGINATED_HAS_RESULTS_G}`;
export const SEARCH_M = `${namespace}/${PAGINATED_SEARCH_M}`;
export const CURRENT_M = `${namespace}/${PAGINATED_CURRENT_M}`;
export const LIST_A = `${namespace}/${PAGINATED_LIST_A}`;

