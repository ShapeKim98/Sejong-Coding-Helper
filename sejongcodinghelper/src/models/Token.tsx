export interface RefreshConfig {
    headers: {
        Refresh_Token: string,
        Access_Token: string
    }
}

export interface RefreshToken {
    headers: {
        Refresh_Token: string
    }
}
