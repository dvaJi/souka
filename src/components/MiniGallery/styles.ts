import { createStyles } from '@material-ui/core/styles';

const styles = createStyles({
  container: {
    height: 105,
    overflowY: 'auto'
  },
  image: {
    height: 100,
    border: '1px solid #000',
    margin: 2,
    '&:hover': {
      filter: 'brightness(0.5)',
      transition: 'all .15s ease'
    }
  },
  imageActive: {
    filter: 'brightness(0.7)'
  }
});

export default styles;
