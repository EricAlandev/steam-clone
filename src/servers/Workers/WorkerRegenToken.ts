
import { dadosGlobais } from '@/componentes/gerenciaContext/GlobalContext';
import { app } from '@/lib/firebase/firebase';
import { getAuth } from 'firebase/auth';
import cron from 'node-cron';

export default function WorkerRegenToken(){

    const {usuario , token, login} = dadosGlobais();

    cron.schedule('* 30 * * * *', async () => {
        
        const auth = getAuth(app);

        const novoToken = await auth.currentUser?.getIdToken(true)!;

        await login(usuario, novoToken);

    })
}