import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';

const ProfileCard = ({ classes, card, pigeon }) => {
  const renderDetails = (
    <div className={classes.list}>
      <div className={classes.title}>
        {card ? <span>{pigeon.Pos}: </span> : ''} {pigeon.Pigeon}
      </div>
      <div className={card ? classes.cardBody : classes.listBody}>
        <div>Breeder: {pigeon.Breeder}</div>
        <div>Sex: {pigeon.Sex}</div>
        <div>Speed: {pigeon.Speed}</div>
        <div>Arrival: {pigeon.Arrival}</div>
      </div>
    </div>
  );

  return card ? (
    <Card className={classes.cardRoot} variant="outlined">
      {renderDetails}
    </Card>
  ) : (
    <div className={classes.listRoot}>{renderDetails}</div>
  );
};

const styles = () => ({
  cardRoot: {
    padding: '1em',
  },
  listRoot: {
    display: 'flex',
    borderBottom: 'solid grey 1px',
    padding: '1em 0',
  },
  title: {
    fontWeight: 'bold',
  },
  cardBody: {},
  listBody: {
    display: 'inline-flex',
    flexWrap: 'wrap',

    '& >div': {
      marginRight: '1em',
    },
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
});

ProfileCard.propTypes = {
  classes: PropTypes.object,
  card: PropTypes.bool,
  pigeon: PropTypes.object
}

export default withStyles(styles)(ProfileCard);
