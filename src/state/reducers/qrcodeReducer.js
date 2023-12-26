const reducer = (state=0,action)=>{
    if(action.type==='fetch'){
        return action.payload
    }
    else if(action.type==='clear'){
        return action.payload
    }
    else{
        return state
    }
}
export default reducer