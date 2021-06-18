import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'left',
        marginLeft: '6rem',
        gap: '1rem',
        marginTop: '2rem'
    },

    container: {
        display: 'flex',
        backgroundColor: '#E5E5E5',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '25rem',
        minHeight: '20rem',
        marginTop: '1rem'
    },

    botoes: {
        display: 'flex',
        width: '25rem',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
}));

export default useStyles;