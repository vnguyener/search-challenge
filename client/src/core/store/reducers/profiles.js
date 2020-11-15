export const SET_PROFILES_LIST = 'SET_PROFILES_LIST';
export const SET_SELECTED_PROFILE = 'SET_SELECTED_PROFILE';
export const SORT_PROFILES = 'SORT_PROFILES';
export const SET_IS_PROFILE_LIST_LOADING = 'SET_IS_PROFILE_LIST_LOADING';

const initialState = {
  profilesList: [],
  selectedProfile: null,
  isListLoading: false,
};

const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILES_LIST:
      return { ...state, profilesList: action.profiles };
    case SET_SELECTED_PROFILE:
      return { ...state, selectedProfile: action.profile };
    case SORT_PROFILES: {
      let sortedProfiles = [...state.profilesList];

      if (action.sort === 'ascending') {
        sortedProfiles.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1));
      } else if (action.sort === 'descending') {
        sortedProfiles.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1));
      }

      return { profilesList: sortedProfiles };
    }
    case SET_IS_PROFILE_LIST_LOADING:
      return { ...state, isListLoading: action.isListLoading };
    default:
      return state;
  }
};

export default profilesReducer;
