import VerificaToken from "@/lib/functions/VerificaToken";
import AdicionarComentario from "@/servers/controllers/ControllerJogos";

type body = {
    recomenda?: boolean,
    comentario?: string, 
    idJogo?: number
}

type TypeBody = {
    body: body
}

export async function POST(req: Request){
    
    try{
        await VerificaToken(req);

        const body = await req.json();

        //puxa jogos
        const jogos = await AdicionarComentario({body});

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