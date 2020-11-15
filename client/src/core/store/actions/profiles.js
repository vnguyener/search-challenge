import axios from 'axios';
import {
  SET_PROFILES_LIST,
  SET_SELECTED_PROFILE,
  SORT_PROFILES,
  SET_IS_PROFILE_LIST_LOADING,
} from '../reducers/profiles';

export const getProfilesList = () => async (dispatch) => {
  try {
    dispatch(setIsProfileListLoading(true));
    const res = await axios.get(`/api/profiles`);
    if (res.data && res.data.profiles) {
      dispatch({
        type: SET_PROFILES_LIST,
        profiles: res.data.profiles,
      });
    } else {
      // todo throw error snackbar
    }
    dispatch(setIsProfileListLoading(false));
  } catch (e) {
    // todo throw error snackbar
    dispatch(setIsProfileListLoading(false));
  }
};

export const getSelectedProfile = (profileId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profiles/${profileId}`);
    if (res.data && res.data.profile) {
      dispatch(setSelectedProfile(res.data.profile));
    } else {
      // todo throw error snackbar
    }
  } catch (e) {
    // todo throw error snackbar
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
