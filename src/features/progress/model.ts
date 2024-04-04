import { createStore, createEvent, sample } from 'effector';

export const $progress = createStore<number>(0)
export const increaseProgress  = createEvent<number>()

sample({
    clock: increaseProgress,
    target: $progress,
})
