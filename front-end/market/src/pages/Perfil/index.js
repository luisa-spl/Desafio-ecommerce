import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Sidebar from '../../componentes/Sidebar/Sidebar';
import useStyles from './style';
import { useHistory } from 'react-router-dom';
import { 
    Button,
    Divider,
    TextField,
    InputLabel,
    Typography
    } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


function Perfil() {
    const classes = useStyles();
    const auth = useAuth();
    const history = useHistory();
    const [erro, setErro] = useState("");
    const [dados, setDados] = useState({});
    
    
    useEffect( () => {
        async function dadosUsuario() {
            
            try {
        
                const resp = await fetch('http://localhost:3000/perfil', {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'   
                    }
                });
                
                const  dados = await resp.json();
                
                if(resp.status === 200) {
                    setDados(dados);
                } else{
                    setErro(dados.erro);
                }   
            } catch (error) {
                setErro(error.message);
            }
        }
        dadosUsuario()
    }, [auth.token])


    return(
        <div className={classes.container}>
            <Sidebar />
            <div className={classes.main}>
            <Typography variant="h4">{dados.nome_loja}</Typography>
                <Typography variant='h5'>Perfil</Typography>
                <form  noValidate autoComplete="off"  className={classes.form}>
                    
                    <InputLabel htmlFor="nome">Seu nome</InputLabel>
                    <TextField  size='small' id='nome' placeholder={dados.nome}  type='text'/> 

                    <InputLabel htmlFor="nome">Nome da Loja</InputLabel>
                    <TextField  size='small' id='nome' placeholder={dados.nome_loja}  type='text'/>  

                    <InputLabel htmlFor="nome">Email</InputLabel>
                    <TextField  size='small' id='nome' placeholder={dados.email}  type='text'/>                   
                     
                    <Divider />
                
                    <div className={classes.botoes}>
                        <Button color='primary' variant="contained" onClick={() => history.push('/perfil/editar')}>Editar Perfil</Button>
                    </div>  
                    {erro ?? <Alert variant="filled" severity="error">{erro}</Alert>}
                </form>
            </div>
        </div>
    );
};

export default Perfil;