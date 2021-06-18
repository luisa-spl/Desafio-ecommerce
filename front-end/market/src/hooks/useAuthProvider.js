import { useState } from 'react';

export default function useProviderAuth() {
    const [token, setToken] = useState("user");
    const [dadosUser, setDadosUser] = useState(null);

    const logar = (callback) => {
        setToken("user");
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