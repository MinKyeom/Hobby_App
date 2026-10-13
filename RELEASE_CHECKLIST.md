# 스토어 출시 체크리스트

## A. 앱 기능 (코드 — 대부분 완료)

- [x] 홈 → 퀴즈 → 결과 → 공유/저장 → 다시하기
- [x] 이전 문항 / 홈 이동
- [x] 결과 면책 문구
- [x] 인신공격성 카피 완화
- [x] 실명·회사명 Input 없음
- [x] Error Boundary + 폰트 로드 타임아웃
- [x] 웹에서 MediaLibrary 크래시 방지 (legacy 동적 import)
- [x] a11y 라벨 (주요 버튼·진행률)

## B. 배포 전 필수 (직접 설정)

- [ ] `SUPPORT_EMAIL`을 실제 메일로 변경 (`src/constants/compliance.ts`, `public/privacy.html`)
- [ ] `public/privacy.html`을 GitHub Pages 등으로 공개 HTTPS 호스팅
- [ ] `PRIVACY_POLICY_URL`을 실제 URL로 맞추기
- [ ] `npx eas-cli@latest init` 후 `app.json`에 projectId 기록
- [ ] 브랜드 아이콘 / 스플래시 / 스토어 스크린샷 제작
- [ ] Apple Developer / Google Play Console 계정·앱 생성
- [ ] App Privacy / Play Data safety: **데이터 수집 없음**으로 작성
- [ ] 실기기(iOS·Android)에서 저장·공유·권한 거부 시나리오 테스트

## C. 제출 시 권장 리뷰 노트

> 게스트 전용 심리 테스트 앱입니다. 회원가입·서버 전송 없음.
> 결과 카드 이미지 저장 시에만 사진 라이브러리 권한을 요청합니다.
> 공유는 OS 시스템 공유 시트를 사용합니다 (카카오 네이티브 SDK 미사용).
> 특정인 비방이 아닌 소통 성향 분석 목적의 유쾌한 테스트입니다.
