import VerificaToken, { VerificaTokenSemQuebrar } from "@/lib/functions/VerificaToken";
import { AddNewFollower, PullDataPublisher, PullGamesPublisher } from "@/servers/controllers/ControllerPublisher";


export async function GET(req: Request,  {params}: {params:  Promise<{id: string}>}){

    try{

        const parametros = await params;

        const id: number = Number( parametros?.id);

        const {searchParams} = new URL(req.url);
        const categoria = searchParams.get("categoria");

        let retorno = null;

        if(id && categoria){
            const publisher = await PullGamesPublisher(id, categoria);

            retorno = publisher;
        }

        else{
            throw new Error("falta de id ou categoria");
        }

        return (new Response(JSON.stringify(retorno), {
            status: 200,
            headers: {
                'Content-Type' : 'application/json',
            }
        }));
    }

    catch(error){

        return new Response(JSON.stringify(error), {
            status: 400,
            headers: {
                'Content-Type' : 'application/json'
            }
        })
    }
}
