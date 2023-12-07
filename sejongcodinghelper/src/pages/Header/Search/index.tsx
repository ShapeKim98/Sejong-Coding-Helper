import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { numToTierStr } from './tier';
import Switch from 'react-switch';
import {
  Slider,
  Form,
  Label,
  Title,
  SwitchWrapper,
  TextFieldStyle,
  SearchButton,
} from './style';
import { CommonTierImg, CommonButton } from '../../../style/commonStyle';
import { RootState } from '../../../redux/Store';
import { MarkObj } from 'rc-slider/lib/Marks';
import HStack from '../../../components/HStack';
import VStack from '../../../components/VStack';
import { Link } from 'react-router-dom';

interface Problem {
  id: number;
  title?: string;
  level?: string;
  tags?: string[];
}

/**
 * 문제 추천 화면
 */
function Search() {
  const user = useSelector((state: RootState) => state.user);
  const [keyword, setKeyword] = useState<string>('');
  const [startTier, setStartTier] = useState<number>(0);
  const [endTier, setEndTier] = useState<number>(4);
  const [idError, setIdError] = useState<boolean>(false);
  const [tierMarks, setTierMarks] = useState<Record<string | number, ReactNode | MarkObj>>();
  const [loadFlag, setLoadFlag] = useState<boolean>(true);
  const [isKo, setIsKo] = useState<boolean>(true);
  const [problemIdx, setProblemIdx] = useState<number>(0);
  const [problemList, setProblemList] = useState<Problem[]>([]);
  const [problem, setProblem] = useState<Problem>({ id: 0 });

  useEffect(() => {
    // 슬라이더에 마커 설정 (5 단위, 티어 색상이 변경될 때 마다 티어 이미지 삽입)
    const marks: (React.JSX.Element | undefined)[] = [...Array(30)].map((_, i) => {
      if (i % 5 === 0)
        return (
          <CommonTierImg
            key={i}
            width={18}
            height={18}
            src={`https://static.solved.ac/tier_small/${i + 1}.svg`}
          />
        );
    });
    setTierMarks(
        marks.reduce((accumulator, value, index) => {
            return { ...accumulator, [index]: value };
        }, {})
    );
  }, []);

  const changeKeyword = useCallback((e: { target: { value: React.SetStateAction<string>; }; }) => {
    setKeyword(e.target.value);
  }, []);

  /**
   * 슬라이더 변경 핸들러
   */
  const onChangeSlider = useCallback((range: number | number[]) => {
    setLoadFlag(true);
    setStartTier((range as number[])[0]);
    setEndTier((range as number[])[1]);
  }, []);

  /**
   * 한국어 문제 추천 버튼 핸들러
   */
  const onClickKoButton = useCallback(() => {
    setLoadFlag(true);
    setIsKo((prev) => !prev);
  }, []);

  /**
   * 문제 목록 중 추천 문제를 지정한다.
   */
  useEffect(() => {
    if (problemList.length === 0) {
      setProblem({ id: 0 });
    } else if (problemList.length <= problemIdx) return;
    if (problemList.length > 0) {
      const newProblem: Problem = {
        id: problemList[problemIdx].id,
        title: problemList[problemIdx].title,
        level: problemList[problemIdx].level,
        tags: problemList[problemIdx].tags,
      };
      setProblem(newProblem);
    }
  }, [problemIdx, problemList]);

  /**
   * 문제 추천 버튼 클릭 시 폼 제출 핸들러
   */
  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // 새로 로드하지 않아도 되는 경우
      if (!loadFlag && problemIdx + 1 < problemList.length) {
        setProblemIdx((prev) => prev + 1);
        return;
      }
      // 숫자로 설정된 티어를 문자열로 변경(1 -> b5)
      const startTierStr = numToTierStr(startTier);
      const endTierStr = numToTierStr(endTier);
    //   getRecommend(bojId, startTierStr, endTierStr, isKo)
    //     .then((res) => {
    //       if (res.status === 200 && res.data) {
    //         const { data } = res;
    //         setProblemList(data);
    //         setProblemIdx(0);
    //         setLoadFlag(false);
    //       }
    //       // 데이터 제대로 못 받았을 경우 에러처리
    //     })
    //     .catch((e) => {});
    },
    [keyword, startTier, endTier, loadFlag, problemIdx, isKo, idError, problemList],
  );

  return (
    <div style={{
        marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)',
        marginRight: 'calc(-268.46154px + 28.36538vw + 24px)'
    }}>
      {/* 상단 제목 및 토글 버튼 */}
      <HStack style={{
        alignItems: 'center'
        }}>
        <Title>
          풀었던 문제의 번호를 알려주세요!<br />
        </Title>

        {/* <SwitchWrapper style={{marginLeft: 'auto'}}>
            <HStack>
                <div style={{marginRight: '12px'}}>한국어 문제만 추천 받기</div>

                <Switch
                    onChange={onClickKoButton}
                    checked={isKo}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    width={40}
                    height={20}
                    onColor="#C8001E"
                    offColor="#d2d2d2"
                    className="switch"
                />
            </HStack>
        </SwitchWrapper> */}
      </HStack>
      
      <Form onSubmit={onSubmitForm}>
        <VStack style={{marginTop: '32px'}}>
            {/* <HStack>
                <Label style={{marginRight: '8px'}}>
                    난이도
                </Label>

                <CommonTierImg
                width={18}
                height={18}
                src={`https://static.solved.ac/tier_small/${startTier + 1}.svg`}
                />
                &nbsp;~&nbsp;
                <CommonTierImg
                width={18}
                height={18}
                src={`https://static.solved.ac/tier_small/${endTier + 1}.svg`}
                />
            </HStack>
          
          <Slider
            range
            min={0}
            max={29}
            defaultValue={[0, 4]}
            allowCross={false}
            onChange={onChangeSlider}
            dotStyle={{
                visibility: 'hidden'
            }}
            marks={tierMarks}
            styles={{
                track: {
                    height: '24px',
                    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.10)',
                    background: '#90EB99',
                    borderRadius: '0px'
                },
                rail: {
                    height: '24px',
                    borderRadius: '10px',
                    background: '#EEE'
                },
                handle: {
                    width: '24px',
                    height: '24px'
                }
            }}
          /> */}

            <HStack>
                <TextFieldStyle
                        onChange={changeKeyword} 
                        value={keyword} 
                        placeholder={'ex) "2557"'} />
                <Link to={'/problemresult'} state={{problemID: parseInt(keyword)}}>
                  <SearchButton>검색하기</SearchButton>
                </Link>
            </HStack>
        </VStack>
      </Form>

      {/* 추천된 문제 정보 */}
    </div>
  );
}

export default Search;
