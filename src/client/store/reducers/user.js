const initialState = {
    fullname: '',
    username:'',
    email:''
}

export default function reducer(state = initialState , action) {
    console.log("Inside user reducer",state,action);
    return state;
}