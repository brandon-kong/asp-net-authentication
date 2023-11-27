// Authenticated Requests

import { getSession } from "next-auth/react";
import axios from "axios";

async function getAuthenticatedAxiosInstance() {
    const session = await getSession()
    if (!session) {
        return null;
    }

    const accessToken = session?.accessToken

    if (!accessToken) {
        return null;
    }

    return axios.create({
        baseURL: "http://localhost:5058/api/v1",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
}

export { getAuthenticatedAxiosInstance };