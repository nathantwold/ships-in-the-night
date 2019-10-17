import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createFleet(action) {
    try {
        const response = yield axios.post('/api/fleet/create', action.payload);
        yield axios.put(`/api/fleet/create/${action.payload.currentUser}`, response.data);
    } catch (error) {
        console.log('Fleet create request failed', error);
        alert('Please choose a different fleet name.')
    }
}

function* joinFleet(action) {
    try {
        yield axios.put('/api/fleet/join', action.payload)
    } catch (error) {
        console.log('Fleet join request failed', error);
    }
}

function* fleetSaga() {
    yield takeLatest('NEW_FLEET', createFleet);
    yield takeLatest('JOIN_FLEET', joinFleet);
}

export default fleetSaga;