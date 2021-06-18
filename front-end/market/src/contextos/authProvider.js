import AuthContext from  './create';

import useProviderAuth from '../hooks/useAuthProvider';

export default function AuthProvider(props) {
    const auth = useProviderAuth();

    return (
        <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
      );
}