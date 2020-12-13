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
            console.log( [ ...a, action.payload ] )
            return { ...state, file: [ ...a, action.payload ]  }
        default:
            return state
    }
}