import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import swal from 'sweetalert';

function* createFleet(action) {
    try {
        const response = yield axios.post('/api/fleet/create', action.payload);
        yield axios.put(`/api/fleet/create/${action.payload.currentUser}`, response.data);
    } catch (error) {
        console.log('Fleet create request failed', error);
        swal('Fleet name not available', 'Please choose a different fleet name.', 'warning')
    }
}

function* joinFleet(action) {
    try {
        yield axios.put('/api/fleet/join', action.payload);
    } catch (error) {
        console.log('Fleet join request failed', error);
    }
}

function* fetchFleet(action) {
    try {
        const response = yield axios.get('/api/fleet/view', action.payload);
        yield put({ type: 'SET_FLEET', payload: response.data });
    } catch (error) {
        console.log('Fleet view request failed', error);
    }
}

function* removeUser(action) {
    try {
        yield axios.put('/api/fleet/remove', action.payload)
        yield fetchFleet(action);
    } catch (error) {
        console.log('Error trying to remove user', error);
    }
}

function* fleetSaga() {
    yield takeLatest('NEW_FLEET', createFleet);
    yield takeLatest('JOIN_FLEET', joinFleet);
    yield takeLatest('FETCH_FLEET', fetchFleet);
    yield takeLatest('REMOVE_USER', removeUser);
}

export default fleetSaga;