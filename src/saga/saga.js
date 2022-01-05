import { call, put, takeEvery } from "redux-saga/effects";
import { WHERE_ISS, ISS_IS_HERE } from "../store/actionISS";

function issPosition() {
  return fetch("http://api.open-notify.org/iss-now.json").then((res) =>
    res.json()
  );
}

function* getISSFetch() {
  const iss = yield call(issPosition);
  yield put({ type: ISS_IS_HERE, iss });
}

function* mySaga() {
  yield takeEvery(WHERE_ISS, getISSFetch);
}

export default mySaga;
