import {delay, put, takeEvery} from 'redux-saga/effects';
// import {increment, incrementBy} from '../features/test/testSlice';
// import {IncrementAsync, IncrementBuf} from './types';
// import {unpackBuffer} from '../helpers/buffer';
// import {IncrementStruct} from '../structs/increment';

export function* expensesSaga() {
    console.log('SAGA');
//   yield takeEvery<IncrementAsync>('INCREMENT_ASYNC', function* () {
//     yield delay(2000);
//     yield put(increment());
//   });
}

// export function* incrementBuf() {
//   yield takeEvery<IncrementBuf>('INCREMENT_BUF', function* ({buffer}) {
//     const json = unpackBuffer(IncrementStruct, buffer);
//     yield put(incrementBy(json.value));
//   });
// }