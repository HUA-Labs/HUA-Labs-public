#!/usr/bin/env tsx
/**
 * 알파 배포 준비 상태 확인 스크립트
 * 
 * 사용법:
 *   tsx scripts/deployment-status.ts
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import { execSync } from 'child_process';

interface PackageStatus {
  name: string;
  version: string;
  hasDist: boolean;
  hasBuild: boolean;
  isPrivate: boolean;
  buildErrors: string[];
}

async function checkPackage(packageName: string): Promise<PackageStatus> {
  const packagePath = path.join(process.cwd(), 'packages', packageName);
  const packageJsonPath = path.join(packagePath, 'package.json');
  
  if (!(await fs.pathExists(packageJsonPath))) {
    throw new Error(`Package not found: ${packageName}`);
  }

  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
  const distPath = path.join(packagePath, 'dist');
  const hasDist = await fs.pathExists(distPath);
  
  const buildErrors: string[] = [];
  let hasBuild = false;

  // 빌드 시도
  try {
    console.log(`\n🔨 빌드 확인: ${packageName}...`);
    execSync('pnpm run build', {
      cwd: packagePath,
      stdio: 'pipe',
    });
    hasBuild = true;
  } catch (error: any) {
    buildErrors.push(error.message || 'Build failed');
  }

  return {
    name: packageName,
    version: packageJson.version || 'N/A',
    hasDist,
    hasBuild,
    isPrivate: packageJson.private === true,
    buildErrors,
  };
}

async function checkDeploymentReadiness(): Promise<void> {
  console.log('🚀 알파 배포 준비 상태 확인\n');
  console.log('='.repeat(60));

  const packagesToCheck = ['create-hua', 'hua'];
  const results: PackageStatus[] = [];

  for (const pkg of packagesToCheck) {
    try {
      const status = await checkPackage(pkg);
      results.push(status);
    } catch (error: any) {
      console.error(`❌ ${pkg}: ${error.message}`);
    }
  }

  // 결과 출력
  console.log('\n📊 배포 준비 상태:\n');
  
  let allReady = true;

  for (const result of results) {
    const ready = result.hasBuild && !result.isPrivate;
    const icon = ready ? '✅' : '❌';
    
    console.log(`${icon} ${result.name} (v${result.version})`);
    console.log(`   빌드: ${result.hasBuild ? '✅' : '❌'}`);
    console.log(`   dist: ${result.hasDist ? '✅' : '❌'}`);
    console.log(`   private: ${result.isPrivate ? '⚠️ (배포 전 제거 필요)' : '✅'}`);
    
    if (result.buildErrors.length > 0) {
      console.log(`   빌드 에러: ${result.buildErrors.length}개`);
      result.buildErrors.forEach((error) => {
        console.log(`     - ${error.substring(0, 100)}...`);
      });
    }
    
    if (!ready) {
      allReady = false;
    }
    console.log('');
  }

  // 종합 평가
  console.log('='.repeat(60));
  if (allReady) {
    console.log('\n✅ 알파 배포 준비 완료!');
    console.log('\n다음 단계:');
    console.log('  1. npm login');
    console.log('  2. packages/hua: npm publish --access public');
    console.log('  3. packages/create-hua: pnpm run build');
    console.log('  4. packages/create-hua: npm publish --access public');
  } else {
    console.log('\n⚠️ 배포 준비 미완료');
    console.log('\n필요한 작업:');
    results.forEach((result) => {
      if (!result.hasBuild) {
        console.log(`  - ${result.name}: 빌드 수정 필요`);
      }
      if (result.isPrivate) {
        console.log(`  - ${result.name}: package.json에서 private 제거 필요`);
      }
    });
  }
}

checkDeploymentReadiness().catch((error) => {
  console.error('❌ 오류:', error);
  process.exit(1);
});
