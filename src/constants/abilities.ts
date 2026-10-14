import type { Role } from '@/types/quiz';

/**
 * 순화된 ___력 정의
 * (원안 대비: 비하·조롱 뉘앙스 제거, 관찰·성장 언어로 재정의)
 *
 * 원안 → 순화
 * 넵력 → 응답력 / 시킴력 → 배분력
 * 영혼보존력 → 멘탈수호력 / 멘탈탈곡력 → 멘탈케어력
 * 수습력 → 수습력 / 똥뿌리기력 → 과제전달력
 * 상사핸들링력 → 상향조율력 / 부하우쭈쭈력 → 팀원독려력
 * 칼퇴눈치력 → 퇴근감각력 / 야근소환력 → 몰입조율력
 */
export type AbilityScoreMode = 'harmony' | 'drive';

export interface AbilityDef {
  id: string;
  /** 질문 step 1~5와 1:1 매핑 */
  step: number;
  name: string;
  desc: string;
  mode: AbilityScoreMode;
  /** 대비 축(상대 역할의 력) — 설명용 */
  pairLabel: string;
}

export interface AbilityScore extends AbilityDef {
  value: number; // 0~100
  levelLabel: string;
}

export const EMPLOYEE_ABILITIES: AbilityDef[] = [
  {
    id: 'response',
    step: 1,
    name: '응답력',
    desc: '요청을 빠르게 이해하고 "확인·진행" 신호를 보내는 센스',
    mode: 'harmony',
    pairLabel: '상사 배분력과 맞물리는 축',
  },
  {
    id: 'mental-guard',
    step: 2,
    name: '멘탈수호력',
    desc: '바쁜 흐름 속에서도 페이스와 감정을 지키는 힘',
    mode: 'harmony',
    pairLabel: '상사 멘탈케어력과 맞물리는 축',
  },
  {
    id: 'recovery',
    step: 3,
    name: '수습력',
    desc: '예상 밖 이슈를 정리하고 다음 액션으로 넘기는 순발력',
    mode: 'harmony',
    pairLabel: '상사 과제전달력과 맞물리는 축',
  },
  {
    id: 'upward-sync',
    step: 4,
    name: '상향조율력',
    desc: '윗사람과의 기대치를 부드럽게 맞추는 소통 조율력',
    mode: 'harmony',
    pairLabel: '상사 팀원독려력과 맞물리는 축',
  },
  {
    id: 'off-sense',
    step: 5,
    name: '퇴근감각력',
    desc: '일의 마감과 휴식 리듬을 읽고 경계를 지키는 감각',
    mode: 'drive',
    pairLabel: '상사 몰입조율력과 맞물리는 축',
  },
];

export const BOSS_ABILITIES: AbilityDef[] = [
  {
    id: 'delegate',
    step: 1,
    name: '배분력',
    desc: '일을 역할에 맞게 나누고 자연스럽게 맡기는 힘',
    mode: 'drive',
    pairLabel: '부하 응답력과 맞물리는 축',
  },
  {
    id: 'mental-care',
    step: 2,
    name: '멘탈케어력',
    desc: '팀의 심리적 안전을 지키며 방향을 제시하는 힘',
    mode: 'harmony',
    pairLabel: '부하 멘탈수호력과 맞물리는 축',
  },
  {
    id: 'handoff',
    step: 3,
    name: '과제전달력',
    desc: '업무를 맥락과 함께 명확히 건네는 전달력',
    mode: 'drive',
    pairLabel: '부하 수습력과 맞물리는 축',
  },
  {
    id: 'encourage',
    step: 4,
    name: '팀원독려력',
    desc: '팀원이 스스로 움직이도록 동기와 신뢰를 주는 힘',
    mode: 'harmony',
    pairLabel: '부하 상향조율력과 맞물리는 축',
  },
  {
    id: 'focus-pace',
    step: 5,
    name: '몰입조율력',
    desc: '집중이 필요할 때 팀 페이스를 끌어올리는 조율력',
    mode: 'drive',
    pairLabel: '부하 퇴근감각력과 맞물리는 축',
  },
];

export function abilitiesForRole(role: Role): AbilityDef[] {
  return role === 'boss' ? BOSS_ABILITIES : EMPLOYEE_ABILITIES;
}

export function levelLabel(value: number): string {
  if (value >= 85) return '최상';
  if (value >= 70) return '높음';
  if (value >= 55) return '보통+';
  if (value >= 40) return '보통';
  return '보완 추천';
}
