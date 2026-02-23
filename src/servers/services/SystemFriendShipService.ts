
//CONTROLLER AMIGOS;
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