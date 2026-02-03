'use client'

import { createContext, useContext, useEffect, useState } from "react";

type GlobalContextType = {
  usuario: any | null;
  token: string | null;
  login: (usuario: any, token: string) => void;
  loading: boolean,
  logOut: () => void;
};

type Children = {
    children: React.ReactNode
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export default function GlobalContextProvider({ children }: Children) {
  const [usuario, setUsuario] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [montado, setMontado] = useState(false); 

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

  useEffect(() => {
    const ParsearValores = () => {
      try {
        const localStorageUser = localStorage.getItem("usuario");
        const localStorageToken = localStorage.getItem("token");

        if (localStorageUser && localStorageUser !== "undefined") {
          setUsuario(JSON.parse(localStorageUser));
        }
        if (localStorageToken && localStorageToken !== "undefined") {
          setToken(JSON.parse(localStorageToken));
        }
      } catch (e) {
        console.error("Erro ao ler localStorage", e);
      } finally {
        setLoading(false);
        setMontado(true);
      }
    }

    ParsearValores();
  }, []);

  return (
    <GlobalContext.Provider value={{ usuario, token, login, logOut, loading }}>
        {/* A div evita o erro de Hydration escondendo o conteúdo até o match entre Server/Client */}
        <div style={{ visibility: montado ? 'visible' : 'hidden' }}>
            {children}
        </div>
    </GlobalContext.Provider>
  );
}

// O hook que faltava pra você usar nos componentes
export const dadosGlobais = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("dadosGlobais deve ser usado dentro de um GlobalContextProvider");
    }
    return context;
};