import { PublicFinancesMinistryClient } from "@/public-information";
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
        const publicItems = await publicFinancesMinistryClient.getPublicItems();
        res.status(200).json(publicItems);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case "POST":
      try {
        const dataAndResources =
          await publicFinancesMinistryClient.getDataAndResources(
            body.title,
            body.category,
            body.querySelector
          );
        res.status(200).json(dataAndResources);
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
      break;

    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}
