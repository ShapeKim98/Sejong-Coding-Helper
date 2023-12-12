import React, {
  useState,
  useEffect,
  useCallback,
  WheelEvent,
  useRef,
} from 'react';
import VStack from '../../components/VStack';
import HStack from '../../components/HStack';
import {
  Background,
  LogoutButton,
  NoPosts,
  PageWrapper,
  Progress,
  ProgressName,
  RoadmapDetailButton,
  SubTitle,
  Title,
  TotalSolvedCount,
  UserName,
} from './style';
import UserProfile from '../../models/UserProfile';
import RoadmapProgress from '../../models/RoadmapProgress';
import {
  getUserInfo,
  getUserRandomStreakGrass,
  userLogout,
} from '../../api/User/User';
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
import Pagination from '../../components/Pagination';
import BoardTable from '../../components/BoardTable';
import { isEmpty } from 'lodash';
import { getPostsByUser } from '../../api/Board/boardAPI';
import PasswordChangeModal from './PasswordChangeModal';

function TodaySolvedProblemList(info: {
  solvedProblems: SolvedProblem[];
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  handleWheelScroll: (e: WheelEvent<HTMLDivElement>) => void;
  handlHoverTrue: () => void;
  hadleHoverFalse: () => void;
}): React.ReactElement {
  const user = useSelector((state: RootState) => state.user);

  if (info.solvedProblems.length !== 0) {
    return (
      <VStack
        style={{
          marginTop: '32px',
        }}
      >
        <SubTitle
          style={{
            marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
            marginBottom: '0px',
          }}
        >
          오늘 푼 문제
        </SubTitle>
        <HStack
          ref={info.scrollRef}
          onWheel={info.handleWheelScroll}
          onMouseOver={info.handlHoverTrue}
          onMouseOut={info.hadleHoverFalse}
          style={{
            overscrollBehaviorX: 'contain',
            overflowX: 'scroll',
            paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
          }}
        >
          {info.solvedProblems &&
            info.solvedProblems.map((problem: SolvedProblem) => (
              <ProblemCell
                key={problem.problemId}
                bojHandle={user.bojHandle ?? ''}
                problemID={problem.problemId}
                similar={null}
              />
            ))}
        </HStack>
      </VStack>
    );
  } else {
    return <></>;
  }
}

function RoadmapProgressCell({
  progress,
}: {
  progress: RoadmapProgress;
}): React.ReactElement {
  return (
    <Background style={{ marginBottom: '28px' }}>
      <HStack>
        <ProgressName>{progress.name}</ProgressName>
        <Progress>{progress.progress + '%'}</Progress>
        <Link
          style={{ marginLeft: 'auto' }}
          to={'/roadmapdetail'}
          state={{ roadmapID: progress.roadmapId }}
        >
          <RoadmapDetailButton>로드맵 바로가기</RoadmapDetailButton>
        </Link>
      </HStack>
    </Background>
  );
}

function RoadmapProgressList({
  roadmapProgress,
}: {
  roadmapProgress: RoadmapProgress[] | null;
}): React.ReactElement {
  return (
    <VStack
      style={{
        marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
        marginRight: 'calc(-268.46154px + 28.36538vw + 24px)',
        marginTop: '60px',
      }}
    >
      <SubTitle>과목별 진행도</SubTitle>
      {roadmapProgress &&
        roadmapProgress.map((progress: RoadmapProgress) => (
          <RoadmapProgressCell key={progress.roadmapId} progress={progress} />
        ))}
    </VStack>
  );
}

