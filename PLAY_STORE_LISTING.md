# Google Play 스토어 리스팅 초안

## 앱 이름 (50자 이내)
직장 동물 진단: 부하편 & 상사편

## 짧은 설명 (80자 이내)
부하·상사 소통 성향을 동물 유형과 ___력으로 진단하는 5문항 심리 테스트

## 전체 설명
직장 동물 진단은 회원가입 없이 바로 즐기는 직장 소통 성향 테스트입니다.

🦁 상사편 / 🐝 부하편을 고르고 5문항만 답하면,
나와 닮은 동물 유형과 순화된 ___력 리포트가 나옵니다.

【이런 ___력을 볼 수 있어요】
· 부하편: 응답력 · 멘탈수호력 · 수습력 · 상향조율력 · 퇴근감각력
· 상사편: 배분력 · 멘탈케어력 · 과제전달력 · 팀원독려력 · 몰입조율력

【특징】
· 실명·회사명 입력 없음
· 결과 카드 저장 & SNS 공유
· 특정인 비방이 아닌 소통 팁 중심

※ 본 테스트는 유쾌한 심리 테스트이며, 특정 인물을 비하하려는 목적이 아닙니다.

## 카테고리
엔터테인먼트 또는 라이프스타일

## 콘텐츠 등급
PEGI 3 / Everyone (폭력·선정성 없음)

## 데이터 보안
데이터 수집 없음 (게스트 전용, 서버 전송 없음)
사진 저장 시에만 선택적 미디어 권한

## 패키지명
com.minkyeom.workplaceanimaldiagnosis

## 내부 테스트 빌드
```bash
cd Hobby_App
npm install --legacy-peer-deps
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest build --platform android --profile preview
```

Play Console → 내부 테스트 트랙에 AAB 업로드 후 테스터 이메일 추가.
