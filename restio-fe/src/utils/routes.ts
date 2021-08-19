import { generatePath } from 'react-router-dom';
import { Restaurant } from '../rtk-query/api.generated';
import { Location } from 'history';

export type LoginLocationProps = {
    from?: Location;
};

export type RestaurantLocationProps = {
    restaurant: Restaurant;
};

export const getToRestaurantDetails = (restaurant: Restaurant) => {
    return {
        pathname: getRestaurantDetailsPath(restaurant.id),
        state: { restaurant },
    };
};

export const getToReviewCreate = (id: number, restaurant?: Restaurant) => {
    return {
        pathname: getReviewCreatePath(id),
        state: { restaurant },
    };
};

export const getToReviewReply = (restaurant: Restaurant) => {
    return {
        pathname: getReviewReplyPath(restaurant.id),
        state: { restaurant },
    };
};

export const getRestaurantDetailsPath = (restaurantId: number) => {
    return generatePath(ROUTES.restaurantDetail, {
        id: restaurantId,
    });
};

export const getReviewCreatePath = (restaurantId: number) => {
    return generatePath(ROUTES.review, {
        id: restaurantId,
    });
};

export const getReviewReplyPath = (restaurantId: number) => {
    return generatePath(ROUTES.reviewReply, {
        id: restaurantId,
    });
};

export const getToLogin = (from?: Location) => {
    return {
        pathname: ROUTES.login,
        state: { from },
    };
};

export const getToSignup = (from?: Location) => {
    return {
        pathname: ROUTES.signup,
        state: { from },
    };
};

export const ROUTES = {
    home: '/',
    restaurantCreate: '/restaurant',
    restaurantDetail: '/restaurant/:id',
    review: '/restaurant/:id/review',
    reviewReply: '/restaurant/:id/reply',
    login: '/login',
    logout: '/logout',
    signup: '/signup',
};
