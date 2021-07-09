import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changePageRequest} from "../../store/worklist";
import {getRecordsCountOnPage, getTotalTaskCount} from "../Selectors";

import {StyledPaginationWrapper} from "../ui/StyledPaginationWrapper";
import ReactPaginate from 'react-paginate';

export const Pagination = React.memo(() => {
  const dispatch = useDispatch();

  const totalTaskCount = useSelector(getTotalTaskCount)

  const paginate = useCallback(
      (pageNumber) => {
        dispatch(changePageRequest(pageNumber.selected + 1))
      },
      []
  );

  const taskPerPage = useSelector(getRecordsCountOnPage)
  const totalPageCount = Math.ceil(totalTaskCount / taskPerPage);

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
