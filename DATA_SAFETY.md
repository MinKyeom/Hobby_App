# Play Data safety · App Privacy (Nutrition Label) 작성 가이드

앱은 **서버로 사용자 데이터를 수집하지 않습니다.**  
콘솔 답변은 아래와 일치하게 작성하세요. (SDK·권한 변경 시 반드시 재검토)

## Google Play — Data safety

| 항목 | 권장 답변 |
|------|-----------|
| 사용자 데이터 수집·공유 여부 | **아니요** (서버 수집 없음) |
| 보안 관행 | 전송 중 데이터 암호화: 해당 없음(전송 없음) / 사용자가 데이터 삭제 요청 가능: 계정 없음 → 해당 없음 또는 “앱 삭제·다시하기로 기기 세션 삭제” |
| 데이터 유형 | 수집 안 함 |
| 사진·동영상 | **앱이 업로드·수집하지 않음.** 사용자가 선택 시 기기에만 저장 |
| 광고 ID | **사용 안 함** (`AD_ID` blocked) |
| 계정 생성 | 없음 → 계정 삭제 기능 해당 없음 |

### 권한 설명 (Play Console 설문)

- 사진/미디어: **결과 카드 저장 전용**, 기존 미디어 읽기·업로드 없음
- 위치·마이크·카메라·연락처: **사용 안 함**

## Apple App Store — App Privacy

| 항목 | 권장 답변 |
|------|-----------|
| Privacy Policy URL | `PRIVACY_POLICY_URL` (HTTPS 공개본) |
| Support URL | `SUPPORT_URL` |
| Data Collection | **Data Not Collected** (서버·분석 SDK 없음) |
| Tracking | **No** (`NSPrivacyTracking: false`) |

> 참고: 사용자가 OS 공유 시트로 이미지를 보낼 때, 그 이후 처리는 상대 앱 정책입니다.  
> 본 앱이 SNS에 대리 업로드하거나 추적하지 않습니다.

## 배포 전 체크

- [ ] `SUPPORT_EMAIL`을 실제 메일로 변경
- [ ] `privacy.html` / `support.html` / `licenses.html` HTTPS 호스팅
- [ ] Play Console·App Store Connect URL 등록
- [ ] 광고 포함 여부: **포함 안 함**
- [ ] 대상 연령: **만 18세 이상 성인·직장인** (Families/아동 대상 아님)
