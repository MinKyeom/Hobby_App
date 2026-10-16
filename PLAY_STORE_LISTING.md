# Google Play 스토어 리스팅 초안

## 앱 이름 (50자 이내)
오피스 동물 진단: 부하편 & 상사편

## 짧은 설명 (80자 이내)
부하·상사 소통 성향을 동물 유형과 ___력으로 알아보는 5문항 진단

## 전체 설명
오피스 동물 진단은 성인·직장인을 위한, 가입 없이 즐기는 소통 성향 진단입니다.

🦁 상사편 / 🐝 부하편을 고르고 5문항만 답하면,
나와 닮은 동물 유형과 ___력 리포트가 나옵니다.

【이런 ___력을 볼 수 있어요】
· 부하편: 응답력 · 멘탈수호력 · 수습력 · 상향조율력 · 퇴근감각력
· 상사편: 배분력 · 멘탈케어력 · 과제전달력 · 팀원독려력 · 몰입조율력

【특징】
· 실명·회사명 입력 없음
· 결과 카드 저장 & SNS 공유
· 특정인 비방이 아닌 소통 팁 중심

※ 재미로 즐기는 소통 성향 진단이며, 특정 사람을 비하하려는 목적이 아닙니다.

## 카테고리
엔터테인먼트 (또는 라이프스타일)

## 콘텐츠 등급
IARC 설문 기준 · 폭력·선정성 없음 예상 (Everyone / PEGI 3 근사)

## 대상 연령
**성인·직장인 (만 18세 이상)**  
Play Console → 대상 연령에서 **18세 이상만** 선택 (아동·Families 해당 없음)

## 광고
포함 안 함

## 데이터 보안 (Data safety)
서버 수집 없음 · 광고/추적 없음  
사진 저장 시에만 선택적 미디어 권한 (업로드 없음)  
상세: `DATA_SAFETY.md`

## 필수 URL
| 필드 | URL |
|------|-----|
| 개인정보처리방침 | https://minkowskim.com/apps/office-animal-diagnosis/privacy |
| (선택) 지원 | https://minkowskim.com/apps/office-animal-diagnosis/support |

## 패키지명
com.minkyeom.workplaceanimaldiagnosis

## Play 업로드 키트
그래픽·스크린샷·AAB 절차·체크리스트:

→ **[play-store/README.md](./play-store/README.md)**

## 내부 테스트 빌드 (.aab)
```bash
cd Hobby_App
npm install --legacy-peer-deps
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest build --platform android --profile preview
# 또는 프로덕션:
# npx eas-cli@latest build --platform android --profile production
```

상세: [play-store/AAB_BUILD.md](./play-store/AAB_BUILD.md)  
Play Console → 내부 테스트 트랙에 AAB 업로드 후 테스터 이메일 추가.
