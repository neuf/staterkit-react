import { combineReducers } from 'redux';

/*******
 * REDUCERS IMPORTS
 ******/
import projectReducer from './projectReducer';

// Combine Reducers
var reducers = combineReducers({
  projectReducer: projectReducer
});

export default reducers;
