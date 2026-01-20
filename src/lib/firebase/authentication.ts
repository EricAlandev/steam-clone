
import {app} from './firebase'

import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    getAuth

 } from 'firebase/auth';


const auth = getAuth(app);


//criar usuário 
const criarUsuario = async(email:string, senha:string): Promise<string> => {

    try{
        const resp = await createUserWithEmailAndPassword(auth, email, senha);
        const user = resp.user;
        const uid = user.uid

    return uid
    }

    catch(error){
        throw new Error("Falha ao cadastrar via firebase")
    }
}

const loginUsuario = async(email:string, senha:string): Promise<{token:string, uid:string}> => {

    try{
        const resp = await signInWithEmailAndPassword(auth, email, senha);
        const user = resp.user;

        //pega o Token do usuário
        const token = await user.getIdToken();
        const uid = await user?.uid;

    return {token, uid}
    }

    catch(error){
        throw new Error("Falha ao cadastrar via firebase")
    }
}

export {
    criarUsuario,
    loginUsuario
}

