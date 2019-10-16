import { combineReducers } from 'redux';

const openTaskReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_OPEN_TASKS':
            return action.payload;
        default:
            return state;
    }
}

const myTaskReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MY_TASKS':
            return action.payload;
        default:
            return state;
    }
}

const allTaskReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_TASKS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    openTaskReducer,
    myTaskReducer,
    allTaskReducer,
});