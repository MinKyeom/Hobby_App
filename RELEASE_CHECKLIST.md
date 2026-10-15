# 스토어 출시 체크리스트

## A. 앱 기능 (코드)

- [x] 홈 → 퀴즈 → 결과 → 공유/저장 → 다시하기
- [x] 이전 문항 / 홈 이동 + 분기형 선택
- [x] 면책(비하·의료) · 인신공격성 카피 완화
- [x] 실명·회사명 Input 없음
- [x] Error Boundary + 폰트 로드 타임아웃
- [x] 결과 카드 캡처·저장·공유 폴백
- [x] Fluent Emoji (MIT) + 「오픈소스·출처」 고지
- [x] 개인정보·지원·라이선스 인앱 접근
- [x] a11y 라벨 (주요 버튼·진행률)

## B. 배포 전 필수 (직접 설정)

- [ ] `SUPPORT_EMAIL`을 실제 메일로 변경 (`compliance.ts`, `public/*.html`)
- [ ] `privacy.html` / `support.html` / `licenses.html` HTTPS 호스팅
- [ ] `PRIVACY_POLICY_URL` · `SUPPORT_URL` · `LICENSES_URL` 실URL 확인
- [ ] Play Console: Privacy · Data safety · 광고 없음 · 대상 연령 13+ · IARC 등급
- [ ] App Store Connect: Privacy Policy · Support URL · App Privacy(Data Not Collected)
- [ ] `npx eas-cli@latest init` 후 `extra.eas.projectId` 기록
- [ ] 브랜드 아이콘 / 스플래시 / 스토어 스크린샷
- [ ] 실기기에서 저장·공유·권한 거부 시나리오
- [ ] Expo Go가 아닌 **EAS preview/production** 빌드로 최종 확인

## C. 제출 시 권장 리뷰 노트

> 게스트 전용 엔터테인먼트 진단 앱입니다. 회원가입·서버 전송·광고·추적 없음.
> 결과 카드 저장 시에만 사진 라이브러리 권한을 요청합니다 (기존 사진 읽기·업로드 없음).
> 공유는 OS 시스템 공유 시트를 사용합니다 (카카오 네이티브 SDK 미사용).
> 일러스트: Microsoft Fluent Emoji (MIT), 출처는 앱 내 「오픈소스·출처」.
> 의료·심리 상담이 아니며, 특정인 비방 목적이 아닙니다.
