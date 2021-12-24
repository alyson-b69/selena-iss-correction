import { call, put, takeEvery } from "redux-saga/effects";
import { WHERE_ISS, ISS_IS_HERE } from "../store/actionISS";

function issPosition() {
  return fetch("http://api.open-notify.org/iss-now.json").then((res) =>
    res.json()
  );
}

function* getISSFetch() {
  const iss = yield call(issPosition);
  yield put({ type: WHERE_ISS, iss });
}

function* mySaga() {
  yield takeEvery("ISS_IS_HERE", getISSFetch);
}

export default mySaga;
