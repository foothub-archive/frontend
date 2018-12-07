const namespace = 'me';
export default namespace;

// private constants, to be used in the module implementation
export const _LOADING_G = 'LOADING_G';
export const _LOADED_G = 'LOADED_G';
export const _ID_G = 'ID_G';
export const _REQUEST_M = 'REQUEST_M';
export const _SUCCESS_M = 'SUCCESS_M';
export const _ERROR_M = 'ERROR_M';
export const _NAME_M = 'NAME_M';
export const _GET_A = 'GET_A';
export const _PUT_A = 'PUT_A';

// public constants, to be used by clients of this module
export const LOADING_G = `${namespace}/${_LOADING_G}`;
export const LOADED_G = `${namespace}/${_LOADED_G}`;
export const REQUEST_M = `${namespace}/${_REQUEST_M}`;
export const SUCCESS_M = `${namespace}/${_SUCCESS_M}`;
export const ERROR_M = `${namespace}/${_ERROR_M}`;
export const NAME_M = `${namespace}/${_NAME_M}`;
export const GET_A = `${namespace}/${_GET_A}`;
export const PUT_A = `${namespace}/${_PUT_A}`;
