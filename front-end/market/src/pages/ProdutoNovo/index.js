import Sidebar from "../../componentes/Sidebar";
import { TextField, Button } from '@material-ui/core'

function ProdutoNovo() {
    return(
        <div className="container">
            <Sidebar />
            <div className="main">
              
                <h1>Loja da Leticia</h1>
                <h2> Adicionar Produto </h2>
                <TextField></TextField>
            </div>
        </div>
    )
}

export default ProdutoNovo;