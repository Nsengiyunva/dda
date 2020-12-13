import { combineReducers } from 'redux'
import applicationsReducer from './applicationsReducer'
import applicationFormReducer from './applicationFormReducer'

const reducer = combineReducers({
    application: applicationsReducer,
    form: applicationFormReducer
})

export default reducer