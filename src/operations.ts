import type { Operation } from 'effection';
import type { ProcessResult } from '@effection/process';

import { exec } from '@effection/process';

export function* deno(cmd: string, env: Record<string,string> = {}): Operation<ProcessResult> {
  let denoExePath = require.resolve('deno-bin/bin/deno');
  return yield exec(`${denoExePath} ${cmd}`, { env }).join();
}

export const CompilationTargets = [
  "x86_64-unknown-linux-gnu",
  "x86_64-pc-windows-msvc",
  "x86_64-apple-darwin",
  "aarch64-apple-darwin"
] as const;

export type CompilationTarget = typeof CompilationTargets[number];

export interface RunOptions {
  entrypoint: string | string[];
  allowRead?: boolean;
  allowRun?: boolean;
  allowNet?: boolean | string[];
  allowEnv?: boolean | string[];
  location?: string;
  noPrompt?: boolean;
  unstable?: boolean;
  env?: Record<string, string>;
}

export function run(options: RunOptions) {
  let args = runOptions(options);

  //@ts-expect-error concating an array or a scalar results in ana array.
  let entrypoint: string[] = [].concat(options.entrypoint);

  let { env } = options;
  return deno(`run ${args.join(' ')} ${entrypoint.join(' ')}`, env);
}

export interface CompileOptions extends RunOptions {
  output: string;
  target: CompilationTarget;
}

export function compile(options: CompileOptions) {
  let args = runOptions(options)
    .concat([`--output=${options.output}`, `--target=${options.target}`]);

  //@ts-expect-error concating an array or a scalar results in ana array.
  let entrypoint: string[] = [].concat(options.entrypoint);

  let { env } = options;
  return deno(`compile ${args.join(' ')} ${entrypoint.join(' ')}`, env);
}

function runOptions(options: RunOptions): string[] {
  let args = [];
  if (options.allowRead) {
    args.push('--allow-read');
  }
  if (options.allowRun) {
    args.push('--allow-run');
  }
  if (!!options.allowNet) {
    if (Array.isArray(options.allowNet)) {
      args.push(`--allow-net=${options.allowNet.join(',')}`);
    } else {
      args.push(`--allow-net`);
    }
  }
  if (!!options.allowEnv) {
    if (Array.isArray(options.allowEnv)) {
      args.push(`--allow-env=${options.allowEnv.join(',')}`);
    } else {
      args.push(`--allow-env`);
    }
  }
  if (options.location) {
    args.push(`--location=${options.location}`);
  }
  if (options.unstable) {
    args.push(`--unstable`);
  }
  if (options.noPrompt) {
    args.push(`--no-prompt`);
  }
  return args;
}
