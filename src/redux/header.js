const SHOW_SEARCH_HEADER = 'SHOW_SEARCH_HEADER';
const SHOW_INIT_HEADER = 'SHOW_INIT_HEADER';
const SHOW_GO_BACK_HEADER = 'SHOW_GO_BACK_HEADER';
const SHOW_BLANK_HEADER = 'SHOW_BLANK_HEADER';

export function showBlankHeader () {
    return (dispatch) => {
        dispatch({
            type: SHOW_BLANK_HEADER,
        });
    }
}

export function showGoBackHeader () {
    return (dispatch) => {
        dispatch({
            type: SHOW_GO_BACK_HEADER,
        });
    }
}

export function showSearchHeader () {
    return (dispatch) => {
        dispatch({
            type: SHOW_SEARCH_HEADER,
        });
    }
}

export function showInitialHeader() {
    return (dispatch) => {
        dispatch({
            type: SHOW_INIT_HEADER,
        });
    }
}

export const initial_header = 'initial_header';
export const search_header = 'search_header';
export const goBack_header = 'goBack_header';
export const blank_header = 'blank_header';

const initialState = initial_header;

export default (state = initialState, action) => {
    switch(action.type) {
        case SHOW_SEARCH_HEADER:
            return search_header;
        case SHOW_INIT_HEADER:
            return initial_header;
        case SHOW_GO_BACK_HEADER:
            return goBack_header;
        case SHOW_BLANK_HEADER:
            return blank_header;
        default:
            return state;
    }
}