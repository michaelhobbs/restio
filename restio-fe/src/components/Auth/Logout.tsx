import { IconButton, Tooltip } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { api } from '../../rtk-query/api';
import { useAppDispatch, useAuth } from '../../store/hooks';
import { ROUTES } from '../../utils/routes';

function Logout(): JSX.Element {
    const { t } = useTranslation();
    const [trigger] = api.useLazyLogoutQuery();
    const { user } = useAuth();
    const appDispatch = useAppDispatch();
    const history = useHistory();

    const tooltip = t('user.logout');
    return (
        <>
            {user && (
                <Tooltip title={tooltip}>
                    <IconButton
                        color="inherit"
                        aria-label={t('user.logout')}
                        onClick={() => {
                            trigger({});
                            appDispatch(api.util.resetApiState()); // clear api cache
                            history.push(ROUTES.login);
                        }}
                        size="large"
                    >
                        <ExitToApp />
                    </IconButton>
                </Tooltip>
            )}
        </>
    );
}

export default Logout;
