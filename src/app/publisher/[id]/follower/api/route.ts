

import VerificaToken from "@/lib/functions/VerificaToken";

import { AddNewFollower, RemoveNewFollower } from "@/servers/controllers/ControllerPublisher";

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

export async function DELETE(req: Request,  {params}: {params:  Promise<{id: string}>}){

    try{
        const {uid} = await VerificaToken(req);

        if(!uid){
            throw new Error("Sem uid coerente");
        }

        const parametros = await params;

        const id = Number(parametros?.id);

        const follower = await RemoveNewFollower(uid, id);


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