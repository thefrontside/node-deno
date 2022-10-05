import * as ops from './operations';
import { run } from 'effection';

export { CompilationTargets } from './operations';
export type { CompilationTarget } from './operations';

export function deno(...args: Parameters<typeof ops.deno>) {
  return run(ops.deno(...args));
}

export function compile(...options: Parameters<typeof ops.compile>) {
  return run(ops.compile(...options));
}
