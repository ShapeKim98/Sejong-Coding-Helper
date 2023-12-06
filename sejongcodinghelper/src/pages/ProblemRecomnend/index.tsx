import React, { useState, useEffect, useRef, useCallback, WheelEvent} from 'react';
import HStack from '../../components/HStack';
import VStack from '../../components/VStack';
import { ProblemRecommendTitle, Title, TitleHighlight } from './style'
import ProblemCell from '../../components/ProblemCell';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { GetSolvedProblemRecommend } from '../../api/SolvedProblem/SolvedProblemAPI';
import { GetFindSimilarQuestion } from '../../api/RecommendedProblem/RecommendedProblemAPI';

function RecommendedProblems(info: {
    solveProblemRecommend: SolvedProblemRecommend,
    scrollRef: React.MutableRefObject<HTMLDivElement | null>,
    handleWheelScroll: (e: WheelEvent<HTMLDivElement>) => void,
    handlHoverTrue: () => void,
    hadleHoverFalse: () => void}
): React.ReactElement {
    const user = useSelector((state: RootState) => state.user)
    const [recommendedProblems, setRecomendProblems] = useState<RecommendedProlem[] | null>(null);

    const handleRecommendedProblem = (data: RecommendedProlem[] | null) => {
        setRecomendProblems(data);
    }

    GetFindSimilarQuestion(info.solveProblemRecommend.titleKo, handleRecommendedProblem);
    
    return (
        <HStack 
            ref={info.scrollRef}
            onWheel={info.handleWheelScroll}
            onMouseOver={info.handlHoverTrue}
            onMouseOut={info.hadleHoverFalse}
            style={{
                overscrollBehaviorX: 'contain', 
                overflowX: 'scroll', 
                paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)'
                }}>
            {recommendedProblems?.map((problem: RecommendedProlem): React.ReactElement => 
            <ProblemCell key={problem.number} bojHandle={user.bojHandle ?? ''} problemID={problem.number} />)}
        </HStack>
    );
}

function ProblemRecommend(): React.ReactElement {
    const [solveProblemRecommend, setSolvedProblemRecommend] = useState<SolvedProblemRecommend | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const user = useSelector((state: RootState) => state.user)

    const handleSolvedProblemRecommend = (data: SolvedProblemRecommend | null) => {
        setSolvedProblemRecommend(data)
    }

    

    const handleWheelScroll = (e: WheelEvent<HTMLDivElement>) => {
        if (scrollRef.current) {
            const delta = (e.deltaY || e.deltaX)
            scrollRef.current.scrollLeft += delta;
        }
    };

    const handlHoverTrue = useCallback(() => {
        document.body.style.overflowY = 'hidden'
        document.body.style.overflowX = 'hidden'
    }, [])

    const hadleHoverFalse = useCallback(() => {
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'auto'
    }, [])

    GetSolvedProblemRecommend(user.bojHandle ?? '', handleSolvedProblemRecommend)
    
    
    return (
        <VStack style={{
            overflow: 'hidden', 
            paddingTop: '80px'}}>
            <Title>나에게 맞는 문제를 추천해드려요</Title>

            <ProblemRecommendTitle>
                내가 푼 문제 
                <TitleHighlight>{solveProblemRecommend?.titleKo}</TitleHighlight>
                에 관한 문제에요.
            </ProblemRecommendTitle>
            {solveProblemRecommend && <RecommendedProblems 
            solveProblemRecommend={solveProblemRecommend}
            scrollRef={scrollRef}
            handleWheelScroll={handleWheelScroll}
            handlHoverTrue={handlHoverTrue}
            hadleHoverFalse={hadleHoverFalse} />}
        </VStack>
    );
}

export default ProblemRecommend;