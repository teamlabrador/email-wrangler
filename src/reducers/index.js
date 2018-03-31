import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
// import all reducers here
import emailReducer from './emailReducer.js';


// combine reducers
// reducers is a FUNCTION
const reducers = combineReducers({
  // if we had other reducers, they would go here
  projects: emailReducer,
  form: formReducer
});

// make the combined reducers available for import
export default reducers;