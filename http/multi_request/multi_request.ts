import ky from "https://deno.land/x/ky/index.js";

// Setting
const url = "https://httpbin.org/post";

// args
const requestTimes: number = parseInt(Deno.args[0]);
console.error("*** マルチリクエスト開始 ***");

const args = { user: "jiro", password: "123456" };
const parsed = await ky.post(url, { json: args }).json();

console.log(JSON.stringify(parsed, null, 2));

console.error("*** 終了 ***");

const post = (url: string, data: any) 