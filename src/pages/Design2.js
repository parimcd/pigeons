import React, { useState, useEffect } from 'react';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import { endPoint, sortOptions, objectToQuery } from '../helpers';
import ContentGrid from '../components/ContentGrid';
import Card from '../components/ProfileCard';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';

const Design2 = ({ classes }) => {
  const [pigeons, setPigeons] = useState([]);
  const [totalPigeons, setTotalPigeons] = useState(0);
  const [query, setQuery] = useState({
    sort: sortOptions.pos,
    start: 1,
    end: 10,
    limit: 10,
  });
  const { sort, start, end, limit } = query;
  const isMorePigeons = totalPigeons - end > 0;
  const displayingNumbers = `1 - ${end}`;

  useEffect(() => {
    loadPigeons();
  }, [start, sort]);

  const loadPigeons = async () => {
    try {
      const res = await axios.get(endPoint(`/pigeons?${objectToQuery(query)}`));
      setPigeons([...pigeons, ...res.data.data]);
      setTotalPigeons(res.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadmore = () => {
    setQuery({
      ...query,
      start: end + 1,
      end: end + limit < totalPigeons ? end + limit : totalPigeons,
    });
  };

  const handleSortChange = (e) => {
    setPigeons([]);
    setQuery({
      ...query,
      start: 1,
      end: 10,
      sort: e.target.value,
    });
  };

  const renderPageControls = (
    <div>
      {isMorePigeons ? <Button onClick={handleLoadmore}>Load more</Button> : ''}
    </div>
  );

  const renderPigeonList = (
    <div className={classes.root}>
      {pigeons ? pigeons.map((p, i) => <Card card pigeon={p} key={i} />) : ''}
    </div>
  );

  return (
    <ContentGrid
      title={`${displayingNumbers} out of ${totalPigeons} Pigeons`}
      sort={
        <Dropdown
          options={sortOptions}
          onChange={handleSortChange}
          sort={sort}
        />
      }
      pageControls={renderPageControls}
    >
      {renderPigeonList}
    </ContentGrid>
  );
};

const styles = () => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(max-content, 250px))',
    justifyContent: 'center',
    gridGap: '1em',
  },
  sort: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default withStyles(styles)(Design2);
