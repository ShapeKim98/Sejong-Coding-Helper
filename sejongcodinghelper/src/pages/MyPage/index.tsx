import React, { useState, useEffect, useCallback, WheelEvent, useRef} from 'react';
import VStack from '../../components/VStack';
import HStack from '../../components/HStack';
import { Background, LogoutButton, Progress, ProgressName, RoadmapDetailButton, SubTitle, Title, TotalSolvedCount, UserName } from './style';
import UserProfile from '../../models/UserProfile';
import RoadmapProgress from '../../models/RoadmapProgress';
import { getUserInfo, getUserRandomStreakGrass, userLogout } from '../../api/User/User';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { AxiosResponse } from 'axios';
import { GetRoadmapProgres } from '../../api/Roadmap/RoadmapAPI';
import { getHeaderRefreshTokenConfing, logoutProc } from '../../api/Auth/Auth';
import { Link } from 'react-router-dom';
import SolvedProblem from '../../models/SolvedProblem';
import { GetSolvedProblem } from '../../api/SolvedProblem/SolvedProblemAPI';
import ProblemCell from '../../components/ProblemCell';
import StreakGrass from '../../models/StreakGress';
import Streak from '../../components/Streak';

function TodaySolvedProblemList(info: {
    solvedProblems: SolvedProblem[],
    scrollRef: React.MutableRefObject<HTMLDivElement | null>,
    handleWheelScroll: (e: WheelEvent<HTMLDivElement>) => void,
    handlHoverTrue: () => void,
    hadleHoverFalse: () => void
}): React.ReactElement {
    const user = useSelector((state: RootState) => state.user)

    if (info.solvedProblems.length !== 0) {
        return(
            <VStack style={{
                marginTop: '32px',
                }}>
                <SubTitle style={{
                    marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
                    marginBottom: '0px'
                    }}>오늘 푼 문제</SubTitle>
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
                        {info.solvedProblems && info.solvedProblems.map((problem: SolvedProblem) => 
                        <ProblemCell key={problem.problemId} bojHandle={user.bojHandle ?? ''} problemID={problem.problemId} />)}
                </HStack>
            </VStack>
        );
    } else {
        return (<></>);
    }
}

function RoadmapProgressCell({progress}: {progress: RoadmapProgress}): React.ReactElement {
    return (
        <Background style={{ marginBottom: '28px'}}>
            <HStack>
                <ProgressName>{progress.name}</ProgressName>
                <Progress>{progress.progress + '%'}</Progress>
                <Link style={{marginLeft: 'auto'}} to={'/roadmapdetail'} state={{roadmapID: progress.roadmapId}}>
                    <RoadmapDetailButton>로드맵 바로가기</RoadmapDetailButton>
                </Link>
            </HStack>
        </Background>
    )
}

function RoadmapProgressList({roadmapProgress}: {roadmapProgress: RoadmapProgress[] | null}): React.ReactElement {
    return (
        <VStack style={{
            marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
            marginRight: 'calc(-268.46154px + 28.36538vw + 24px)',
            marginTop: '60px',
            }}>
            <SubTitle>과목별 진행도</SubTitle>
            {roadmapProgress && roadmapProgress.map((progress: RoadmapProgress) => 
            <RoadmapProgressCell key={progress.roadmapId} progress={progress} />)}
        </VStack>
    );
}

