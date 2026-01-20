import { Dado } from "@/componentes/pages/authentication/cadastro/CadastroForm";
import { CadastrarUsuario } from "@/servers/controllers/ControllerUser";

export async function POST(req: Request) {
    try {
        // Extrai o corpo da requisição
        const dados: Dado = await req.json();

        // Chama o controller passando os dados
        const resultado = await CadastrarUsuario(dados);

        // Retorna resposta com status 201 e JSON
        return new Response(JSON.stringify(resultado), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Erro no POST:", error);

        return new Response(JSON.stringify({ message: 'Erro ao cadastrar usuário' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
