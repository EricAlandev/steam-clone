import { PuxarJogosAteCertoValor, PuxarJogosDestaques } from "@/servers/controllers/ControllerJogos";



export async function GET(req: Request){
    
    try{
        

        const {searchParams} = new URL(req.url);
        const valor = searchParams.get("valor");

        let resposta = null;

        //if valor exists, thats mean the application need to fetch the games who are less than an x price;
        if(valor){
            const jogosAte20 = await PuxarJogosAteCertoValor(valor);
            resposta = jogosAte20;
        }

        //if nots exists, thast mean, the application goona fetch all the games.
        else if(!valor){
            //puxa jogos
            const jogos = await PuxarJogosDestaques();
            resposta = jogos;
        }

        return new Response(JSON.stringify(resposta), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    catch(error){
        console.error("Erro no POST:", error);

        return new Response(JSON.stringify({ message: "error no puxarJogos Controller" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}