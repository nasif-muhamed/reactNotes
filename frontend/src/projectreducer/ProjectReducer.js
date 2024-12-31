import { GET_USER_FAIL, GET_USER_REQUEST, GET_USER_SUCCESS, GET_PROJECT_FAIL, GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, RESET_USER_STATE } from "../constants/ProjectConstents";
import { combineReducers } from "redux";


const initialUserState = {
    currentUserState : {
        currentUser: null,
        isLoading: true,
    }
}

export const user_reducer = (state=initialUserState, action) => {
    switch(action.type) {
        case GET_USER_REQUEST:
            return {loading: true, success: false, userData: []}

        case GET_USER_SUCCESS:
            return {loading: false, success: true, userData: action.payload}

        case GET_USER_FAIL:
            return {loading: false, success: false, error: action.payload}

        case RESET_USER_STATE:  // Reset the user state when logging out
            return { ...initialUserState };

        default:
            return state
    }
}

const rootReducer = combineReducers({
    // projectLists: projectListsReducer,
    userData: user_reducer,
})

export default  rootReducer




// export const projectListsReducer = (state={all_notes: []}, action) => {

//     switch (action.type) {
//         case GET_PROJECT_REQUEST:
//             return {loading: true, success: false, all_notes: []}
//         case GET_PROJECT_SUCCESS:
//             return {loading: false, success: true, all_notes: action.payload}
//         case GET_PROJECT_FAIL:
//             return {loading: false, success: false, error: action.payload}
//         default:
//             return state
//     }
// }

