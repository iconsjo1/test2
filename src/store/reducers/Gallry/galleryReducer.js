import { GalleryReducerTypes } from '../../../services';

const INITIAL_STATE = {
    loading: true,
    errors: {},
    Images: []
};

const {
    SET_LOADING,
    SET_ERRORS,
    SET_ALL_IMAGES
} = GalleryReducerTypes;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload };
        case SET_ERRORS:
            return { ...state, errors: action.payload };
        case SET_ALL_IMAGES:
            return { ...state, Images: action.payload };
        default:
            return state;
    }
};
