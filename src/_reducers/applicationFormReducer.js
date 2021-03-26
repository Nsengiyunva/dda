const initialState = {
    values: {},
    editform: {}
}

export default ( state = initialState, action ) => {
    switch( action.type ){
        case "SAVE_FORM_PAYLOAD":
         return { ...state, values: { ...action.payload } }
        case "TOGGLE_EDIT_FALSE":
         return { ...state, flag: false }
        case "TOGGLE_EDIT_TRUE":
            return { ...state, flag: true }
        case "PREPARE_FORM_EDIT":
            return { ...state, editform: action.payload }
        case "SAVE_PDF_FILE":
            let a = [ action.payload ]
            return { ...state, file: [ ...a, action.payload ]  }
        case "SAVE_ACTIVITY_VALUES":
            let combined = Object.assign( {}, state.activities, action.payload )
            console.log( 'here',combined )

            return { ...state, activities: action.payload }
        case "SAVE_CURRENT_VALUES":
            return { ...state, current: [ ...action.payload ] }
        case "SAVE_LEADERSHIP_VALUES":
            return { ...state, leadership: action.payload }
        default:
            return state
    }
}