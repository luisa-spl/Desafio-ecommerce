import Sidebar from '../../componentes/Sidebar';
import { Typography, Button, Divider } from '@material-ui/core';
import dadosUser  from '../../hooks/useAuthProvider';
import { useHistory } from 'react-router-dom';
import './style.css';


function Produtos() {
    const history = useHistory();
 

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                {/* <Typography>{dadosUser.nome_loja}</Typography> */}
                <h1>Loja da Leticia</h1>
                <h2> Seus produtos </h2>
                <Divider />

                <Button variant="contained" color="primary" onClick={() => history.push('/produtos/novo')}>Adicionar produto</Button>

            </div>
        </div>
    )
}

export default Produtos;