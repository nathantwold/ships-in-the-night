import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

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
      yield axios.put('/api/fleet/join', action.payload);
  } catch (error) {
      console.log('Fleet join request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('NEW_FLEET', createFleet);
  yield takeLatest('JOIN_FLEET', joinFleet);
}

export default userSaga;
