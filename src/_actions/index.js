export const sendStaffId = (id) => {
    return {
        type: "OBTAIN_STAFF_ID",
        id
    }
}
export const fetchApplications = () => {
    return {
        type: "FETCH_APPLICATIONS"

    }
}
export const fetchApplicationsSucess = data => {
    return {
        type: "FETCH_APPLICATIONS_SUCCESS",
        data

    }
}
export const fetchApplicationsFailed = error => {
    return {
        type: "FETCH_APPLICATIONS_FAILED",
        error

    }
}
export const fetchLeaves = () => {}
export const fetchRequisitions = () => {}

export const saveFormPayload = payload => {
    return {
        type: "SAVE_FORM_PAYLOAD",
        payload
    }
}
export const saveFormPayloadSuccess = data => {
    return {
        type: "SAVE_FORM_PAYLOAD_SUCCESS",
        data
    }
}
export const saveFormPayloadFailed = error => {
    return {
        type: "SAVE_FORM_PAYLOAD_FAILED",
        error
    }
}
export const toggleButtonFalse = () => {
    return {
        type: "TOGGLE_EDIT_FALSE"
    }
}
export const toggleButtonTrue = () => {
    return {
        type: "TOGGLE_EDIT_TRUE"
    }
}
export const prepareFormEdit = payload => {
    return {
        type: "PREPARE_FORM_EDIT",
        payload
    }
}

export const saveApplicationDetails = (payload) => {
    return {
        type: "SAVE_APPLICATION_DETAILS",
        payload: payload 
    }
}
export const savePDFile = payload => {
    return {
        type: "SAVE_PDF_FILE",
        payload
    }
}