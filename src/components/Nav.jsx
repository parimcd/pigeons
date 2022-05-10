import Button from './Button';
import withStyles from '@material-ui/core/styles/withStyles';

const Nav = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Button path="/" variant="contained">
        Design 1
      </Button>
      <Button path="/design2" variant="contained">
        Design 2
      </Button>
      <Button path="/design3" variant="contained">
        Design 3
      </Button>
    </div>
  );
};

const styles = () => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default withStyles(styles)(Nav);
