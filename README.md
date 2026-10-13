# 직장 동물 농장: 나는 어떤 동물일까?

상사·부하 직원 성향을 5문항 분기형 퀴즈로 진단하고, 16종 동물 캐릭터 결과 카드를 SNS로 공유하는 React Native (Expo) 앱입니다.

- 회원가입 없음 (개인정보 최소 수집)
- iOS / Android 크로스 플랫폼
- 결과 카드 이미지 저장 + 카카오톡 / X(트위터) / 페이스북 / 인스타그램 / 시스템 공유

## 시작하기

```bash
cd Hobby_App
npm install --legacy-peer-deps
npm start
```

Expo Go 또는 시뮬레이터에서 실행합니다.

## 공유 기능

결과 화면에서 결과 카드를 이미지로 캡처한 뒤:

| 버튼 | 동작 |
|------|------|
| 카카오톡 | OS 공유 시트 → 카카오톡 선택 (이미지) |
| X (트위터) | 트윗 작성 화면 + 이미지 공유 시트 |
| 페이스북 | 이미지 공유 시트 / 웹 공유 |
| 인스타그램 | 이미지 공유 시트 |
| 더 보기 | 시스템 공유 (모든 설치된 SNS) |
| 결과 이미지 저장 | 사진첩 저장 |

> 카카오 커스텀 템플릿(카카오톡 링크)이 필요하면 Kakao Developers 앱 키와 네이티브 SDK(개발 빌드)를 추가하면 됩니다. 현재는 앱 스토어 심사·Expo Go 호환을 위해 **시스템 공유 + 결과 카드 이미지** 방식을 사용합니다.

## Pexels 이미지

기본값은 상업적 이용 가능한 **큐레이션 Pexels CDN URL**입니다.  
라이브 검색을 쓰려면 `.env`에 키를 넣으세요.

```bash
cp .env.example .env
# EXPO_PUBLIC_PEXELS_API_KEY=your_key
```

검색 참고: [Pexels 재미있는 동물](https://www.pexels.com/ko-kr/search/%EC%9E%AC%EB%AF%B8%EC%9E%88%EB%8A%94%20%EB%8F%99%EB%AC%BC/)

## 프로젝트 구조

```
src/
  app/           # Expo Router 화면 (Home / Quiz / Result)
  components/    # UI (결과 카드, SNS 공유 버튼 등)
  constants/     # 질문 트리, 16종 동물, 테마
  store/         # Zustand 퀴즈 상태
  utils/         # 결과 매핑, Pexels, SNS 공유
```

## 스토어 출시

```bash
npx eas-cli@latest build --platform all
npx eas-cli@latest submit --platform all
```

`app.json`의 `ios.bundleIdentifier` / `android.package` / EAS `projectId`를 본인 계정 값으로 교체하세요.
