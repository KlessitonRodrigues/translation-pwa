import { responseMock, ResponseType } from "../../constants/response";
import formatRequests from "./formatApiRes";

const url = process.env["NEXT_PUBLIC_RAPIDAPI_URL"] || "";

const reqContent: RequestInit = {
  method: "post",
  headers: {
    "CONTENT-TYPE": "application/x-www-form-urlencoded",
    "X-RAPIDAPI-HOST": process.env["NEXT_PUBLIC_X_RAPIDAPI_HOST"] || "",
    "X-RAPIDAPI-KEY": process.env["NEXT_PUBLIC_X_RAPIDAPI_KEY"] || "",
  },
};

async function fetchTranslation<T>(path: string, content?: RequestInit): Promise<ResponseType<T>> {
  try {
    const res = await fetch(url + path || "", { ...reqContent, ...content });
    const data = await res.json();

    return formatRequests(path, data);
  } catch (err) {
    return responseMock;
  }
}

export default fetchTranslation;
