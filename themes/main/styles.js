import palette from './palette';
import {darken} from 'material-ui/styles/colorManipulator';

export default shade => ({
  '@global': {
    'body *, html *': {
      boxSizing: 'border-box',
    },
    'html, body': {
      backgroundColor: palette.shades[shade].background.default,
      fontSize: '18px',
      margin: 0,
      padding: 0,
      fontFamily: '"Helvetica", "Arial", sans-serif',
    },
    a: {
      color: palette.common.teal,
      textDecoration: 'underline',
    },
  },
});