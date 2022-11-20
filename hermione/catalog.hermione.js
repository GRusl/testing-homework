const { assert } = require('chai');

describe('Catalog', async () => {
    it('Статичен', async function({browser}) {
        await browser.url('/hw/store/catalog');
        await browser.assertView('catalog', 'html', {
            ignoreElements: [
                '.row:nth-child(2)',
            ]
        });
    });

    it('Сообщение, что товар был добавлнен', async function({browser}) {
        await browser.url('/hw/store/catalog/0');

        const application = await browser.$('.Application');
        await application.waitForExist();

        const btn = await browser.$('.ProductDetails-AddToCart')
        await btn.click();

        await browser.url('/hw/store/catalog');

        const cartBadge = await browser.$('.CartBadge');

        assert(cartBadge.isDisplayed());

        // Отчистка корзины
        await browser.url('/hw/store/cart');
        const btnCart = await browser.$('.Cart-Clear');
        await btnCart.click();
    });

    it('Увеличение числа товаров в корзине', async function({browser}) {
        await browser.url('/hw/store/catalog/0');

        const application = await browser.$('.Application');
        await application.waitForExist();

        const btn = await browser.$('.ProductDetails-AddToCart')
        await btn.click();

        let store = await browser.execute(() => JSON.parse(localStorage.getItem('example-store-cart')));
        const count = store['0']['count'];

        await btn.click();

        store = await browser.execute(() => JSON.parse(localStorage.getItem('example-store-cart')));

        assert(count + 1 === store['0']['count']);

        // Отчистка корзины
        await browser.url('/hw/store/cart');
        const btnCart = await browser.$('.Cart-Clear');
        await btnCart.click();
    });
});