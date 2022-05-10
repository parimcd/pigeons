import React, { useState, useEffect } from 'react';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import { endPoint } from '../config';
import Layout from '../components/Layout';
import Card from '../components/PigeonCard';
import ButtonLink from '../components/ButtonLink';

const Design1 = ({ classes }) => {
  const [pigeons, setPigeons] = useState([]);
  const [totalPigeons, setTotalPigeons] = useState(0);
  const [query, setQuery] = useState({ page: 1, limit: 20 });
  const { page, limit } = query;
  const isNotLastPage = Math.ceil(totalPigeons / limit) !== page;
  const displayingNumbers = `${(page - 1) * limit + 1} - ${page * limit}`;

  useEffect(() => {
    loadPigeons();
  }, [page]);

  const loadPigeons = async () => {
    try {
      const res = await axios.get(
        endPoint(`/pigeons?_page=${page}&_limit=${limit}`)
      );
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
        <ButtonLink onClick={handlePreviousClick}>Previous</ButtonLink>
      ) : (
        ''
      )}
      {isNotLastPage ? (
        <ButtonLink onClick={handleNextClick}>Next</ButtonLink>
      ) : (
        ''
      )}
    </>
  );

  const renderPigeonList = (
    <div className={classes.root}>
      {pigeons ? pigeons.map((p) => <Card pigeon={p} />) : ''}
    </div>
  );

  return (
    <Layout
      title={`${displayingNumbers} out of ${totalPigeons} Pigeons`}
      pageControls={renderPageControls}
    >
      {renderPigeonList}
    </Layout>
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
