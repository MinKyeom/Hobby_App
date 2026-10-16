# Play Console 업로드 체크리스트

배포자(당신)가 Console에서 채울 항목입니다. 코드/에셋은 이 폴더에 준비되어 있습니다.

## 0. 앱 만들기

- [ ] Play Console → 앱 만들기
- [ ] 앱 이름: `오피스 동물 진단: 부하편 & 상사편` (또는 짧은 이름 `오피스 동물 진단`)
- [ ] 기본 언어: 한국어
- [ ] 앱/게임: 앱 · 무료
- [ ] 패키지명 확정: `com.minkyeom.workplaceanimaldiagnosis`  
  (첫 업로드 AAB의 package와 **반드시 일치**)

## 1. 개인정보처리방침 (필수)

- [ ] `https://minkowskim.com/apps/office-animal-diagnosis/privacy` 공개 확인 (브라우저 접속)
- [ ] Console → 앱 콘텐츠 → 개인정보처리방침 URL 등록
- [ ] Hobby_App `PRIVACY_POLICY_URL` / `app.json` extra 도 동일 URL로 맞춤

프롬프트: `../PROMPTS/CREATE_PRIVACY_PAGE_ON_MINKOWSKIM.md`

## 2. 스토어 등록정보

복붙 원문: [LISTING_KO.md](./LISTING_KO.md)

- [ ] 짧은 설명 (80자)
- [ ] 전체 설명
- [ ] 앱 아이콘: `graphics/icon-512.png`
- [ ] 특집 그래픽: `graphics/feature-graphic-1024x500.png`
- [ ] 휴대폰 스크린샷 최소 2장: `screenshots/phone/01~04.png` (권장 4장 전부)
- [ ] 카테고리: 엔터테인먼트
- [ ] 연락처 이메일: 실제 메일 (support@example.com 금지)
- [ ] (선택) 웹사이트: `https://minkowskim.com/`

## 3. 앱 콘텐츠 / 정책

- [ ] 광고 포함: **아니요**
- [ ] 뉴스 앱: 아니요
- [ ] Data safety: [DATA_SAFETY_ANSWERS.md](./DATA_SAFETY_ANSWERS.md) 대로
- [ ] 대상 연령: **만 18세 이상** (Families/아동 아님)
- [ ] IARC 콘텐츠 등급 설문 완료
- [ ] 금융·건강·정부 등 특수 카테고리: 해당 없음

## 4. 빌드 업로드

- [ ] `eas build --platform android --profile preview` 또는 `production`
- [ ] AAB 다운로드 → (선택) `play-store/builds/`에만 보관
- [ ] 내부 테스트 트랙에 AAB 업로드 + 본인 계정 테스터 추가
- [ ] 실기기에서: 홈→퀴즈→결과→저장/공유→다시하기 확인
- [ ] 프로덕션 트랙으로 승격 또는 업로드

## 5. 제출 전 최종

- [ ] 국가/지역 선택
- [ ] 가격: 무료
- [ ] 스토어 등록정보 모든 언어 언어 완료
- [ ] 심사 노트(선택): 게스트 전용, 서버 수집 없음, 사진 저장만 권한

## Git에 올리면 안 되는 것

이미 `.gitignore`에 반영됨:

- `*.aab` / `*.apk` / `*.ipa`
- `play-store/builds/**`
- `play-store/secrets/**`
- `*.jks` / `*.keystore` / 서비스계정 JSON / `.env`
