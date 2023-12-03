import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/User';
import { userLogin } from '../../api/User/User';
import { 
    onSilentRefresh,
    setRefreshTokenToCookie
} from '../../api/Auth/Auth';
import { useNavigate } from 'react-router-dom';
import VStack from '../../components/VStack';
import { 
    Title,
    TextFieldTitle,
    TextFieldStyle,
    LoginButton
 } from './style';

const JWT_EXPIRY_TIME = 60 * 1000;

function TextField(info: {
    title: string,
    text: string,
    isPassword: boolean
    onChange: (e: {
        target: {
            value: React.SetStateAction<string>;
        };
    }) => void
}): React.ReactElement {
    return (
        <VStack style={{marginBottom: '52px'}}>
            <TextFieldTitle style={{marginBottom: '28px'}}>
                {info.title}
            </TextFieldTitle>
            <TextFieldStyle
                onChange={info.onChange} 
                value={info.text}
                type={info.isPassword ? 'password' : ''} 
                placeholder={info.isPassword ? '' : '백준 ' + info.title} />
        </VStack>
    )
}

function Login(): React.ReactElement {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const changeId = useCallback((e: { target: { value: React.SetStateAction<string>; }; }) => {
    setId(e.target.value);
  }, []);
  const changePassword = useCallback((e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  }, []);

  const loginProc = useCallback(
    (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      if (!id || !id.trim()) {
        setLoginError(true);
        setErrorMsg('아이디를 입력해주세요.');
        return;
      }
      if (!password || !password.trim()) {
        setLoginError(true);
        setErrorMsg('비밀번호를 입력해주세요.');
        return;
      }
      setLoginError(false);
      const user = {
        bojHandle: id,
        password,
      };
      userLogin(user)
        .then((response) => {
          const { data } = response;
          const { accessToken, refreshToken } = data.jwt;
          axios.defaults.headers['Access_Token'] = accessToken
          axios.defaults.headers.common['Access_Token'] = accessToken;
          dispatch(
            setUser({ bojHandle: data.bojHandle, isAdmin: data.manager }),
          );
          // 리프레쉬 토큰 저장
          setRefreshTokenToCookie(refreshToken);
          // 액세스 토큰 만료 3초전에 재발급
          setTimeout(() => {
            onSilentRefresh(dispatch);
          }, JWT_EXPIRY_TIME - 3000);
          navigate('/home');
        })
        .catch((e) => {
          setLoginError(true);
          setErrorMsg('아이디 또는 비밀번호를 다시 확인해주세요.');
        });
    },
    [id, password],
  );

    return (
        <VStack style={{alignItems: 'center'}}>
          <Title style={{marginBottom: '76px'}}>
              Univps
          </Title>

          <form onSubmit={loginProc}>
            <TextField title='아이디' text={id} isPassword={false} onChange={changeId} />
            <TextField title='비밀번호' text={password} isPassword={true} onChange={changePassword} />
            <LoginButton style={{marginTop: '66px'}}>
                로그인
            </LoginButton>
          </form>
        </VStack>
    )
}

export default Login