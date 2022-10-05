import type { Operation } from 'effection';
import type { ProcessResult } from '@effection/process';

import { exec } from '@effection/process';

export function* deno(cmd: string): Operation<ProcessResult> {
  let denoExePath = require.resolve('deno-bin/bin/deno');
  return yield exec(`${denoExePath} ${cmd}`).join();
}

export const CompilationTargets = [
  "x86_64-unknown-linux-gnu",
  "x86_64-pc-windows-msvc",
  "x86_64-apple-darwin",
  "aarch64-apple-darwin"
] as const;

export type CompilationTarget = typeof CompilationTargets[number];

export interface CompileOptions {
  output: string;
  target: CompilationTarget;
  entrypoint: string;
  allowRead?: boolean;
  allowNet?: boolean | string[];
  unstable?: boolean;
}

export function compile(options: CompileOptions) {
  let args = [`--output=${options.output}`, `--target=${options.target}`];
  if (options.allowRead) {
    args.push('--allow-read');
  }
  if (!!options.allowNet) {
    if (Array.isArray(options.allowNet)) {
      args.push(`--allow-net=${options.allowNet.join(',')}`);
    } else {
      args.push(`--allow-net`);
    }
  }
  if (options.unstable) {
    args.push(`--unstable`);
  }

  return deno(`compile ${args.join(' ')} ${options.entrypoint}`);
}
