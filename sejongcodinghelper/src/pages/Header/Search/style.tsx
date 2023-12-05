import styled from '@emotion/styled';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

const MAX_WIDTH = '610px';

export const Label = styled.span`
    color: #5E717B;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem 0 0 0;
  border-radius: 7px;
  padding: 3rem 3rem 5rem 3rem;
  margin-right: auto;
  margin-left: auto;
  background-color: white;
  height: 30rem;
`;

export const Title = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.5;
    color: #28424F;
`

export const SwitchWrapper = styled.div`
    color: #5E717B;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

export const Slider = styled(RcSlider)`
  margin-top: 32px;
`;

export const Form = styled.form`
  margin-bottom: 40px;
`;

export const Button = styled.button`
  border-radius: 50px;
  padding: 10px 20px 10px 20px;
  border: none;
  background-color: var(--color-primary);
  color: white;
  cursor: pointer;
`;

export const TextFieldStyle = styled.input`
    width: calc(100% - 100px);
    flex-shrink: 0;
    border-radius: 10px 0px 0px 10px;
    background: #FFF;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    color: rgba(40, 66, 79, 0.50);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: left;
    display: flex;
    border: none;
    outline: none;
    padding: 12px;
    margin-top: 60px;
`

export const SearchButton = styled.button`
    display: flex;
    width: 100px;
    flex-shrink: 0;
    border-radius: 0px 10px 10px 0px;
    background: linear-gradient(80deg, #C8001E 13.01%, rgba(200, 0, 30, 0.60) 68.24%, rgba(200, 0, 30, 0.40) 98.53%);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    color: #EDEDE0;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor: pointer;
    text-align: center;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    padding: 12px;
    margin-top: 60px;
`