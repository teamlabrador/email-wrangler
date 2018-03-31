// import actionType constants
import * as types from '../constants/actionTypes';

export const login = (credentials) => ({
  type: types.LOGIN,
  payload: credentials,
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const composeThread = (threadInfo) => ({
  type: types.COMPOSE_THREAD,
  payload: threadInfo,
});

export const composeMessage = (messageInfo) => ({
  type: types.COMPOSE_MESSAGE,
  payload: messageInfo,
});

export const authorizeMessage = (messageInfo) => ({
  type: types.AUTHORIZE_MESSAGE,
  payload: messageInfo,
});
