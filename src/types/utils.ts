import { VNodeChild } from "vue";

export type RenderFunction = (...args: any[]) => VNodeChild;
