import MinistryCategoryItem from "@/models/MinistryCategoryItem";
import MinistryPublicCategory from "@/models/MinistryPublicCategory";
import { PublicFinancesMinistryClient } from "@/public-information";
import { Ministries } from "@/utils/util-constants/ministries";
import { connectToDb } from "@/utils/util-db";
import type { NextApiRequest, NextApiResponse } from "next";

connectToDb();

const publicFinancesMinistryClient = new PublicFinancesMinistryClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const ministryPublicItems = await MinistryPublicCategory.find({
          ministry: Ministries.MINFIN,
        });
        if (ministryPublicItems.length) {
          res.status(200).json(ministryPublicItems);
          break;
        }
        const publicItems = await publicFinancesMinistryClient.getPublicItems();
        await MinistryPublicCategory.insertMany(publicItems);
        res.status(200).json(publicItems);
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
        const dataAndResources =
          await publicFinancesMinistryClient.getDataAndResources(
            body.title,
            body.category,
            body.querySelector
          );
        await MinistryCategoryItem.insertMany(dataAndResources);
        res.status(200).json(dataAndResources);
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
