import { FiltraJogos } from "@/servers/controllers/ControllerJogos";

import { pesquisaRequest } from "@/servers/controllers/ControllerJogos";

export async function POST(req: Request){
    
    try{
        const body = await req.json();

        console.log(body);
        //puxa jogos
        const jogos = await FiltraJogos(body);

        console.log(jogos, "vai voltar");


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