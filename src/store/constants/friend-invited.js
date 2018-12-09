import {
  LOADING_G as PAGINATED_LOADING_G,
  HAS_RESULTS_G as PAGINATED_HAS_RESULTS_G,
  SEARCH_M as PAGINATED_SEARCH_M,
  CURRENT_M as PAGINATED_CURRENT_M,
  LIST_A as PAGINATED_LIST_A,
} from './paginated';

const namespace = 'friendInvited';
export default namespace;

// private constants, to be used in the module implementation
export const _ACCEPT_A = 'ACCEPT_A';
export const _DELETE_A = 'DELETE_A';

// public constants, to be used by clients of this module
export const LOADING_G = `${namespace}/${PAGINATED_LOADING_G}`;
export const HAS_RESULTS_G = `${namespace}/${PAGINATED_HAS_RESULTS_G}`;
export const SEARCH_M = `${namespace}/${PAGINATED_SEARCH_M}`;
export const CURRENT_M = `${namespace}/${PAGINATED_CURRENT_M}`;
export const ACCEPT_A = `${namespace}/${_ACCEPT_A}`;
export const DELETE_A = `${namespace}/${_DELETE_A}`;
export const LIST_A = `${namespace}/${PAGINATED_LIST_A}`;

