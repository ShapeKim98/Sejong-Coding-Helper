import React, { useCallback, useEffect, useState } from 'react';
import {
  getAuthCode,
  validAuthCode,
  validJoin,
  join,
} from '../../api/Register/RegisterAPI';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { useNavigate } from 'react-router-dom';
import { FaRegCopy } from 'react-icons/fa6';
import {
  Container,
  Title,
  JoinFormDiv,
  InputItem,
  ErrorMsg,
  SuccessMsg,
  AuthInputWrapper,
  AuthCodeDiv,
  InfoMsg,
  JoinButton,
  AuthButton,
} from './style';

/**
 * 회원가입
 */
function Join() {
  const navigate = useNavigate();
  const [bojHandle, setBojHandle] = useState(''); // 백준 아이디
  const [password, setPassword] = useState(''); // 비밀번호
  const [passwordRe, setPasswordRe] = useState(''); // 비밀번호 재입력
  const [authCode, setAuthCode] = useState(''); // 인증 코드
  const [sendAuthCode, setSendAuthCode] = useState(false); // 인증 코드 보냈는지 여부
  const [doneAuth, setDoneAuth] = useState(false); // 인증 완료 여부
  const [idError, setIdError] = useState({ error: false, message: '' }); // 아이디 에러 메시지
  const [pwError, setPwError] = useState({ error: false, message: '' }); // 비밀번호 에러 메시지
  const [authError, setAuthError] = useState({
    error: false,
    message: '',
  }); // 인증 에러 메시지
  const [leftTimes, setLeftTimes] = useState(180); // 인증 남은시간 초
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout | null>(null);

  // 타이머를 생성한다.
  const setTimer = useCallback(() => {
    if (timeInterval) {
      setLeftTimes(180);
      clearInterval(timeInterval);
    }
    setTimeInterval(
      setInterval(() => {
        console.log('aff');
        setLeftTimes((prev) => {
          if (prev <= 1) {
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000)
    );
  }, [timeInterval]);

  // interval을 중지한다. 타이머가 0이되거나 인증 완료되면 중지
  useEffect(() => {
    if (timeInterval && (leftTimes === 0 || doneAuth))
      clearInterval(timeInterval);
  }, [leftTimes, doneAuth, timeInterval]);

  // 인증 코드 발급받기
  const getJoinAuthCode = useCallback(() => {
    getAuthCode(bojHandle).then((res) => {
      const { data } = res;
      setAuthCode(data);
      setSendAuthCode(true);
      setTimer();
      setAuthError({
        message: '',
        error: false,
      });
    });
  }, [bojHandle, setTimer]);

  // 가입 가능한 아이디인지 확인
  const validBojHandle = useCallback(() => {
    if (doneAuth) return;
    if (!bojHandle.trim()) {
      setIdError({
        error: true,
        message: '아이디를 입력해주세요.',
      });
      return;
    }
    setBojHandle(bojHandle.trim());
    validJoin(bojHandle.trim())
      .then((res) => {
        const { data } = res;
        if (data.message === '회원가입 가능한 유저입니다.') {
          setIdError({ error: false, message: '' });
          getJoinAuthCode();
        } else {
          setIdError({ error: true, message: data.message });
        }
      })
      .catch(() => {
        setIdError({
          error: true,
          message: '없는 아이디거나 회원가입이 불가능한 아이디입니다.',
        });
      });
  }, [bojHandle, doneAuth, getJoinAuthCode]);

  // 인증 되었는지 확인
  const validCheck = useCallback(() => {
    validAuthCode(bojHandle)
      .then((res) => {
        const { data } = res;
        if (data.message === '검증에 성공했습니다.') {
          setAuthError({
            message: '',
            error: false,
          });
          setDoneAuth(true);
        } else {
          setAuthError({
            message: '인증에 실패하였습니다.',
            error: true,
          });
          setDoneAuth(false);
        }
      })
      .catch((e) => {
        setAuthError({
          message: '인증에 실패하였습니다.',
          error: true,
        });
      });
  }, [bojHandle]);

  // 비밀번호 유효성 검사
  const passwordRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{9,20}$/g;
  useDidMountEffect(() => {
    // 비밀번호
    let isError = false;
    let message = '';
    if (!password.trim()) {
      isError = true;
      message = '비밀번호를 입력해주세요.';
    } else if (!passwordRegExp.test(password)) {
      isError = true;
      message = '비밀번호 형식에 맞지 않습니다.';
    } else if (!passwordRe.trim()) {
      isError = true;
      message = '비밀번호를 다시 입력해주세요.';
    } else if (password !== passwordRe) {
      isError = true;
      message = '비밀번호가 일치하지 않습니다.';
    }
    setPwError({ error: isError, message });
  }, [password, passwordRe]);

  // 회원가입
  const joinProc = () => {
    const valid =
      !idError.error &&
      sendAuthCode &&
      !authError.error &&
      doneAuth &&
      !pwError.error;
    if (!valid) return;
    const userInfo = {
      bojHandle,
      password,
    };
    join(userInfo)
      .then(() => {
        window.alert('회원가입이 완료되었습니다. 로그인해주세요.');
        navigate('/login');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 인증 번호 클릭 시 복사
  const copyClipBoard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('인증코드가 복사되었습니다.');
    } catch {}
  }, []);

  return (
    <Container>
      <Title>회원가입</Title>
      <JoinFormDiv>
        <InputItem>
          <label>백준 아이디</label>
          <AuthInputWrapper>
            <input
              value={bojHandle}
              onChange={(e) => {
                setBojHandle(e.target.value);
              }}
              placeholder="백준 아이디 입력"
              disabled={sendAuthCode}
            />
            <button onClick={validBojHandle} disabled={doneAuth}>
              {doneAuth ? '인증 완료' : sendAuthCode ? '재발급' : '인증'}
            </button>
          </AuthInputWrapper>
          {idError.error && <ErrorMsg>{idError.message}</ErrorMsg>}
        </InputItem>
        {sendAuthCode && !doneAuth && (
          <>
            <InfoMsg>
              백준 상태메시지를 다음 인증 코드로 변경한 후
              <br />
              '인증하기' 버튼을 클릭해주세요.
              <span>
                {'  '}(
                {Math.floor(leftTimes / 60)
                  .toString()
                  .padStart(2, '0')}
                :{(leftTimes % 60).toString().padStart(2, '0')})
              </span>
            </InfoMsg>
            <AuthCodeDiv
              onClick={() => {
                copyClipBoard(authCode);
              }}
            >
              {authCode}
              <FaRegCopy />
            </AuthCodeDiv>
            {authError.error && <ErrorMsg>{authError.message}</ErrorMsg>}
            <AuthButton onClick={validCheck}>인증하기</AuthButton>
          </>
        )}
        {doneAuth && <SuccessMsg>인증이 완료되었습니다.</SuccessMsg>}
        <InputItem>
          <label>비밀번호</label>
          <InfoMsg>
            <span>
              영문자와 특수문자, 숫자를 포함해서 9-20자로 설정해주세요.
            </span>
          </InfoMsg>
          <input
            type="password"
            value={password}
            placeholder="비밀번호 입력"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            value={passwordRe}
            placeholder="비밀번호 재입력"
            onChange={(e) => {
              setPasswordRe(e.target.value);
            }}
          />
          {pwError.error && <ErrorMsg>{pwError.message}</ErrorMsg>}
        </InputItem>
        <JoinButton onClick={joinProc}>가입하기</JoinButton>
      </JoinFormDiv>
    </Container>
  );
}

export default Join;
