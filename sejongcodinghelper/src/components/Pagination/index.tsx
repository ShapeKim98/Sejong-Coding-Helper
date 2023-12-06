import React, { useEffect, useState } from 'react';
import {
  PaginationWrapper,
  PageButton,
  ButtonWrapper,
  SelectedPageButton,
} from './style';
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from 'react-icons/fa';

type PaginationProps = {
  totalPage: number; // 전체 페이지 개수 (데이터 개수/한 페이지당 보여줄 데이터 개수)
  limitPage: number; // 하단에 한 번에 보여줄 페이지 수
  page: number; // 현재 페이지 번호
  setPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 번호 set 함수
};

/**
 * 페이징 컴포넌트
 */
function Pagination({ totalPage, limitPage, page, setPage }: PaginationProps) {
  const [currentPageList, setCurrentPageList] = useState<Array<number>>([]);

  useEffect(() => {
    const start = Math.floor((page - 1) / limitPage) * limitPage + 1;
    const end = Math.ceil(page / limitPage) * limitPage;
    let pageCount = limitPage;
    if (totalPage < end) {
      pageCount = totalPage - start + 1;
    }
    setCurrentPageList(Array.from({ length: pageCount }, (_, i) => i + start));
  }, [page, limitPage, totalPage]);

  return (
    <PaginationWrapper>
      <FaAngleDoubleLeft onClick={() => setPage(1)} />
      <FaAngleLeft
        onClick={() => {
          if (page !== 1) setPage(page - 1);
        }}
      />
      <ButtonWrapper>
        {currentPageList?.map((i) =>
          page === i ? (
            <SelectedPageButton key={i} onClick={() => setPage(i)}>
              {i}
            </SelectedPageButton>
          ) : (
            <PageButton key={i} onClick={() => setPage(i)}>
              {i}
            </PageButton>
          )
        )}
      </ButtonWrapper>
      <FaAngleRight
        onClick={() => {
          if (page !== totalPage) setPage(page + 1);
        }}
      />
      <FaAngleDoubleRight onClick={() => setPage(totalPage)} />
    </PaginationWrapper>
  );
}

export default Pagination;
