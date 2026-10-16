# 프롬프트: minkowskim.com 앱 전용 개인정보 처리방침 페이지

> **사용법**  
> 아래 `--- 프롬프트 본문 ---`부터 끝까지를 복사해, [https://minkowskim.com/](https://minkowskim.com/) 웹사이트 코드베이스에서 작업하는 AI/개발자에게 붙여 넣으세요.  
> Hobby_App 앱 코드는 수정하지 말고, **개인 웹사이트 쪽만** 페이지를 추가합니다.

---

## 목표 URL (권장)

Google Play Console에 넣을 HTTPS URL 예시 (하나만 선택):

| 우선순위 | URL | 설명 |
|----------|-----|------|
| **권장** | `https://minkowskim.com/apps/office-animal-diagnosis/privacy` | 앱 전용 네임스페이스, 블로그와 분리 |
| 대안 | `https://minkowskim.com/apps/office-animal-diagnosis/privacy-policy` | 영문 경로 |
| 비권장 | `/privacy`, `/privacy-policy` | 사이트 전체 개인정보방침처럼 보여 홈/기존 페이지와 혼동 |

배포 후 Hobby_App의 다음 값을 해당 URL로 교체:

- `src/constants/compliance.ts` → `PRIVACY_POLICY_URL`
- `app.json` → `privacyPolicyUrl` (있는 경우)
- `PLAY_STORE_LISTING.md` / `APP_STORE_LISTING.md` 표의 개인정보처리방침 URL

문의 이메일은 배포 전 `support@example.com`을 **실제 메일**로 통일합니다.

---

## --- 프롬프트 본문 ---

```text
역할: 당신은 https://minkowskim.com/ (MinKowskiM) 개인 웹사이트 코드베이스를 수정하는 프론트엔드/풀스택 개발자입니다.

## 미션
Google Play 스토어 제출용으로, **모바일 앱 「오피스 동물 진단: 부하편 & 상사편」 전용 개인정보 처리방침 페이지 1개만** 추가하세요.

## 절대 하지 말 것 (기존 사이트 보호)
- 홈(`/`), 블로그 목록·포스트, 네비게이션, 푸터, 테마, 레이아웃, SEO 기본 메타, 챗봇, CS 페이지 등 **기존 UI/라우트/콘텐츠를 변경·삭제하지 마세요.**
- 사이트 전역 개인정보방침처럼 보이는 `/privacy` 단독 경로를 만들지 마세요.
- 홈·메뉴에 이 페이지 링크를 **굳이 추가하지 마세요.** (Play Console에 URL만 넣으면 됨. 직접 URL 접근만 가능하면 충분)
- 블로그 포스트로 올리지 마세요. (피드·Recent Posts에 노출되면 안 됨)
- 도메인·리다이렉트·기존 라우팅 규칙을 깨지 마세요.

## URL / 라우팅
반드시 앱 전용 느낌이 나는 **독립 경로**로만 만드세요.

권장 최종 URL:
  https://minkowskim.com/apps/office-animal-diagnosis/privacy

구현 시:
- 프레임워크(Next.js / Astro / SPA 등)에 맞게 정적 또는 SSR 페이지 1개 추가
- 해당 경로만 라우팅에 등록
- 페이지는 HTTPS로 공개되어야 함 (Play 필수)
- noindex는 선택(스토어용이라 검색 노출 불필요하면 `<meta name="robots" content="noindex">` 가능). 단 URL은 누구나 접근 가능해야 함

## 페이지 성격
- 개인 블로그 “글”이 아니라 **앱 정책 문서 페이지**
- 미니멀한 문서형 레이아웃(제목 + 섹션). 블로그 카드/히어로/포스트 목록 UI 재사용 금지
- 기존 사이트 폰트·색을 살짝 맞추는 정도는 OK, 단 독립 문서처럼 보이게
- 모바일에서도 읽기 쉽게 max-width ~720px, 본문 line-height 여유

## 앱 메타 (페이지에 명시)
- 앱명(전체): 오피스 동물 진단: 부하편 & 상사편
- 앱명(짧게): 오피스 동물 진단
- Android package: com.minkyeom.workplaceanimaldiagnosis
- 운영 사이트: https://minkowskim.com/
- 문의 이메일: (배포자 실제 이메일로 placeholder 교체. 예: 사이트에 쓰는 연락처. 없으면 TODO 주석으로 표시)
- 최종 업데이트: 오늘 날짜(YYYY-MM-DD)

## 본문 섹션 (한국어, 아래 내용을 충실히 반영 — 의미 왜곡·축소 금지)

### 1. 운영자·앱 정보
앱명, package명, 문의 이메일, (선택) 지원 문구. 이 페이지가 minkowskim.com에 호스팅된 **앱 전용 정책 페이지**임을 짧게 명시.

### 2. 수집하는 개인정보
- 회원가입·로그인·SNS 계정 연동 없음
- 이름, 이메일, 전화번호, 회사명, 직책, 정확한 위치 등 식별 정보 수집·전송 없음
- 진단 응답·결과는 기기 메모리(앱 세션)에서만 일시 사용

### 3. 기기 권한
- 위치, 연락처, 마이크, 카메라, 광고 ID 등 불필요 권한 요청 없음
- 결과 카드 이미지를 사진첩에 저장할 때만, 사용자 선택에 따라 사진 라이브러리/미디어 저장 권한 요청
- 기존 사진을 읽거나 서버로 업로드하지 않음

### 4. 데이터 이용·공유
- 서버 측 사용자 데이터 수집 없음
- 분석 SDK·광고 SDK 미사용
- 결과 공유는 OS 시스템 공유 시트로 사용자가 선택한 앱으로만 전달
- 본 앱이 SNS 계정 연동·대리 업로드 하지 않음

### 5. 보관·삭제
- 진단 응답·결과는 기기에만 잠시 보관, 서버 미저장
- 「다시하기」 또는 앱 종료·삭제 시 세션 데이터 삭제
- 서버 계정·프로필 없음 → 별도 계정 삭제 절차 불필요
- 사진첩에 저장한 이미지는 사용자가 기기에서 삭제

### 6. 대상 연령·아동
- 성인·직장인 대상 엔터테인먼트, 만 18세 이상
- 아동·청소년용으로 설계·마케팅하지 않음
- 아동으로부터 고의로 개인정보 수집하지 않음

### 7. 의료·상담 관련 고지
- 결과·___력 리포트는 재미·자기 성찰용 엔터테인먼트
- 의료 기기·진단·치료·심리 상담·인사 평가를 대체하지 않음
- 건강·정신건강 걱정 시 전문 기관·상담사 상담 권고

### 8. 이미지·오픈소스 고지 (짧게)
- 동물 일러스트 등 서드파티 자산의 상세 라이선스는 앱 내 「오픈소스·출처」에 안내
- 이 개인정보 페이지에 MIT 전문 전체를 길게 붙이지 말 것 (필요 시 “앱 내 고지 참고” 한 줄)

### 9. 문의·정책 변경
- 문의 이메일
- 방침 변경 시 본 페이지의 업데이트 일자 갱신

## HTML/접근성
- `<html lang="ko">`
- 의미 있는 `<h1>`, `<h2>` 구조
- 제목 예: `개인정보 처리방침 | 오피스 동물 진단`
- mailto 링크

## 완료 조건 체크리스트
1. `https://minkowskim.com/apps/office-animal-diagnosis/privacy` (또는 합의한 동일 계열 URL)로 접속 시 방침 전문이 보임
2. 홈·블로그·기존 메뉴/레이아웃 변경 없음
3. Recent Posts / 사이트맵 글 목록에 이 페이지가 “포스트”로 끼어들지 않음
4. Play Console에 넣을 수 있는 단일 HTTPS URL을 README나 커밋 메시지에 한 줄로 명시
5. 문의 이메일이 placeholder면 파일 상단에 TODO로 표시

## 작업 후 보고
- 추가/수정한 파일 경로 목록
- 최종 공개 URL
- 기존 사이트에 손대지 않았다는 확인
```

---

## Hobby_App 쪽 후속 (웹 페이지 배포 후)

페이지가 살아 있으면 앱 프로젝트에서 URL만 맞춥니다.

```ts
// src/constants/compliance.ts
export const PRIVACY_POLICY_URL =
  'https://minkowskim.com/apps/office-animal-diagnosis/privacy';
```

Play Console → 앱 콘텐츠 → 개인정보처리방침에도 동일 URL을 등록합니다.

---

## 참고 원본 (Hobby_App)

- `public/privacy.html`
- `src/constants/compliance.ts` → `PRIVACY_POLICY`
- 앱명: `src/constants/brand.ts`
