const puppeteer = require("puppeteer");
const chromium = require("chromium");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");

// puppeteer.use(StealthPlugin());

const delay = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

const clickOnButtonEval = async (page, selector, waitForHidden = false, timeout = null) => {
  timeout && (await delay(timeout));

  await page.waitForSelector(selector, { visible: true }).then(async () => {
    await page.evaluate(selector => {
      const elements = [...document.querySelectorAll(selector)];
      if (!elements) return;

      for (const element of elements) {
        element.click();
      }
    }, selector);

    waitForHidden && (await page.waitForSelector(selector, { hidden: true }));
  });
};

const scrapeKaufland = async (browser, query) => {
  const page = await browser.newPage();

  await page.goto(`https://www.kaufland.ro/cautarii.specialOfferSearch=1.html?q=${query.replace(" ", "+")}`, {
    waitUntil: "networkidle2",
  });

  await delay(3000);

  await page.screenshot({ path: "./public/build/kaufland.jpg", fullPage: true });

  // await clickOnButtonEval(
  //   page,
  //   ".cookie-alert-extended-button[data-controller='cookie-alert/extended/button/accept']",
  //   true
  // );

  // return await page.evaluate(() => {
  //   const cards = [...document.querySelectorAll(".g-col.t-search-result__list-item")];

  //   const items = cards.map(card => {
  //     const link = card.querySelector(".m-offer-tile__link.u-button--hover-children")?.href;
  //     // const img = card.querySelector(".a-image-responsive")?.src;
  //     const img = /src=\"(.*?)\"/.exec(card.querySelector(".a-image-responsive")?.outerHTML)[1];
  //     const hasCard = card.querySelector(".m-offer-tile__promo-wrapper") !== null;
  //     const name = `${card.querySelector(".m-offer-tile__subtitle")?.textContent.replace(/(\t|\n)/g, "") || ""} ${
  //       card.querySelector(".m-offer-tile__title")?.textContent.replace(/(\t|\n)/g, "") || ""
  //     }`;
  //     const extra = card.querySelector(".m-offer-tile__quantity")?.textContent.replace(/(\t|\n)/g, "");
  //     const oldPrice = card
  //       .querySelector(".a-pricetag__old-price.a-pricetag__line-through")
  //       ?.textContent.replace(",", ".")
  //       .match(/\d+(.\d+)?/g);
  //     const newPrice = card
  //       .querySelector(".a-pricetag__price")
  //       ?.textContent.replace(",", ".")
  //       .match(/\d+(.\d+)?/g);

  //     return {
  //       link: link || null,
  //       img: img || null,
  //       hasCard: hasCard,
  //       name: name || null,
  //       extra: extra || null,
  //       oldPrice: Number(oldPrice) || null,
  //       newPrice: Number(newPrice) || null,
  //     };
  //   });

  //   return {
  //     store: "Kaufland",
  //     items: items,
  //   };
  // });
};

const scrapePenny = async (browser, query) => {
  const page = await browser.newPage();

  await page.goto(`https://www.penny.ro/search/${escape(query)}?tab=products`, {
    waitUntil: "networkidle2",
  });

  await delay(3000);

  await page.screenshot({ path: "./public/build/penny.jpg", fullPage: true });

  // await clickOnButtonEval(page, "button#onetrust-accept-btn-handler", true);

  // return await page.evaluate(() => {
  //   const cards = [...document.querySelectorAll(".ws-product-item-base.ws-product-tile.ws-card")];

  //   const items = cards.map(card => {
  //     const link = card.id.replace(/-\d+$/g, "");
  //     const img = card.querySelector(
  //       ".mx-auto.ws-product-image.ws-product-image--loaded.ws-lazy-loaded-image--loaded"
  //     )?.src;
  //     const hasCard = card.querySelector(".ws-product-price-loyalty-icon.mb-1") !== null;
  //     const name = `${card
  //       .querySelector(".line-clamp-3")
  //       ?.textContent.replace(/(\t|\n)/g, "")
  //       .trim()}`;
  //     const extra = card
  //       .querySelector(".ws-product-information li.body-2")
  //       ?.textContent.replace(/(\t|\n)/g, "")
  //       .trim();
  //     const oldPrice =
  //       card
  //         .querySelector(".ws-product-price-strike.body-2")
  //         ?.textContent.replace(",", ".")
  //         .match(/\d+(.\d+)?/g) ||
  //       card
  //         .querySelector(".ws-product-price-type__value.h6")
  //         ?.textContent.replace(",", ".")
  //         .match(/\d+(.\d+)?/g);
  //     const newPrice = card
  //       .querySelector(".ws-product-price-type__value.subtitle-1")
  //       ?.textContent.replace(",", ".")
  //       .match(/\d+(.\d+)?/g);

  //     return {
  //       link: `https://www.penny.ro/products/${link}` || null,
  //       img: img || null,
  //       hasCard: hasCard,
  //       name: name || null,
  //       extra: extra || null,
  //       oldPrice: Number(oldPrice) || null,
  //       newPrice: Number(newPrice) || null,
  //     };
  //   });

  //   return {
  //     store: "Penny",
  //     items: items,
  //   };
  // });
};

const run = async query => {
  const browser = await puppeteer.launch({
    executablePath: chromium.path,
    args: ["--no-sandbox"],
  });

  console.log(chromium.path);

  // const data = await Promise.all([scrapeKaufland(browser, query), scrapePenny(browser, query)]);
  const data = await Promise.all([scrapeKaufland(browser, query), scrapePenny(browser, query)]);

  await browser.close();

  return data;
};

const getProducts = async (req, res) => {
  try {
    const query = req.query.query.replace(/\b\s\s+\b/g, " ").trim();
    const data = await run(query);

    res.send(data);
  } catch (err) {
    console.log("Err in productsController.js");
    console.log(err);
  }
};

module.exports = {
  getProducts,
};
