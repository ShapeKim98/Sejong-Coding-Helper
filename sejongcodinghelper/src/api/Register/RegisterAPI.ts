import axios from 'axios';

const PREFIX_URL = '/api/v1/user/sejong/register';

/**
 * 유저의 가입 가능 여부를 판단한다.
 */
export function validJoin(bojHandle: string) {
  return axios.get(`${PREFIX_URL}/valid/user?bojHandle=${bojHandle}`);
}

/**
 * 회원가입 인증 코드를 생성한다.
 */
export function getAuthCode(bojHandle: string) {
  return axios.post(`${PREFIX_URL}/valid/code?bojHandle=${bojHandle}`);
}

/**
 * 회원가입 인증 코드를 검증한다.
 */
export function validAuthCode(bojHandle: string) {
  return axios.get(`${PREFIX_URL}/valid/code?bojHandle=${bojHandle}`);
}

/**
 * 회원가입을 요청한다
 */
export function join(userInfo: { bojHandle: string; password: String }) {
  return axios.post(`${PREFIX_URL}/user`, userInfo);
}
