import * as Actions from './actions';

const modal = (state = {}, action) => {
    switch (action.type) {
        case Actions.ADD_MODAL:
            return {
                name: action.name
            };
        default:
            return state
    }
};

export const modals = (state = [], action) => {
    switch (action.type) {
        case Actions.ADD_MODAL:
            return [
                ...state,
                modal(undefined, action)
            ];
        default:
            return state
    }
};