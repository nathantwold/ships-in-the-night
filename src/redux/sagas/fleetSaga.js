import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createFleet(action) {
    try {
        yield console.log(action.payload);
        const response = yield axios.post('/api/fleet', action.payload);
        yield console.log(response.data.id);
        yield axios.put(`/api/fleet/${action.payload.currentUser}`, response.data);
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* joinFleet(action) {
    try {
        yield axios.put('/api/fleet', action.payload)
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* userSaga() {
    yield takeLatest('NEW_FLEET', createFleet);
    yield takeLatest('JOIN_FLEET', joinFleet);
}

export default userSaga;