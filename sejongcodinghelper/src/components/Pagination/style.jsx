import styled from '@emotion/styled';

export const PaginationWrapper = styled.div`
  display: flex;
  cursor: pointer;
  gap: 20px;
  color: var(--color-textlight);
  font-weight: bold;
  align-items: center;
`;

export const PageButton = styled.div`
  padding: 5px 15px 5px 15px;
`;

export const SelectedPageButton = styled(PageButton)`
  color: black;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;
