import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {describe, it, expect} from '@jest/globals'
import {getAllByTestId, render} from '@testing-library/react'
import {createStore} from "redux";
import {ProductDetails} from "../src/client/components/ProductDetails";
import {Catalog} from "../src/client/pages/Catalog";

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
    cart: {},
}

const basename = '/';
const store = createStore(() => initial_state)

describe('Catalog', () => {
    // const products =
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Catalog/>
            </Provider>
        </BrowserRouter>
    );

    it('Name', () => {
        const {container} = render(application);

        const items = getAllByTestId(container, 'name')
        for (const i in items) {
            expect(items[i].textContent).toBe(initial_state.products[i].name)
        }
    });

    it('Price', () => {
        const {container} = render(application);

        const items = getAllByTestId(container, 'price')
        for (const i in items) {
            expect(items[i].textContent).toBe('$' + initial_state.products[i].price)
        }
    });

    it('Link', () => {
        const {container} = render(application);

        const items = getAllByTestId(container, 'link')
        for (const i in items) {
            expect(items[i].textContent).toBe('Details')
        }
    });
});

describe('Item details', () => {
    const item = {...initial_state.products[0], ...initial_state.details[0]};
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <ProductDetails product={item}/>
            </Provider>
        </BrowserRouter>
    );

    it('Name', () => {
        const {getByTestId} = render(application);
        expect(getByTestId('name').textContent).toBe(item.name);
    });

    it('Description', () => {
        const {getByTestId} = render(application);
        expect(getByTestId('desc').textContent).toBe(item.description);
    });

    it('Price', () => {
        const {getByTestId} = render(application);
        expect(getByTestId('price').textContent).toBe('$' + item.price);
    });

    it('Color', () => {
        const {getByTestId} = render(application);
        expect(getByTestId('color').textContent).toBe(item.color);
    });

    it('Material', () => {
        const {getByTestId} = render(application);
        expect(getByTestId('mat').textContent).toBe(item.material);
    });

    it('Button', () => {
        const {getByTestId} = render(application);
        expect(getByTestId('btn').textContent).toBe('Add to Cart');
    });
});
