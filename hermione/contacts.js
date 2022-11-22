describe ('Страница контактов', async () => {
    it ('Статична', async function({browser}) {
        await browser.url('/hw/store/contacts');
        await browser.assertView('contacts', 'html');
    });
});
