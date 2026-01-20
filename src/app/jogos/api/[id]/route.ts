import { DetalheJogos } from "@/servers/controllers/ControllerJogos";

//types
type params = {
    id: string
}

export async function GET(req: Request, {params} : {params: {id:string}} ){
    
    try{
        const {id} = await params;
        const idNumber = parseInt(id);

        console.log(id);
        console.log(idNumber);
        
        //verifica se houve problema na conversão.
        if (!id || isNaN(idNumber)){
            throw new Error("ID inválido")
        }

        //puxa jogos
        const jogos = await DetalheJogos({idNumber});

        return new Response(JSON.stringify(jogos), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    catch(error){
        console.error("Erro no POST:", error);

        return new Response(JSON.stringify({ message: 'Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}