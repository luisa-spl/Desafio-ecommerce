import { useContext } from 'react';

import AuthContext from '../contextos/create';

export default function useAuth() {
    return useContext(AuthContext);
}