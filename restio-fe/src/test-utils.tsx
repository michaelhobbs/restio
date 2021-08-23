import { render, RenderOptions } from '@testing-library/react';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from './store/store';

const AllTheProviders: FC<PropsWithChildren<Record<string, never>>> = ({
    children,
}: PropsWithChildren<Record<string, never>>) => {
    return (
        <MemoryRouter>
            <Provider store={store}>{children}</Provider>
        </MemoryRouter>
    );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof render> =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
