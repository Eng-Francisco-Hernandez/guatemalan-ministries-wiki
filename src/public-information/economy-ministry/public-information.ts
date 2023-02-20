import puppeteer from "puppeteer";

import EconomyMinistryClient from "./economy-ministry-client";

const publicInformation = {
  getCategories: async function (this: EconomyMinistryClient) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(this.host);
      let data = await page.evaluate(() => {
        let results: any = [];
        let items = document.querySelectorAll("ul > li > a");
        items.forEach((item) => {
          results.push({
            url: item.getAttribute("href"),
            title: (item as any).innerText,
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
  getCategoryInformation: async function (
    this: EconomyMinistryClient,
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
            url: item.getAttribute("href"),
            title: (item as any).innerText,
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
