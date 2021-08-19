import { Box, CircularProgress } from '@material-ui/core';
import { Suspense, FC } from 'react';

export const AppSuspense: FC = ({ children }) => {
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
