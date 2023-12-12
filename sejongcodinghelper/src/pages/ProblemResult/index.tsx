import React, { useState, useEffect, WheelEvent, useRef, useCallback} from 'react';
import {
    ResultProblem,
    Tag,
    Title,
    SearchButton,
    ResultProblemTitle,
    DirectSearch,
    RelativeKeyword,
    RoadmapButton,
    ProblemRecommendTitle,
    TitleHighlight
} from './style';
import HStack from '../../components/HStack';
import VStack from '../../components/VStack';
import Problem from '../../models/Problem';
import TagModel from '../../models/Tag';
import { useLocation } from 'react-router-dom';
import { GetProblemFindID } from '../../api/Problem/ProblemAPI';
import ProblemCell from '../../components/ProblemCell';
import { GetFindSimilarQuestion, GetRecommededProblem } from '../../api/RecommendedProblem/RecommendedProblemAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { GetSolvedProblemRecommend } from '../../api/SolvedProblem/SolvedProblemAPI';

function RecommendedProblems(info: {
    problem: Problem,
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

    GetFindSimilarQuestion(info.problem.titleKo ?? '', handleRecommendedProblem);


    return (
        <HStack style={{
            paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)'
        }}>
            <ProblemCell
                key={info.problem.problemId}
                bojHandle={user.bojHandle ?? ''}
                problemID={parseInt(info.problem.problemId) ?? 0}
                similar={null}
                 />

            <p style={{
                marginTop: '32px',
                marginRight: '40px'
            }} />
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

function ProblemTitle({problem}: {problem: Problem| null}): React.ReactElement {
    const scrollRef = useRef<HTMLDivElement | null>(null);
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

    return (
        <VStack>
            {problem && <RecommendedProblems
            problem={problem}
            scrollRef={scrollRef}
            handleWheelScroll={handleWheelScroll}
            handlHoverTrue={handlHoverTrue}
            hadleHoverFalse={hadleHoverFalse} />}
        </VStack>
    );
}


function RelativeKeywordButton({keyword}: {keyword: string}): React.ReactElement {
    return (
        <RelativeKeyword>
            {keyword}
        </RelativeKeyword>
    );
}

function RelativeKeywords({relativeKeywords}: {relativeKeywords: string[]}): React.ReactElement {
    return (
        <VStack style={{height: '240px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
            {relativeKeywords.map((relativeKeyword: string): React.ReactElement => <RelativeKeywordButton keyword={relativeKeyword} /> )}
        </VStack>
    );
}

function ResultProblems({problems}: {problems: Problem[]}): React.ReactElement {
    return (
        <HStack style={{overscrollBehaviorX: 'contain', overflowX: 'scroll', paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)'}}>
            {problems.map((problem: Problem): React.ReactElement => <ResultProblemButton problem={problem} />)}
        </HStack>
    );
}

function ResultProblemButton({problem}: {problem: Problem}): React.ReactElement {
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
          setImageUrl(`https://static.solved.ac/tier_small/${problem.level}.svg`);
      }, [problem]);

    return (
        <ResultProblem>
            <VStack>
                <HStack>
                    <img style={{width: '20px', height: '20px', aspectRatio: '1 / 1'}} alt={problem.titleKo} src={imageUrl}></img>
                    <p style={{marginLeft: '16px'}}>{problem.problemId}</p>
                </HStack>

                {/* <ProblemTitle>{problem.titleKo}</ProblemTitle> */}
            </VStack>

            <HStack>
                {problem.tags.map((tag: string): React.ReactElement => <Tag>{tag}</Tag>)}
            </HStack>
        </ResultProblem>
    );
}

function ProblemResult(): React.ReactElement {
    const problemID = useLocation().state.problemID
    const [searchedProblem, setSearchedProblem]= useState<Problem | null>(null);

    const handleProblem = (data: Problem | null) => {
        setSearchedProblem(data)
    }

    GetProblemFindID(problemID, handleProblem);

    // const [relativeKeywords] = useState<string[]>([
    //     "BFS",
    //     "그래프",
    //     "그래프 순회",
    //     "벡트래킹",
    //     "다익스트라"
    // ])
    // const [relativeRoadmaps] = useState<string[]>([
    //     "우선순위 큐",
    //     "힙",
    //     "힙 정렬",
    //     "합병 정렬과 퀵 정렬",
    //     "사전",
    //     "탐색트리",
    //     "해시 테이블",
    //     "그래프",
    //     "그래프 순회",
    //     "방향 그래프",
    //     "최소 신장 트리",
    //     "최단 경로",
    //     "그래프 응용"
    // ])

    return (
        <VStack style={{overflow: 'hidden', paddingTop: '80px'}}>
            <Title>
                <p style={{color: '#C8001E'}}>
                    {searchedProblem?.titleKo}
                </p>
                에 대한 결과에요.
            </Title>
            {/* <SearchButton>
                다시 검색하기
            </SearchButton> */}

            {/* <ResultProblemTitle style={{marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)'}}>
                <p style={{color: '#C8001E'}}>searchedProblem.titleKo</p>
                에 대한 문제를 찾았어요.
            </ResultProblemTitle> */}

            <ProblemTitle problem={searchedProblem} />

            {/* {problems && <ResultProblems problems={problems} />}  */}

            {/* <HStack style={{marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)'}}>
                <VStack style={{marginRight: '60px'}}>
                    <ResultProblemTitle>
                        <p style={{color: '#C8001E'}}>DFS</p>와 관련있는 주제에요.
                    </ResultProblemTitle>
                    <DirectSearch>
                        바로 검색하기
                    </DirectSearch>
                    <RelativeKeywords relativeKeywords={relativeKeywords} />
                </VStack>

                <VStack>
                    <HStack style={{justifyContent: 'space-between'}}>
                        <ResultProblemTitle>
                            혹시 <p style={{color: '#C8001E'}}>알고리즘</p> 과목을 수강하고 계신가요?
                        </ResultProblemTitle>
                        <RoadmapButton>
                            과목별 로드맵 보러가기
                        </RoadmapButton>
                    </HStack>
                    <DirectSearch>
                        바로 검색하기
                    </DirectSearch>
                    <RelativeKeywords relativeKeywords={relativeRoadmaps} />
                </VStack>
            </HStack> */}
        </VStack>
    );
}

export default ProblemResult;
