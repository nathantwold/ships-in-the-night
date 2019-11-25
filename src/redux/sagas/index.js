import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import taskSaga from './taskSaga';
import fleetSaga from './fleetSaga';

// rootSaga is the primary saga.

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    taskSaga(),
    fleetSaga(),
  ]);
}
