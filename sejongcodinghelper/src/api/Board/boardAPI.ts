import axios from 'axios';
import { IPost } from '../../models/Board';

const PREFIX_URL = '/api/v1/board';

/**
 * 모든 게시글 목록을 조회한다.
 * params : page, size
 */
export function getAllPosts({ page, size }: { page: number; size: number }) {
  return axios.get(`${PREFIX_URL}/all?page=${page}&size=${size}`);
}

/**
 * 타입 별로 게시글을 조회한다.
 * params: type, page, size
 */
export function getPostsByType({
  type,
  page,
  size,
}: {
  type: string;
  page: number;
  size: number;
}) {
  return axios.get(
    `${PREFIX_URL}/all/type?type=${type}&page=${page}&size=${size}`
  );
}

/**
 * 게시글을 작성한다.
 * post: type, bojHandle, title, content, imageUUIDs(공백없이 ,로 분리)
 */
export function createPost(
  post: Omit<IPost, 'id' | 'commentCount' | 'createdDate'>
) {
  return axios.post(`${PREFIX_URL}/publish`, post);
}

/**
 * 게시글을 수정한다.
 * post: type, bojHandle, title, content, imageUUIDs(공백없이 ,로 분리)
 */
export function updatePost(
  post: Omit<IPost, 'commentCount' | 'createdDate' | 'id'>
) {
  return axios.put(`${PREFIX_URL}/publish`, post);
}

/**
 * 게시글을 삭제한다.
 * params: boardId
 */
export function deletePost(boardId: string) {
  return axios.delete(`${PREFIX_URL}/delete?boardId=${boardId}`);
}

/**
 * 특정 글의 정보를 조회한다.
 * params : boardId
 */
export function getPost(boardId: string) {
  return axios.get(`${PREFIX_URL}/detail?boardId=${boardId}`);
}

/**
 * 사용자가 작성한 게시글 목록을 조회한다.
 * params : page, size, bojHandle
 */
export function getPostsByUser({
  bojHandle,
  page,
  size,
}: {
  bojHandle: string;
  page: number;
  size: number;
}) {
  return axios.get(
    `${PREFIX_URL}/all/user?page=${page}&size=${size}&bojHandle=${bojHandle}`
  );
}