function UserProfileComponent({
  userProfile,
}: {
  userProfile: UserProfile | null;
}): React.ReactElement {
  const [imageUrl, setImageUrl] = useState('');
  const [randomStreak, setRandomStreak] = useState<StreakGrass[]>([]);

  useEffect(() => {
    setImageUrl(`https://static.solved.ac/tier_small/${userProfile?.tier}.svg`);
  }, [userProfile]);

  useEffect(() => {
    getUserRandomStreakGrass({ bojHandle: userProfile?.bojHandle ?? '' })
      .then((result) => {
        if (result.status === 200) {
          setRandomStreak(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userProfile?.bojHandle]);

  return (
    <HStack
      style={{
        marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
        marginRight: 'calc(-268.46154px + 28.36538vw + 24px)',
        marginTop: '60px',
        alignItems: 'center',
      }}
    >
      <img
        style={{
          width: '80px',
          height: '80px',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          borderRadius: '50%',
        }}
        alt={userProfile?.bojHandle}
        src={
          userProfile?.profileImg != 'null'
            ? userProfile?.profileImg ??
              'https://static.solved.ac/misc/64x64/default_profile.png'
            : 'https://static.solved.ac/misc/64x64/default_profile.png'
        }
      ></img>
      <VStack style={{ marginLeft: '40px' }}>
        <HStack>
          <UserName>{userProfile?.bojHandle}</UserName>
          <img
            style={{
              width: '28px',
              height: '28px',
              aspectRatio: '1 / 1',
              marginLeft: '16px',
            }}
            alt={userProfile?.bojHandle}
            src={imageUrl}
          ></img>
        </HStack>

        <TotalSolvedCount>
          {'푼 문제 : ' + userProfile?.totalSolved}
        </TotalSolvedCount>
      </VStack>
      {/* <Streak
        randomStreak={randomStreak}
        maxStreak={102}
        line={3}
        width={680}
        height={65}
      /> */}
    </HStack>
  );
}

function UserBoard() {
  const SIZE = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postList, setPostList] = useState([]);

  // 사용자 정보
  const user = useSelector((state: RootState) => state.user);

  // 게시물 데이터 로드
  const loadPosts = useCallback(() => {
    if (!user.bojHandle) return;
    getPostsByUser({ size: SIZE, page: page - 1, bojHandle: user.bojHandle })
      .then((res) => {
        const { data } = res;
        setPostList(data.content);
        setTotal(data.totalElements);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page, user.bojHandle]);
  useEffect(() => {
    loadPosts();
  }, [loadPosts, page]);

  return (
    <VStack
      style={{
        marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
        marginRight: 'calc(-268.46154px + 28.36538vw + 24px)',
        marginTop: '60px',
        paddingBottom: '60px',
      }}
    >
      <Title>작성한 글</Title>
      {isEmpty(postList) ? (
        <NoPosts>아직 작성 글이 없습니다.</NoPosts>
      ) : (
        <>
          <BoardTable postList={postList} />
          {/* 페이지네이션  */}
          {Math.ceil(total / SIZE) > 1 && (
            <PageWrapper>
              <Pagination
                totalPage={Math.ceil(total / SIZE)}
                limitPage={5}
                page={page}
                setPage={setPage}
              />
            </PageWrapper>
          )}
        </>
      )}
    </VStack>
  );
}

function MyPage(): React.ReactElement {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [roadmapProgress, setRoadmapProgress] = useState<
    RoadmapProgress[] | null
  >(null);
  const [solvedProblems, setSolvedProblems] = useState<SolvedProblem[] | null>(
    null
  );
  const user = useSelector((state: RootState) => state.user);
  const config = getHeaderRefreshTokenConfing();
  const dispatch = useDispatch();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleWheelScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      const delta = e.deltaY || e.deltaX;
      scrollRef.current.scrollLeft += delta;
    }
  };

  const handleRoadmapProgress = (data: RoadmapProgress[] | null) => {
    setRoadmapProgress(data);
  };
  const handleSolvedProblems = (data: SolvedProblem[] | null) => {
    setSolvedProblems(data);
  };

  const handlHoverTrue = useCallback(() => {
    document.body.style.overflowY = 'hidden';
    document.body.style.overflowX = 'hidden';
  }, []);

  const hadleHoverFalse = useCallback(() => {
    document.body.style.overflowY = 'auto';
    document.body.style.overflowX = 'auto';
  }, []);

  useEffect(() => {
    getUserInfo({ bojHandle: user.bojHandle ?? '' })
      .then((result: AxiosResponse<UserProfile | null, any>) => {
        if (result.status == 200) {
          setUserProfile(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  const onClickLogout = useCallback(() => {
    userLogout({ bojHandle: user.bojHandle ?? '' }, config)
      .then((result) => {
        logoutProc(dispatch);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  GetRoadmapProgres(user.bojHandle ?? '', handleRoadmapProgress);
  GetSolvedProblem(user.bojHandle ?? '', handleSolvedProblems);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <VStack
      style={{
        overflow: 'scroll',
      }}
    >
      <HStack
        style={{
          marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
          marginRight: 'calc(-268.46154px + 28.36538vw + 24px)',
          marginTop: '72px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title>내 정보</Title>
        <HStack
          style={{
            gap: '1rem',
          }}
        >
          <LogoutButton
            onClick={() => {
              setShowPasswordModal(true);
            }}
          >
            비밀번호 변경
          </LogoutButton>
          <LogoutButton onClick={onClickLogout}>로그아웃</LogoutButton>
        </HStack>
      </HStack>

      <UserProfileComponent userProfile={userProfile} />

      <RoadmapProgressList roadmapProgress={roadmapProgress} />

      {solvedProblems && (
        <TodaySolvedProblemList
          solvedProblems={solvedProblems}
          scrollRef={scrollRef}
          handleWheelScroll={handleWheelScroll}
          handlHoverTrue={handlHoverTrue}
          hadleHoverFalse={hadleHoverFalse}
        />
      )}

      <UserBoard />
      <PasswordChangeModal
        showModal={showPasswordModal}
        closeModal={() => {
          setShowPasswordModal(false);
        }}
      />
    </VStack>
  );
}

export default MyPage;
