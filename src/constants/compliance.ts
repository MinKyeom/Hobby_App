/** Play / App Store 심사·리스팅용 고정 문구 */

/** 결과 화면 최하단 — 짧게 (사용 흐름 방해 최소화) */
export const RESULT_DISCLAIMER =
  '※ 재미용 진단입니다. 의료·상담·인사평가가 아니며, 특정 사람 비하 목적이 없습니다.';

/**
 * 홈 화면 최하단 배치용 (히어로·CTA 위에는 두지 않음)
 * Play 대상: 성인·직장인
 */
export const FOOTER_NOTICE =
  '만 18세 이상 · 직장인 대상 엔터테인먼트 (의료·상담 아님)';

export const APP_PURPOSE =
  '성인·직장인을 위한 부하편·상사편 소통 성향 엔터테인먼트 진단입니다. 의료·심리 상담 또는 특정인 비방 도구가 아닙니다.';

/**
 * 스토어 리스팅·문의용 — 배포 전 실제 이메일로 교체하세요.
 * App Store / Play Console의 지원·개인정보 연락처와 동일하게 맞춥니다.
 */
export const SUPPORT_EMAIL = 'support@example.com';

/**
 * 스토어 제출 시 필수: GitHub Pages 등으로 HTTPS 공개 후
 * Play Console · App Store Connect에 등록하세요.
 */
export const PRIVACY_POLICY_URL =
  'https://minkyeom.github.io/Hobby_App/privacy.html';

/** Apple Support URL / Play 고객센터용 */
export const SUPPORT_URL = 'https://minkyeom.github.io/Hobby_App/support.html';

/** 이미지·오픈소스 고지 */
export const LICENSES_URL =
  'https://minkyeom.github.io/Hobby_App/licenses.html';

/** 타깃 연령 — Play Console 대상 연령을 성인(18+)으로 설정 */
export const TARGET_AGE_MIN = 18;

/** Play 대상 설명 (Console 메모용) */
export const TARGET_AUDIENCE = '성인·직장인 (만 18세 이상)';

export const PRIVACY_POLICY = {
  title: '개인정보 처리방침',
  updatedAt: '2026-10-15',
  sections: [
    {
      heading: '1. 운영자·앱 정보',
      body: `앱명: 오피스 동물 진단: 부하편 & 상사편. 문의: ${SUPPORT_EMAIL}. 지원 페이지: ${SUPPORT_URL}`,
    },
    {
      heading: '2. 수집하는 개인정보',
      body: '본 앱은 회원가입·로그인·SNS 계정 연동 없이 이용할 수 있습니다. 이름, 이메일, 전화번호, 회사명, 직책, 정확한 위치 등 개인을 식별할 수 있는 정보를 수집·전송하지 않습니다. 진단 응답과 결과는 기기 메모리(앱 세션)에서만 일시적으로 사용됩니다.',
    },
    {
      heading: '3. 기기 권한',
      body: '위치, 연락처, 마이크, 카메라, 광고 ID 등 불필요한 권한을 요청하지 않습니다. 결과 카드 이미지를 사진첩에 저장할 때만, 사용자의 선택에 따라 사진 라이브러리/미디어 저장 권한을 요청합니다. 기존 사진을 읽거나 서버로 업로드하지 않습니다.',
    },
    {
      heading: '4. 데이터 이용·공유',
      body: '앱이 수집하는 서버 측 사용자 데이터는 없습니다. 분석 SDK·광고 SDK를 사용하지 않습니다. 결과 공유는 OS 시스템 공유 시트를 통해 사용자가 직접 선택한 앱으로만 전달되며, 본 앱이 SNS 계정을 연동하거나 게시물을 대리 업로드하지 않습니다.',
    },
    {
      heading: '5. 보관·삭제',
      body: '진단 응답·결과는 기기에만 잠시 보관되며 서버에 저장되지 않습니다. 「다시하기」로 세션을 초기화하거나 앱을 종료·삭제하면 기기 내 세션 데이터가 삭제됩니다. 서버에 보관된 계정·프로필이 없어 별도의 계정 삭제 요청 절차는 필요하지 않습니다. 사진첩에 직접 저장한 이미지는 사용자가 기기에서 삭제할 수 있습니다.',
    },
    {
      heading: '6. 대상 연령·아동',
      body: `본 앱은 직장·오피스 소통을 주제로 한 성인·직장인 대상 엔터테인먼트입니다. 만 ${TARGET_AGE_MIN}세 이상 이용을 대상으로 하며, 아동·청소년용으로 설계·마케팅하지 않습니다. 아동으로부터 고의로 개인정보를 수집하지 않습니다.`,
    },
    {
      heading: '7. 의료·상담 관련 고지',
      body: '본 앱의 결과·___력 리포트는 재미·자기 성찰용 엔터테인먼트이며, 의료 기기·진단·치료·심리 상담·인사 평가를 대체하지 않습니다. 건강·정신건강이 걱정되면 전문 기관·상담사와 상담하세요.',
    },
    {
      heading: '8. 이미지·오픈소스 고지',
      body: `동물 일러스트 등 서드파티 자산의 출처·라이선스는 개인정보와 별도로 앱 내 「오픈소스·출처」 및 ${LICENSES_URL} 에 안내합니다. 결과 카드 UI에는 표시하지 않습니다.`,
    },
    {
      heading: '9. 문의·정책 변경',
      body: `개인정보·지원 문의: ${SUPPORT_EMAIL}. 본 방침이 변경되면 앱·웹 페이지의 업데이트 일자를 갱신합니다.`,
    },
  ],
} as const;

/**
 * MIT 등 오픈소스/이미지 고지.
 * Play·App Store는 이미지 옆 표기를 요구하지 않으며,
 * 앱 내 About/Credits에 고지하는 관행이 일반적입니다.
 */
export const OPEN_SOURCE_NOTICES = {
  title: '오픈소스·출처',
  updatedAt: '2026-10-15',
  intro:
    '본 앱은 상업적 이용이 허용된 오픈소스 자산과 라이브러리를 사용합니다. 아래 고지는 MIT 라이선스 등에서 요구하는 저작권·허가 고지를 포함합니다.',
  sections: [
    {
      heading: 'Microsoft Fluent Emoji (동물 일러스트)',
      body: [
        '용도: 결과 화면의 동물 3D 일러스트',
        '출처: https://github.com/microsoft/fluentui-emoji',
        '라이선스: MIT License',
        '상업적 이용: 가능 (판매·배포·수정 포함)',
        '고지 의무: 저작권 고지와 허가 문구를 배포물에 포함 (이미지 바로 아래 표기는 필수 아님)',
        '',
        'Copyright (c) Microsoft Corporation.',
        '',
        'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:',
        '',
        'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.',
        '',
        'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
      ].join('\n'),
    },
    {
      heading: '기타 안내',
      body: 'Expo 및 앱에 포함된 기타 오픈소스 의존성도 각 패키지 라이선스를 따릅니다. 문의는 개인정보 처리방침의 연락처로 남겨 주세요.',
    },
  ],
} as const;
