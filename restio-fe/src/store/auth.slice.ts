import { createSlice } from '@reduxjs/toolkit';
import { api, User, UserAuth } from '../rtk-query/api';
import type { RootState } from './store';

const initialState: Partial<UserAuth> = {};

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.user;
            }
        );
        builder.addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
            state.token = undefined;
            state.user = undefined;
        });
        builder.addMatcher(
            api.endpoints.signUp.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.user;
            }
        );
    },
});

export default slice.reducer;

export const selectCurrentUser = (state: RootState): User | undefined =>
    state.auth.user;
