//websocket cllient

'use client'

import { useEffect } from "react";
import { DetalheJogos } from "@/app/jogos/[id]/page";
import { Dispatch,SetStateAction } from "react";
import { jogos } from "../types/TypeJogos";

type setDetalhes = {
  stateDetalhes: Dispatch<SetStateAction<jogos | undefined>>
}

export default function WebSocketClient({stateDetalhes}: setDetalhes){
  
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

  // Abrir conexão
  socket.onopen = () => {
    console.log("Conectado ao servidor!");
    socket.send("Olá servidor!");
  };

  // Ouvir mensagens
  socket.onmessage = async (event) => {
    const {tipo, payload} = JSON.parse(event.data);

      switch(tipo){
        
        case "Atualização de avaliações":
          const jogos = await DetalheJogos(payload);
          stateDetalhes(jogos);
      }
  };
  }, [])

  return null;
}