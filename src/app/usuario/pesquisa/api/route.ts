
//usuario/pesquisa/api
import { PesquisaUsuarios } from "@/servers/controllers/ControllerUser";

export async function POST(req: Request){

    try{    
        const body = await req.json();
        
        if (!body){
            throw new Error("Sem dados de pesquisa");
        }

        const pesquisa = body.pesquisa;

        const resposta = await PesquisaUsuarios(pesquisa);

        return new Response(JSON.stringify(resposta), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    catch(error){
        return new Response(JSON.stringify(error), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}