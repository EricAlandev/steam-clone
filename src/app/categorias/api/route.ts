import { PuxarCategorias } from "@/servers/controllers/ControllerCategorias";

export async function GET(req: Request) {
    try {
        // Chama o controller passando os dados
        const resultado = await PuxarCategorias();

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
