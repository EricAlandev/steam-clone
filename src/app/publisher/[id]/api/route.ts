import VerificaToken, { VerificaTokenSemQuebrar } from "@/lib/functions/VerificaToken";
import { AddNewFollower, PullDataPublisher } from "@/servers/controllers/ControllerPublisher";


export async function GET(req: Request,  {params}: {params:  Promise<{id: string}>}){

    try{
        const usuarioLogado = await VerificaTokenSemQuebrar(req);

        console.log("after the verify token without breaking")
        let uid = null;

        if(usuarioLogado?.verificado === "S"){
            uid = usuarioLogado?.uid;
        }

        const parametros = await params;

        const id: number = Number( parametros?.id);

        console.log("entrou no id");
         
        let body = {
            id: id
        }
        
        if(uid && uid !== ""){
            const bodyComUid = {
                uid: uid
            }
            body = {...body, ...bodyComUid}
        }

        console.log(body);

        const publisher = await PullDataPublisher(body);
        
        console.log("after do publi");


        return (new Response(JSON.stringify(publisher), {
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

export async function POST(req: Request,  {params}: {params:  Promise<{id: string}>}){

    try{
        const {uid} = await VerificaToken(req);

        if(!uid){
            throw new Error("Sem uid coerente");
        }

        const parametros = await params;

        const id = Number(parametros?.id);

        const follower = await AddNewFollower(uid, id);


        return (new Response(JSON.stringify(follower), {
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