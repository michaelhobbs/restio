import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { Alert, Rating } from '@material-ui/core';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { api, ReviewBase, usePostReviewMutation } from '../../../rtk-query/api';
import { useRules } from '../../../utils/forms';
import { RestaurantLocationProps } from '../../../utils/routes';

type RestaurantDetailParams = {
    id: string;
};
export const ReviewForm = (): JSX.Element => {
    const { t } = useTranslation();

    const { state: { restaurant: restaurantBase } = {} } =
        useLocation<RestaurantLocationProps>();

    const { id } = useParams<RestaurantDetailParams>();
    const history = useHistory();

    const [trigger, result] = api.useLazyGetRestaurantByIdQuery();

    if (!restaurantBase && result.isUninitialized) {
        trigger({
            restaurantId: Number(id),
        });
    }

    const [postReview, { isLoading, isError, isSuccess }] =
        usePostReviewMutation();

    const ratingLabels: { [index: string]: string } = {
        0: t('reviews.ratings.0'),
        1: t('reviews.ratings.1'),
        2: t('reviews.ratings.2'),
        3: t('reviews.ratings.3'),
        4: t('reviews.ratings.4'),
        5: t('reviews.ratings.5'),
    };
    const [ratingLabel, setRatingLabels] = useState(-1);

    const goBack = () => history.goBack();

    const rules = useRules();

    const { handleSubmit, control } = useForm<ReviewBase>({
        reValidateMode: 'onSubmit',
    });
    const onSubmit: SubmitHandler<ReviewBase> = (data) => {
        void postReview({
            restaurantId: Number(id),
            reviewBase: data,
        });
    };

    const restaurantName =
        restaurantBase?.name ?? result?.data?.restaurant.name;

    return (
        <>
            <Box mb={2} display="flex" alignItems="flex-start">
                <IconButton
                    aria-label={t('common.back')}
                    onClick={goBack}
                    size="large"
                >
                    <ArrowBackIos />
                </IconButton>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        {result?.isLoading ? (
                            <CircularProgress size={20} />
                        ) : (
                            restaurantName
                        )}
                    </Typography>
                </Box>
            </Box>
            <Box mt={1} width={1}>
                <Paper>
                    <Box p={1}>
                        {isSuccess && (
                            <Box px={2}>
                                <Alert severity="success">
                                    {t('reviews.create.success')}
                                </Alert>
                            </Box>
                        )}
                        {!isSuccess && (
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <Box p={2} width={1}>
                                    <Typography component="legend">
                                        {t('reviews.create.rating.label')} *
                                    </Typography>

                                    <Box display="flex" alignItems="center">
                                        <Controller
                                            name="rating"
                                            control={control}
                                            defaultValue={0}
                                            rules={{
                                                required: rules.required,
                                                ...rules.min(0),
                                                ...rules.max(5),
                                            }}
                                            render={({
                                                field,
                                                fieldState: { error },
                                            }) => (
                                                <>
                                                    <Rating
                                                        {...field}
                                                        name="rating"
                                                        size="large"
                                                        onChange={(
                                                            _,
                                                            newValue
                                                        ) =>
                                                            field.onChange(
                                                                newValue ?? 0
                                                            )
                                                        }
                                                        onChangeActive={(
                                                            _,
                                                            newHover
                                                        ) => {
                                                            setRatingLabels(
                                                                newHover
                                                            );
                                                        }}
                                                        disabled={isLoading}
                                                    />
                                                    {field.value !== null && (
                                                        <Box ml={2}>
                                                            {
                                                                ratingLabels[
                                                                    ratingLabel !==
                                                                    -1
                                                                        ? ratingLabel
                                                                        : field.value
                                                                ]
                                                            }
                                                        </Box>
                                                    )}
                                                    {error && (
                                                        <Box m={2}>
                                                            <Alert severity="error">
                                                                {error.message}
                                                            </Alert>
                                                        </Box>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </Box>
                                </Box>
                                <Box p={2}>
                                    <Controller
                                        name="comment"
                                        control={control}
                                        defaultValue={''}
                                        rules={{
                                            required: rules.required,
                                            ...rules.minLength(1),
                                            ...rules.maxLength(1000),
                                        }}
                                        render={({
                                            field,
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                multiline
                                                maxRows={20}
                                                minRows={10}
                                                variant="outlined"
                                                onChange={field.onChange}
                                                label={t(
                                                    'reviews.create.review.label'
                                                )}
                                                placeholder={t(
                                                    'reviews.create.review.placeHolder'
                                                )}
                                                disabled={isLoading}
                                                error={!!error}
                                                helperText={error?.message}
                                                margin="normal"
                                            />
                                        )}
                                    />
                                </Box>
                                {isError && (
                                    <Box px={2}>
                                        <Alert severity="error">
                                            {t('error.default')}
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
                                            <CircularProgress color="inherit" />
                                        ) : (
                                            t('reviews.create.review.button')
                                        )}
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default ReviewForm;
