import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import useAuth from '../../hooks/useAuth';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Alert from '@material-ui/lab/Alert';
import { 
    Typography,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
 } from '@material-ui/core';



export default function MediaCard(props) {
    const auth = useAuth();
    const history = useHistory();
    const classes = useStyles();
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    async function handleDelete(){
        setOpen(false);
        setCarregando(true);

        try {
            const resposta = await fetch(`http://localhost:3000/produtos/${props.id} `, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,  
                }
            });

            if(!resposta.ok) {
                setErro("Não foi possível excluir");
            }

            history.push('/produtos');
        }
        catch(error) {
            setErro(error.message);
        }

    }
       

  return (
    <>
        <Card className={classes.root} >
        <CardActionArea>
            <div className={classes.button}>
                <Fab color="secondary" aria-label="edit" onClick={handleClickOpen}>
                    <DeleteIcon size='small'/>
                </Fab>
            </div>
            <CardMedia
            className={classes.media}
            image={props.imagem}
            title={props.nome}
            onClick={() => history.push(`/produtos/editar/${props.id}`)}
            
            />
            <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
                {props.nome}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {props.descricao}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardContent>
            <div className={classes.infos}>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.estoque}>
                        {props.estoque} UNIDADE(S)
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.preco}>
                        R${props.preco/100}
                    </Typography> 
                </div>
        </CardContent>
        </Card>
    
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Remover produto do catálogo?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Essa ação não pode ser desfeita.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Manter produto
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
                Remover
            </Button>
            </DialogActions>
        </Dialog>
        {carregando && <CircularProgress />}
        {erro && <Alert severity="error">{erro}</Alert>}
    </>
  );
}