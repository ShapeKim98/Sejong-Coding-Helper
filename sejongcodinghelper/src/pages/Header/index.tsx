import React, { useCallback, useState} from 'react';
import HStack from '../../components/HStack';
import VStack from '../../components/VStack';
import { Link } from 'react-router-dom';
import {
    Header, 
    Title
} from './style';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { userLogout } from '../../api/User/User';
import { getHeaderRefreshTokenConfing, logoutProc } from '../../api/Auth/Auth';

interface HeaderButtonInfo {
    title: string
    currentHover: HeaderElements | undefined
    handleHover: () => void
}

interface HoverHandlings {
    hover: HeaderElements | undefined
    setRecomendProblem: () => void
    setTestPractice: () => void
    setRanking: () => void
    setSearch: () => void
    setMyPage: () => void
}

interface RecomendProblemMenuButtonInfo {
    title: string
    currentHover: RecomendProblemMenuElements | undefined
    handleHover: () => void
    path: string
}

interface MyPageMenuButtonInfo {
    title: string
    currentHover: MyPageMenuElements | undefined
    handleHover: () => void
    path: string | null
}

enum HeaderElements {
    RecomendProblem = '문제 추천',
    TestPractice = '시험 연습',
    Ranking = '랭킹',
    Search = '검색하기',
    MyPage = '마이페이지'
}

enum RecomendProblemMenuElements {
    Roadmap = '과목별 문제 로드맵 보러가기',
    SimilarProblem = '비슷한 문제 풀어보기',
    PracticeProblem = '실습문제와 비슷한 문제 찾기'
}

enum MyPageMenuElements {
    MyPage = '마이페이지 가기',
    Logout = '로그아웃'
}

