const MS_IN_S = 1000;

export const measurePerformance = () => (target, property, descriptor) => {
  const method = descriptor.value;

  descriptor.value = async function (...parameters) {
    const start = performance.now();
    const res = await method.apply(this, parameters);
    const time = Math.round(performance.now() - start) / MS_IN_S;

    if (this.checkPerformance) {
      this.checkPerformanceCallback(time, parameters);
    }

    return res;
  };

  return descriptor;
};
