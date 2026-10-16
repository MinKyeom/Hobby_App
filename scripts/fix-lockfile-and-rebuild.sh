#!/usr/bin/env bash
# package-lock 불일치로 EAS Install dependencies 실패한 뒤 복구 + 재빌드
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> node_modules / package-lock 정리"
# Cursor sandbox 등으로 일부 파일 삭제가 막히면 rename 후 새로 설치
if ! rm -rf node_modules 2>/dev/null; then
  mv node_modules "/tmp/hobby-node_modules-broken-$$" 2>/dev/null || true
fi
rm -f package-lock.json

echo "==> npm install (legacy-peer-deps via .npmrc)"
npm install
test -f node_modules/expo-router/package.json || { echo "expo-router 설치 실패"; exit 1; }

echo "==> npm ci 검증 (EAS와 동일)"
rm -rf /tmp/hobby-npm-ci-check
mkdir -p /tmp/hobby-npm-ci-check
cp package.json package-lock.json .npmrc /tmp/hobby-npm-ci-check/
( cd /tmp/hobby-npm-ci-check && npm ci --include=dev --ignore-scripts >/dev/null )
echo "npm ci OK"

echo "==> Android preview AAB 재빌드"
npx --yes eas-cli@latest build --platform android --profile preview --non-interactive --clear-cache --message "fix: sync package-lock for npm ci"

echo
echo "진행: https://expo.dev/accounts/minkowskim/projects/workplace-animal-diagnosis/builds"
