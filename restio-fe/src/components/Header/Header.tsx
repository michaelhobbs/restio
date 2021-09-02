import {
    AppBar,
    Container,
    IconButton,
    Theme,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { Restaurant as RestaurantIcon } from '@material-ui/icons';
import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import Logout from '../Auth/Logout';
import { ColorModeToggle } from './ColorModeToggle';
import LanguageSelector from './LanguageSelector';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

function Header(): JSX.Element {
    const { t } = useTranslation();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <IconButton
                            aria-label={t('common.goHome')}
                            color="inherit"
                            component={RouterLink}
                            to="/"
                            className={classes.menuButton}
                            size="large"
                        >
                            <RestaurantIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {t('app.name')}
                        </Typography>
                        <ColorModeToggle />
                        <LanguageSelector />
                        <Logout />
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default Header;
