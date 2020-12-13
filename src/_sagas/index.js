import { all } from 'redux-saga/effects'
import { watchFetchApplications } from './applicationsSaga'
import { watchFetchLeave } from './leaveSaga'

export default function* rootSaga(){
    yield all([
        watchFetchApplications(),
        watchFetchLeave()
    ])
}