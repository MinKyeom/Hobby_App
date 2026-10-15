# 직장 동물 진단: 부하편 & 상사편

5문항 분기형 퀴즈로 **소통 성향 동물 유형**과 **___력 리포트**를 보여주는 Expo(React Native) 앱입니다.  
목표는 **Google Play 스토어** 출시입니다.

## 바로 실행 (로컬 테스트)

```bash
cd Hobby_App
npm install --legacy-peer-deps
npx expo start -c
```

- `a` Android · `i` iOS · `w` 웹 · Expo Go QR

## ___력 (순화 명칭)

| 문항 | 부하편 | 상사편 |
|------|--------|--------|
| Q1 | 응답력 | 배분력 |
| Q2 | 멘탈수호력 | 멘탈케어력 |
| Q3 | 수습력 | 과제전달력 |
| Q4 | 상향조율력 | 팀원독려력 |
| Q5 | 퇴근감각력 | 몰입조율력 |

각 선택지가 해당 문항의 ___력 수치에 반영되며, 결과 카드에 함께 표시·공유됩니다.

## Play 출시 흐름

1. `PLAY_STORE_LISTING.md` 문구 확인
2. `SUPPORT_EMAIL` / `privacy.html` HTTPS 공개
3. `eas init` → Android `preview`/`production` 빌드
4. Play Console 내부 테스트 → 프로덕션

상세: [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) · [PLAY_STORE_LISTING.md](./PLAY_STORE_LISTING.md)

## 구조

```
src/app/            # Home / Quiz / Result
src/constants/      # brand, abilities, questions, animals
src/components/     # ResultCard, AbilityBars, Share…
src/utils/          # abilities 점수, 결과 매칭, 공유
```

## 동물 일러스트

결과 카드 이미지는 [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji) 3D (MIT, 상업적 이용 가능 · 출처 표기).  
로컬: `assets/animals/illustrations/` · 상세: `assets/animals/illustrations/ATTRIBUTION.md`