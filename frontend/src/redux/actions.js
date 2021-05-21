import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

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
import config from "../config";

export const fetchImages = () => async (dispatch) => {
  try {
    dispatch({ type: START_IMAGE_FETCHING });

    const { data } = await axios.get(`${config.backendUrl}/images`);

    dispatch({
      type: SUCCESS_IMAGE_FETCHING,
      payload: {
        images: data,
      },
    });
  } catch (e) {
    console.log(e);
    dispatch({ type: FAILED_IMAGE_FETCHING });
  }
};

export const toggleSelectedImages = (selectedImages) => (dispatch) => {
  dispatch({
    type: TOGGLE_IMAGE_SELECT,
    payload: {
      selectedImages,
    },
  });
};

export const toggleGrid = (isGrid) => (dispatch) => {
  dispatch({
    type: TOGGLE_IMAGE_GRID,
    payload: {
      isGrid,
    },
  });
};

// TODO: Complete the function
export const fetchGrid = () => async (dispatch) => {
  try {
    dispatch({ type: START_GRID_FETCHING });

    const fp = await FingerprintJS.load();
    const result = await fp.get();

    const fingerPrint = result.visitorId;

    const { data } = await axios.get(
      `${config.backendUrl}/grid/${fingerPrint}`
    );

    dispatch({
      type: SUCCESS_GRID_FETCHING,
    });

    if (data.length) {
      dispatch({
        type: USER_EXIST,
        payload: {
          isExistingUser: true,
          selectedImages: data[0].imageGrid,
        },
      });
    }
  } catch (e) {
    console.log("Error fetching grid: ", e);
    dispatch({ type: FAILED_GRID_FETCHING });
  }
};

export const saveGrid = ({ imageGrid }) => async (dispatch) => {
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    const fingerPrint = result.visitorId;
    dispatch({ type: START_GRID_SAVING });

    await axios.post(`${config.backendUrl}/grid`, {
      fingerPrint,
      imageGrid,
    });

    dispatch({
      type: SUCCESS_GRID_SAVING,
      payload: {
        selectedImages: imageGrid,
      },
    });

    dispatch({
      type: USER_EXIST,
      payload: {
        isExistingUser: true,
      },
    });
  } catch (e) {
    console.log("Error saving grid: ", e);
    dispatch({ type: FAILED_GRID_SAVING });
  }
};

export const editGrid = () => (dispatch) => {
  dispatch({
    type: EDIT_GRID,
    payload: {
      isExistingUser: false,
    },
  });
};
