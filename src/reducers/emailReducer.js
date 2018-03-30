import * as types from '../constants/actionTypes';

const initialState = {
  user: {
    userId: 1,
    userImage: `https://avatars2.githubusercontent.com/u/7544036?s=460&v=4`,
    userName: `Camaromelt`
  }
};
const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_STORY:
      return Object.assign({}, state, {
        item: 'new item'
      });
    default:
      return state;
  }
}

export default emailReducer

