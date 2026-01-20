import admin from "firebase-admin";
import steam from '../../steam.json';
import { ServiceAccount } from "firebase-admin";

// Verifica se já existem apps inicializados
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(steam as ServiceAccount),
  });
}

// Exporta a instância existente ou a nova
export default admin;