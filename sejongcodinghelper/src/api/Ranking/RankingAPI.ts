import axios from "axios";
import { useEffect } from "react";
import UserProfile from "../../models/UserProfile";
import { error } from "console";

export const GetRankMostSolved = (params: number, handleUserProfile: (data: {
    content: UserProfile[] | null,
    totalPages: number
}) => void) => {
    useEffect(() => {
        axios.get<{
            content: UserProfile[] | null,
            totalPages: number
        }>(`api/v1/stat/user/rank/sejong?page=${params}&size=${50}`)
        .then(result => {
            if (result.status == 200) {
                handleUserProfile(result.data)
            }
        })
        .catch(error => {
            console.error(error);
        })
    }, [params])
}