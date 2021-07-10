import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeRequest} from "../../store/worklist";
import {getRecordsCountOnPage, getSortDirection, getSortFieldName, getTotalTaskCount} from "../Selectors";
import {StyledPaginationWrapper} from "../ui/StyledPaginationWrapper";
import ReactPaginate from 'react-paginate';

import {getChangedUrlParams} from "../../functions";

export const Pagination = React.memo(() => {

  const dispatch = useDispatch();

  const sortFieldName = useSelector(getSortFieldName)
  const sortDirection = useSelector(getSortDirection)

  const paginate = useCallback(
      (pageNumber) => {

          console.log("20 sortFieldName", sortFieldName)
          console.log("20 sortDirection", sortDirection)

          const changedParamsRequest = getChangedUrlParams(sortFieldName, sortDirection, pageNumber.selected + 1)
          return dispatch(changeRequest( changedParamsRequest ))
      },
      []
  );

  const taskPerPage = useSelector(getRecordsCountOnPage)
  const totalTaskCount = useSelector(getTotalTaskCount)
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
