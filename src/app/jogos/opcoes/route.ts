import { PuxarTipoJogos } from "@/servers/controllers/ControllerJogos";

export async function GET(req: Request){
    try{    
        const {searchParams} = new URL(req.url);
        let tipoJogo = searchParams.get("tipoJogo");

        console.log("tipo",tipoJogo);

        if(!tipoJogo){
            throw new Error("Nenhuma categoria de jogos para puxar");
        }

        const opcoes = await PuxarTipoJogos(tipoJogo);

        return new Response(JSON.stringify(opcoes), 
            {
                status: 200,
                headers: {
                    'Content-Type' : 'application/json'
                }
        })
    }

    catch(error: any){
        return new Response(JSON.stringify({error: error.message || "Algum erro"}), 
            {
                status: 400,
                headers: {
                    'Content-Type' : 'application/json'
                }
        })
    }
}