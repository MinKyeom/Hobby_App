# Android App Bundle (.aab) 빌드 가이드

Play Console은 **AAB**만 받습니다 (APK 단독 업로드는 신규 앱 기준 불가에 가깝습니다).  
서명 키·서비스계정·다운로드한 `.aab`는 **Git에 올리지 마세요.**

## 사전 준비

1. [Expo](https://expo.dev) 계정
2. [Google Play Console](https://play.google.com/console) 개발자 계정 (수수료 1회)
3. 로컬에서:

```bash
cd Hobby_App
npm install --legacy-peer-deps
npx eas-cli@latest login
npx eas-cli@latest init   # projectId → app.json extra.eas 에 기록됨
```

**첫 빌드 상세 따라하기:** [EAS_FIRST_BUILD.md](./EAS_FIRST_BUILD.md)

## 권장: 내부 테스트용 (preview)

```bash
npx eas-cli@latest build --platform android --profile preview
```

- 산출물: AAB (EAS 클라우드)
- Play Console → **내부 테스트** 트랙에 업로드
- 테스터 이메일 추가 후 링크 설치로 검증

## 프로덕션용 AAB

```bash
npx eas-cli@latest build --platform android --profile production
```

- `eas.json` production: `autoIncrement: true` → versionCode 자동 증가
- 빌드 완료 후 EAS 대시보드에서 `.aab` 다운로드
- 로컬 보관 위치 (Git 무시됨):

```text
play-store/builds/workplace-animal-diagnosis-1.0.0.aab
```

## Play Console에 올리기

1. Play Console → 앱 만들기 (패키지: `com.minkyeom.workplaceanimaldiagnosis`)
2. **테스트** → 내부 테스트 → 새 버전 만들기 → AAB 업로드
3. 스토어 등록정보·그래픽·개인정보 URL·Data safety 완료 후
4. **프로덕션**으로 승격 또는 프로덕션 트랙에 동일 AAB 업로드
5. 국가/지역·가격(무료) 설정 → 심사 제출

## (선택) EAS Submit

Play API 서비스계정 JSON을 EAS에 연결한 뒤:

```bash
npx eas-cli@latest submit --platform android --profile production --latest
```

서비스계정 JSON은 `play-store/secrets/` 또는 EAS Secrets에만 두고 Git에 넣지 마세요.

## 서명 키

- 기본: **EAS가 Android 키스토어를 관리** (권장)
- 직접 키스토어를 만들 경우 `*.jks` / `*.keystore` 는 절대 커밋 금지 (이미 `.gitignore`)

## 로컬에 AAB가 안 생기는 이유

이 저장소에는 **사전 빌드된 `.aab`를 포함하지 않습니다.**  
Expo 계정·Play 서명 없이는 서명된 스토어용 번들을 만들 수 없으므로, 위 EAS 명령으로 생성하세요.
