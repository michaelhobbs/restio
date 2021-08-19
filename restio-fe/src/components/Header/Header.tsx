import {
    AppBar,
    Container,
    createStyles,
    IconButton,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import Logout from '../Auth/Logout';
import { Restaurant as RestaurantIcon } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

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

function Header() {
    const { t } = useTranslation();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <IconButton
                            aria-label={t('common.goHome')}
                            color="inherit"
                            component={RouterLink}
                            to="/"
                            className={classes.menuButton}
                        >
                            <RestaurantIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {t('app.name')}
                        </Typography>
                        <LanguageSelector />
                        <Logout />
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default Header;
