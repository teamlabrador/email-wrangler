// import actionType constants
import * as types from '../constants/actionTypes';

export const addStory = (story) => ({
  type: types.ADD_STORY,
  story,
});

export const deleteStory = (storyId) => ({
  type: types.DELETE_STORY,
  id: storyId,
});

export const getStories = () => ({
  type: types.GET_STORIES
});

export const updateStory = (storyId) => ({
  type: types.UPDATE_STORY,
  id: storyId,
});
