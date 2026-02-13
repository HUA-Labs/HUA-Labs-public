#!/usr/bin/env node

/**
 * create-hua CLI Entry Point
 *
 * This file is compiled to dist/bin/create-hua.js
 * and used as the executable when the package is installed.
 */

import { main } from '../index';
import { t } from '../shared';

main().catch((error: Error & { code?: string }) => {
  console.error('\nError:', error.message || String(error));

  if (error.code === 'EACCES') {
    console.error(`\n${t('cli:tipPermissions')}`);
    console.error(`   chmod 755 ${process.cwd()}`);
  } else if (error.code === 'ENOENT') {
    console.error(`\n${t('cli:tipNodeInstall')}`);
    console.error('   node --version');
  } else if (error.message?.includes('already exists')) {
    console.error(`\n${t('cli:tipDirExists')}`);
  } else {
    console.error(`\n${t('cli:troubleshooting')}`);
    console.error(`   1. ${t('cli:troubleNodeVersion')}: node --version (>=22.0.0)`);
    console.error(`   2. ${t('cli:troublePermissions')}`);
    console.error(`   3. ${t('cli:troubleDiskSpace')}`);
    console.error('   4. GitHub Issues: https://github.com/HUA-Labs/HUA-Labs-public/issues');
  }

  process.exit(1);
});
