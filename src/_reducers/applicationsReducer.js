const initialState = {
    id: null,
    data: [],
    leaves: [],
    applications: [],
    loading: true
}

export default ( state = initialState, action ) => {
    switch( action.type ){
        case "OBTAIN_STAFF_ID":
         return { ...state, id: action.id }
        case "FETCH_APPLICATIONS":
            return { ...state, loading: true }
        case "FETCH_APPLICATIONS_SUCCESS":
            return { ...state, applications: action.data, loading: false }
        case "FETCH_APPLICATIONS_FAILED":
            return { ...state, error: action.error, loading: false }
        case "SAVE_APPLICATION_DETAILS":
            return { ...state, application_details: action.payload.details }
        default:
            return state
    }
}