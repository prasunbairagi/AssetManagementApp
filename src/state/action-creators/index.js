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
export const userNameAssign=(nameofuser)=>{
    return(dispatch)=>{
        dispatch({
            type:'loginUser',
            payload:nameofuser
        })
    }
}
export const userNameRemoval=()=>{
    return(dispatch)=>{
        dispatch({
            type:'logoutUser',
            payload:''
        })
    }
}
export const addAssetForm=(assetformobject)=>{
    return(dispatch)=>{
        dispatch({
            type:'addAssetForm',
            payload:assetformobject
        })
    }
}
export const resetAssetForm=()=>{
    return(dispatch)=>{
        dispatch({
            type:'deleteForm',
            payload:null
        })
    }
}