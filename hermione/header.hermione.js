const { assert } = require('chai');

describe('Шапка', async () => {
    it('Иконка - ссылка', async function({browser}) {
        await browser.url('/hw/store/catalog');

        const application = await browser.$('.Application');
        await application.waitForExist();

        const link = await browser.$('.Application-Brand')
        await link.click()

        const url = await browser.getUrl()

        assert(url.endsWith('/hw/store/'));
    });

    it('Готовим гамбургер', async function({browser}) {
        await browser.url('/hw/store/');

        await browser.setWindowSize(575, 500);

        const application = await browser.$('.Application');
        await application.waitForExist();

        const btn = await browser.$('.Application-Toggler')

        assert(await btn.isDisplayed());
    });

    it('Больше без готовки гамбургера', async function({browser}) {
        await browser.url('/hw/store/');

        await browser.setWindowSize(575, 500);

        const application = await browser.$('.Application');
        await application.waitForExist();

        const btn = await browser.$('.Application-Toggler');
        await btn.click();

        const btn_menu = await browser.$('.Application-Menu');

        const btn_link = await browser.$('.test-link');
        await btn_link.click();

        assert(btn_menu.isDisplayed());
    });
});
