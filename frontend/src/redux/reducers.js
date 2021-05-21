import {
  START_IMAGE_FETCHING,
  SUCCESS_IMAGE_FETCHING,
  FAILED_IMAGE_FETCHING,
  TOGGLE_IMAGE_SELECT,
  TOGGLE_IMAGE_GRID,
  START_GRID_FETCHING,
  SUCCESS_GRID_FETCHING,
  FAILED_GRID_FETCHING,
  USER_EXIST,
  START_GRID_SAVING,
  SUCCESS_GRID_SAVING,
  FAILED_GRID_SAVING,
  EDIT_GRID,
} from "./constants";

const initialState = {
  images: [],
  selectedImages: [],
  isLoading: false,
  isError: false,
  isGrid: false,
  isExistingUser: false,
};

const rootReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case START_IMAGE_FETCHING:
    case START_GRID_FETCHING:
    case START_GRID_SAVING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case SUCCESS_IMAGE_FETCHING:
    case TOGGLE_IMAGE_SELECT:
    case TOGGLE_IMAGE_GRID:
    case SUCCESS_GRID_FETCHING:
    case SUCCESS_GRID_SAVING:
    case EDIT_GRID:
      return {
        ...state,
        ...payload,
        isLoading: false,
        isError: false,
      };
    case FAILED_IMAGE_FETCHING:
    case FAILED_GRID_FETCHING:
    case FAILED_GRID_SAVING:
      return {
        ...state,
        ...payload,
        isLoading: false,
        isError: true,
      };
    case USER_EXIST:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
