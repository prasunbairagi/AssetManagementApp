export const qrcodeFetch=(assetqrcode)=>{
    return(dispatch)=>{
        dispatch({
            type:'fetch',
            payload:assetqrcode
        })
    }
}
export const qrcodeClear=(assetqrcode)=>{
    return(dispatch)=>{
        dispatch({
            type:'clear',
            payload:''
        })
    }
}
export const loggedin=()=>{
    return(dispatch)=>{
        dispatch({
            type:'loggedin',
            payload:true
        })
    }
}
export const loggedout=()=>{
    return(dispatch)=>{
        dispatch({
            type:'loggedout',
            payload:false
        })
    }
}