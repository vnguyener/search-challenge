import axios from 'axios';
import {
  SET_PROFILES_LIST,
  SET_SELECTED_PROFILE,
  SORT_PROFILES,
  SET_IS_PROFILE_LIST_LOADING,
  SET_IS_PROFILE_LOADING,
  SET_SELECTED_PROFILE_ERROR,
  SET_PROFILES_LIST_ERROR,
} from '../reducers/profiles';

export const getProfilesList = () => async (dispatch) => {
  dispatch(setIsProfileListLoading(true));
  dispatch({
    type: SET_PROFILES_LIST_ERROR,
    error: null,
  });
  try {
    const res = await axios.get(`/api/profiles`);
    if (res.data && res.data.profiles) {
      dispatch({
        type: SET_PROFILES_LIST,
        profiles: res.data.profiles,
      });
    }
    dispatch(setIsProfileListLoading(false));
  } catch (err) {
    dispatch(setIsProfileListLoading(false));
    dispatch({
      type: SET_PROFILES_LIST_ERROR,
      error: err.response?.data?.error || 'Unexpected error has occurred.',
    });
  }
};

export const getSelectedProfile = (profileId) => async (dispatch) => {
  dispatch(setIsProfileLoading(true));
  dispatch({
    type: SET_SELECTED_PROFILE_ERROR,
    error: null,
  });

  try {
    const res = await axios.get(`/api/profiles/${profileId}`);
    if (res.data && res.data.profile) {
      dispatch(setSelectedProfile(res.data.profile));
    }
    dispatch(setIsProfileLoading(false));
  } catch (err) {
    dispatch(setIsProfileLoading(false));

    dispatch({
      type: SET_SELECTED_PROFILE_ERROR,
      error: err.response?.data?.error || 'Unexpected error has occurred.',
    });
  }
};

export const sortProfileList = (sortDirection) => ({
  type: SORT_PROFILES,
  sort: sortDirection,
});

export const setSelectedProfile = (profile) => ({
  type: SET_SELECTED_PROFILE,
  profile,
});

export const setIsProfileListLoading = (isLoading) => ({
  type: SET_IS_PROFILE_LIST_LOADING,
  isListLoading: isLoading,
});

export const setIsProfileLoading = (isLoading) => ({
  type: SET_IS_PROFILE_LOADING,
  isProfileLoading: isLoading,
});
