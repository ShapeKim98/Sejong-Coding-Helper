import styled from '@emotion/styled';
export const Input = styled.input`
  padding: 10px 9px;
  background-color: white;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 7px;
  width: 100%;
  height: 44px;
  padding: 9px 10px;
  outline: none;
  border-radius: 7px;
  resize: none;
  line-height: 22px;
  border: none;
  box-sizing: border-box;
`;

export const InputForm = styled.form`
  display: flex;
  margin-top: 15px;
  gap: 7px;
  width: 100%;
  align-items: center;
  & button {
    width: 100px;
    height: 40px;
    padding: 0 25px;
    border: none;
    background-color: #c8001e;
    border-radius: 7px;
    color: white;
    cursor: pointer;
  }
`;
