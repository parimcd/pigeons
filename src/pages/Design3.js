import React, { useState, useEffect } from 'react';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import { endPoint, sortOptions, objectToQuery } from '../helpers';
import Layout from '../components/ContentGrid';
import Card from '../components/ProfileCard';
import Dropdown from '../components/Dropdown';
import Pager from '../components/Pager';

const Design3 = ({ classes }) => {
  const [pigeons, setPigeons] = useState([]);
  const [totalPigeons, setTotalPigeons] = useState(0);
  const [query, setQuery] = useState({
    sort: sortOptions.pos,
    page: 1,
    limit: 10,
  });
  const { sort, page, limit } = query;

  useEffect(() => {
    loadPigeons();
  }, [page, sort]);

  const loadPigeons = async () => {
    try {
      const res = await axios.get(endPoint(`/pigeons?${objectToQuery(query)}`));
      setPigeons(res.data.data);
      setTotalPigeons(res.data.total);
    } catch (err) {
      //console.log(err);
    }
  };

  const handlePageClick = (page) => setQuery({ ...query, page: page });

  const handleSortChange = (e) => {
    setPigeons([]);
    setQuery({
      ...query,
      page: 1,
      sort: e.target.value,
    });
  };

  const renderPigeonList = (
    <div className={classes.root}>
      {pigeons ? pigeons.map((p, i) => <Card key={i} card pigeon={p} />) : ''}
    </div>
  );

  return (
    <Layout
      title={`${limit} out of ${totalPigeons} Pigeons`}
      sort={
        <Dropdown
          options={sortOptions}
          onChange={handleSortChange}
          sort={sort}
        />
      }
      pageControls={
        <Pager
          currentPage={page}
          total={totalPigeons}
          limit={limit}
          onClick={handlePageClick}
        />
      }
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

export default withStyles(styles)(Design3);
