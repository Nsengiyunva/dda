import { call, put, takeLatest } from 'redux-saga/effects'

// import Axios from 'axios'

const url = 'http://154.72.194.247/api/auth/'

export function* watchFetchLeave(){
    yield takeLatest( "FETCH_LEAVES", fetchLeaves )
}
export function* fetchLeaves( action ){
    let { role, username } = action
    try {
        let json = yield fetch( "http://154.72.194.247/api/auth/getAllApplications" )
            .then( response => response.json() )

        let user_records = json.results.filter( ( value ) => {
            return value.email_address = username
        })

        yield put({ type: 'FETCH_LEAVES_SUCCESS', data: role === 'User' ? user_records : json.results })
    } catch ( error ) {
        yield put({ type: 'FETCH_LEAVES_ERROR', error})
    }
}