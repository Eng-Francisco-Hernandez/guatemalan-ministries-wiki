import PublicFinancesMinistryClient from "./public-finances-ministry-client";
import puppeteer from "puppeteer";
import MinistryPublicCategory from "@/models/MinistryPublicCategory";

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
            ministry: "MINFIN",
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
    title: string,
    path: string,
    querySelectorArg: string
  ) {
    const linkedMinistryCategory = await MinistryPublicCategory.findOne({
      title: title,
    });
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`${this.host}/dataset/${path}`);
      let data = await page.evaluate(
        (querySelectorArg, linkedMinistryCategory) => {
          let results: any = [];
          let items = document.querySelectorAll(querySelectorArg);
          items.forEach((item) => {
            results.push({
              ministryCategory: linkedMinistryCategory._id,
              parentMinistry: "MINFIN",
              url: (item.querySelector("span.title > a")! as any).getAttribute(
                "href"
              ),
              title: (
                item.querySelector("span.title > a > h6 > strong")! as any
              ).innerText,
              downloadUrl: (
                item.querySelector("a.waves-effect")! as any
              ).getAttribute("href"),
            });
          });
          return results;
        },
        querySelectorArg,
        linkedMinistryCategory
      );
      await browser.close();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default publicInformation;
