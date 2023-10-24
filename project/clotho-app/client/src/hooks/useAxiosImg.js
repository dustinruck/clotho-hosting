import { axiosImg } from "../api/axios";
import axios from "../api/axios";
import { useEffect } from "react";

const useAxiosImg = () => {

    const token = sessionStorage.getItem('token');
    const refreshToken = sessionStorage.getItem('refreshToken');

    useEffect(() => {

        const requestIntercept = axiosImg.interceptors.request.use(
            config => {
                if (!config.headers['authorization']) {
                    config.headers['authorization'] = `Bearer ${token}`;
                }
                return config;
            }, error => {
                console.error('Request error:', error);
                return Promise.reject(error);
              }
            );

        const responseIntercept = axiosImg.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                try {
                    const response = await axios.get('/auth/refresh', 
                    {
                        headers:
                            { authorization: `Bearer ${refreshToken}`}
                    });

                  
                    prevRequest.headers['authorization'] = `Bearer ${response.data.token}`;
                    sessionStorage.setItem('token', response.data.token);
                    return axiosImg(prevRequest);
                }
                catch (err) {
                    console.error('Could not refresh token:', err);
                    // Invalidate tokens
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('refreshToken');
                return Promise.reject(error);
            }}}
        );

        return () => {
            axiosImg.interceptors.request.eject(requestIntercept);
            axiosImg.interceptors.response.eject(responseIntercept);
        }
    })

    return axiosImg;
}

export default useAxiosImg;