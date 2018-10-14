import { withInfo } from '@storybook/addon-info';

export default withInfo({
  propTables: false,
  styles: {
    header: {
      h1: {
        display: 'none',
        margin: 0,
        padding: 0,
      },
      h2: {
        margin: 0,
        padding: 0,
        fontSize: '25px',
        color: '#1a9582',
      },
    },
  },
});
