import React, { useState, useEffect } from 'react';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import { endPoint, sortOptions } from '../config';
import Layout from '../components/Layout';
import Card from '../components/PigeonCard';
import Dropdown from '../components/Dropdown';
import ButtonLink from '../components/ButtonLink';

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
      const res = await axios.get(
        endPoint(`/pigeons?_sort=${sort}&_start=${start}&_end=${end}`)
      );
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
      {isMorePigeons ? (
        <ButtonLink onClick={handleLoadmore}>Load more</ButtonLink>
      ) : (
        ''
      )}
    </div>
  );

  const renderPigeonList = (
    <div className={classes.root}>
      {pigeons ? pigeons.map((p) => <Card card pigeon={p} />) : ''}
    </div>
  );

  const renderSortDropdown = (
    <div className={classes.sort}>
      <span>sort by</span>
      <Dropdown options={sortOptions} onChange={handleSortChange} sort={sort} />
    </div>
  );

  return (
    <Layout
      title={`${displayingNumbers} out of ${totalPigeons} Pigeons`}
      sort={renderSortDropdown}
      pageControls={renderPageControls}
    >
      {renderPigeonList}
    </Layout>
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
