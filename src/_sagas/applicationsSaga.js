import { call, put, takeLatest } from 'redux-saga/effects'

import Axios from 'axios'

// const url = 'http://154.72.194.200:3000/'

export function* watchFetchApplications(){
    yield takeLatest( "FETCH_APPLICATIONS", fetchApplications )
}
export function* fetchApplications( action ){
    try {
       const response = yield call(() => 
       Axios.get("http://154.72.194.247/dda/api/application/", 
       {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
       } ) 
       )

        yield put( { 
            type: "FETCH_APPLICATIONS_SUCCESS", 
            data: response.data.applications
        } )
    } catch ( error ) {
        yield put( { 
            type: "FETCH_APPLICATIONS_FAILED", 
            error
        } )
    }
}