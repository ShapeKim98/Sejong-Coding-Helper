import styled from '@emotion/styled';

export const BoardTitleWrapper = styled.div`
  display: flex;
  gap: 13px;
  flex-direction: column;
  & p {
    margin-left: 6px;
    color: var(--color-textgrey);
    font-size: 0.9rem;
    font-weight: bold;
  }
`;

export const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: end;
  border-bottom: 1px solid var(--color-bordergrey);
  color: var(--color-textgrey);
  & input {
    background-color: transparent;
    padding: 10px 10px 5px 10px;
    border: none;
  }
`;

export const WriteButton = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50px;
  cursor: pointer;
  position: fixed;
  bottom: 45px;
  right: 45px;
  background-color: #c8001e;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
`;

export const Writer = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: 1rem;
`;

export const Container = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 80px calc(-268.46154px + 28.36538vw + 24px);
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
  padding-top: 36px;
  color: #28424f;
`;
