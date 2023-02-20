import PublicFinancesMinistryClient from "./public-finances-ministry-client";
import puppeteer from "puppeteer";

const publicInformation = {
  getPublicItems: async function (this: PublicFinancesMinistryClient) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`${this.host}/datasets?topic=finanzas`);
      let data = await page.evaluate(() => {
        let results: any = [];
        let items = document.querySelectorAll("div.card-title > a");
        items.forEach((item) => {
          results.push({
            url: item.getAttribute("href"),
            title: (item.querySelector("h5 > strong")! as any).innerText,
          });
        });
        return results;
      });
      await browser.close();
      return data;
    } catch (error) {
      return error;
    }
  },
  getDataAndResources: async function (
    this: PublicFinancesMinistryClient,
    path: string,
    querySelectorArg: string
  ) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`${this.host}/${path}`);
      let data = await page.evaluate((querySelectorArg) => {
        let results: any = [];
        let items = document.querySelectorAll(querySelectorArg);
        items.forEach((item) => {
          results.push({
            // url: (item.querySelector("span.title > a")! as any).href,
            title: (item.querySelector("span.title > a > h6.truncate resource-title > strong")! as any).innerText,
            // downloadUrl: (item.querySelector("a.secondary-content")! as any).href,
          });
        });
        return results;
      }, querySelectorArg);
      await browser.close();
      return data;
    } catch (error) {
      return error;
    }
  },
};

export default publicInformation;
