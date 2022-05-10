import React, { useState, useEffect } from 'react';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import { endPoint, objectToQuery } from '../helpers';
import ContentGrid from '../components/ContentGrid';
import ProfileCard from '../components/ProfileCard';
import Button from '../components/Button';

const Design1 = ({ classes }) => {
  const [pigeons, setPigeons] = useState([]);
  const [totalPigeons, setTotalPigeons] = useState(0);
  const [query, setQuery] = useState({ page: 1, limit: 20 });
  const { page, limit } = query;
  const isLastPage = Math.ceil(totalPigeons / limit) === page;
  const displayingNumbers = `${(page - 1) * limit + 1} - ${page * limit}`;

  useEffect(() => {
    loadPigeons();
  }, [page]);

  const loadPigeons = async () => {
    try {
      const res = await axios.get(endPoint(`/pigeons?${objectToQuery(query)}`));
      setPigeons(res.data.data);
      setTotalPigeons(res.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNextClick = () => {
    setQuery({ ...query, page: page + 1 });
  };

  const handlePreviousClick = () => {
    setQuery({ ...query, page: page - 1 });
  };

  const renderPageControls = (
    <>
      {page !== 1 ? (
        <Button onClick={handlePreviousClick}>Previous</Button>
      ) : (
        ''
      )}
      {isLastPage ? '' : <Button onClick={handleNextClick}>Next</Button>}
    </>
  );

  const renderPigeonList = (
    <div className={classes.root}>
      {pigeons ? pigeons.map((p, i) => <ProfileCard pigeon={p} key={i} />) : ''}
    </div>
  );

  return (
    <ContentGrid
      title={`${displayingNumbers} out of ${totalPigeons} Pigeons`}
      pageControls={renderPageControls}
    >
      {renderPigeonList}
    </ContentGrid>
  );
};

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    display: 'flex',
    margin: '1em 0',
  },
  details: {
    display: 'flex',
  },
});

export default withStyles(styles)(Design1);
