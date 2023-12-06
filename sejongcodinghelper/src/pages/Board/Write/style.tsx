import styled from '@emotion/styled';

export const CategoryWrapper = styled.span`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

export const FormItem = styled.div`
  font-weight: bold;
  & input {
    width: 100%;
    border: 1px solid var(--color-unchecked);
    padding: 10px;
    box-sizing: border-box;
    border-radius: 7px;
  }
  & button {
    height: 35px;
    width: 8%;
    border: none;
    background-color: #c8001e;
    border-radius: 7px;
    color: white;
    cursor: pointer;
  }
`;

export const ProblemNumberInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  > input {
    flex-grow: 1;
  }
`;

export const Form = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 0 5px 0 5px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: end;
  > button {
    height: 35px;
    width: 8%;
    border: none;
    background-color: #c8001e;
    border-radius: 7px;
    color: white;
    cursor: pointer;
  }
`;
