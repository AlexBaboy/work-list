import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeRequest} from "../store/worklist";
import {
    getRecordsCountOnPage,
    getSortDirection,
    getSortFieldName,
    getTotalPageCount,
    getTotalTaskCount
} from "../store/selectors";
import {StyledPaginationWrapper} from "./ui/StyledPaginationWrapper";
import ReactPaginate from 'react-paginate';

import {getChangedUrlParams} from "../utils";

export const Pagination = React.memo(() => {

  const dispatch = useDispatch();

  const sortFieldName = useSelector(getSortFieldName)
  const sortDirection = useSelector(getSortDirection)

  const paginate = useCallback(
      (pageNumber) => {

          const changedParamsRequest = getChangedUrlParams(sortFieldName, sortDirection, pageNumber.selected + 1)
          return dispatch(changeRequest( changedParamsRequest ))
      },
      [sortFieldName, sortDirection]
  );

  const totalPageCount = useSelector(getTotalPageCount)

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
            pageRangeDisplayed={10}
            onPageChange={paginate}
            containerClassName={'pagination'}
            activeClassName={'active'}
        />
      </StyledPaginationWrapper>
    </div>
  );
});