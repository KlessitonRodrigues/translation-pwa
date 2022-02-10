import { NextApiResponse, NextApiRequest } from "next";
import TranslationAPI from "../../../data/api/translationAPI";

export default async function langs(req: NextApiRequest, res: NextApiResponse) {
  res.send(await TranslationAPI.getSuportedLangs());
}
