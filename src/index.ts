import * as ops from './operations';
import { run as task } from 'effection';

export { CompilationTargets } from './operations';
export type { CompilationTarget } from './operations';

export function deno(...args: Parameters<typeof ops.deno>) {
  return task(ops.deno(...args));
}

export function compile(...options: Parameters<typeof ops.compile>) {
  return task(ops.compile(...options));
}

export function run(...options: Parameters<typeof ops.run>) {
  return task(ops.run(...options));
}
