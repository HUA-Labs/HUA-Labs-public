#!/usr/bin/env node

/**
 * create-hua-ux CLI Entry Point
 * 
 * This file is compiled to dist/bin/create-hua-ux.js
 * and used as the executable when the package is installed.
 */

import { main } from '../index';

// Run the main function
main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
