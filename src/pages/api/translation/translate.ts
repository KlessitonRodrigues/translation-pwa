import { NextApiResponse, NextApiRequest } from "next";
import TranslationAPI from "../../../data/api/translationAPI";

export default async function translate(req: NextApiRequest, res: NextApiResponse) {
  res.send(await TranslationAPI.translateTo("hello", "pt"));
}
