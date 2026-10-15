/** 스토어 심사·사이버불링 방지용 고정 문구 */
export const RESULT_DISCLAIMER =
  '※ 재미로 즐기는 소통 성향 진단이며, 특정 사람을 비하하려는 목적이 아닙니다.';

export const APP_PURPOSE =
  '부하편·상사편 소통 성향을 동물 유형과 ___력 리포트로 살펴보는 가벼운 심리 진단입니다. 특정인을 비방하는 도구가 아닙니다.';

/** 스토어 리스팅·문의용 — 배포 전 실제 이메일로 교체하세요 */
export const SUPPORT_EMAIL = 'support@example.com';

/**
 * 스토어 제출 시 필수: 이 URL을 GitHub Pages 등으로 호스팅한 뒤
 * Play Console / App Store Connect에 등록하세요.
 * 로컬 파일: /public/privacy.html
 */
export const PRIVACY_POLICY_URL =
  'https://minkyeom.github.io/Hobby_App/privacy.html';

export const PRIVACY_POLICY = {
  title: '개인정보 처리방침',
  updatedAt: '2026-10-14',
  sections: [
    {
      heading: '1. 수집하는 개인정보',
      body: '본 앱은 회원가입·로그인·SNS 계정 연동 없이 이용할 수 있습니다. 이름, 이메일, 전화번호, 회사명, 직책 등 개인을 식별할 수 있는 정보를 수집하지 않습니다.',
    },
    {
      heading: '2. 기기 권한',
      body: '위치, 연락처, 마이크, 카메라 등 불필요한 권한을 요청하지 않습니다. 결과 카드 이미지를 사진첩에 저장할 때만, 사용자의 선택에 따라 갤러리/저장소 권한을 요청합니다.',
    },
    {
      heading: '3. 데이터 저장',
      body: '진단 응답과 결과는 기기 메모리(세션)에서만 일시적으로 사용되며, 서버로 전송하거나 외부에 저장하지 않습니다.',
    },
    {
      heading: '4. 공유 기능',
      body: '결과 공유는 OS 시스템 공유 시트를 통해 이루어집니다. 공유 내용은 사용자가 직접 선택·전송하며, 본 앱이 SNS 계정을 연동하거나 게시물을 대리 업로드하지 않습니다.',
    },
    {
      heading: '5. 문의',
      body: `개인정보 관련 문의: ${SUPPORT_EMAIL}`,
    },
  ],
} as const;
