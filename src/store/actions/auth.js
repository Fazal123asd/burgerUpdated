import * as actionTypes from './actionTypes'
import fire from '../../config/fire'
import axios from 'axios'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () =>{
    // localStorage.removeItem('token')
    // localStorage.removeItem('expirationDate')
    // localStorage.removeItem('userId')
    return{
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () =>{
   return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) =>{
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
    
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
      

        // if (!isSignup) {
        //     fire.auth().signInWithEmailAndPassword(email, password).then((res) => {
                
        //                     dispatch(authSuccess(res.user.xa, res.user.uid))
                       
                    
        //     }).catch((err) => {
               
        //         dispatch(authFail(err.message))
        //     })
        // } else {
        //     fire.auth().createUserWithEmailAndPassword(email, password).then((res) => {
        //         console.log(res.user)
        //                     dispatch(authSuccess(res.user.xa, res.user.uid))
                       
     
        //     }).catch((error) => {
             
        //         dispatch(authFail(error.message))
        //     })
        // }
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAhHzVH353uzGS3rfKVemJvTtt8AJaet94'
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAhHzVH353uzGS3rfKVemJvTtt8AJaet94'
        }

        axios.post(url, authData )
        .then(res=>{
            localStorage.setItem('token', res.data.idToken)
            const expirationDate = new Date (new Date().getTime() + res.data.expiresIn * 1000)
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId', res.data.localId)
             dispatch(authSuccess(res.data.idToken, res.data.localId))
             dispatch(checkAuthTimeout(res.data.expiresIn))
        }).catch(error =>{
            console.log(error)
            dispatch(authFail(error))
        })



    }



}

export const setAuthRedirect = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())*1000))
            }
        }
    }
}