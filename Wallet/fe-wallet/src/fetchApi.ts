import axios from 'axios'
import merge from 'lodash/merge'

import { useMemo } from 'react'

const mandatory = () => Promise.reject(new Error('Fetch API Missing parameter!'))
const API_URL = process.env.NEXT_PUBLIC_API
export const useCancelToken = () => {
    const token = useMemo(() => {
        return axios.CancelToken.source()
    }, [])

    return token
}
const fetchApi = async ({ url, options, params, cancelToken, timeout, baseURL, token }: any = mandatory(), cb: any = (f: any) => f) => {
    try {
        const defaultOptions = {
            method: 'GET',
            baseURL: baseURL ?? API_URL,
            url,
            // withCredentials: true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                Authorization: '',
            },
            cancelToken,
            timeout,
        }
        if (token) {
            defaultOptions.headers['Authorization'] = `Bearer ${token}`
        }

        const opts = merge(defaultOptions, options)
        if (opts && (opts.method === 'GET' || opts.method === 'PUT')) {
            opts.params = params
        } else {
            opts.data = params
        }

        if (process.env.NODE_ENV !== 'production') {
            // console.log('Call API: url, options, params', opts, options);
        }

        const { data }: any = await axios(opts)
        cb(null, data)
        return data
    } catch (err: any) {
        if (process.env.NODE_ENV !== 'production') {
            // console.error('Call API Error: ', err, err?.response?.data);
        }
        if (err?.response?.data) {
            return err?.response?.data
        }
        cb(err)
        return Promise.reject(err)
    }
}

export default fetchApi
