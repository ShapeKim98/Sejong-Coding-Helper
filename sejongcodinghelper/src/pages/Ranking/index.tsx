import React, { useCallback, useState, useEffect, useRef} from 'react';
import {
    Title,
    Background,
    RankerRanking,
    RankerName,
    SolvedCount
} from './style';
import HStack from '../../components/HStack';
import VStack from '../../components/VStack';
import UserProfile from '../../models/UserProfile';
import { GetRankMostSolved } from '../../api/Ranking/RankingAPI';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

function Ranker(info: {userProfile: UserProfile | null, ranking: string}): React.ReactElement {
    const [imageUrl, setImageUrl] = useState('');

    const openNewTab = () => {
        window.open('https://solved.ac/profile/' + info.userProfile?.bojHandle);
    }

    useEffect(() => {
        setImageUrl(`https://static.solved.ac/tier_small/${info.userProfile?.tier}.svg`);
    }, [info.userProfile]);
    return (
        <Background style={{
            width: '274px',
            marginRight: info.ranking != "3rd" ? '40px' : '0px',
            cursor: 'pointer'
        }} onClick={openNewTab}>
            <VStack style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '24px'
                }}>
                <HStack style={{alignItems: 'end'}}>
                <img style={{
                    width: '100px', 
                    height: '100px', 
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    borderRadius: '50%'
                    }} 
                    alt={info.userProfile?.bojHandle} 
                    src={(info.userProfile?.profileImg !== "null") ? 
                    (info.userProfile?.profileImg ?? 
                    'https://static.solved.ac/misc/64x64/default_profile.png') : 
                    'https://static.solved.ac/misc/64x64/default_profile.png'}></img>
                    <RankerRanking style={{
                        backgroundColor: info.ranking === "1st" ? '#FDDA57' : (info.ranking === "2nd" ? '#BFBFBF' : '#83633C')
                    }}>{info.ranking}</RankerRanking>
                </HStack>
                <HStack style={{marginTop: '32px'}}>
                    <RankerName>
                        {info.userProfile?.bojHandle}
                    </RankerName>

                    <img style={{
                            width: '20px', 
                            height: '20px', 
                            aspectRatio: '1 / 1'}} 
                            alt={info.userProfile?.bojHandle} 
                            src={imageUrl}></img>
                </HStack>
                <SolvedCount style={{
                    marginTop: '20px',
                    marginBottom: '24px'
                    }}>
                    {'푼 문제 수: ' + info.userProfile?.totalSolved}
                </SolvedCount>
            </VStack>
        </Background>
    );
}

function RankingCell(info: {userProfile: UserProfile, ranking: number}): React.ReactElement {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        setImageUrl(`https://static.solved.ac/tier_small/${info.userProfile.tier}.svg`);
    }, [info.userProfile]);

    const openNewTab = () => {
        window.open('https://solved.ac/profile/' + info.userProfile.bojHandle);
    }

    return (
        <VStack style={{
            cursor: 'pointer'
            }} onClick={openNewTab}>
            <HStack style={{
                alignItems: 'center'
                }}>
                <RankerName style={{fontSize: '20px'}}>
                    {info.ranking + 'th'}
                </RankerName>
                    <img style={{
                            width: '40px', 
                            height: '40px', 
                            aspectRatio: '1 / 1',
                            overflow: 'hidden',
                            borderRadius: '50%',
                            marginLeft: '8px'
                            }} 
                            alt={info.userProfile.bojHandle} 
                            src={(info.userProfile.profileImg !== "null") ? 
                            (info.userProfile.profileImg ?? 
                            'https://static.solved.ac/misc/64x64/default_profile.png') : 
                            'https://static.solved.ac/misc/64x64/default_profile.png'}></img>
                <RankerName style={{marginLeft: '12px', fontSize: '20px'}}>
                    {info.userProfile.bojHandle}
                </RankerName>

                <img style={{
                            width: '20px', 
                            height: '20px', 
                            aspectRatio: '1 / 1'}} 
                            alt={info.userProfile.bojHandle} 
                            src={imageUrl}></img>

                <SolvedCount style={{marginLeft: 'auto'}}>
                    {'푼 문제 수: ' + info.userProfile.totalSolved}
                </SolvedCount>
            </HStack>

            <span style={{borderBottom: '1px solid #EDEDED', marginBottom: '16px', marginTop: '16px'}} />
        </VStack>
    )
}

function Ranking(): React.ReactElement {
    const [userProfiles, setUserProfiles] = useState<UserProfile[] | null>(null)
    const [rankers, setRankers] = useState<UserProfile[]>([]);
    const [currnentPage, setCurrentPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [fetching, setFetching] = useState(false);

    const handleUserProfile = (data: {
        content: UserProfile[] | null,
        totalPages: number
    }) => {
        setFetching(true)
        setUserProfiles([...userProfiles ?? [], ...data.content ?? []]);
        setTotalPages(totalPages);
        setFetching(false)
    }
    
    GetRankMostSolved(currnentPage, handleUserProfile) 

    useEffect(() => {
        setRankers(userProfiles?.filter((value: UserProfile, index: number) => (index < 3)) ?? []);
    }, [userProfiles])

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
          // 페이지 끝에 도달하면 추가 데이터를 받아온다
            const page = currnentPage
            setCurrentPage(page + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      });

    return (
        <VStack style={{overflowY: 'auto', 
        paddingTop: '80px', 
        paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
        paddingRight: 'calc(-268.46154px + 28.36538vw + 24px)'
        }}>
            <Title>
                학교 랭킹
            </Title>
            <HStack style={{
                marginTop: '60px',
                marginLeft: 'auto',
                marginRight: 'auto'
                }}>
                <Ranker userProfile={rankers[0] ?? null} ranking={"1st"} />
                <Ranker userProfile={rankers[1] ?? null} ranking={"2nd"} />
                <Ranker userProfile={rankers[2] ?? null} ranking={"3rd"} />
            </HStack>

            <Background 
                style={{
                    width: '100%',
                    marginTop: '36px',
                    padding: '24px'
                }}>
                <VStack>
                    {userProfiles?.filter((value: UserProfile, index: number) => (index >= 3))?.map((userProfile: UserProfile, index: number): React.ReactElement =>
                        <RankingCell userProfile={userProfile} ranking={index + 4}/>
                        )}
                </VStack>
            </Background>
        </VStack>
    );
}

export default Ranking;