const fleetReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FLEET':
            console.log('fleet reducer: ', action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default fleetReducer;