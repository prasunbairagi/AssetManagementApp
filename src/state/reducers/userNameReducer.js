const reducer = (state='',action)=>{
    if(action.type==='loginUser'){
        return action.payload
    }
    else if(action.type==='logoutUser'){
        return action.payload
    }
    else{
        return state
    }
}
export default reducer