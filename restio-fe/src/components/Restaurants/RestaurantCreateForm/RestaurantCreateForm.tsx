import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Paper,
    Typography,
} from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
    RestaurantNew,
    usePostRestaurantMutation,
} from '../../../rtk-query/api.generated';
import { ROUTES } from '../../../utils/routes';
import { RestaurantName } from '../../Inputs/Restaurants';

function RestaurantCreateForm() {
    const { t } = useTranslation();
    const [addAnother, setAddAnother] = useState(false);

    const [postRestaurant, { isLoading, isError, isSuccess }] =
        usePostRestaurantMutation();

    const methods = useForm<RestaurantNew>({
        reValidateMode: 'onSubmit',
        defaultValues: {
            name: '',
        },
    });
    const { handleSubmit, reset } = methods;
    const onSubmit: SubmitHandler<RestaurantNew> = (data) => {
        postRestaurant({
            restaurantNew: data,
        })
            .unwrap()
            .then(() => reset({ name: '' }));
        setAddAnother(false);
    };
    return (
        <>
            <Box mb={2} display="flex" alignItems="flex-start">
                <IconButton
                    aria-label={t('common.back')}
                    component={RouterLink}
                    to={ROUTES.home}
                >
                    <ArrowBackIos />
                </IconButton>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        {t('restaurants.create.title')}
                    </Typography>
                </Box>
            </Box>
            <Box mt={1} width={1}>
                <Paper>
                    <Box p={1}>
                        {isSuccess && (
                            <>
                                {!addAnother && (
                                    <>
                                        <Box px={2}>
                                            <Alert severity="success">
                                                {t(
                                                    'restaurants.create.success'
                                                )}
                                            </Alert>
                                        </Box>
                                        <Box p={2}>
                                            <Button
                                                onClick={() => {
                                                    setAddAnother(!addAnother);
                                                }}
                                            >
                                                {t(
                                                    'restaurants.create.addAnother'
                                                )}
                                            </Button>
                                        </Box>
                                    </>
                                )}
                            </>
                        )}
                        {(!isSuccess || addAnother) && (
                            <FormProvider<RestaurantNew> {...methods}>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    noValidate
                                >
                                    <Box p={2}>
                                        <RestaurantName disabled={isLoading} />
                                    </Box>
                                    {isError && (
                                        <Box px={2}>
                                            <Alert severity="error">
                                                {t('error.savingFailed')}
                                            </Alert>
                                        </Box>
                                    )}
                                    <Box p={2} textAlign="end">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={isLoading}
                                            type="submit"
                                        >
                                            {isLoading ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size={20}
                                                />
                                            ) : (
                                                t('restaurants.create.button')
                                            )}
                                        </Button>
                                    </Box>
                                </form>
                            </FormProvider>
                        )}
                    </Box>
                </Paper>
            </Box>
        </>
    );
}

export default RestaurantCreateForm;
