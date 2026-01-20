import { WebSocketServer, WebSocket } from 'ws';

//websocket ss - server side 
const wss = new WebSocketServer({ port: 8080 });

console.log("Servidor WebSocket rodando na porta 8080");

wss.on('connection', (ws: WebSocket) => {
  console.log(" Novo cliente conectado");

  // Ouvindo mensagens do cliente
  ws.on('message', (data) => {
    const date = data.toString();

    //pega o dado convertido
    const FinalDate = JSON.parse(date); 

    //verifica as rotas;
    switch(FinalDate.type){
      case "Atualização de avaliações":
      ws.send(JSON.stringify({
        type: "Atualização de avaliações",
        payload: FinalDate.payload
      }))
    }
  });

  ws.on('close', () => {
    console.log(" Cliente desconectado");
  });
});

//evita broadcast e permite o envio de request pelo backend.
export default function EnvioPeloBackEnd(type: string, payload: any){
    wss.clients.forEach((client) => {
      const mensagem = JSON.stringify({
        type,
        payload
      })

      client.send(mensagem);
    })
}