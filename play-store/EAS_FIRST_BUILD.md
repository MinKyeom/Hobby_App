# EAS 첫 Android AAB 빌드 (따라하기)

계정: **minkowskim** (expo.dev 로그인 완료 기준)

## Install dependencies 실패했을 때

원인: `package.json` ↔ `package-lock.json` 불일치 → EAS의 `npm ci` 실패.

```bash
cd /Users/kmk/Desktop/MoodCompanyApp/Hobby_App
npm run eas:fix-and-rebuild
```

또는 lock만 맞춘 뒤:

```bash
rm -rf node_modules package-lock.json && npm install
npx eas-cli@latest build --platform android --profile preview --clear-cache
```

> Cursor 에이전트 환경에서는 Expo API가 프록시 403으로 막혀  
> `eas init` / `eas build`를 **직접 대신 실행할 수 없습니다.**  
> 아래 명령을 **본인 터미널**(로그인된 창)에서 실행하세요.

## 한 번에 실행 (권장)

```bash
cd /Users/kmk/Desktop/MoodCompanyApp/Hobby_App
npm run eas:android:preview
```

또는:

```bash
cd /Users/kmk/Desktop/MoodCompanyApp/Hobby_App
bash scripts/eas-android-preview.sh
```

이 스크립트가 하는 일:

1. `eas whoami` 확인  
2. `eas init --account minkowskim` → `app.json`에 `extra.eas.projectId` 기록  
3. `eas build --platform android --profile preview` → **AAB** 클라우드 빌드

Keystore 생성을 물어보면 **Yes** (스크립트는 `--non-interactive`라 EAS 기본값으로 새 키를 만들 수 있음).

## 단계별로 하려면

```bash
cd /Users/kmk/Desktop/MoodCompanyApp/Hobby_App

# 이미 로그인돼 있으면 생략
npx eas-cli@latest whoami

# 프로젝트 연결 (최초 1회)
npm run eas:init

# Android preview AAB
npm run eas:build:preview

# 스토어용
npm run eas:build:production
```

## 빌드 확인 · AAB 다운로드

- 대시보드: https://expo.dev/accounts/minkowskim/projects/workplace-animal-diagnosis/builds  
- 완료 후 **Download** → `play-store/builds/` 에만 보관 (Git 무시)

## npm 스크립트 요약

| 스크립트 | 내용 |
|----------|------|
| `npm run eas:whoami` | 로그인 확인 |
| `npm run eas:init` | 프로젝트 연결 |
| `npm run eas:build:preview` | 내부 테스트용 AAB |
| `npm run eas:build:production` | 프로덕션 AAB |
| `npm run eas:android:preview` | init + preview 일괄 |

## 빌드가 끝난 뒤 Play Console

1. Play Console → 앱 만들기 (패키지 `com.minkyeom.workplaceanimaldiagnosis`)  
2. 내부 테스트 트랙에 AAB 업로드  
3. 그래픽·문구: `play-store/` 폴더  
4. 개인정보 URL: `https://minkowskim.com/apps/office-animal-diagnosis/privacy`
