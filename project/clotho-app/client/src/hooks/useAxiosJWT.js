import { axiosJWT } from "../api/axios";
import axios from "../api/axios";
import { useEffect } from "react";

const useAxiosJWT = () => {

    const token = sessionStorage.getItem('token');
    const refreshToken = sessionStorage.getItem('refreshToken');

    useEffect(() => {

        const requestIntercept = axiosJWT.interceptors.request.use(
            config => {
                if (!config.headers['authorization']) {
                    config.headers['authorization'] = `Bearer ${token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosJWT.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const response = await axios.get('/auth/refresh', 
                    {
                        headers:
                            { authorization: `Bearer ${refreshToken}`}
                    });

                  
                    prevRequest.headers['authorization'] = `Bearer ${response.data.token}`;
                    sessionStorage.setItem('token', response.data.token);
                    return axiosJWT(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosJWT.interceptors.request.eject(requestIntercept);
            axiosJWT.interceptors.response.eject(responseIntercept);
        }
    })

    return axiosJWT;
}

export default useAxiosJWT;