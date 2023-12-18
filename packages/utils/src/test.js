import {
  format,
  debounce,
  compute
} from '../lib/index.esm.js'

format()
console.log(debounce(compute)('+', 1, 2));
