import React, { useState, useEffect, useRef, useCallback, WheelEvent} from 'react';
import HStack from '../../components/HStack';
import VStack from '../../components/VStack';
import { ProblemRecommendTitle, Title, TitleHighlight } from './style'
import ProblemCell from '../../components/ProblemCell';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { GetSolvedProblemRecommend } from '../../api/SolvedProblem/SolvedProblemAPI';
import { GetFindSimilarQuestion, GetRecommededProblem } from '../../api/RecommendedProblem/RecommendedProblemAPI';

function RecommendedProblems(info: {
    problem: SolvedProblemRecommend | null,
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

    if (info.problem) {
        GetFindSimilarQuestion(info.problem.titleKo ?? '', handleRecommendedProblem);
    } else {
        GetRecommededProblem(user.bojHandle ?? '', handleRecommendedProblem);
    }
    
    
    return (
        <HStack style={{
            paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)'
        }}>
            {info.problem && <ProblemCell 
                key={info.problem.problemId} 
                bojHandle={user.bojHandle ?? ''}
                problemID={info.problem.problemId ?? 0} 
                similar={null}
                />}

            {info.problem && <p style={{
                marginTop: '32px',
                marginRight: '40px'
            }} />}
            <HStack 
                ref={info.scrollRef}
                onWheel={info.handleWheelScroll}
                onMouseOver={info.handlHoverTrue}
                onMouseOut={info.hadleHoverFalse}
                style={{
                    overscrollBehaviorX: 'contain', 
                    overflowX: 'scroll',
                    }}>
                {recommendedProblems?.map((problem: RecommendedProlem): React.ReactElement => 
                    <ProblemCell 
                    key={problem.number} 
                    bojHandle={user.bojHandle ?? ''} 
                    problemID={problem.number} 
                    similar={problem.similar}
                    />)}
            </HStack>
        </HStack>
    );
}

function ProblemTitle(): React.ReactElement {
    const [solveProblemRecommend, setSolvedProblemRecommend] = useState<SolvedProblemRecommend | null>(null);
    const user = useSelector((state: RootState) => state.user)
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const handleSolvedProblemRecommend = (data: SolvedProblemRecommend | null) => {
        setSolvedProblemRecommend(data)
    }

    const handlHoverTrue = useCallback(() => {
        document.body.style.overflowY = 'hidden'
        document.body.style.overflowX = 'hidden'
    }, [])

    const hadleHoverFalse = useCallback(() => {
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'auto'
    }, [])

    const handleWheelScroll = (e: WheelEvent<HTMLDivElement>) => {
        if (scrollRef.current) {
            const delta = (e.deltaY || e.deltaX)
            scrollRef.current.scrollLeft += delta;
        }
    };

    GetSolvedProblemRecommend(user.bojHandle ?? '', handleSolvedProblemRecommend)

    return (
        <VStack>
            <ProblemRecommendTitle>
                내가 푼 문제
                <TitleHighlight style={{marginLeft: '0.5em'}}>{solveProblemRecommend?.titleKo}</TitleHighlight>
                에 관한 문제에요.
            </ProblemRecommendTitle>

            {solveProblemRecommend && <RecommendedProblems 
            problem={solveProblemRecommend}
            scrollRef={scrollRef}
            handleWheelScroll={handleWheelScroll}
            handlHoverTrue={handlHoverTrue}
            hadleHoverFalse={hadleHoverFalse} />}
        </VStack>
    );
}

function ProblemRecommend(): React.ReactElement {
    const scrollRef3 = useRef<HTMLDivElement | null>(null);
    const user = useSelector((state: RootState) => state.user)

    const handleWheelScroll3= (e: WheelEvent<HTMLDivElement>) => {
        if (scrollRef3.current) {
            const delta = (e.deltaY || e.deltaX)
            scrollRef3.current.scrollLeft += delta;
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
    
    return (
        <VStack style={{
            overflow: 'hidden', 
            paddingTop: '80px'}}>
            <Title>나에게 맞는 문제를 추천해드려요</Title>

            <ProblemRecommendTitle>
                <TitleHighlight>{user.bojHandle}</TitleHighlight>
                님을 위한 문제에요!
            </ProblemRecommendTitle>
            <RecommendedProblems 
            problem={null}
            scrollRef={scrollRef3}
            handleWheelScroll={handleWheelScroll3}
            handlHoverTrue={handlHoverTrue}
            hadleHoverFalse={hadleHoverFalse} />

            <ProblemTitle />
        </VStack>
    );
}

export default ProblemRecommend;