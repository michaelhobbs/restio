import {
    Box,
    Divider,
    Grid,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Review } from '../../rtk-query/api.generated';
import RestaurantReview from './RestaurantReview';

type ReviewHighlightProps = { title: string; review?: Review };

const useStyles = makeStyles(() => ({
    paper: {
        height: '100%',
    },
}));

const ReviewHighlight = ({ title, review }: ReviewHighlightProps) => {
    const classes = useStyles();
    return (
        <>
            {review && (
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <Box p={2}>
                            <Typography variant="h6" gutterBottom>
                                {title}
                            </Typography>
                            <Divider />

                            <RestaurantReview review={review} />
                        </Box>
                    </Paper>
                </Grid>
            )}
        </>
    );
};

type ReviewHighlightsProps = {
    highestReview?: Review;
    lowestReview?: Review;
};

export const ReviewHighlights = ({
    highestReview,
    lowestReview,
}: ReviewHighlightsProps) => {
    const { t } = useTranslation();
    return (
        <>
            {(highestReview || lowestReview) && (
                <Grid container spacing={3} alignItems="stretch">
                    <ReviewHighlight
                        review={highestReview}
                        title={t('reviews.highest')}
                    />
                    <ReviewHighlight
                        review={lowestReview}
                        title={t('reviews.lowest')}
                    />
                </Grid>
            )}
        </>
    );
};

export default ReviewHighlights;
