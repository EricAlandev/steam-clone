import { ParamValue } from "next/dist/server/request/params";

//Adicionar comentário no perfil;
    export const adicionarComentariosPerfil = async(id: ParamValue, comentario: string, token: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/comentario/api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                comentario: comentario,
                idPage: id
            })
        });
    }

    //deletar comentário no perfil;
    export const deletarComentarioPerfil = async(idComentario: number, token: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/comentario/api/${idComentario}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }