// import {
// エラーが出る。Denoとの依存関係の問題？
//   writeFileStr,
// } from "https://deno.land/std/fs/mod.ts";

export default (manyData: Array<any>) => {
  let output: string = "";
  for (let data of manyData) {
    output += data["ikasa_id"] + ",\n";
  }

  console.log(output);
};
