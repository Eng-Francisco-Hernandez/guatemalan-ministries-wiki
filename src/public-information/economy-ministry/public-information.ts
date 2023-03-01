import MinistryCategoryItem from "@/models/MinistryCategoryItem";
import MinistryPublicCategory from "@/models/MinistryPublicCategory";
import { Ministries } from "@/utils/util-constants/ministries";
import puppeteer from "puppeteer";

import EconomyMinistryClient from "./economy-ministry-client";

const publicInformation = {
  getCategories: async function (this: EconomyMinistryClient) {
    const ministryPublicItems = await MinistryPublicCategory.find({
      ministry: Ministries.MINECO,
    });
    if (ministryPublicItems.length) {
      return ministryPublicItems;
    }
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(this.host);
      let data = await page.evaluate(() => {
        let results: any = [];
        let items = document.querySelectorAll("ul > li > a");
        items.forEach((item) => {
          results.push({
            ministry: "MINECO",
            url: item.getAttribute("href"),
            title: (item as any).innerText,
          });
        });
        return results;
      });
      await browser.close();
      await MinistryPublicCategory.insertMany(data);
      return data;
    } catch (error) {
      return error;
    }
  },
  getCategoryInformation: async function (
    this: EconomyMinistryClient,
    title: string,
    path: string,
    querySelectorArg: string
  ) {
    const linkedMinistryCategory = await MinistryPublicCategory.findOne({
      title: title,
    });
    const ministryCategoryItems = await MinistryCategoryItem.find({
      ministryCategory: linkedMinistryCategory._id,
    });
    if (ministryCategoryItems.length) {
      return ministryCategoryItems;
    }
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`${this.host}/${path}`);
      let data = await page.evaluate(
        (querySelectorArg, linkedMinistryCategory) => {
          let results: any = [];
          let items = document.querySelectorAll(querySelectorArg);
          items.forEach((item) => {
            results.push({
              ministryCategory: linkedMinistryCategory._id,
              url: item.getAttribute("href"),
              title: (item as any).innerText,
            });
          });
          return results;
        },
        querySelectorArg,
        linkedMinistryCategory
      );
      await browser.close();
      await MinistryCategoryItem.insertMany(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default publicInformation;
