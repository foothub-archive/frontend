const namespace = 'auth';
export default namespace;

// private constants, to be used in the module implementation
export const _IS_AUTHED_G = 'IS_AUTHED_G';
export const _REQUEST_M = 'REQUEST_M';
export const _SUCCESS_M = 'SUCCESS_M';
export const _ERROR_M = 'ERROR_M';
export const _TOKEN_M = 'TOKEN_M';
export const _CLEAR_TOKEN_M = 'CLEAR_TOKEN_M';
export const _LOGIN_A = 'LOGIN_A';
export const _REFRESH_A = 'REFRESH_A';
export const _VERIFY_A = 'VERIFY_A';
export const _LOGOUT_A = 'LOGOUT_A';

// public constants, to be used by clients of this module
export const IS_AUTHED_G = `${namespace}/${_IS_AUTHED_G}`;
export const LOGIN_A = `${namespace}/${_LOGIN_A}`;
export const VERIFY_A = `${namespace}/${_VERIFY_A}`;
export const LOGOUT_A = `${namespace}/${_LOGOUT_A}`;
