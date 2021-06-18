import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'left',
        marginLeft: '6rem',
        gap: '0.5rem',
        marginTop: '2rem'
    },

    container: {
        display: 'flex',
        backgroundColor: '#E5E5E5',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '25rem',
        minHeight: '20rem',
        padding: '1rem',
        borderRadius: '1rem',
        boxShadow: '0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)',
        backgroundColor: 'white'
    },

    botoes: {
        display: 'flex',
        width: '25rem',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    img: {
        marginLeft: 25,
        width: 200,
        height: 300,
        placeSelf: 'center',
        borderRadius:18
    }
    
  }));

  export default useStyles;