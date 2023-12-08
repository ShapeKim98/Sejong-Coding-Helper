import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import VStack from "./VStack"
import HStack from "./HStack"
import { GetProblemFindBojHandleID } from "../api/Problem/ProblemAPI"
import Problem from "../models/Problem"
import { MdDone } from "react-icons/md";

const Background = styled.div`
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
    min-width: 160px;
    max-width: 160px;
    min-height: 200px;
    max-height: 200px;
    scroll-snap-align: start;
    cursor: pointer;
`

const ProblemID = styled.div`
    color: #28424F;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

const ProblemTitle = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    font-weight: 700;
    color: #28424F;
    margin-top: 16px;
`

export const Similar = styled.p`
    display: flex;
    color: #C8001E;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    margin-top: 12px;
`

const Tag = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 10px;
    font-weight: 600;
    color: #28424F;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 8px;
    padding-right: 8px;
    background: #E9E9E9;
    border-radius: 20px;
    margin-right: 8px;
    margin-top: 8px;
    height: 10pt;
    justify-content: center;
`

const IsSolved = styled.div`
    color: #FFF;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-radius: 20px;
    background: #5BE150;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 8px;
    padding-right: 8px;
    margin-left: auto;
`

function ProblemCell(params: {bojHandle: string, problemID: number, similar: number | null}): React.ReactElement {
    const [problem, setProblem] = useState<Problem | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    
    const handleProblem = (data: Problem | null) => {
        setProblem(data)
    }

    GetProblemFindBojHandleID(params, handleProblem);

    useEffect(() => {
          setImageUrl(`https://static.solved.ac/tier_small/${problem?.level}.svg`);
      }, [problem]);

    const openNewTab = () => {
        window.open('https://www.acmicpc.net/problem/' + params.problemID)
    }

    return (
        <Background onClick={openNewTab}>
            <VStack>
                <HStack style={{alignItems: 'center'}}>
                    <img 
                    style={{
                        width: '20px',
                        height: '20px', 
                        aspectRatio: '1 / 1'
                        }} 
                    alt={problem?.titleKo} 
                    src={imageUrl}></img>
                    <ProblemID style={{marginLeft: '8px'}}>{problem?.problemId}</ProblemID>

                    {problem?.isSolved && 
                        <IsSolved>
                            <HStack>
                                <p>풀었어요</p>
                                <MdDone style={{marginLeft: '4px'}} />
                            </HStack>
                        </IsSolved>}
                </HStack>

                <ProblemTitle>{problem?.titleKo}</ProblemTitle>

                {params.similar && <Similar>유사도 : {(100 * (params.similar / 2)).toFixed(2)}%</Similar>}
            </VStack>

            <HStack style={{flexWrap: 'wrap'}}>
                {problem?.tags.map((tag: string): React.ReactElement => <Tag key={tag}>{tag}</Tag>)}
            </HStack>
        </Background>
    );
}

export default ProblemCell;