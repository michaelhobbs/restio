import { Box, Container } from '@material-ui/core';
import { lazy } from 'react';
import { useAuth } from '../store/hooks';
import { UserRoles } from '../types/types';
import AppSuspense from './AppSuspense';
import { NoMatch } from './NoMatch';

function Home(): JSX.Element {
    const { user: { role } = {} } = useAuth();
    const UserHome = lazy(() => import('./UserHome'));
    const OwnerHome = lazy(() => import('./OwnerHome'));
    const AdminHome = lazy(() => import('./AdminHome'));
    return (
        <Container maxWidth="lg">
            <Box my={4}>
                {role === UserRoles.User && (
                    <AppSuspense>
                        <UserHome />
                    </AppSuspense>
                )}
                {role === UserRoles.Owner && (
                    <AppSuspense>
                        <OwnerHome />
                    </AppSuspense>
                )}
                {role === UserRoles.Admin && (
                    <AppSuspense>
                        <AdminHome />
                    </AppSuspense>
                )}
                {!role && <NoMatch />}
            </Box>
        </Container>
    );
}

export default Home;
