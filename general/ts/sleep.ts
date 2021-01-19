export default (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));
