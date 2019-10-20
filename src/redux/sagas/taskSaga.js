import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import swal from 'sweetalert';

function* getOpenTasks(action) {
    try {
        const response = yield axios.get(`/api/task/opentasks`, action.payload);
        yield put({ type: 'SET_OPEN_TASKS', payload: response.data})
    } catch (error) {
        swal('There was an error getting tasks. Please try again later.')
        console.log('error in GET_OPEN_TASKS: ', error);
    }
}

function* getMyTasks(action) {
    try {
        const response = yield axios.get(`/api/task/mytasks`, action.payload);
        yield put({ type: 'SET_MY_TASKS', payload: response.data})
    } catch (error) {
        swal('There was an error getting tasks. Please try again later.')
        console.log('error in GET_MY_TASKS: ', error);
    }
}

function* getAllTasks(action) {
    try {
        const response = yield axios.get(`/api/task/alltasks`, action.payload);
        yield put({ type: 'SET_ALL_TASKS', payload: response.data})
    } catch (error) {
        swal('There was an error getting tasks. Please try again later.')
        console.log('error in GET_ALL_TASKS: ', error);
    }
}

function* addTask(action) {
    try {
        yield axios.post('/api/task', action.payload);
        yield getOpenTasks(action);
        yield getMyTasks(action);
        yield getAllTasks(action);
    } catch (error) {
        swal('There was an error adding task. Please try again later.')
        console.log('error in ADD_TASK: ', error);
    }
}

function* completeTask(action) {
    try {
        yield axios.put('/api/task/complete', action.payload);
        yield getOpenTasks(action);
        yield getMyTasks(action);
        yield getAllTasks(action);
    } catch (error) {
        swal('There was an error completing task. Please try again later.');
        console.log('error in COMPLETE_TASK: ', error);
    }
}

function* getDetail(action) {
    try {
        const response = yield axios.get('/api/task/detail/' + action.payload.id)
        yield put({ type: 'SET_DETAIL', payload: response.data });
    } catch (error) {
        swal('There was an error getting task. Please try again later.');
        console.log('error in GET_DETAIL: ', error);
    }
}

function* deleteTask(action) {
    try {
        yield console.log(action.payload);
        yield axios.delete('/api/task/delete/' + action.payload.id);
        yield getOpenTasks(action);
        yield getMyTasks(action);
        yield getAllTasks(action);
    } catch (error) {
        swal('There was an error deleting task. Please try again later.');
        console.log('error in DELETE_TASK: ', error);
    }
}

function* editTask(action) {
    try {
        axios.put('api/task/edit', action.payload);
        yield getOpenTasks(action);
        yield getMyTasks(action);
        yield getAllTasks(action);
    } catch (error) {
        swal('There was an error updating task. Please try again later.');
        console.log('error in EDIT_TASK: ', error);
    }
}

function* claimTask(action) {
    try {
        axios.put('api/task/claim', action.payload);
        yield getOpenTasks(action);
        yield getMyTasks(action);
        yield getAllTasks(action);
    } catch (error) {
        swal('There was an error claiming task. Please try again later.');
        console.log('error in CLAIM_TASK: ', error);
    }
}

function* taskSaga() {
    yield takeLatest('GET_TASKS', getOpenTasks, getMyTasks, getAllTasks)
    yield takeLatest('GET_OPEN_TASKS', getOpenTasks);
    yield takeLatest('GET_MY_TASKS', getMyTasks);
    yield takeLatest('GET_ALL_TASKS', getAllTasks);  
    yield takeLatest('ADD_TASK', addTask);
    yield takeLatest('COMPLETE_TASK', completeTask);
    yield takeLatest('GET_DETAIL', getDetail);
    yield takeLatest('DELETE_TASK', deleteTask);
    yield takeLatest('EDIT_TASK', editTask);
    yield takeLatest('CLAIM_TASK', claimTask);
}

export default taskSaga;