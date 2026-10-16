#!/bin/bash
cd "$(dirname "$0")/.."
bash scripts/eas-android-preview.sh
echo
read -r -p "Enter 키를 누르면 종료합니다…"
