import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Problem from '../../models/Problem';

export const GetProblemFindID = (
  params: number,
  handleProblem: (data: Problem | null) => void
) => {
  useEffect(() => {
    axios
      .get<Problem | null>('/api/v1/problem/find?problemId=' + params)
      .then((result) => {
        if (result.status == 200) {
          handleProblem(result.data);
        } else {
          handleProblem(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);
};

export const GetProblemFindBojHandleID = (
  params: {
    bojHandle: string;
    problemID: number;
  },
  handleProblem: (data: Problem | null) => void
) => {
  useEffect(() => {
    axios
      .get<Problem | null>(
        `/api/v1/problem/user/find?bojHandle=${params.bojHandle}&problemId=${params.problemID}`
      )
      .then((result) => {
        if (result.status == 200) {
          handleProblem(result.data);
        } else {
          handleProblem(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);
};

/**
 * 문제 정보를 가져온다.
 * params : problemId
 */
export function getProblemInfo(problemId: string) {
  return axios.get(`/api/v1/problem/find?problemId=${problemId}`);
}
