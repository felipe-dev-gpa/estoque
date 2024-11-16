declare module 'quagga' {
  export interface QuaggaResult {
    codeResult: {
      code: string;
    };
  }

  export function init(options: any, callback: (err: any) => void): void;
  export function start(): void;
  export function stop(): void;
  export function onDetected(callback: (result: QuaggaResult) => void): void;
}
