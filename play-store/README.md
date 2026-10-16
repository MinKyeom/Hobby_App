# Google Play 업로드 준비 키트

이 폴더는 **Play Console 제출에 필요한 리스팅·그래픽·체크리스트**를 모아 둡니다.  
`.aab` 바이너리와 서명 키는 Git에 올리지 않습니다 (`.gitignore`).

## 최종 업로드 순서 (요약)

1. 개인정보처리방침 HTTPS URL 공개 → Console에 등록  
2. `eas build --platform android --profile production` 으로 **AAB** 생성  
3. Play Console에 AAB 업로드 (내부 테스트 → 프로덕션)  
4. 스토어 등록정보·그래픽·Data safety·대상 연령 작성  
5. 심사 제출

상세: [EAS_FIRST_BUILD.md](./EAS_FIRST_BUILD.md) · [UPLOAD_CHECKLIST.md](./UPLOAD_CHECKLIST.md) · [AAB_BUILD.md](./AAB_BUILD.md)

## 폴더 구조

```
play-store/
  README.md                 ← 지금 파일
  UPLOAD_CHECKLIST.md       ← Console 필드별 체크
  AAB_BUILD.md              ← EAS로 .aab 만드는 방법
  LISTING_KO.md             ← 앱 이름·설명 복붙용
  DATA_SAFETY_ANSWERS.md    ← Data safety 답변 요약
  ATTRIBUTION.txt           ← OpenMoji 출처
  graphics/
    icon-512.png            ← 고해상도 아이콘 (512×512)
    feature-graphic-1024x500.png  ← 특집 그래픽
  screenshots/phone/
    01-home.png … 04-share.png    ← 휴대폰 스크린샷 (1080×1920)
  builds/                   ← (로컬) 다운로드한 .aab 보관. Git 무시
  secrets/                  ← (로컬) 서비스계정 JSON 등. Git 무시
```

## 필수 URL (배포 후 확정)

| Console 필드 | 권장 URL |
|--------------|----------|
| 개인정보처리방침 | `https://minkowskim.com/apps/office-animal-diagnosis/privacy` |
| (선택) 지원 | 동일 사이트 지원 페이지 또는 문의 메일 |

개인정보 페이지 생성 프롬프트: `../PROMPTS/CREATE_PRIVACY_PAGE_ON_MINKOWSKIM.md`

## 패키지 · 버전

| 항목 | 값 |
|------|-----|
| 패키지명 | `com.minkyeom.workplaceanimaldiagnosis` |
| versionName | `app.json` → `expo.version` (예: 1.0.0) |
| versionCode | EAS production `autoIncrement` |

## 그래픽 재생성

```bash
cd Hobby_App
python3 -m venv .venv-assets   # 최초 1회
.venv-assets/bin/pip install pillow
.venv-assets/bin/python scripts/generate-play-store-assets.py
```

일러스트: Microsoft Fluent Emoji (MIT, 상업 이용 가능) — [ATTRIBUTION.txt](./ATTRIBUTION.txt)
