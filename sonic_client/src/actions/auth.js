import * as api from '../api'

export const login = async(_data) =>{
    try{
        const data = await api.logIn(_data);
        console.log(data);

    }catch(error){
        console.log(error.message)
    }
}

export const signin = async(_data) =>{
    try{
        const data = await api.signUp(_data);
        console.log(data);

    }catch(error){
        console.log(error.message)
    }
}