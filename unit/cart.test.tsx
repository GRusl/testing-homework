import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {describe, it, expect} from '@jest/globals'
import {getAllByTestId, getByTestId, render} from '@testing-library/react'
import {createStore} from "redux";
import {Application} from "../src/client/Application";
import {Cart} from "../src/client/pages/Cart";

const initial_state = {
    products: [
        {id: 0, name: 'name_0', price: 100},
        {id: 1, name: 'name_1', price: 1500},
    ],
    details: {
        0: {
            description: '---',
            material: '123',
            color: 'abc',
        },
        1: {
            description: '===',
            material: 'abc',
            color: '321',
        },
    },
    cart: {
        0: {name: 'name_0', price: 100, count: 2},
        1: {name: 'name_1', price: 1500, count: 1},
    },
}

const basename = '/';
const store = createStore(() => initial_state)
const store_for_null_cart = createStore(() => ({
    products: initial_state.products,
    details: initial_state.details,
    cart: {},
}))

describe('Cart (Application)', () => {
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Application/>
            </Provider>
        </BrowserRouter>
    );

    it('counter', () => {
        const {getByTestId} = render(application);
        expect(getByTestId('cartLabel').textContent).toBe('Cart (2)');
    });
});

describe('Cart', () => {
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Cart/>
            </Provider>
        </BrowserRouter>
    );

    it('Таблица товаров', () => {
        const {container} = render(application);
        expect(getByTestId(container, 'cartTable'));
    });

    it('Name', () => {
        const {container} = render(application);

        let i = 0;
        for (const row of getAllByTestId(container, 'name')) {
            expect(row.textContent).toBe(initial_state.cart[i]['name']);
            i++;
        }
    });

    it('Price', () => {
        const {container} = render(application);

        let i = 0;
        for (const row of getAllByTestId(container, 'price')) {
            expect(row.textContent).toBe('$' + initial_state.cart[i]['price']);
            i++;
        }
    });

    it('Count', () => {
        const {container} = render(application);

        let i = 0;
        for (const row of getAllByTestId(container, 'count')) {
            expect(row.textContent).toBe(initial_state.cart[i]['count'].toString());
            i++;
        }
    });

    it('Цена за товар', () => {
        const {container} = render(application);

        let i = 0;
        for (const row of getAllByTestId(container, 'total')) {
            const item = initial_state.cart[i];
            expect(row.textContent).toBe('$' + (item.price * item.count));
            i++;
        }
    });

    it('Общая цена', () => {
        const {container} = render(application);

        let total_price = 0;
        Object.entries(initial_state.cart).forEach(([key, item]) => {
            total_price += item.price * item.count;
        });

        expect(getByTestId(container, 'cartTotal').textContent).toBe('$' + total_price);
    });
});

describe('Cart (null)', () => {
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store_for_null_cart}>
                <Cart/>
            </Provider>
        </BrowserRouter>
    );

    it('Должена отображаться ссылка на товары', () => {
        const {getByTestId} = render(application);
        const link = getByTestId('emptyLink');
        expect(link.textContent).toBe('catalog');
    });

});