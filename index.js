const puppteer = require('puppeteer');

(async () => {
    let gapJeansURL = 'https://www.gap.com/browse/category.do?cid=6998&nav=meganav%3AMen%3ACategories%3AJeans&ak_t=BE7FFCA02339B31EC296961C327114AE173027B5CA4A00001E1A4C5FA11D6B5D#style=1050838';

    let browser = await puppteer.launch();
    let page = await browser.newPage();

    await page.goto(gapJeansURL, {waitUntil: 'networkidle2'});

    let data = await page.evaluate(() => {

        let skinnyJeans = document.querySelectorAll('div[class=product-card]');
        let sale = [];

        skinnyJeans.forEach ((element) => {
            if (element.querySelector('div[class=product-price__markdown]')) {
                sale.push({
                    'name': element.innerText,
                    'original price': element.querySelector('div[class=product-price__markdown]').innerText,
                    'discounted price': element.querySelector('div[class=product-price__highlight]').innerText,
                    'link': element.querySelector('a').href
                });
            }
        });

        return sale;

    });

    console.log(data);

    await browser.close();
})();