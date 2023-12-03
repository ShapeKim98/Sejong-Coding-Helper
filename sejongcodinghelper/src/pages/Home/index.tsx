import React, { useCallback, useState, useEffect} from 'react';
import {
    Title,
    SearchButton,
    SimilarProblem,
    ExamPractice,
    RoadmapProblem,
    SejongRanking,
    ClusteringProblemTitle,
    ClusteringProblem,
    Tag,
    ProblemTitle
} from './style';
import HStack from '../../components/HStack';
import VStack from '../../components/VStack';
import Problem from '../../models/Problem';
import { Link } from 'react-router-dom';
import TagModel from '../../models/Tag';
import ClusteringProblemModel from '../../models/ClusteringProblem';
import { GetProblemFindID } from '../../api/Problem/ProblemAPI';
import { GetMostSolvedProblem } from '../../api/ClusteringProblem/ClusteringProblemAPI';

interface ButtonInfo {
    title: string,
    description: React.ReactElement
}

function SimilarProblemButton({buttonInfo}: {buttonInfo: ButtonInfo}): React.ReactElement {
    return (
        <SimilarProblem>
            <p>{buttonInfo.description}</p>

            <p style={{fontSize: '12pt', fontWeight: '600'}}>{buttonInfo.title}</p>
        </SimilarProblem>
    );
}

function ExamPracticeButton({buttonInfo}: {buttonInfo: ButtonInfo}): React.ReactElement {
    return (
        <ExamPractice>
            <p>{buttonInfo.description}</p>

            <p style={{fontSize: '12pt', fontWeight: '600'}}>{buttonInfo.title}</p>
        </ExamPractice>
    );
}

function RoadmapProblemButton({buttonInfo}: {buttonInfo: ButtonInfo}): React.ReactElement {
    return (
        <RoadmapProblem>
            <p>{buttonInfo.description}</p>

            <p style={{fontSize: '12pt', fontWeight: '600'}}>{buttonInfo.title}</p>
        </RoadmapProblem>
    )
}

function SejongRankingButton({buttonInfo}: {buttonInfo: ButtonInfo}): React.ReactElement {
    return (
        <SejongRanking>
            <p>{buttonInfo.description}</p>

            <p style={{fontSize: '12pt', fontWeight: '600'}}>{buttonInfo.title}</p>
        </SejongRanking>
    )
}

function ClusteringProblems({problems}: {problems: ClusteringProblemModel[]}): React.ReactElement {
    return (
        <HStack style={{overscrollBehaviorX: 'contain', overflowX: 'scroll', paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)'}}>
            {problems.map((problem: ClusteringProblemModel): React.ReactElement => <ClusteringProblemButton problemID={problem.problemId} />)}
        </HStack>
    );
}

function ClusteringProblemButton({problemID}: {problemID: number}): React.ReactElement {
    const [problem, setProblem] = useState<Problem | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    
    const handleProblem = (data: Problem | null) => {
        setProblem(data)
    }

    GetProblemFindID(problemID, handleProblem);

    useEffect(() => {
          setImageUrl(`https://static.solved.ac/tier_small/${problem?.level}.svg`);
      }, [problem]);

    return (
        <ClusteringProblem>
            <VStack>
                <HStack>
                    <img style={{width: '20px', height: '20px', aspectRatio: '1 / 1'}} alt={problem?.titleKo} src={imageUrl}></img>
                    <p style={{marginLeft: '16px'}}>{problem?.problemId}</p>
                </HStack>

                <ProblemTitle>{problem?.titleKo}</ProblemTitle>
            </VStack>

            <HStack>
                {problem?.tags.map((tag: string): React.ReactElement => <Tag>{tag}</Tag>)}
            </HStack>
        </ClusteringProblem>
    );
}

function Home(): React.ReactElement {
    const [clusteringProblems, setClusteringProblems] = useState<ClusteringProblemModel[] | null>(null);

    const handleClusteringProblem = (data: ClusteringProblemModel[] | null) => {
        setClusteringProblems(data);
    }

    // GetMostSolvedProblem(handleClusteringProblem);
    
    return (
        <VStack style={{overflow: 'hidden', paddingTop: '80px'}}>
            <Title>
                수업에서 배운 내용을 알려주세요!<br />
                문제를 추천해 드릴게요
            </Title>
            <SearchButton>
                검색하러 가기
            </SearchButton>

            <HStack style={{ overscrollBehaviorX: 'contain', overflowX: 'scroll', paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)', maxWidth: '1200px'}}>
                <SimilarProblemButton buttonInfo={{
                    title: '문제 추천 받으러 가기',
                    description: <p>
                        연습하고 싶은<br />
                        알고리즘이<br />
                        있나요?<br />
                        </p>
                }} />

                <ExamPracticeButton buttonInfo={{
                    title: '연습하러 가기',
                    description: <p>
                        시험때만 되면<br />
                        실수 하시나요?<br />
                        </p>
                }} />

                <Link to={'/roadmap'}>
                    <RoadmapProblemButton buttonInfo={{
                        title: '과목별 문제 로드맵 보러가기',
                        description: <p>
                            어떤 문제부터<br />
                            풀어야 할지<br />
                            막막하신가요?<br />
                        </p>
                    }} />
                </Link>

                <Link to={'/ranking'}>
                    <SejongRankingButton buttonInfo={{
                        title: '세종대 랭킹 보러가기',
                        description: <p>
                            나의 실력이<br />
                            어느정도인지<br />
                            궁금하신가요?<br />
                        </p>
                    }} />
                </Link>
            </HStack>

                <ClusteringProblemTitle>
                    종이들이 많이 찾는 문제
                </ClusteringProblemTitle>

            {clusteringProblems && <ClusteringProblems problems={clusteringProblems} />}
        </VStack>
    );
}

export default Home;