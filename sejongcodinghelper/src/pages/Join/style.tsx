import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

export const Title = styled.div`
  color: #28424f;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 40px;
`;

export const JoinFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 370px;
`;

export const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  > label {
    color: #c8001e;
    font-weight: 700;
  }
  & input {
    width: 100%;
    height: 25px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    color: rgba(40, 66, 79, 0.5);
    font-weight: 600;
    display: flex;
    border: none;
    outline: none;
    padding: 12px;
  }
`;

export const ErrorMsg = styled.div`
  font-size: 14px;
  color: #f00;
  padding: 0 10px;
  margin-top: -5px;
`;

export const SuccessMsg = styled(ErrorMsg)`
  color: #20bc28;
`;

export const AuthButton = styled.button`
  cursor: pointer;
  width: 400px;
  padding: 12px;
  border-radius: 10px;
  background-color: #c8001e;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  color: #edede0;
  font-family: Pretendard;
  font-weight: 700;
  border: none;
  outline: none;
  cursor: pointer;
  text-align: center;
`;

export const JoinButton = styled(AuthButton)`
  margin-top: 2rem;
`;

export const AuthInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  > input {
    width: 80%;
  }
  > button {
    width: 20%;
    cursor: pointer;
    flex-shrink: 0;
    padding: 13px 2px;
    border-radius: 10px;
    background-color: #c8001e;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    color: #edede0;
    font-family: Pretendard;
    font-weight: 700;
    text-align: center;
    border: none;
    outline: none;
  }
`;

export const AuthCodeDiv = styled.div`
  cursor: pointer;
  width: 100%;
  height: 25px;
  width: 100%;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  font-weight: 600;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

export const InfoMsg = styled.div`
  font-weight: 700;
  line-height: 1.5;
  font-size: 15px;
  > span {
    font-weight: 500;
  }
`;
