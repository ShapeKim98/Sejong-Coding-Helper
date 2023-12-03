import Cookies from 'universal-cookie';
import axios, { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { refreshToken, parseBoj } from '../User/User';
import { logout, setUser } from '../../redux/User';
import { RefreshToken } from '../../models/Token';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

const JWT_EXPIRY_TIME = 60 * 1000; // 만료 시간: 1분
const cookies = new Cookies();

export function setRefreshTokenToCookie(refreshToken: Promise<AxiosResponse<any, any>>) {
  cookies.set('refresh_token', refreshToken, { sameSite: 'strict' });
}

export function getRefreshTokenToCookie() {
  return cookies.get('refresh_token');
}

export function getHeaderRefreshTokenConfing(): RefreshToken | null {
  const token = getRefreshTokenToCookie();
  if (isEmpty(token)) return null;
  return {
    headers: {
      Refresh_Token: `${token}`,
    },
  };
}

export function getUserBojHandle(dispatch: Dispatch<AnyAction>) {
  const refreshConfig = getHeaderRefreshTokenConfing();
  refreshConfig && parseBoj(refreshConfig)
    .then((response) => {
      const data: { claim: string, manager: boolean } = response.data;
      dispatch(setUser({ bojHandle: data.claim, isAdmin: data.manager }));
    })
    .catch((e) => {
      logoutProc(dispatch);
    });
}

export function onSilentRefresh(dispatch: Dispatch<AnyAction>) {
  const token = getRefreshTokenToCookie();
  if (isEmpty(token)) return null;
  const refreshConfig = {
    headers: {
      Refresh_Token: `${token}`,
      Access_Token: '',
    },
  };
  refreshToken(refreshConfig)
    .then((response) => {
      const { data } = response;
      const { accessToken } = data;
      // 재발급 실패 시 로그아웃 처리
      if (isEmpty(accessToken)) {
        logoutProc(dispatch);
        return;
      }
      axios.defaults.headers.common['Access_Token'] = accessToken;
      console.log(accessToken)
      // 재발급 성공 시 refresh_token으로 사용자 정보를 다시 가져온다.
      getUserBojHandle(dispatch);
      setTimeout(() => {
        onSilentRefresh(dispatch);
      }, JWT_EXPIRY_TIME - 3000);
    })
    .catch((e) => {
      logoutProc(dispatch);
    });
}

/**
 * 로그아웃 한다.
 * 1. 쿠키에 설정된 리프레시 토큰 삭제
 * 2. redux에 저장된 사용자 정보 삭제
 * 3. axios 헤더에 설정해둔 access 토큰 삭제
 */
export function logoutProc(dispatch: Dispatch<AnyAction> | null) {
  cookies.remove('refresh_token');
  if (dispatch) dispatch(logout());
  axios.defaults.headers.common['Access_Token'] = '.';
  window.location.href = '/login';
}