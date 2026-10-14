# 직장 동물 농장: 나는 어떤 동물일까?

상사·부하 직원 **소통 성향**을 5문항 분기형 퀴즈로 살펴보고, 16종 동물 유형 카드를 SNS로 공유하는 React Native (Expo) 앱입니다.

## 바로 실행

```bash
cd Hobby_App
npm install --legacy-peer-deps
npx expo start -c
```

- `i` iOS · `a` Android · `w` 웹 · Expo Go QR 스캔

## 출시 준비도 (현재)

| 구분 | 상태 | 설명 |
|------|------|------|
| 코어 UX (홈→퀴즈→결과→공유) | ✅ | 데모·내부 테스트 가능 |
| 컴플라이언스 톤/면책/프라이버시 모달 | ✅ | 인앱 반영 |
| 로컬 동물 이미지·게스트 전용 | ✅ | 네트워크 의존 최소화 |
| EAS projectId / 계정 연동 | ⬜ | `eas init` 필요 |
| 호스팅된 개인정보 URL 실배포 | ⬜ | `public/privacy.html` 준비됨, GitHub Pages 등 연결 |
| 실제 문의 이메일 | ⬜ | `src/constants/compliance.ts`의 `SUPPORT_EMAIL` 교체 |
| 브랜드 아이콘·스토어 스크린샷 | ⬜ | 템플릿 아이콘일 수 있음 — 교체 권장 |
| 스토어 리스팅/심사 제출 | ⬜ | 위 항목 완료 후 |

**판정:** 기능·UX는 **소프트런치/클로즈드 테스트**에 가깝고, **스토어 정식 제출**은 계정·정책 URL·에셋·메타데이터 작업이 더 필요합니다.

자세한 체크: [STORE_COMPLIANCE.md](./STORE_COMPLIANCE.md) · [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md)

## 주요 기능

- 회원가입 없음 (게스트 전용)
- 5단계 분기 퀴즈 (문항당 3~4지선다, 선택에 따라 다른 후속 질문) + 이전 문항
- 24종 동물 결과 카드 (로컬 Pexels 상업 이용 가능 이미지)
- PNG 저장 · OS 공유 시트 (카카오톡/X/Facebook/Instagram 선택)
- 개인정보 처리방침 모달 + `public/privacy.html`

## 스토어 빌드 (준비 후)

```bash
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest build --platform all --profile production
```

## 프로젝트 구조

```
src/app/           # Home / Quiz / Result
src/components/    # 카드, 공유, 프라이버시, ErrorBoundary
src/constants/     # 질문·동물·컴플라이언스·테마
src/store/         # Zustand
src/utils/         # 결과 매핑·공유·저장
public/privacy.html
assets/animals/    # 로컬 동물 이미지 16장
```
