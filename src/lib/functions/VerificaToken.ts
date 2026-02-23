

import admin from "../firebase/firebaseAdmin";

export default async function VerificaToken(req: Request){

    console.log("Entrou no Verifica Token");
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Token não fornecido ou formato inválido");
    }

    //pega o token 
    const token = authHeader.split(" ")[1];
    console.log(token)


    try {
        console.log("entrou no verifica token")

        const decodedToken = await admin.auth().verifyIdToken(token);
        return decodedToken; 
        
    } catch (error) {
        throw new Error("Token inválido ou expirado");
    }
    
}