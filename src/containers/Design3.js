import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import { endPoint, sortOptions } from '../config';
import { objectToQuery } from '../helpers';
import Layout from '../components/Layout';
import Card from '../components/PigeonCard';
import Dropdown from '../components/Dropdown';
import ButtonLink from '../components/ButtonLink';

const Design3 = ({ classes }) => {
  const [pigeons, setPigeons] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [totalPigeons, setTotalPigeons] = useState(0);
  const [query, setQuery] = useState({
    sort: sortOptions.pos,
    page: 1,
    limit: 10,
  });
  const { sort, page, limit } = query;

  const offset = 5;
  const centerPoint = Math.ceil(offset / 2);
  const [pageOptions, setPageOptions] = useState([]);

  useEffect(() => {
    console.log('useEffect:totalPigeons:' + totalPigeons);
    if (totalPigeons) {
      console.log('useEffect:totalPigeons if:' + true);

      setPageOption(page, Math.ceil(totalPigeons / limit));
    }
  }, [page, totalPigeons]);

  useEffect(() => {
    loadPigeons();
  }, [page, sort]);

  // useEffect(() => {
  //   //console.log({ page });
  //   //console.log({ totalPigeons });
  //   if (totalPigeons)
  // }, [page, totalPigeons]);

  const loadPigeons = async () => {
    try {
      const res = await axios.get(endPoint(`/pigeons?${objectToQuery(query)}`));
      setPigeons(res.data.data);
      setTotalPigeons(res.data.total);
    } catch (err) {
      //console.log(err);
    }
  };

  const setPageOption = (page, lastPage) => {
    setLastPage(lastPage);
    //console.log('setPageOption page:', page);
    const newPageOptions = [];
    let startingPoint = page - centerPoint + 1;
    let limitPoint = page + centerPoint;
    //console.log({ startingPoint, limitPoint, lastPage });
    //{startingPoint: 5, limitPoint: 10, lastPage: 0}

    for (let i = startingPoint; i < limitPoint; i++) {
      if (i > 1 && i < lastPage) {
        newPageOptions.push(i);
        //console.log('pushed', i);
      }
    }
    setPageOptions(newPageOptions);
    //console.log('newPageOptions:', newPageOptions);
  };

  const handlePageClick = (page) => {
    setQuery({ ...query, page: page });
    setPageOption(page);
  };

  const handleSortChange = (e) => {
    setPigeons([]);
    setQuery({
      ...query,
      page: 1,
      sort: e.target.value,
    });
  };

  const isCurrentPage = (displayPage) =>
    page === displayPage ? (
      <ButtonLink variant="contained" disabled pageButton>
        {page}
      </ButtonLink>
    ) : (
      <ButtonLink pageButton onClick={() => handlePageClick(displayPage)}>
        {displayPage}
      </ButtonLink>
    );

  const renderPageControls = (
    <div>
      {isCurrentPage(1)}
      {page > 1 + centerPoint ? <span>...</span> : ''}
      {/* {//console.log(pageOptions)} */}
      {pageOptions.map((p) => isCurrentPage(p))}
      {page < lastPage - centerPoint ? <span>...</span> : ''}
      {isCurrentPage(lastPage)}
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
      title={`${limit} out of ${totalPigeons} Pigeons`}
      sort={renderSortDropdown}
      pageControls={renderPageControls}
    >
      totalPigeons : {totalPigeons}
      lastPage : {lastPage}
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
