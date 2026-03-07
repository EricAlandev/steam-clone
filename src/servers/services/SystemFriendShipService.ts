
//CONTROLLER AMIGOS;

import { Usuario } from "../entitys/EntityUsers";
import { jogos } from "../types/TypeJogos";

type retorno = {
    data: Usuario,
    games: jogos[]
}

//PULL ALL DATA VALUES OF USER;
export const pulldataOfCliente = async(id: string) => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/api/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const resposta: retorno = await response.json();

        return resposta.data;
    }

    catch(error){
        console.log(error);
    }
}

export const adicionarUserAmizade = async(idUserAdd : number,  token: string) => {
    try{
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/friendship/${idUserAdd}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        });

        const resposta = await request.json();
        return(resposta);
    }

    catch(error){
        console.log(error);
    }
}

export const deletarAmigo = async(idUserAdd : number,  token: string) => {
    try{
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/friendship/${idUserAdd}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        });

        const resposta = await request.json();
        return(resposta);
    }

    catch(error){
        console.log(error);
    }
}