#!/usr/bin/env node
// src/index.ts
import program from 'commander';
import { actions } from './Actions';
import { isArray } from 'util';

program
  .version('0.0.1')
  .description('TypeScript Example CLI for usage in other projects');

for (const action of actions) {
  let depth = program;
  for (const [key, value] of Object.entries(action)) {
    if (isArray(value)) value.forEach(obj => depth[key](...Object.values(obj)));
    else depth = depth[key](value);
  }
}

program.parse(process.argv);
