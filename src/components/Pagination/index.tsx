import React, { useCallback } from "react";
import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import {changePageRequest, setCurrentPage} from "../../store/worklist";
import { getTotalPageCount} from "../Selectors";
import { RootState } from "../../store";

import {StyledPaginationWrapper} from "../ui/StyledPaginationWrapper";
import ReactPaginate from 'react-paginate';

export const Pagination = React.memo(() => {
  const dispatch = useDispatch();

  const totalPageCount = useSelector(getTotalPageCount)

  /*const paginate = useCallback(
    (pageNumber) => dispatch(setCurrentPage(pageNumber)),
    []
  );*/

  const paginate = useCallback(
      (pageNumber) => dispatch(changePageRequest(pageNumber)),
      []
  );


  return (
    <div>
      <StyledPaginationWrapper>
        <ReactPaginate
            previousLabel={'назад'}
            nextLabel={'вперед'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={totalPageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={paginate}
            containerClassName={'pagination'}
            activeClassName={'active'}
        />
      </StyledPaginationWrapper>
    </div>
  );
});
