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