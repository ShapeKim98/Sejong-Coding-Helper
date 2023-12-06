import styled from '@emotion/styled';

export const Title = styled.div`
  color: #28424f;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 40px;
`;

export const TextFieldTitle = styled.div`
  color: #c8001e;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const TextFieldStyle = styled.input`
  width: 320px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  color: rgba(40, 66, 79, 0.5);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: left;
  display: flex;
  alignitems: center;
  border: none;
  outline: none;
  padding: 12px;
`;

export const LoginButton = styled.button`
  width: 320px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 30px;
  background: linear-gradient(
    80deg,
    #c8001e 13.01%,
    rgba(200, 0, 30, 0.6) 68.24%,
    rgba(200, 0, 30, 0.4) 98.53%
  );
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  color: #edede0;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  text-align: center;
  border: none;
  outline: none;
`;

export const JoinButton = styled.div`
  color: #c8001e;
  padding: 20px;
  cursor: pointer;
  font-weight: 700;
`;
