Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

context('isimler', () => {
    const sanatciIsimleri = [
        "Özcan Deniz",
        "Mabel Matiz",
        "Adamlar",
        "Nihat Sırdar",
        "Emir Can İğrek",
        "Gökhan Türkmen",
        "Sefo",
        "Seksendört",
        "Selami Şahin",
        "Selçuk Balcı",
        "Selda Bağcan",
        "Selin Geçit",
        "Semicenk",
        "Sena Şener & Tuğkan",
        "Sencan Gürbüz",

    ];

    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const filename = `output/sanatci_${day}-${month}-${year}-${hour}${minute}.txt`;

    it('Sanatçı isimlerini sırayla ara ve sonuçları kontrol et', () => {
        sanatciIsimleri.forEach((sanatci) => {
            cy.visit('https://jollyjoker.com.tr/');
            cy.get('body > div.wrap > div.cookie > button').click({ force: true });
            cy.get('.chat-floating-action-button > .b-msg__txt').click({force: true});
            cy.wait(3000);
            cy.get('.webchat__send-box-text-box__input').type('Sanatçıya Göre Etkinlik Ara' + '{enter}');
            cy.wait(3000);
            cy.get('.webchat__send-box-text-box__input').type(sanatci + '{enter}');
            cy.wait(3000);
            cy.get('.webchat__basic-transcript__activity-body', { timeout: 3000 }).then(($elem) => {
                if ($elem.text().includes('Üzgünüm, anlamadım.')) {
                    cy.writeFile(filename, sanatci + '\n', { flag: 'a+' });
                }
            });
        });
    });
});
