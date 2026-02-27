
import cron from 'node-cron';
import { getDataSource } from '@/lib/db';
import { Jogos } from '../entitys/EntityJogos';
import { Avaliacoes } from '../entitys/EntityAvaliacoes';


// Gerenciar em tempo real as avaliações do usuário;
export default async function WorkerAvaliacao(){


    cron.schedule('10 * * * * *', async () => {

        console.log("Worker Inicializou");
      
        const AppDataSource = await getDataSource();
        
        const jogos = await AppDataSource.getRepository(Jogos).find({
          relations: {
              comentarios: true
          }
        });
      
        if (jogos.length === 0){
          throw new Error("Jogos sem comentários")
        }
      
        for(let i = 0; i < jogos.length; i++){
          const jogoAtual = jogos[i];
          const QTcomentarios = jogoAtual.comentarios.length;
          let avaliacoesNegativas = 0;
          let avaliacoesPositivas = 0;

          //verifica se existe avaliacao existente
          const puxarAvaliacoesExistentes = await AppDataSource.getRepository(Avaliacoes).find({
            where : {
                jogos: {id: jogoAtual.id}
            }
          })

          if (QTcomentarios > 0){
              //percorre a array de comentários 
              for(let y = 0; y < QTcomentarios; y++){
                  //pega quantidade de avaliações negativas
                  if (jogoAtual.comentarios[y].recomenda === false){
                      avaliacoesNegativas++;
                  }
      
                  //pega quantidade de avaliações positivas
                  if ( jogoAtual.comentarios[y].recomenda === true){
                      avaliacoesPositivas++;
                  }
              }
      
              //Média das avaliações
              const mediaAvaliacoes = (avaliacoesPositivas/QTcomentarios) * 100;
      
              //aceitação do jogo
              let estado_aceitaçao = "";

      
              //define o tipo de aceitação
              if (mediaAvaliacoes >= 0 &&  mediaAvaliacoes < 10){
                  estado_aceitaçao = "Extremamente Negativas"
              }
      
              else if (mediaAvaliacoes >= 10 &&  mediaAvaliacoes < 25){
                  estado_aceitaçao = "Bem Negativas"
              }
      
              else if (mediaAvaliacoes >= 25 &&  mediaAvaliacoes < 40){
                  estado_aceitaçao = "Negativas"
              }
      
              else if (mediaAvaliacoes >= 40 &&  mediaAvaliacoes < 60){
                  estado_aceitaçao = "Neutras"
              }
      
              else if (mediaAvaliacoes >= 60 &&  mediaAvaliacoes < 75){
                  estado_aceitaçao = "Positivas"
              }
      
              else if (mediaAvaliacoes >= 75 &&  mediaAvaliacoes < 85){
                  estado_aceitaçao = "Bem positivas"
              }
      
              else{ 
                  estado_aceitaçao = "Extremamente positivas"
              }
              
              //já existe, só atualiza 
              if (puxarAvaliacoesExistentes.length > 0){
                    const atualizarAvaliacoes = await AppDataSource.getRepository(Avaliacoes).update(
                        { jogos: { id: jogoAtual.id } }, 
                        
                        {
                            aceitacao_jogo: estado_aceitaçao,
                            quantidade_comentarios: QTcomentarios
                        }
                        )
              }

              //Não existe, tem que criar;
              else if (puxarAvaliacoesExistentes.length === 0){
                const armazenaNotificacoes = await AppDataSource.getRepository(Avaliacoes).create({
                    aceitacao_jogo: estado_aceitaçao,
                    quantidade_comentarios: QTcomentarios,
                    jogos: {id: jogoAtual.id}
                })

                await AppDataSource.getRepository(Avaliacoes).save(armazenaNotificacoes)
              }
          }
      
          else {
              //Verifica se já existe avaliações existente
              if (puxarAvaliacoesExistentes.length === 0){
                const semAvaliacoes = await AppDataSource.getRepository(Avaliacoes).create({
                    aceitacao_jogo: "Sem avaliações",
                    quantidade_comentarios: 0,
                    jogos: {id: jogoAtual.id}
                })
        
                await AppDataSource.getRepository(Avaliacoes).save(semAvaliacoes)
              }   
          }
        }  
      }); 
}