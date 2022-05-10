import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button as MuiButton} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const Button = ({
  variant = 'outlined',
  disabled,
  color = 'default',
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
      <MuiButton
        variant={variant}
        color={color}
        disabled={disabled}
        className={pageButton ? classes.pageButton : null}
      >
        {children}
      </MuiButton>
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

Button.propTypes = {
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  path: PropTypes.string,
  onClick: PropTypes.func,
  pageButton: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  classes: PropTypes.object
}

Button.defaultProps = {
  variant: 'outlined'
}

export default withStyles(styles)(Button);
