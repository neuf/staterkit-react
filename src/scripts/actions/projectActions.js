import * as types from './actionTypes';

export function getProjectsSuccess(projects) {
  return {
    type: types.GET_PROJECTS_SUCCESS,
    projects
  };
}
