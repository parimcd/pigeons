import PropTypes from 'prop-types';
import Button from './Button';

const Pager = ({ currentPage, total, limit, pageOffset = 5, onClick }) => {
  const lastPage = Math.ceil(total / limit);
  const centerPage = Math.ceil(pageOffset / 2);
  const startingPageOption = currentPage - centerPage + 1;
  const endPageOption = currentPage + centerPage;
  const pageOptions = [];

  for (let i = startingPageOption; i < endPageOption; i++) {
    if (i > 1 && i < lastPage) pageOptions.push(i);
  }

  const isCurrentPage = (pageOption) =>
    pageOption === currentPage ? (
      <Button variant="contained" disabled pageButton>
        {currentPage}
      </Button>
    ) : (
      <Button pageButton onClick={() => onClick(pageOption)}>
        {pageOption}
      </Button>
    );

  return (
    <div>
      {isCurrentPage(1)}
      {currentPage > 1 + centerPage ? <span>...</span> : ''}
      {pageOptions.map((p) => isCurrentPage(p))}
      {currentPage < lastPage - centerPage ? <span>...</span> : ''}
      {isCurrentPage(lastPage)}
    </div>
  );
};

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  pageOffset: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

Pager.defaultProps = {
  pageOffset: 5,
};

export default Pager;
