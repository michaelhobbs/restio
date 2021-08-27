import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { User } from './../rtk-query/api';
import { selectCurrentUser } from './auth.slice';
import type { AppDispatch, RootState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = (): { user?: User } => {
    const user = useSelector(selectCurrentUser);

    return useMemo(() => ({ user }), [user]);
};
