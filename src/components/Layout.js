import Nav from './Nav';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';

const Layout = ({
  title = 'Title',
  sort = '',
  children,
  classes,
  pageControls,
}) => {
  return (
    // <div className={classes.root}>
    <Container maxWidth="lg">
      <div className={classes.header}>
        <div className={classes.title}>{title}</div>
        <div className={classes.sort}>{sort}</div>
      </div>
      <div className={classes.main}>{children}</div>
      <div className={classes.pageNav}>{pageControls}</div>
      {/* </div> */}
    </Container>
  );
};

const styles = () => ({
  root: {
    display: 'grid',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: 'solid purple 3px',
    padding: '1em',
  },
  title: { fontWeight: 'bold' },
  sort: {},
  main: {
    display: 'grid',
    padding: '2em',
  },
  pageNav: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2em',
  },
});

export default withStyles(styles)(Layout);