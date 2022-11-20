const { assert } = require('chai');

describe('Корзина', async () => {
    it('Сохранение корзины', async function({browser}) {
        await browser.url('/hw/store/');

        const application = await browser.$('.Application');
        await application.waitForExist();

        const store_1 = await browser.execute(() => localStorage.getItem('example-store-cart'));
        await browser.execute(() => location.reload())
        const store_2 = await browser.execute(() => localStorage.getItem('example-store-cart'));

        assert(store_1 === store_2);
    });

    it('Отчистка корзины', async function({browser}) {
        await browser.url('/hw/store/catalog/0');

        const application = await browser.$('.Application');
        await application.waitForExist();

        const btn = await browser.$('.ProductDetails-AddToCart')
        await btn.click();

        await browser.url('/hw/store/cart');

        const btnCart = await browser.$('.Cart-Clear');
        await btnCart.click();

        const store = await browser.execute(() => localStorage.getItem('example-store-cart'));

        assert(store === '{}');
    });
});