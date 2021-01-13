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
  DOWNLOAD_SONG,
  CLEAR_QUEUE,
} from "../ActionTypes/ActionTypes";

const initialState = {
  topChartsData: [],
  newReleases: [],
  songData: [],
  retroClassic: [],
  radioMusic: [],
  featureArtists: [],
  artistDetails: [],
  genresMusic: [],
  genres: [],
  currentData: "",
  topCharts: [],
  retroClassicMusic: [],
  allSongs: [],
  songsTypeData: [],
  searchData: [],
  index: 0,
  activeIndex: null,
  downloadFile: "",
  queueSongs: [],
  clear: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOP_CHART_MUSIC:
      return {
        ...state,
        topChartsData: action.payload,
      };
    case NEW_RELEASES:
      return {
        ...state,
        newReleases: action.payload,
      };
    case SONG_DATA:
      return {
        ...state,
        songData: action.payload.payload,
        index: action.payload.index,
      };
    case RETRO_CLASSIC:
      return {
        ...state,
        retroClassic: action.payload,
      };
    case RADIO_MUSIC:
      return {
        ...state,
        radioMusic: action.payload,
      };
    case FEATURE_ARTISTS:
      return {
        ...state,
        featureArtists: action.payload,
      };
    case ARTIST_DETAILS:
      return {
        ...state,
        artistDetails: action.payload,
        currentData: "artistSongs",
      };
    case TOP_CHART:
      return {
        ...state,
        topCharts: action.payload,
        currentData: "topCharts",
      };
    case GENRES_MUSIC:
      return {
        ...state,
        genresMusic: action.payload,
        currentData: "genresMusic",
      };
    case RETRO_CLASSIC_MUSIC:
      return {
        ...state,
        retroClassicMusic: action.payload,
        currentData: "retroClassic",
      };

    case GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case ALL_SONGS:
      return {
        ...state,
        allSongs: action.payload,
      };
    case SONG_TYPE_DATA:
      return {
        ...state,
        songsTypeData: action.payload,
      };
    case SEARCH_DATA:
      return {
        ...state,
        searchData: action.payload,
      };
    case ACTIVE_INDEX:
      let concatData = state.queueSongs.concat(action.queue);
      let concatQueueData = concatData.filter(
        ((s) => ({ _id }) => !s.has(_id) && s.add(_id))(new Set())
      );
      return {
        ...state,
        activeIndex: action.payload,
        queueSongs: concatQueueData,
      };
    case CLEAR_QUEUE:
      return {
        ...state,
        queueSongs: action.payload,
      };
    case DOWNLOAD_SONG:
      return {
        ...state,
        downloadFile: action.payload,
      };
    default:
      return state;
  }
}
