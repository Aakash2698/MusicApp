import {
  TOP_CHART_MUSIC,
  NEW_RELEASES,
  SONG_DATA,
  RETRO_CLASSIC,
  RADIO_MUSIC,
  FEATURE_ARTISTS,
  ARTIST_DETAILS,
  TOP_CHART,
  GENRES,
  GENRES_MUSIC,
  RETRO_CLASSIC_MUSIC,
  ALL_SONGS,
  SONG_TYPE_DATA,
  SEARCH_DATA,
  ACTIVE_INDEX,
  CLEAR_QUEUE,
  DELETE_QUEUE_SONG,
  LOGIN_DATA,
} from "../ActionTypes/ActionTypes";

export const topChartMusic = () => (dispatch, getState, Api) => {
  return Api.get("topcharts/all-top-charts").then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: TOP_CHART_MUSIC,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const newReleaseMusic = () => (dispatch, getState, Api) => {
  return Api.get("new-release/get-new-release").then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: NEW_RELEASES,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const setMusicData = (payload, index) => (dispatch) => {
  return dispatch({
    type: SONG_DATA,
    payload: { payload, index },
  });
};

export const retroClassicMusic = () => (dispatch, getState, Api) => {
  return Api.get("retro-classic/get-retro-classic").then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: RETRO_CLASSIC,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const radioMusic = () => (dispatch, getState, Api) => {
  return Api.get("radio/get-radio").then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: RADIO_MUSIC,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const featureArtists = () => (dispatch, getState, Api) => {
  return Api.get("feature-artists/all-feature-artists").then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: FEATURE_ARTISTS,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const artistsDetails = (artistName) => (dispatch, getState, Api) => {
  return Api.get(`feature-artists/${artistName}`).then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: ARTIST_DETAILS,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const getChartDetails = (chartName) => (dispatch, getState, Api) => {
  return Api.get(`topcharts/${chartName}`).then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: TOP_CHART,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const genres = () => (dispatch, getState, Api) => {
  return Api.get("genres/all-genres").then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: GENRES,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const genresMusic = (genresType) => (dispatch, getState, Api) => {
  return Api.get(`genres/${genresType}`).then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: GENRES_MUSIC,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const retroClassic = (hitsArtist) => (dispatch, getState, Api) => {
  return Api.get(`retro-classic/${hitsArtist}`).then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: RETRO_CLASSIC_MUSIC,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const AllSongs = () => (dispatch, getState, Api) => {
  return Api.get(`genres/all-songs`).then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: ALL_SONGS,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const getSongsType = (songType) => (dispatch, getState, Api) => {
  return Api.get(`songs/${songType}`).then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: SONG_TYPE_DATA,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const getSearchAll = (searchText) => (dispatch, getState, Api) => {
  return Api.get(`songs/searchAll/${searchText}`).then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: SEARCH_DATA,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const getActiveIndex = (index, queueList) => (dispatch) => {
  if (index !== null) {
    return dispatch({
      type: ACTIVE_INDEX,
      payload: index,
      queue: queueList,
    });
  } else {
    return dispatch({
      type: ACTIVE_INDEX,
      queue: queueList,
    });
  }
};

export const clearQueue = () => (dispatch) => {
  return dispatch({
    type: CLEAR_QUEUE,
    payload: [],
  });
};

export const deleteQueueSong = (id) => (dispatch) => {
  return dispatch({
    type: DELETE_QUEUE_SONG,
    payload: id,
  });
};

export const downloadSong = (id) => (dispatch, getState, Api) => {
  // return Api.get(`songs/download/${id}`).then((response) => {
  //   if (response.response.status === 200) {
  //     dispatch({
  //       type: DOWNLOAD_SONG,
  //       payload: response.responseData,
  //     });
  //   }
  //   return response;
  // });
};

export const uploadFileToServer = (formData) => (dispatch, getState, Api) => {
  return Api.postForm("upload", formData).then((response) => {
    return response;
  });
};

export const getUserDetails = (id) => (dispatch, getState, Api) => {
  return Api.get(`user-details/${id}`).then((response) => {
    if (response.response.status === 200) {
      dispatch({
        type: LOGIN_DATA,
        payload: response.responseData,
      });
    }
    return response;
  });
};

export const updateProfileDetails = (id, payload) => (
  dispatch,
  getState,
  Api
) => {
  return Api.put(`update/${id}`, payload).then((response) => {
    return response;
  });
};
