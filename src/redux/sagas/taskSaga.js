import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getOpenTasks(action) {
    try {
        const response = yield axios.get(`/api/task/opentasks`, action.payload);
        yield put({ type: 'SET_OPEN_TASKS', payload: response.data})
    } catch (error) {
        alert('There was an error getting tasks. Please try again later.')
        console.log('error in GET_OPEN_TASKS: ', error);
    }
}

function* getMyTasks(action) {
    try {
        const response = yield axios.get(`/api/task/mytasks`, action.payload);
        yield put({ type: 'SET_MY_TASKS', payload: response.data})
    } catch (error) {
        alert('There was an error getting tasks. Please try again later.')
        console.log('error in GET_MY_TASKS: ', error);
    }
}

function* getAllTasks(action) {
    try {
        const response = yield axios.get(`/api/task/alltasks`, action.payload);
        yield put({ type: 'SET_ALL_TASKS', payload: response.data})
    } catch (error) {
        alert('There was an error getting tasks. Please try again later.')
        console.log('error in GET_ALL_TASKS: ', error);
    }
}

function* taskSaga() {
    yield takeLatest('GET_OPEN_TASKS', getOpenTasks);
    yield takeLatest('GET_MY_TASKS', getMyTasks);
    yield takeLatest('GET_ALL_TASKS', getAllTasks);    
}

export default taskSaga;