function MyPageMenu({title, currentHover, handleHover, path}: MyPageMenuButtonInfo): React.ReactElement {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user)
    const config = getHeaderRefreshTokenConfing();

    const onClick = useCallback(() => {
        if (path) {
            navigate(path)
        } else {
            userLogout({bojHandle: user.bojHandle ?? ''}, config)
            .then(result => {
                logoutProc(dispatch)
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, [])

    return (
        <VStack 
        onMouseOver={handleHover} 
        onClick={onClick} 
        style={{
            cursor: 'pointer',
            marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
            marginRight: 'calc(-268.46154px + 28.36538vw + 24px)'
            }}>
            <span style={{
                color: currentHover == title ? '#C8001E' : '#28424F',
                marginLeft: 'auto'
                }}>{title}</span>
            <span style={{borderBottom: '1px solid #EDEDED', marginBottom: '12px', marginTop: '12px'}} />
        </VStack>
    );
}
  
function RecomendProblemMenu({title, currentHover, handleHover, path}: RecomendProblemMenuButtonInfo): React.ReactElement {
    const navigate = useNavigate();

    const onClick = useCallback(() => {
        navigate(path)
    }, [])

    return (
        <VStack 
        onMouseOver={handleHover} 
        onClick={onClick} 
        style={{
            cursor: 'pointer',
            marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
            marginRight: 'calc(-268.46154px + 28.36538vw + 24px)'
            }}>
            <span style={{color: currentHover == title ? '#C8001E' : '#28424F'}}>{title}</span>
            <span style={{borderBottom: '1px solid #EDEDED', marginBottom: '12px', marginTop: '12px'}} />
        </VStack>
    );
}

function HeaderButton({title, currentHover, handleHover}: HeaderButtonInfo): React.ReactElement {
    const user = useSelector((state: RootState) => state.user)

    if (title == '마이페이지') {
        return (
            <p style={{
              marginLeft: 'auto',
              color: currentHover == title ? '#C8001E' : '#28424F', 
              cursor: 'pointer'}} 
              onMouseOver={handleHover}>{`${user.bojHandle}님 반가워요!`}</p>
          );
    } else {
        return (
            <p style={{
              marginRight: '40px', 
              color: currentHover == title ? '#C8001E' : '#28424F', 
              cursor: 'pointer'}} 
              onMouseOver={handleHover}>{title}</p>
          );
    }
    
}

function HeaderBarElements({
    hover,
    setRecomendProblem, 
    setTestPractice, 
    setRanking,
    setSearch,
    setMyPage
}: HoverHandlings): React.ReactElement {

        const [recomendProblemMenuHover, setRecomendProblemMenuHover] = useState<RecomendProblemMenuElements>();

        const [myPageMenuHover, setMyPageMenuHover] = useState<MyPageMenuElements>();

        const setRoadmap = () => {
            setRecomendProblemMenuHover(RecomendProblemMenuElements.Roadmap)
        }

        const setSimilarProblem = () => {
            setRecomendProblemMenuHover(RecomendProblemMenuElements.SimilarProblem)
        }

        const setPracticeProblem = () => {
            setRecomendProblemMenuHover(RecomendProblemMenuElements.PracticeProblem)
        }

        const setGoToMyPage = () => {
            setMyPageMenuHover(MyPageMenuElements.MyPage)
        }

        const setLogout = () => {
            setMyPageMenuHover(MyPageMenuElements.Logout)
        }

        function Elements(): React.ReactElement {
            return (
                <HStack 
                style={{
                    alignItems: 'center',
                    marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
                    marginRight: 'calc(-268.46154px + 28.36538vw + 24px)'
                    }}>
                    <Link to={'/'}>
                        <Title>Univps</Title>
                    </Link>
                    <HeaderButton title={'문제 추천'} currentHover={hover} handleHover={setRecomendProblem} />
                    <HeaderButton title={'시험 연습'} currentHover={hover} handleHover={setTestPractice} />
                    <Link to={'/ranking'}>
                        <HeaderButton title={'랭킹'} currentHover={hover} handleHover={setRanking} />
                    </Link>
                    <HeaderButton title={'검색하기'} currentHover={hover} handleHover={setSearch} />

                    <HeaderButton 
                    title={'마이페이지'} 
                    currentHover={hover} 
                    handleHover={setMyPage} />
                </HStack>
            );
        }

    switch (hover) {
        case HeaderElements.RecomendProblem:
            return (
                <VStack>
                   <Elements /> 
                   <span style={{paddingTop: '40px'}} onMouseOver={setRecomendProblem}>
                        <RecomendProblemMenu title='과목별 문제 로드맵 보러가기' currentHover={recomendProblemMenuHover} handleHover={setRoadmap} path='/roadmap' />
                        <RecomendProblemMenu title='비슷한 문제 풀어보기' currentHover={recomendProblemMenuHover} handleHover={setSimilarProblem} path='' />
                        <RecomendProblemMenu title='실습문제와 비슷한 문제 찾기' currentHover={recomendProblemMenuHover} handleHover={setPracticeProblem} path='' />
                    </span>
                </VStack>
            );
        case HeaderElements.TestPractice:
            return (
                <Elements />
            )
        case HeaderElements.Ranking:
            return (
                <Elements />
            );
        case HeaderElements.Search:
            return (
                <Elements />
            );
        case HeaderElements.MyPage:
            return (
                <VStack>
                    <Elements /> 
                    <span style={{paddingTop: '40px'}} onMouseOver={setMyPage}>
                        <MyPageMenu title='마이페이지 가기' currentHover={myPageMenuHover} handleHover={setGoToMyPage} path='' />
                        <MyPageMenu title='로그아웃' currentHover={myPageMenuHover} handleHover={setLogout} path={null} />
                    </span>
                </VStack>
            )
        default:
            return (
                <Elements />
            );
    }
}

function HeaderBar(): React.ReactElement {
    const [hover, setHover] = useState<HeaderElements>();

    const setRecomendProblem = () => {
        setHover(HeaderElements.RecomendProblem)
    }

    const setTestPractice = () => {
        setHover(HeaderElements.TestPractice)
    }

    const setRanking = () => {
        setHover(HeaderElements.Ranking)
    }

    const setSearch = () => {
        setHover(HeaderElements.Search)
    }

    const setMyPage = () => {
        setHover(HeaderElements.MyPage);
    }

    const outHover = () => {
        setHover(undefined)
    }

    return (
        <Header onMouseOut={outHover}>
            <HeaderBarElements 
            hover={hover} 
            setRecomendProblem={setRecomendProblem} 
            setTestPractice={setTestPractice}
            setRanking={setRanking}
            setSearch={setSearch}
            setMyPage = {setMyPage}
             />
        </Header>
    )
}

export default HeaderBar;