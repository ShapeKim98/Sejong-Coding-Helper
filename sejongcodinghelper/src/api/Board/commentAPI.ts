import axios from 'axios';
import { IComment } from '../../models/Board';

const PREFIX_URL = '/api/v1/comment';

/**
 * 댓글을 작성한다.
 * comment: boardId, bojHandle, parentCommentId(대댓글인 경우), content
 */
export function createComment(
  comment: Pick<
    IComment,
    'boardId' | 'bojHandle' | 'content' | 'parentCommentId'
  >
) {
  return axios.post(`${PREFIX_URL}/publish`, comment);
}

/**
 * 댓글을 수정한다.
 * comment: commentId, boardId, bojHandle, parentCommentId(대댓글인 경우), content
 */
export function updateComment(comment: IComment) {
  return axios.put(`${PREFIX_URL}/update`, comment);
}

/**
 * 댓글을 삭제한다.
 * params: commentId
 */
export function deleteComment(commentId: string) {
  return axios.delete(`${PREFIX_URL}/del?commentId=${commentId}`);
}

/**
 * 특정 글의 댓글을 조회한다.
 * params : boardId
 */
export function getComment(boardId: string) {
  return axios.get(`${PREFIX_URL}/all?boardId=${boardId}`);
}
