import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Dropdown = ({ classes, options, sort, onChange }) => {
  return (
    <FormControl variant="outlined" className={classes.root}>
      <Select
        value={sort}
        onChange={onChange}
        className={classes.selectStyle}
        SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
      >
        {Object.keys(options).map((opt) => (
          <MenuItem value={options[opt]} className={classes.itemStyle}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const styles = () => ({
  root: {
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    padding: '0.5em 2em 0.5em 1em',
  },
  selectStyle: {
    minWidth: '150px',
  },
  itemStyle: {
    padding: '0 1em',
  },
});

export default withStyles(styles)(Dropdown);
