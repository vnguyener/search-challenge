import axios from 'axios';
import { SET_PROFILES_LIST, SET_SELECTED_PROFILE } from '../reducers/profiles';

export const getProfilesList = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profiles`);
    if (res.data && res.data.profiles) {
      dispatch({
        type: SET_PROFILES_LIST,
        profiles: res.data.profiles,
      });
    } else {
      // todo throw error snackbar
    }
  } catch (e) {
    // todo throw error snackbar
  }
};

export const getSelectedProfile = (profileId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profiles/${profileId}`);
    if (res.data && res.data.profile) {
      dispatch({
        type: SET_SELECTED_PROFILE,
        profile: res.data.profile,
      });
    } else {
      // todo throw error snackbar
    }
  } catch (e) {
    // todo throw error snackbar
  }
};
