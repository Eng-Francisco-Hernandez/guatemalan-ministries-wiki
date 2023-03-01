import MinistryCategoryItem from "@/models/MinistryCategoryItem";
import MinistryPublicCategory from "@/models/MinistryPublicCategory";
import { EconomyMinistryClient } from "@/public-information";
import { Ministries } from "@/utils/util-constants/ministries";
import { connectToDb } from "@/utils/util-db";
import type { NextApiRequest, NextApiResponse } from "next";

connectToDb();

const economyMinistryClient = new EconomyMinistryClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const ministryPublicItems = await MinistryPublicCategory.find({
          ministry: Ministries.MINECO,
        });
        if (ministryPublicItems.length) {
          res.status(200).json(ministryPublicItems);
          break;
        }
        const mainCategories = await economyMinistryClient.getCategories();
        await MinistryPublicCategory.insertMany(
          mainCategories.filter(
            (item: any) => item.url !== null && !item.url.endsWith(".pdf")
          )
        );
        res
          .status(200)
          .json(
            mainCategories.filter(
              (item: any) => item.url !== null && !item.url.endsWith(".pdf")
            )
          );
        break;
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case "POST":
      try {
        const linkedMinistryCategory = await MinistryPublicCategory.findOne({
          title: body.title,
        });
        const ministryCategoryItems = await MinistryCategoryItem.find({
          ministryCategory: linkedMinistryCategory._id,
        });
        if (ministryCategoryItems.length) {
          res.status(200).json(ministryCategoryItems);
          break;
        }
        const categoryInformation =
          await economyMinistryClient.getCategoryInformation(
            body.title,
            body.category,
            body.querySelector
          );
        await MinistryCategoryItem.insertMany(categoryInformation);
        res.status(200).json(categoryInformation);
        break;
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
      break;

    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}
