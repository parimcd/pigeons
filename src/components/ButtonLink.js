import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const ButtonLink = ({
  variant = 'outlined',
  disabled,
  color = '',
  path = '',
  onClick,
  pageButton,
  children,
  classes,
}) => {
  return (
    <Link
      className={pageButton ? classes.pageButtonRoot : classes.root}
      onClick={onClick}
      to={path}
      style={{ textDecoration: 'none' }}
    >
      <Button
        variant={variant}
        color={color}
        // disabled={disabled}
        className={pageButton ? classes.pageButton : null}
      >
        {children}
      </Button>
    </Link>
  );
};

const styles = () => ({
  root: {
    padding: '2em',
  },
  pageButtonRoot: {
    padding: '5px',
  },
  pageButton: {
    padding: '0',
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',
  },
});

export default withStyles(styles)(ButtonLink);
