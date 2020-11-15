export const SET_PROFILES_LIST = 'SET_PROFILES_LIST';
export const SET_SELECTED_PROFILE = 'SET_SELECTED_PROFILE';

const initialState = {
  profilesList: [],
  selectedProfile: null,
};

const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILES_LIST:
      return { ...state, profilesList: action.profiles };
    case SET_SELECTED_PROFILE:
      return { ...state, selectedProfile: action.profile };
    default:
      return state;
  }
};

export default profilesReducer;
