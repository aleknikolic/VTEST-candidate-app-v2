import { Pausable } from "@vueuse/core";
import { TimerConfig } from "~/types/system";

export type TimerConfigStepState = {
    step: string;
    duration: number;
    remaining: number;
    warning: number;
    running: boolean;
};

const DEFAULT_TIMER_CONFIG = {
    enabled: false,
};

export const useTimerController = (onTimerEnd: (...args: any) => void) => {
    const running = ref<boolean>(false);
    const timerConfig = ref<TimerConfig>(DEFAULT_TIMER_CONFIG);
    const enabled = computed<boolean>(() => !!timerConfig.value.enabled);
    const { count: seconds, inc: incrSeconds, set: setSeconds } = useCounter();
    const intervalController = ref<Omit<Pausable, "isActive">>(useIntervalFn(incrSeconds, 1000, { immediate: false }));

    const timerState = ref<TimerConfigStepState[]>([]);

    const StartTimer = () => ((running.value = true), (timerState.value[0].running = true), intervalController.value.resume());
    const StopTimer = () => ((running.value = false), intervalController.value.pause(), (seconds.value = 0));

    const PauseTimer = () => intervalController.value.pause();
    const ResumeTimer = () => intervalController.value.resume();

    const SkipToNextRunner = async () => {
        const currentRunnerIndex = timerState.value.findIndex((runner) => runner.running);
        const currentRunner = timerState.value[currentRunnerIndex];
        const nextRunner = timerState.value[currentRunnerIndex + 1];
        if (currentRunnerIndex === -1 || !nextRunner) return;

        PauseTimer();
        seconds.value = currentRunner.duration;
        timerState.value[currentRunnerIndex].remaining = 1;
        intervalController.value = useIntervalFn(incrSeconds, 1000, { immediate: false });
        ResumeTimer();
    };

    const MapTimerConfigToState = (config: TimerConfig): TimerConfigStepState[] => [
        ...(config.preparation?.duration
            ? [
                  {
                      step: "preparation",
                      duration: config.preparation.duration,
                      remaining: config.preparation.duration,
                      warning: config.preparation?.warning ?? 0,
                      running: false,
                  },
              ]
            : []),
        ...(config?.answer?.duration
            ? [
                  {
                      step: "answer",
                      duration: config.answer.duration,
                      remaining: config.answer.duration,
                      warning: config.answer?.warning ?? 0,
                      running: false,
                  },
              ]
            : []),
    ];

    const SetTimerConfig = (config: TimerConfig) => {
        timerConfig.value = config;
        timerState.value = MapTimerConfigToState(config);
        running.value = false;
    };

    const remainingTime = computed(() => timerState.value.reduce((acc, curr) => acc + curr.remaining, 0));
    const currentRunner = computed<TimerConfigStepState | undefined>(() => timerState.value.find((x) => x.running));

    watch(
        () => seconds.value,
        async () => {
            const currentlyRunning = timerState.value.findIndex((x) => x.running);
            if (!running.value || currentlyRunning === -1) return;
            timerState.value[currentlyRunning].remaining = timerState.value[currentlyRunning].remaining - 1;
            const currentState = {
                seconds: seconds.value,
                remainingTime: remainingTime.value,
                timerState: timerState.value,
                isRunning: running.value,
            };
            if (remainingTime.value <= 0 && seconds.value > 0 && running.value) {
                StopTimer();
                return onTimerEnd(currentState);
            }
            if (timerState.value[currentlyRunning].remaining <= 0 && timerState.value[currentlyRunning + 1]) {
                intervalController.value.pause();
                await sleep(1000);
                intervalController.value.resume();
                timerState.value[currentlyRunning].running = false;
                if (timerState.value[currentlyRunning + 1]) timerState.value[currentlyRunning + 1].running = true;
            }
        },
    );

    return {
        enabled,
        running,
        seconds,
        timerState,
        currentRunner,
        remainingTime,
        SetTimerConfig,
        StartTimer,
        PauseTimer,
        ResumeTimer,
        SkipToNextRunner,
    };
};
