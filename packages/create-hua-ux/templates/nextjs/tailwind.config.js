const path = require('path');

// Windows 경로를 POSIX 스타일로 변환 (Tailwind CSS 4 호환)
function toPosixPath(filePath) {
  // path.sep을 사용하여 플랫폼 독립적으로 경로 구분자 변환
  return String(filePath).split(path.sep).join('/');
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    // Include hua-ux and hua-ui components for Tailwind JIT compilation
    // hua-ux re-exports from @hua-labs/ui, so we need to scan both
    // Works in both monorepo (workspace:*) and npm published packages
    // 모노레포 환경: 실제 소스 코드 경로 스캔
    // Windows 경로를 POSIX 스타일로 변환하여 Tailwind CSS 4 호환성 보장
    toPosixPath(path.resolve(__dirname, '../../packages/hua-ux/src')) + '/**/*.{js,ts,jsx,tsx}',
    toPosixPath(path.resolve(__dirname, '../../packages/hua-ui/src')) + '/**/*.{js,ts,jsx,tsx}',
    // npm 배포 환경: node_modules 경로 스캔
    toPosixPath(path.resolve(__dirname, './node_modules/@hua-labs/hua-ux')) + '/**/*.{js,ts,jsx,tsx}',
    toPosixPath(path.resolve(__dirname, './node_modules/@hua-labs/ui')) + '/**/*.{js,ts,jsx,tsx}',
    // Fallback: 모든 @hua-labs 패키지 스캔
    toPosixPath(path.resolve(__dirname, './node_modules/@hua-labs')) + '/**/*.{js,ts,jsx,tsx}',
  ],
  // Tailwind 4: Theme variables should be moved to @theme in globals.css
}
