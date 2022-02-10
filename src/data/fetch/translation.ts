import { responseMock, ResponseType } from "../constants/response";

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
    console.log({ ...reqContent, ...content });

    const res = await fetch(url + path || "", { ...reqContent, ...content });
    const data = await res.json();
    console.log(`FETCHED: ${path} SUCCESS:${res.ok}`);

    return {
      success: data?.ok,
      msg: data?.error,
      data: { ...data, ok: undefined, error: undefined },
    };
  } catch (err) {
    console.log(err);
    return responseMock;
  }
}

export default fetchTranslation;
