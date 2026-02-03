import VerificaToken from "@/lib/functions/VerificaToken";
import { AlterarDadosUsers } from "@/servers/controllers/ControllerUser";


export async function PUT(req: Request){

    try{    
        console.log("Entrou no route")
        //verifica se o usuáriio está logado
        const usuario = await VerificaToken(req);

        console.log("Verificou Token");

        const uid = usuario?.uid;

        const body = await req.json();

        console.log(body);

        
        if (!body.nome && !body.foto_perfil && !body.descricao && !body.pais){
            throw new Error("Sem dados para atualizar");
        }

        const bodyFormado = {
            uid: uid,
            nome: body.nome,
            foto_perfil: body.foto_perfil,
            descricao: body.descricao,
            pais: body.pais
        }

        console.log(bodyFormado);

        const resposta = await AlterarDadosUsers(bodyFormado);

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