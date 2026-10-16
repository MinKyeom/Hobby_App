#!/usr/bin/env bash
# EAS 프로젝트 연결 + Android preview AAB 빌드
set -euo pipefail
cd "$(dirname "$0")/.."

EAS=(npx --yes eas-cli@latest)

echo "==> whoami"
"${EAS[@]}" whoami

ACCOUNT="${EAS_ACCOUNT:-minkowskim}"
if ! python3 - <<'PY'
import json
from pathlib import Path
cfg = json.loads(Path("app.json").read_text())
pid = ((cfg.get("expo") or {}).get("extra") or {}).get("eas") or {}
pid = pid.get("projectId")
print(pid or "")
raise SystemExit(0 if pid else 1)
PY
then
  echo "==> eas init (account=@${ACCOUNT})"
  "${EAS[@]}" init --account "$ACCOUNT" --non-interactive --force --icon
else
  echo "==> projectId 이미 있음 — init 생략"
  python3 - <<'PY'
import json
from pathlib import Path
cfg = json.loads(Path("app.json").read_text())
print("projectId:", cfg["expo"]["extra"]["eas"]["projectId"])
PY
fi

echo "==> 로컬 node_modules 확인 (eas가 expo-router 플러그인 resolve)"
if [[ ! -f node_modules/expo-router/package.json ]]; then
  echo "node_modules 없음 → npm install"
  npm install
fi
node -e "require.resolve('expo-router/package.json')"

echo "==> lockfile 동기화 확인 (npm ci)"
rm -rf /tmp/hobby-npm-ci-check
mkdir -p /tmp/hobby-npm-ci-check
cp package.json package-lock.json .npmrc /tmp/hobby-npm-ci-check/ 2>/dev/null || cp package.json package-lock.json /tmp/hobby-npm-ci-check/
( cd /tmp/hobby-npm-ci-check && npm ci --include=dev --ignore-scripts >/dev/null )
echo "npm ci OK"

echo "==> Android preview AAB 빌드 시작"
"${EAS[@]}" build --platform android --profile preview --non-interactive --clear-cache --message "preview AAB (lockfile fixed)"

echo
echo "진행: https://expo.dev/accounts/${ACCOUNT}/projects/workplace-animal-diagnosis/builds"
