import { DadosUsuarios } from "@/servers/controllers/ControllerUser";


export async function GET(req: Request, {params} : {params: {id: string}} ){
    
    try{
        const parametros = await params;
        const id : string =  parametros?.id;
        const idConvertido = parseInt(id);

        //pull data and games
        const data = await DadosUsuarios(idConvertido);


        return new Response(JSON.stringify({data}), {
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