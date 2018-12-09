const namespace = 'user';
export default namespace;

// private constants, to be used in the module implementation
export const _LOADED_G = 'LOADED_G';
export const _REQUEST_M = 'REQUEST_M';
export const _SUCCESS_M = 'SUCCESS_M';
export const _ERROR_M = 'ERROR_M';
export const _USER_M = 'USER_M';
export const _CLEAR_USER_M = 'CLEAR_USER_M';
export const _POST_A = 'POST_A';
export const _GET_A = 'GET_A';

// public constants, to be used by clients of this module
export const LOADED_G = `${namespace}/${_LOADED_G}`;
export const POST_A = `${namespace}/${_POST_A}`;
export const GET_A = `${namespace}/${_GET_A}`;
