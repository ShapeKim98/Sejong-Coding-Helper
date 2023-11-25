import styled from "@emotion/styled";

export const LectureButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: Pretendard;
    color: #28424F;
    padding: 24px;
    background: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    border-radius: 30px;
    margin-top: 32px;
    margin-right: 40px;
    margin-bottom: 10px;
    width: 280px;
    min-height: 220px;
    scroll-snap-align: start;
`

export const Tag = styled.div`
    font-size: 10pt;
    font-weight: 600;
    color: #28424F;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 12px;
    padding-right: 12px;
    background: #E9E9E9;
    border-radius: 20px;
    margin-right: 16px;
    margin-top: 8px;
    height: 10pt;
`

export const Title = styled.div`
    display: flex;
    // flex-direction: column;
    font-family: Pretendard;
    font-size: 28pt;
    font-weight: 700;
    line-height: 1.5;
    padding-top: 36px;
    padding-left: calc(-268.46154px + 28.36538vw + 24px);
    color: #28424F;
`

export const Graduate = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16pt;
    font-weight: 700;
    color: #28424F;
    padding-top: 60px;
    padding-left: calc(-268.46154px + 28.36538vw + 24px);
`