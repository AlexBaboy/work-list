import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changePageRequest, changeRequest} from "../../store/worklist";
import {getRecordsCountOnPage, getSortDirection, getSortFieldName, getTotalTaskCount} from "../Selectors";
import {StyledPaginationWrapper} from "../ui/StyledPaginationWrapper";
import ReactPaginate from 'react-paginate';
import {IChangedParamsRequest} from "../../interfaces/IChangedParamsRequest";

export const Pagination = React.memo(() => {

  const dispatch = useDispatch();

  const sortFieldName = useSelector(getSortFieldName)
  const sortDirection = useSelector(getSortDirection)

  const paginate = useCallback(
      (pageNumber) => {

          const changedParamsRequest: IChangedParamsRequest = {
              sortFieldName,
              sortDirection,
              currentPage: pageNumber.selected + 1,
              url: `&sort_field=${sortFieldName}&sort_direction=${sortDirection}&page=${pageNumber.selected + 1}`
          }
          return dispatch(changeRequest( changedParamsRequest ))


        //dispatch(changePageRequest(pageNumber.selected + 1))
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