function UserProfileComponent({userProfile}: {userProfile: UserProfile | null}): React.ReactElement {
    const [imageUrl, setImageUrl] = useState('');
    const [randomStreak, setRandomStreak] = useState<StreakGrass[]>([])
     

    useEffect(() => {
        setImageUrl(`https://static.solved.ac/tier_small/${userProfile?.tier}.svg`);
    }, [userProfile]);

    useEffect(() => {
        getUserRandomStreakGrass({bojHandle: userProfile?.bojHandle ?? ''})
        .then(result => {
            if (result.status === 200) {
                setRandomStreak(result.data)
            }
        })
        .catch(error => {
            console.log(error);
        })
    })

    return (
        <HStack style={{
            marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
            marginRight: 'calc(-268.46154px + 28.36538vw + 24px)',
            marginTop: '60px',
            alignItems: 'center'
            }}>
            <img style={{
                width: '80px', 
                height: '80px', 
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                borderRadius: '50%'
                }} 
                alt={userProfile?.bojHandle} 
                src={(userProfile?.profileImg != "null") ? 
                (userProfile?.profileImg ?? 
                'https://static.solved.ac/misc/64x64/default_profile.png') : 
                'https://static.solved.ac/misc/64x64/default_profile.png'}></img>
            <VStack style={{marginLeft: '40px'}}>
                <HStack>
                    <UserName>{userProfile?.bojHandle}</UserName>
                    <img style={{
                            width: '28px', 
                            height: '28px', 
                            aspectRatio: '1 / 1',
                            marginLeft: '16px'}} 
                            alt={userProfile?.bojHandle} 
                            src={imageUrl}></img>
                </HStack>
                
                <TotalSolvedCount>{'푼 문제 : ' + userProfile?.totalSolved}</TotalSolvedCount>
            </VStack>
            <Streak
                randomStreak={randomStreak}
                maxStreak={102}
                line={3}
                width={680}
                height={65}
                />
        </HStack>
    );
}

function MyPage(): React.ReactElement {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [roadmapProgress, setRoadmapProgress] = useState<RoadmapProgress[] | null>(null);
    const [solvedProblems, setSolvedProblems] = useState<SolvedProblem[] | null>(null)
    const user = useSelector((state: RootState) => state.user)
    const config = getHeaderRefreshTokenConfing();
    const dispatch = useDispatch();
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const handleWheelScroll = (e: WheelEvent<HTMLDivElement>) => {
        if (scrollRef.current) {
            const delta = (e.deltaY || e.deltaX)
            scrollRef.current.scrollLeft += delta;
        }
    };

    const handleRoadmapProgress = (data: RoadmapProgress[] | null) => {
        setRoadmapProgress(data);
    }
    const handleSolvedProblems = (data: SolvedProblem[] | null) => {
        setSolvedProblems(data);
    }

    const handlHoverTrue = useCallback(() => {
        document.body.style.overflowY = 'hidden'
        document.body.style.overflowX = 'hidden'
    }, [])

    const hadleHoverFalse = useCallback(() => {
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'auto'
    }, [])

    useEffect(() => {
        getUserInfo({bojHandle: user.bojHandle ?? ''})
        .then((result: AxiosResponse<UserProfile | null, any>) => {
            if (result.status == 200) {
                setUserProfile(result.data)
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, [user])

    const onClickLogout = useCallback(() => {
        userLogout({bojHandle: user.bojHandle ?? ''}, config)
            .then(result => {
                logoutProc(dispatch)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    GetRoadmapProgres(user.bojHandle ?? '', handleRoadmapProgress)
    GetSolvedProblem(user.bojHandle ?? '', handleSolvedProblems)

    return (
        <VStack>
            <HStack style={{
                marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
                marginRight: 'calc(-268.46154px + 28.36538vw + 24px)',
                marginTop: '72px',
                alignItems: 'center'
            }}>
                <Title>
                    내 정보
                </Title>
                <LogoutButton onClick={onClickLogout}>
                    로그아웃
                </LogoutButton>
            </HStack>

            <UserProfileComponent userProfile={userProfile} />
        
            <RoadmapProgressList roadmapProgress={roadmapProgress} />
            

            {solvedProblems && 
            <TodaySolvedProblemList 
            solvedProblems={solvedProblems}
            scrollRef={scrollRef}
            handleWheelScroll={handleWheelScroll}
            handlHoverTrue={handlHoverTrue}
            hadleHoverFalse={hadleHoverFalse} />}
        </VStack>
    )
}

export default MyPage;