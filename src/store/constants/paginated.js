const namespace = 'paginated';
export default namespace;

// private constants, to be used in the module implementation
export const _LOADING_G = 'LOADING_G';
export const _HAS_RESULTS_G = 'HAS_RESULTS_G';
export const _PER_PAGE_QPARAMS_G = 'PER_PAGE_QPARAMS_G';
export const _PAGE_QPARAMS_G = 'PAGE_QPARAMS_G';
export const _SEARCH_QPARAMS_G = 'SEARCH_QPARAMS_G';
export const _QPARAMS_G = 'QPARAMS_G';
export const _REQUEST_M = 'REQUEST_M';
export const _SUCCESS_M = 'SUCCESS_M ';
export const _ERROR_M = 'ERROR_M';
export const _PER_PAGE_M = 'PER_PAGE_M';
export const _CURRENT_M = 'CURRENT_M';
export const _SEARCH_M = 'SEARCH_M';
export const _LIST_A = 'LIST_A';

// public constants, to be used by clients of this module
export const LOADING_G = `${namespace}/${_LOADING_G}`;
export const HAS_RESULTS_G = `${namespace}/${_HAS_RESULTS_G}`;
export const SEARCH_M = `${namespace}/${_SEARCH_M}`;
export const CURRENT_M = `${namespace}/${_CURRENT_M}`;
export const LIST_A = `${namespace}/${_LIST_A}`;
