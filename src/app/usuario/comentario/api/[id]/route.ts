import VerificaToken from "@/lib/functions/VerificaToken";
import { deletarComentarioPerfil } from "@/servers/controllers/ControllerUser";


export async function DELETE(req: Request, {params}: {params: Promise<{id: string}>}){

    try{    
        await VerificaToken(req);

        const idComentario = await params;

        const idConvertido = Number(idComentario.id);
        
        console.log("Antes de deletarComentarioPerfil");
        const resposta = await deletarComentarioPerfil(idConvertido);

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