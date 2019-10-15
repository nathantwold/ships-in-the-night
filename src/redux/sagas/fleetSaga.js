import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createFleet() {
    try {
        const response = yield axios.post('/api/fleet');
        yield put({ type: '', payload: response.data });
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* joinFleet() {
    try {

    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* userSaga() {
    yield takeLatest('NEW_FLEET', createFleet);
    yield takeLatest('JOIN_FLEET', joinFleet);
}

export default userSaga;