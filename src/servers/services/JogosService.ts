

export async function PuxarOpcoesJogos(tipoJogo?: string){
    try{
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/jogos/opcoes?tipoJogo=${tipoJogo}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        const resposta = await request.json();

        console.log(resposta);

        return resposta
    }

    catch(error){
        return error;
    }
}