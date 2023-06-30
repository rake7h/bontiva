const isEmptyObject = (obj: Record<any, any>): boolean => {
  return !Object.keys(obj || {}).length;
};

const memorizeFun = (fun: () => any): (() => any) => {
  const mem = {};
  return function (...arg) {
    const cacheID = arg.length ? arg.join("-") : "root";
    const r = mem[cacheID] ? mem[cacheID] : (mem[cacheID] = fun(...arg));
    return r;
  };
};

export { isEmptyObject, memorizeFun };
