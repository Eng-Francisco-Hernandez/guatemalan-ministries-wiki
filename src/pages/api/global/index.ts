import MinistryCategoryItem from "@/models/MinistryCategoryItem";
import MinistryPublicCategory from "@/models/MinistryPublicCategory";
import { connectToDb } from "@/utils/util-db";
import type { NextApiRequest, NextApiResponse } from "next";

connectToDb();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const publicCategories = await MinistryPublicCategory.find();
        const categoriesItems = await MinistryCategoryItem.find();
        const filteredPublicCategories = publicCategories.filter(
          (item) => JSON.stringify(item).toLowerCase().indexOf(body.query.toLowerCase()) > -1
        );
        const filteredCategoriesItems = categoriesItems.filter(
          (item) => JSON.stringify(item).toLowerCase().indexOf(body.query.toLowerCase()) > -1
        );
        res.status(200).json(filteredPublicCategories.concat(filteredCategoriesItems));
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}
