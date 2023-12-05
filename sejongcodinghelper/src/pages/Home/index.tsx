import React, { useState, useEffect} from 'react';
import {
    Title,
    SearchButton,
    SimilarProblem,
    ExamPractice,
    RoadmapProblem,
    SejongRanking,
    ClusteringProblemTitle
} from './style';
import HStack from '../../components/HStack';
import VStack from '../../components/VStack';
import Problem from '../../models/Problem';
import { Link } from 'react-router-dom';
import ClusteringProblemModel from '../../models/ClusteringProblem';
import { GetProblemFindID } from '../../api/Problem/ProblemAPI';
import { GetMostSolvedProblem } from '../../api/ClusteringProblem/ClusteringProblemAPI';
import ProblemCell from '../../components/ProblemCell';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

interface ButtonInfo {
    title: string,
    description: React.ReactElement
}

function SimilarProblemButton({buttonInfo}: {buttonInfo: ButtonInfo}): React.ReactElement {
    return (
        <SimilarProblem>
            <span>{buttonInfo.description}</span>

            <span style={{fontSize: '16px', fontWeight: '600'}}>{buttonInfo.title}</span>
        </SimilarProblem>
    );
}

function ExamPracticeButton({buttonInfo}: {buttonInfo: ButtonInfo}): React.ReactElement {
    return (
        <ExamPractice>
            <span>{buttonInfo.description}</span>

            <span style={{fontSize: '16px', fontWeight: '600'}}>{buttonInfo.title}</span>
        </ExamPractice>
    );
}

function RoadmapProblemButton({buttonInfo}: {buttonInfo: ButtonInfo}): React.ReactElement {
    return (
        <RoadmapProblem>
            <span>{buttonInfo.description}</span>

            <span style={{fontSize: '16px', fontWeight: '600', flexWrap: 'wrap'}}>{buttonInfo.title}</span>
        </RoadmapProblem>
    )
}

function SejongRankingButton({buttonInfo}: {buttonInfo: ButtonInfo}): React.ReactElement {
    return (
        <SejongRanking>
            <span>{buttonInfo.description}</span>

            <span style={{fontSize: '16px', fontWeight: '600'}}>{buttonInfo.title}</span>
        </SejongRanking>
    )
}

function ClusteringProblems({problems}: {problems: ClusteringProblemModel[]}): React.ReactElement {
    const user = useSelector((state: RootState) => state.user)

    return (
        <HStack style={{
            overscrollBehaviorX: 'contain', 
            overflowX: 'scroll', 
            paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)'
            }}>
            {problems.map((problem: ClusteringProblemModel): React.ReactElement => 
            <ProblemCell key={problem.problemId} bojHandle={user.bojHandle ?? ''} problemID={problem.problemId} />)}
        </HStack>
    );
}

function Home(): React.ReactElement {
    const [clusteringProblems, setClusteringProblems] = useState<ClusteringProblemModel[] | null>(null);

    const handleClusteringProblem = (data: ClusteringProblemModel[] | null) => {
        setClusteringProblems(data);
    }

    GetMostSolvedProblem(handleClusteringProblem);
    
    return (
        <VStack style={{overflow: 'hidden', paddingTop: '80px'}}>
            <Title>
                수업에서 배운 내용을 알려주세요!<br />
                문제를 추천해 드릴게요
            </Title>
            <SearchButton>
                검색하러 가기
            </SearchButton>

            <HStack style={{ 
                overscrollBehaviorX: 'contain', 
                overflowX: 'scroll', 
                paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)'}}>
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