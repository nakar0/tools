import { v4 } from "https://deno.land/std/uuid/mod.ts";

import multiPost from "./multi_post.ts";
import serialize from "./serialize.ts";

const main = async () => {
  // Setting
  const url: string =
    "https://api-dev.i-kasa.com/db/v1/user/push_notifications";
  const dataFunc = (): any => {
    const ikasaId: string = v4.generate();
    const token: string = v4.generate();
    const deviceId: string = v4.generate();
    return {
      ikasa_id: ikasaId,
      token: token,
      device_id: deviceId,
    };
  };
  // args
  const times: number = parseInt(Deno.args[0]);

  console.error("*** マルチリクエスト開始 ***");
  const res: Array<any> = await multiPost(url, dataFunc, times, 200);
  serialize(res);
  console.error("*** 終了 ***");
};

main();
