import VerificaToken from "@/lib/functions/VerificaToken";
import { adicionarAoCarrinho, deletar, PuxarCarrinho } from "@/servers/controllers/ControllerCarrinho";

export async function GET(req: Request){
    try{
        
        //valida o token do usuário
        const usuario = await VerificaToken(req);
        
        const uid = usuario?.uid;

        if (!uid){
            throw new Error("Falta de uid");
        }

        const request = await PuxarCarrinho(uid);
        
        
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

export async function POST(req: Request){
    try{
        console.log("dentro do router")
        
        //valida o token do usuário
        const usuario = await VerificaToken(req);

        console.log(usuario);
        
        const body = await req.json();

        console.log(body);


        const {idJogo} = body;

        if (!body || !idJogo){
            throw new Error("falta de arquivos na adição do carrinho")
        }

        //pega o uid dele;
        const uid = usuario?.uid;


        const bodyNovo = {
            idJogo: Number(idJogo),
            uidUsuario: uid
        }

        console.log("antes do adicionarCarrinho");

        const request = await adicionarAoCarrinho(bodyNovo);
        
        
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

export async function DELETE(req: Request){
    try{
        //valida o token do usuário
        const usuario = await VerificaToken(req);

        //uid usuário
        const uid = usuario.uid;
        
        //idJogo
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("idJogo")

        if (!id){
            throw new Error("Falta de id do jogo");
        }

        const idJogo = Number(id);

        const request = await deletar({uid, idJogo});
        
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
