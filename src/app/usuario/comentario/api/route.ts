import VerificaToken from "@/lib/functions/VerificaToken";
import { adicionarComentarioNoPerfil } from "@/servers/controllers/ControllerUser";


export async function POST(req: Request){

    try{    
        const {uid} = await VerificaToken(req);

        const {comentario, idPage} = await req.json();

        const idUserTeraComentario = Number(idPage);

        console.log(idUserTeraComentario, idPage);
        
        const resposta = await adicionarComentarioNoPerfil({idUserTeraComentario, comentario, uid});

        console.log("Passou");

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