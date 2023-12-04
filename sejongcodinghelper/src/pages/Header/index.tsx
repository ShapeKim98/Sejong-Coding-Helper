import React, { useCallback, useState} from 'react';
import HStack from '../../components/HStack';
import VStack from '../../components/VStack';
import { Link, NavigateFunction } from 'react-router-dom';
import {
    Header, 
    Title
} from './style';
import { SimilarProblem } from '../Home/style';
import { useNavigate } from 'react-router-dom';

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
}

interface RecomendProblemMenuButtonInfo {
    title: string
    currentHover: RecomendProblemMenuElements | undefined
    handleHover: () => void
    path: string
}

enum HeaderElements {
    RecomendProblem = '문제 추천',
    TestPractice = '시험 연습',
    Ranking = '랭킹',
    Search = '검색하기'
}

enum RecomendProblemMenuElements {
    Roadmap = '과목별 문제 로드맵 보러가기',
    SimilarProblem = '비슷한 문제 풀어보기',
    PracticeProblem = '실습문제와 비슷한 문제 찾기'
}
  
function RecomendProblemMenu({title, currentHover, handleHover, path}: RecomendProblemMenuButtonInfo): React.ReactElement {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(path)
    }

    return (
        <VStack onMouseOver={handleHover} onClick={onClick} style={{cursor: 'pointer'}}>
            <span style={{color: currentHover == title ? '#C8001E' : '#28424F'}}>{title}</span>
            <span style={{borderBottom: '1px solid #EDEDED', marginBottom: '12px', marginTop: '12px'}} />
        </VStack>
    );
}

function HeaderButton({title, currentHover, handleHover}: HeaderButtonInfo): React.ReactElement {
    return (
      <p style={{marginRight: '40px', color: currentHover == title ? '#C8001E' : '#28424F', cursor: 'pointer'}} onMouseOver={handleHover}>{title}</p>
    );
}

function HeaderBarElements({
    hover,
    setRecomendProblem, 
    setTestPractice, 
    setRanking, 
    setSearch}: HoverHandlings): React.ReactElement {
        const [recomendProblemMenuHover, setRecomendProblemMenuHover] = useState<RecomendProblemMenuElements>();

        const setRoadmap = () => {
            setRecomendProblemMenuHover(RecomendProblemMenuElements.Roadmap)
        }

        const setSimilarProblem = () => {
            setRecomendProblemMenuHover(RecomendProblemMenuElements.SimilarProblem)
        }

        const setPracticeProblem = () => {
            setRecomendProblemMenuHover(RecomendProblemMenuElements.PracticeProblem)
        }

        function Elements(): React.ReactElement {
            return (
                <HStack style={{alignItems: 'center'}}>
                    <Link to={'/'}>
                        <Title>Univps</Title>
                    </Link>
                    <HeaderButton title={'문제 추천'} currentHover={hover} handleHover={setRecomendProblem} />
                    <HeaderButton title={'시험 연습'} currentHover={hover} handleHover={setTestPractice} />
                    <Link to={'/ranking'}>
                        <HeaderButton title={'랭킹'} currentHover={hover} handleHover={setRanking} />
                    </Link>
                    <HeaderButton title={'검색하기'} currentHover={hover} handleHover={setSearch} />
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
            setSearch={setSearch} />
        </Header>
    )
}

export default HeaderBar;