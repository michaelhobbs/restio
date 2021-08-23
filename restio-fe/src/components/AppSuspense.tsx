import { Box, CircularProgress } from '@material-ui/core';
import { ReactNode, Suspense } from 'react';

export const AppSuspense = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    return (
        <Suspense
            fallback={
                <Box
                    position="absolute"
                    width={1}
                    height={1}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                >
                    <CircularProgress />
                </Box>
            }
        >
            {children}
        </Suspense>
    );
};
export default AppSuspense;
