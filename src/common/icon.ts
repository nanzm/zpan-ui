const isTest = process.env.NODE_ENV === "test";

if (!isTest) {
  // @ts-ignore
  import("!!raw-loader!./assets/font/iconfont.js").then((rawModule) => {
    // eslint-disable-next-line no-eval
    eval.call(window, rawModule.default);
  });
}

export default {};
