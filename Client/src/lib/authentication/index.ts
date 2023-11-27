'use server';

import type { Response as ResponseType } from "@/types/response/types";
import axios, { AxiosError } from "axios";
import { cookies } from 'next/headers';


async function login(email: string, password: string): Promise<ResponseType> {
  return axios.post("http://localhost:5058/api/v1/auth/login", { email, password })
    .then(response => {
      
        if (response.data.accessToken) {
            cookies().set('access', response.data.accessToken, { path: '/' });
            cookies().set('refresh', response.data.refreshToken, { path: '/' });
        }
        return {
            data: response.data,
            errors: {},
            message: response.statusText,
            status: response.status,
            success: response.status === 200
        }
    })
    .catch((error: any) => {
      const data = error.response?.data
      return {
        errors: error.response.errors,
        message: error.response.statusText,
        status: error.response.status,
        success: false,
        data: {}
    }
  });
}

export { login }