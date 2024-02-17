const reducer = (state=false,action)=>{
    if(action.type==='loggedin'){
        return action.payload
    }
    else if(action.type==='loggedout'){
        return action.payload
    }
    else{
        return state
    }
}
export default reducer