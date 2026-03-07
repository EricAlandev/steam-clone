import VerificaToken from "@/lib/functions/VerificaToken";
import { adicionarAoCarrinho, deletar, PayForGames, PuxarCarrinho } from "@/servers/controllers/ControllerCarrinho";

export async function POST(req: Request){
    try{
        
        //valida o token do usuário
        const {uid} = await VerificaToken(req);
        
        if (!uid){
            throw new Error("Falta de uid");
        }

        const request = await PayForGames(uid);
        
        
        return new Response(JSON.stringify(request), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    catch(error){
        return new Response(JSON.stringify(`mensagem: ${error}`), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
