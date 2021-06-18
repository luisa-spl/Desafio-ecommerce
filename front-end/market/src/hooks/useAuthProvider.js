import { useState } from 'react';

export default function useProviderAuth() {
    const [token, setToken] = useState("");
    const [dadosUser, setDadosUser] = useState(null);

    const logar = (dadosToken, callback) => {
        setToken(dadosToken.token);
        setDadosUser(dadosToken.usuario);
        callback();
      };
    
      const deslogar = (callback) => {
        setToken(null);
        callback();
      };
    
      return {
        token,
        logar,
        deslogar,
        dadosUser,
        setDadosUser
      };
};