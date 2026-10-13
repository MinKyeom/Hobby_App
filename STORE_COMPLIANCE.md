# 스토어 출시 규정 준수 체크리스트 (v1.0)

## 1. 톤 & 사이버불링 방지
- [x] 컨셉: 소통 성향 심리 테스트 (비방/뒷담화 도구 아님)
- [x] 실명·회사명·직책 Input 없음
- [x] 부정 유형도 「유형 설명 + 소통 팁」 프레이밍
- [x] 결과 하단 고정 면책 문구

## 2. Apple 4.2 Minimum Functionality
- [x] 네이티브 화면 전환 애니메이션 (Reanimated)
- [x] Progress Bar + 질문 카운트
- [x] 결과 카드 PNG 저장 (view-shot + media-library)
- [x] OS 시스템 공유 (카카오톡/X/Facebook/Instagram 선택)
- [x] 다시 테스트 → 메인 이동

> 카카오톡: Expo Go 호환을 위해 OS Share Sheet 경유. 카카오 커스텀 템플릿이 필요하면 개발 빌드 + Kakao SDK 추가.

## 3. 미디어 / 저작권
- [x] Pexels 상업 이용 가능 동물 사진만 로컬 패키징 (`assets/animals/`)
- [x] 사람 얼굴·브랜드 로고 배제 큐레이션
- [x] 카드에 Pexels 출처 표기

## 4. 개인정보
- [x] Guest Mode Only (회원가입/로그인 없음)
- [x] 불필요 권한 미요청 (저장 시에만 갤러리)
- [x] 개인정보 처리방침 모달 (홈 하단 링크)

## 5. UGC
- [x] v1.0 질문/평가 생성·편집 기능 없음 (고정 5문항 트리)
