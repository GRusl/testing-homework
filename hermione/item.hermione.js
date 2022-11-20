const { assert } = require('chai');

describe('Item детально', async () => {
    it('Общий вид', async function({browser}) {
        await browser.url('/hw/store/catalog/0');
        await browser.assertView('item', 'html', {
            ignoreElements: [
                '.Image',
                '.ProductDetails-Name',
                '.ProductDetails-Description',
                '.ProductDetails-Price',
                '.ProductDetails-Color',
                '.ProductDetails-Material',
            ]
        });
    });

    it('Товар уже добавлен', async function({browser}) {
        await browser.url('/hw/store/catalog/0');

        const application = await browser.$('.Application');
        await application.waitForExist();

        const btn = await browser.$('.ProductDetails-AddToCart')
        await btn.click();

        const cartBadge = await browser.$('.CartBadge');

        assert(cartBadge.isDisplayed());

        // Отчистка корзины
        await browser.url('/hw/store/cart');
        const btnCart = await browser.$('.Cart-Clear');
        await btnCart.click();
    });
});
