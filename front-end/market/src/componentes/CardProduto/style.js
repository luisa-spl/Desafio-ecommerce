import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 200,
        borderRadius: 24,
      },
      media: {
        height: 170,
        maxWidth: 200,
        minWidth: 200
      },
      infos: {
          display: 'flex',
          justifyContent: 'space-around'
      },
      button: {
            '& > *': {
              margin: 10,
              position: 'absolute'
            }
      }
}));

export default useStyles;