import * as types from '../actions/actionTypes';

// Initial States
const initialState = {
  projects: []
};


// Reducer
const projectReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_PROJECTS_SUCCESS:
      return Object.assign({}, state, { projects: action.projects });

  }

  return state;
};

// Export Reducer
export default projectReducer;
