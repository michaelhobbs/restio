import { Location, LocationDescriptor } from 'history';
import { generatePath } from 'react-router-dom';
import { Restaurant } from '../rtk-query/api.generated';

export type LoginLocationProps = {
    from?: Location;
};

export type RestaurantLocationProps = {
    restaurant: Restaurant;
};

type RestaurantLocationDescriptor = LocationDescriptor<{
    restaurant: Restaurant;
}>;

type FromLocationDescriptor = LocationDescriptor<{
    from?: Location;
}>;

export const getToRestaurantDetails = (
    restaurant: Restaurant
): RestaurantLocationDescriptor => {
    return {
        pathname: getRestaurantDetailsPath(restaurant.id),
        state: { restaurant },
    };
};

export const getToReviewCreate = (
    id: number,
    restaurant: Restaurant
): RestaurantLocationDescriptor => {
    return {
        pathname: getReviewCreatePath(id),
        state: { restaurant },
    };
};

export const getToReviewReply = (
    restaurant: Restaurant
): RestaurantLocationDescriptor => {
    return {
        pathname: getReviewReplyPath(restaurant.id),
        state: { restaurant },
    };
};

export const getRestaurantDetailsPath = (restaurantId: number): string => {
    return generatePath(ROUTES.restaurantDetail, {
        id: restaurantId,
    });
};

export const getReviewCreatePath = (restaurantId: number): string => {
    return generatePath(ROUTES.review, {
        id: restaurantId,
    });
};

export const getReviewReplyPath = (restaurantId: number): string => {
    return generatePath(ROUTES.reviewReply, {
        id: restaurantId,
    });
};

export const getToLogin = (from?: Location): FromLocationDescriptor => {
    return {
        pathname: ROUTES.login,
        state: { from },
    };
};

export const getToSignup = (from?: Location): FromLocationDescriptor => {
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
