import { FiltraJogos } from "@/servers/controllers/ControllerJogos";

import { pesquisaRequest } from "@/servers/controllers/ControllerJogos";

export async function POST(req: Request){
    
    try{
        const body : pesquisaRequest = await req.json();

        //puxa jogos
        const jogos = await FiltraJogos(body);

        return new Response(JSON.stringify(jogos), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    catch(error){
        console.error("Erro no POST:", error);

        return new Response(JSON.stringify({ message: 'Erro ao cadastrar usuário' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}