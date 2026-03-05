

type idToken = {
    id: string,
    token?: string
}

type idCategory = {
    id: string,
    categoria: string
}

export async function PuxarDadosPublisher({
    id, token
} : idToken){


    //if token exists, headers gonna have the authorization token;
    const headers: Record<string, string> = {
        'Content-Type' : 'application/json'
    }

    if(token !== "" && token){
        headers['Authorization'] = `Bearer ${token}`
    }

    try{
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/publisher/${id}/api`, {
            method: "GET",
            headers: headers
        });

        const response = await request.json();

        console.log(response);

        return response;
    }

    catch(error){
        console.log(error);
    }
}

export async function GamesByCategoryPublisher({
    id,
    categoria
} : idCategory){


    //if token exists, headers gonna have the authorization token;
    const headers: Record<string, string> = {
        'Content-Type' : 'application/json'
    }

    try{
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/publisher/${id}/jogos/api?categoria=${categoria}`, {
            method: "GET",
            headers: headers
        });

        const response = await request.json();

        console.log(response);

        return response;
    }

    catch(error){
        console.log(error);
    }
}

export async function AddFollower(id: string, token: string){

    try{
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/publisher/${id}/api`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        });

        const response = await request.json();

        console.log(response);

        return response;
    }

    catch(error){
        console.log(error);
    }
}