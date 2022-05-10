import ButtonLink from './ButtonLink';
import withStyles from '@material-ui/core/styles/withStyles';

const Nav = ({ classes }) => {
  return (
    <div className={classes.root}>
      <ButtonLink path="/" variant="contained">
        Design 1
      </ButtonLink>
      <ButtonLink path="/design2" variant="contained">
        Design 2
      </ButtonLink>
      <ButtonLink path="/design3" variant="contained">
        Design 3
      </ButtonLink>
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
