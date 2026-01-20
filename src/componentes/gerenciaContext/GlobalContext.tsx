'use client'

import { createContext, useContext, useEffect, useState } from "react";

// tipos básicos (opcional, mas correto)
type GlobalContextType = {
  usuario: any | null;
  token: string | null;
  login: (usuario: any, token: string) => void;
  logOut: () => void;
};

//tipo do children que é um componente react
type Children = {
    children: React.ReactNode
}

// cria o contexto
const GlobalContext = createContext<GlobalContextType | null>(null);

// provider
export default function GlobalContextProvider({ children }: Children) {
  const [usuario, setUsuario] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);


  // função de login
  const login = (usuarioDados: any, tokenDados: string) => {
    setUsuario(usuarioDados);
    setToken(tokenDados);

    localStorage.setItem("usuario", JSON.stringify(usuarioDados));
    localStorage.setItem("token", JSON.stringify(tokenDados));
  };

  const logOut = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUsuario(null);
    setToken(null);
  }

  // carregar do localStorage
  useEffect(() => {
    const localStorageUser = localStorage.getItem("usuario");
    if (localStorageUser) {
      const usuarioParseado = JSON.parse(localStorageUser);
      setUsuario(usuarioParseado);
    }

    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      const tokenParseado = JSON.parse(localStorageToken);
      setToken(tokenParseado);
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ usuario, token, login, logOut  }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const dadosGlobais = () => useContext(GlobalContext);


