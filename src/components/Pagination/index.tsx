import React, { useCallback } from "react";
import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../store/worklist";
import {getCurrentTasks} from "../Selectors";
import { RootState } from "../../store";
import {StyledPaginationItem} from "../ui/StyledPaginationItem";
import {StyledPaginationWrapper} from "../ui/StyledPaginationWrapper";

export const Pagination = React.memo(() => {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.wl.currentPage
  );
  const recordsOnPage = useSelector(
    (state: RootState) => state.wl.recordsOnPage
  );

  const worklist = useSelector(getCurrentTasks);

  const paginate = useCallback(
    (pageNumber) => dispatch(setCurrentPage(pageNumber)),
    []
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(worklist.length / recordsOnPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <StyledPaginationWrapper>
        <ul className={styles.ulStyle}>
          {pageNumbers.map((number) => (
            <li key={number}>
              <StyledPaginationItem
                className={
                  currentPage === number
                    ? styles.currentPageNum
                    : styles.pageNum
                }
                onClick={() => paginate(number)}
              >
                {number}
              </StyledPaginationItem>
            </li>
          ))}
        </ul>
      </StyledPaginationWrapper>
    </div>
  );
});
