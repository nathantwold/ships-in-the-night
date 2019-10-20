const fleetReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FLEET':
            return action.payload;
        default:
            return state;
    }
}

export default fleetReducer;