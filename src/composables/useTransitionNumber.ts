export const useTransitionNumber = (initValue: number, { step, delay } = { step: 0.01, delay: 10 }) => {
    const value = ref<number>(initValue);

    const exposedValue = computed({
        get: () => value.value,
        set: async (update) => {
            const loopDir = value.value < update ? "incr" : "decr";
            while (value.value !== update) {
                if (loopDir === "incr") value.value = value.value + step > update ? update : value.value + step;
                if (loopDir === "decr") value.value = value.value - step > update ? update : value.value - step;
                delay && (await sleep(delay));
            }
        },
    });

    return exposedValue;
};
