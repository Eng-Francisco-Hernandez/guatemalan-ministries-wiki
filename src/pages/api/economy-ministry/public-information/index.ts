import { EconomyMinistryClient } from "@/public-information";
import type { NextApiRequest, NextApiResponse } from "next";

const economyMinistryClient = new EconomyMinistryClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const mainCategories = await economyMinistryClient.getCategories();
        res.status(200).json(mainCategories);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case "POST":
      try {
        const categoryInformation =
          await economyMinistryClient.getCategoryInformation(
            body.category,
            body.querySelector
          );
        res.status(200).json(categoryInformation);
      } catch (error) {
        console.log(error)
        res.status(400).json(error);
      }
      break;

    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}
