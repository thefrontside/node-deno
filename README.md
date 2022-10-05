# node-deno

Node API for invoking the Deno command line.

## Examples

``` javascript
import { deno } from 'node-deno';

let result = await deno("--version");

console.log(result.stdout);
//logs:
//deno 1.26.0 (release, aarch64-apple-darwin)
//v8 10.7.193.3
//typescript 4.8.3
```
