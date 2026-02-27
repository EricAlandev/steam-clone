import { PuxarTipoJogos } from "@/servers/controllers/ControllerJogos";

export async function GET(req: Request){
    try{    
        const {searchParams} = new URL(req.url);
        let tipoJogo = searchParams.get("tipoJogo");

        if(!tipoJogo || tipoJogo !== "" || tipoJogo === undefined){
            //define the type of the game who gonna be pulled;
            tipoJogo = "Novidades populares"
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