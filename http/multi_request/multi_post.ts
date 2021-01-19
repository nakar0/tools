import ky from "https://deno.land/x/ky/index.js";
import sleep from "../../general/ts/sleep.ts";

export default async (
  url: string,
  dataFunc: () => any,
  times: number,
  intervalMsec: number = 500
): Promise<Array<any>> => {
  const resJsonList: Array<any> = [];

  for (let i: number = 0; i < times; i++) {
    const resJson: any = await post(url, dataFunc());
    resJsonList.push(resJson);
    await sleep(intervalMsec);
  }

  return resJsonList;
};

const post = async (url: string, data: any): Promise<any> => {
  return await ky.post(url, { json: data }).json();
};
