import { PuxarJogos } from "@/servers/controllers/ControllerJogos";



export async function GET(){
    
    try{
        //puxa jogos
        const jogos = await PuxarJogos();

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