import axios from 'axios';
import { 
    RefreshConfig, 
    RefreshToken 
} from '../../models/Token';
import Login from '../../models/Login';

const PREFIX_URL = 'http://127.0.0.1:8080/api/v1/user';

/**
 * 모든 유저 정보를 조회한다.
 */
export function getAllUsers() {
  return axios.get(`${PREFIX_URL}/info/all`);
}

/**
 * bojHandle에 해당하는 사용자 정보를 조회한다.
 * @param {string} bojHandle 백준아이디
 */
export function getUserInfo(params: {bojHandle: string}) {
  return axios.get(`${PREFIX_URL}/info?bojHandle=${params.bojHandle}`);
}

/**
 * bojHandle에 해당하는 사용자가 오늘 푼 문제 정보를 조회한다.
 * @param {string} bojHandle 백준아이디
 */
export function getUserTodaySolvedProblems(params: {bojHandle: string}) {
  return axios.get(
    `${PREFIX_URL}/info/today-solved?bojHandle=${params.bojHandle}`,
  );
}

/**
 *
 * bojHandle에 해당하는 사용자가 오늘의 랜덤 문제 정보를 조회한다.
 * @param {string} bojHandle 백준아이디
 */
export function getUserTodayRandomProblem(params: {bojHandle: string}) {
  return axios.get(`${PREFIX_URL}/streak/streak?bojHandle=${params.bojHandle}`);
}

/**
 * bojHandle에 해당하는 사용자의 랜덤 문제 난이도 정보를 설정한다.
 * @param params { bojHandle, start, end, isKo }
 */
export function putUserRandomLevel(params: {
    bojHandle: string,
    start: string,
    end: number,
    isKo: boolean
}) {
  return axios.put(
    `${PREFIX_URL}/streak/streak/level?bojHandle=${params.bojHandle}&start=${params.start}&end=${params.end}&isKo=${params.isKo}`,
  );
}

/**
 *
 * bojHandle에 해당하는 사용자의 랜덤 스트릭 정보를 조회한다. (잔디 조회)
 * @param {string} bojHandle 백준아이디
 */
export function getUserRandomStreakGrass(params: {bojHandle: string}) {
  return axios.get(`${PREFIX_URL}/streak/grass?bojHandle=${params.bojHandle}`);
}

/**
 * 로그인한다.
 * @param params { bojHandle, password }
 */
export function userLogin(params: Login) {
  return axios.post(`${PREFIX_URL}/auth/login`, params);
}

/**
 * refresh token으로 access token을 재발급 한다.
 * 헤더로 refresh token을 전달한다.
 */
export function refreshToken(config: RefreshConfig) {
  return axios.get(`${PREFIX_URL}/auth/refresh`, config);
}

/**
 * 리프레시 토큰을 헤더에 전달하여 bojHandle을 가져온다.
 */
export function parseBoj(config: RefreshToken) {
  return axios.get(`${PREFIX_URL}/auth/parse/boj`, config);
}

/**
 * 로그아웃한다.
 * 헤더에 리프레쉬 토큰 전달
 * @param params { bojHandle }
 */
export function userLogout(params: {bojHandle: string}, config: any) {
  return axios.post(`${PREFIX_URL}/auth/logout`, params, config);
}

/**
 * 비밀번호를 변경한다.
 * @param params { bojHandle, oldPassword, newPassword }
 */
export function changePassword(params: {
    bojHandle: string,
    oldPassword: string,
    newPassword: string
}, config: any) {
  return axios.post(`${PREFIX_URL}/auth/pwchange`, params, config);
}

/**
 * 새 유저를 추가
 * @param params { bojHandle, notionId, isManager, emoji, password }
 */
export function postNewUser(params : {
    bojHandle: string,
    notionId: string,
    isManager: boolean,
    emoji: string,
    password: string
}) {
  return axios.post(
    `${PREFIX_URL}/add?bojHandle=${params.bojHandle}&notionId=${params.notionId}&manager=${params.isManager}&emoji=${params.emoji}&password=${params.password}`,
  );
}

/**
 * params.bojHandle에 해당하는 유저 삭제
 * @param params { bojHandle }
 */
export function delUser(params: {bojHandle: string}) {
  return axios.delete(`${PREFIX_URL}/del?bojHandle=${params.bojHandle}`);
}

/**
 * 특정 유저의 랜덤 문제 다시 뽑기를 구매한다.
 * params: bojHandle
 */
export function rerollRandomProblem(params: {bojHandle: string}) {
  return axios.post(
    `${PREFIX_URL}/streak/reroll?bojHandle=${params.bojHandle}`,
  );
}

/**
 * 특정 유저들의 notionId 목록을 조회한다.
 */
export function getAllUsersNotionIds() {
  return axios.get(`${PREFIX_URL}/mention/list`);
}
