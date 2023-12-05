import styled from "@emotion/styled";

export const Header = styled.div`
    position: fixed;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    border: 1px solid rgba(255, 255, 255, 0.16);
    color: '#28424F';
    font-size: 16px;
    font-family: Pretendard;
    font-weight: 500;
    padding-top: 16px;
    padding-bottom: 16px;
    transition-property: height;
    transition-duration: 1s;
    width: 100vw;
`

export const Title = styled.div`
    color: #28424F;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor: pointer;
    margin-right: 80px;
`