import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { RootState } from '../store/store';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        } else {
            headers.delete('authorization');
        }

        return headers;
    },
});
export default baseQuery;
