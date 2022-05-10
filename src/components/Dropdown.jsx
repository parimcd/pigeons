import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Dropdown = ({ classes, options, sort, onChange, title }) => (
  <div className={classes.sort}>
    <span>{ title }</span>
    <FormControl variant="outlined" className={classes.root}>
      <Select
        value={sort}
        onChange={onChange}
        className={classes.selectStyle}
        SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
      >
        {Object.keys(options).map((opt) => (
          <MenuItem value={options[opt]} className={classes.itemStyle} key={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);

const styles = () => ({
  root: {
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    padding: '0.5em 2em 0.5em 1em',
  },
  sort: {
    display: 'flex',
    alignItems: 'center',
  },
  selectStyle: {
    minWidth: '150px',
  },
  itemStyle: {
    padding: '0 1em',
  },
});

Dropdown.propTypes = {
  classes: PropTypes.object,
  options: PropTypes.object,
  sort: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string
};

Dropdown.defaultProps = {
  title: 'sort by'
}
export default withStyles(styles)(Dropdown);
