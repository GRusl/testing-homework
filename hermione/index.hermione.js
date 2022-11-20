describe ('Главная страница', async () => {
    it ('Статична', async function({browser}) {
        await browser.url('/hw/store');
        await browser.assertView('index', 'html');
    });
});
