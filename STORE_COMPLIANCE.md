# 스토어 출시 규정 준수 체크리스트 (v1.1)

Play Store · App Store 공통/플랫폼별 요건을 코드·문서에 맞춰 둔 상태입니다.

## 1. 톤 · 안전 (Apple 1.1 / Play 유해 콘텐츠)
- [x] 엔터테인먼트용 소통 성향 진단 (비방·뒷담화 도구 아님)
- [x] 실명·회사명·직책 Input 없음
- [x] 부정 유형도 「유형 설명 + 소통 팁」 프레이밍
- [x] 결과·공유 문구에 면책 (비하 목적 아님)
- [x] 의료·심리 상담 아님 명시 (홈·결과 **최하단** + 개인정보방침, 히어로 미배치)

## 2. Apple 4.2 Minimum Functionality
- [x] 네이티브 화면·애니메이션
- [x] Progress + 이전 문항 + 홈
- [x] 결과 카드 PNG 저장
- [x] OS 시스템 공유
- [x] 다시하기 → 메인
- [x] Error Boundary / 빈 화면 리다이렉트

## 3. 미디어 · 저작권
- [x] Fluent Emoji 3D (MIT · 상업 이용 가능) 로컬 패키징
- [x] 출처·MIT: 앱 「오픈소스·출처」 + `public/licenses.html` + `THIRD_PARTY_NOTICES.md`
- [x] 결과 카드 이미지 옆 출처 미표시 (정책상 필수 아님)

## 4. 개인정보 (Apple 5.1 / Play User Data)
- [x] Guest only · 서버 수집 없음 · 광고/추적 없음
- [x] 저장 시에만 사진 권한 · 목적 문자열 명확화
- [x] 인앱 개인정보 모달 + 고객 지원 링크
- [x] `privacy.html` — 수집/권한/공유/보관·삭제/성인(18+)·의료 고지
- [x] `support.html` — App Store Support URL용
- [x] Data safety / Nutrition Label 작성 가이드: `DATA_SAFETY.md`
- [ ] 실제 문의 이메일로 `SUPPORT_EMAIL` 교체 (배포자)
- [ ] GitHub Pages 등 HTTPS 호스팅 후 Console URL 등록 (배포자)

## 5. 연령 · Families
- [x] **성인·직장인 (만 18세 이상)** — 홈 최하단·개인정보방침
- [ ] Play Console: 대상 연령 **18세 이상만** 선택 (Console 작업)
- [ ] Play: Families / 아동 대상 **해당 없음**

## 6. UGC · 광고
- [x] v1.0 사용자 생성 콘텐츠 없음 (고정 문항)
- [x] 광고 없음 · `AD_ID` blocked

## 7. 플랫폼 설정
- [x] iOS: 사진 권한 목적 문자열 · `ITSAppUsesNonExemptEncryption` · tracking false
- [x] Android: 불필요 권한 blocked (위치·카메라·연락처·AD_ID 등)
- [x] 리스팅 초안: `PLAY_STORE_LISTING.md` · `APP_STORE_LISTING.md`

## 출시 판정
- **앱 코드·정책 문구:** 제출 준비에 가깝음
- **스토어 정식 제출:** 실제 메일·HTTPS URL·EAS 빌드·스크린샷·Console 설문 완료 후
