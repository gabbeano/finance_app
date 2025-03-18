import {all} from 'redux-saga/effects';
import {expensesSaga} from './sagas/expenses';

export default function* rootSaga() {
    yield all([
        expensesSaga(),
    ])
}