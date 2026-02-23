import VerificaToken from "@/lib/functions/VerificaToken";
import { AddFriend, RemoveFriend} from "@/servers/controllers/ControllerAmigos";


export async function POST(req: Request, params: {params: Promise<{id: string}>}){
    try{
        const {uid} = await VerificaToken(req);
        
        const parametro = await params.params

        const id = Number(parametro.id)

        console.log(uid, id);
        if(uid && id){
            const adicionar = await AddFriend(id, uid);

            return new Response(JSON.stringify(adicionar), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            }); 
        }
    }

    catch(error){
        return new Response(JSON.stringify({mensagem: "Falha ao adicionar usuário da lista de amigos"}), {
            status: 400,
            headers: {
                'Content-Type' : 'application/json'
            }
        })
    }
}

export async function DELETE(req: Request, params: {params: Promise<{id: string}>}){
    try{
        const {uid} = await VerificaToken(req);
        
        const parametro = await params.params

        const id = Number(parametro.id)

        if(!uid && !id){
            throw new Error("")
        }

        const adicionar = await RemoveFriend(id, uid);

            return new Response(JSON.stringify(adicionar), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });  
    }

    catch(error){
        return new Response(JSON.stringify({mensagem: "Falha ao deletar usuário da lista de amigos"}), {
            status: 400,
            headers: {
                'Content-Type' : 'application/json'
            }
        })
    }
}