// ProjectActions.js

import api from "../api";
import { RESET_USER_STATE, GET_PROJECT_SUCCESS, GET_PROJECT_FAIL, GET_PROJECT_REQUEST, GET_USER_REQUEST, GET_USER_FAIL, GET_USER_SUCCESS} from "../constants/ProjectConstents";

export const resetUser = () => ({
    type: RESET_USER_STATE, 
});


export const setUser = () => async (dispatch) => {
    try{

        dispatch({type: GET_USER_REQUEST});
        const {data} = await api.get('/api/userprofile/');
        dispatch({type: GET_USER_SUCCESS, payload: data})

    }catch (error){
        dispatch({
            type: GET_USER_FAIL,
            payload: error.response && error.response.data.message
        })

    }
}


// export const getListProjects = () => async (dispatch) => {
//     try{
        
//         dispatch({type: GET_PROJECT_REQUEST});
//         const {data} = await api.get("/api/notes/")
//         dispatch({type: GET_PROJECT_SUCCESS, payload: data})

//     }catch (error) {

//         dispatch({
//             type: GET_PROJECT_FAIL,
//             payload: error.response && error.response.data.message
//         })
//     }
// }


