import Nav from './Nav';
import withStyles from '@material-ui/core/styles/withStyles';

const Layouts = ({ classes, children }) => {
  return (
    <div className={classes.root}>
      <Nav />
      <div>{children}</div>
    </div>
  );
};

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1440',
    width: '100%',
    height: '100%',
    margin: '0 auto',
    position: 'relative',
  },
});

export default withStyles(styles)(Layouts);
