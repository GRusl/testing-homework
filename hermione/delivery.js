describe ('Страница условий доставки', async () => {
    it ('Статична', async function({browser}) {
        await browser.url('/hw/store/delivery');
        await browser.assertView('delivery', 'html');
    });
});
