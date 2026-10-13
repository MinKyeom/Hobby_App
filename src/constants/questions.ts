import type { Question, Role } from '@/types/quiz';

export const TOTAL_STEPS = 5;

/** 선택지 톤: 관찰·성향 묘사 중심 (인신공격/비하 표현 지양) */
const bossQuestions: Question[] = [
  {
    id: 'boss-q1',
    step: 1,
    prompt: '월요일 아침, 상사가 업무 메신저로 보내는 첫 메시지 스타일은?',
    choices: [
      {
        id: 'A',
        label: '"주말 잘 보냈어요? 오늘 진행 건 차근차근 공유 부탁해요~"',
        nextId: 'boss-q2a',
      },
      {
        id: 'B',
        label: '인사 없이 짧은 독촉형으로 바로 진행 상황을 묻는다.',
        nextId: 'boss-q2b',
      },
    ],
  },
  {
    id: 'boss-q2a',
    step: 2,
    prompt: '팀 점심 메뉴를 정할 때 상사의 모습은?',
    choices: [
      {
        id: 'A1',
        label: '팀원들의 호불호를 배려해서 결단력 있게 정한다.',
        nextId: 'boss-q3a1',
      },
      {
        id: 'A2',
        label: '"아무거나"라고 해놓고 제안에는 계속 망설인다.',
        nextId: 'boss-q3a2',
      },
    ],
  },
  {
    id: 'boss-q2b',
    step: 2,
    prompt: '업무 지시를 내릴 때 상사의 스타일은?',
    choices: [
      {
        id: 'B1',
        label: '지시가 자주 바뀌고 방향을 다시 조정하는 편이다.',
        nextId: 'boss-q3b1',
      },
      {
        id: 'B2',
        label: '세부 사항까지 직접 확인하고 싶어 하는 편이다.',
        nextId: 'boss-q3b2',
      },
    ],
  },
  {
    id: 'boss-q3a1',
    step: 3,
    prompt: '프로젝트 중 예상치 못한 실수가 터졌을 때 반응은?',
    choices: [
      {
        id: 'A1',
        label: '"해결책부터 찾아보자"며 함께 앞장선다.',
        nextId: 'boss-q4a',
      },
      {
        id: 'A2',
        label: '비난은 않지만 한숨·표정으로 아쉬움을 드러낸다.',
        nextId: 'boss-q4a',
      },
    ],
  },
  {
    id: 'boss-q3a2',
    step: 3,
    prompt: '프로젝트 중 예상치 못한 실수가 터졌을 때 반응은?',
    choices: [
      {
        id: 'A1',
        label: '"해결책부터 찾아보자"며 함께 앞장선다.',
        nextId: 'boss-q4a',
      },
      {
        id: 'A2',
        label: '비난은 없지만 한숨·표정으로 아쉬움을 드러낸다.',
        nextId: 'boss-q4a',
      },
    ],
  },
  {
    id: 'boss-q3b1',
    step: 3,
    prompt: '팀원에게 피드백을 줄 때 상사의 방식은?',
    choices: [
      {
        id: 'B1',
        label: '여러 사람이 있는 자리에서 바로 피드백한다.',
        nextId: 'boss-q4b',
      },
      {
        id: 'B2',
        label: '경쟁 의식을 드러내며 관계가 긴장되는 편이다.',
        nextId: 'boss-q4b',
      },
    ],
  },
  {
    id: 'boss-q3b2',
    step: 3,
    prompt: '팀원에게 피드백을 줄 때 상사의 방식은?',
    choices: [
      {
        id: 'B1',
        label: '여러 사람이 있는 자리에서 바로 피드백한다.',
        nextId: 'boss-q4b',
      },
      {
        id: 'B2',
        label: '경쟁 의식을 드러내며 관계가 긴장되는 편이다.',
        nextId: 'boss-q4b',
      },
    ],
  },
  {
    id: 'boss-q4a',
    step: 4,
    prompt: '팀원이 실수를 했을 때 상사의 지적 방식은?',
    choices: [
      {
        id: 'A1',
        label: '단둘이 불러 원인과 개선안 중심으로 피드백한다.',
        nextId: 'boss-q5a',
      },
      {
        id: 'A2',
        label: '다른 팀 이야기를 하다 업무가 자연스럽게 넘어오기도 한다.',
        nextId: 'boss-q5a',
      },
    ],
  },
  {
    id: 'boss-q4b',
    step: 4,
    prompt: '다른 팀이나 상사에 대해 이야기할 때 모습은?',
    choices: [
      {
        id: 'B1',
        label: '다른 팀 이슈를 말하다 업무가 나에게 넘어오는 경우가 있다.',
        nextId: 'boss-q5b',
      },
      {
        id: 'B2',
        label: '한쪽 입장에 기울어 팀 분위기가 나뉠 때가 있다.',
        nextId: 'boss-q5b',
      },
    ],
  },
  {
    id: 'boss-q5a',
    step: 5,
    prompt: '퇴근 시간 10분 전, 상사의 태도는?',
    choices: [
      {
        id: 'A1',
        label: '"오늘 고생 많았어요!" 하며 정시 퇴근을 권장한다.',
      },
      {
        id: 'A2',
        label: '챙김의 온도가 사람마다 달라 보이는 편이다.',
      },
    ],
  },
  {
    id: 'boss-q5b',
    step: 5,
    prompt: '업무 시간 외(야근, 주말, 휴가) 연락 태도는?',
    choices: [
      {
        id: 'B1',
        label: '급하지 않은 일도 주말·밤에 메시지로 묻는 편이다.',
      },
      {
        id: 'B2',
        label: '퇴근 직전에 새 업무를 짧게 전달하는 편이다.',
      },
    ],
  },
];

const employeeQuestions: Question[] = [
  {
    id: 'emp-q1',
    step: 1,
    prompt: '어려운 난이도의 새 프로젝트가 주어졌을 때 부하 직원의 반응은?',
    choices: [
      {
        id: 'A',
        label: '"어려워 보이지만 일단 도전해 보겠습니다!"',
        nextId: 'emp-q2a',
      },
      {
        id: 'B',
        label: '부담을 드러내며 역할·이유부터 확인하려는 태도를 보인다.',
        nextId: 'emp-q2b',
      },
    ],
  },
  {
    id: 'emp-q2a',
    step: 2,
    prompt: '업무 진행 상황 보고 타이밍 및 속도는?',
    choices: [
      {
        id: 'A1',
        label: '물어보지 않아도 진행 상황을 주기적으로 공유한다.',
        nextId: 'emp-q3a1',
      },
      {
        id: 'A2',
        label: '끝난 뒤에 한 번에 결과만 보여주는 편이다.',
        nextId: 'emp-q3a2',
      },
    ],
  },
  {
    id: 'emp-q2b',
    step: 2,
    prompt: '업무 마감 기한 및 완성품 전달 태도는?',
    choices: [
      {
        id: 'B1',
        label: '완료 후에도 공유 페이스가 느린 편이다.',
        nextId: 'emp-q3b1',
      },
      {
        id: 'B2',
        label: '마감이 밀리거나 완성도가 들쭉날쭉한 편이다.',
        nextId: 'emp-q3b2',
      },
    ],
  },
  {
    id: 'emp-q3a1',
    step: 3,
    prompt: '업무 중 본인이 실수를 했다는 것을 깨달았을 때?',
    choices: [
      {
        id: 'A1',
        label: '즉시 솔직하게 보고하고 대안을 함께 제시한다.',
        nextId: 'emp-q4a',
      },
      {
        id: 'A2',
        label: '혼자 먼저 해결하려다 범위가 커질 때가 있다.',
        nextId: 'emp-q4a',
      },
    ],
  },
  {
    id: 'emp-q3a2',
    step: 3,
    prompt: '업무 중 본인이 실수를 했다는 것을 깨달았을 때?',
    choices: [
      {
        id: 'A1',
        label: '즉시 솔직하게 보고하고 대안을 함께 제시한다.',
        nextId: 'emp-q4a',
      },
      {
        id: 'A2',
        label: '혼자 먼저 해결하려다 범위가 커질 때가 있다.',
        nextId: 'emp-q4a',
      },
    ],
  },
  {
    id: 'emp-q3b1',
    step: 3,
    prompt: '팀 분위기가 바쁘거나 야근 중일 때 행동은?',
    choices: [
      {
        id: 'B1',
        label: '바쁜 날에도 자신의 페이스로 먼저 자리를 정리하는 편이다.',
        nextId: 'emp-q4b',
      },
      {
        id: 'B2',
        label: '자리·응답 리듬이 들쭉날쭉한 편이다.',
        nextId: 'emp-q4b',
      },
    ],
  },
  {
    id: 'emp-q3b2',
    step: 3,
    prompt: '팀 분위기가 바쁘거나 야근 중일 때 행동은?',
    choices: [
      {
        id: 'B1',
        label: '바쁜 날에도 자신의 페이스로 먼저 자리를 정리하는 편이다.',
        nextId: 'emp-q4b',
      },
      {
        id: 'B2',
        label: '자리·응답 리듬이 들쭉날쭉한 편이다.',
        nextId: 'emp-q4b',
      },
    ],
  },
  {
    id: 'emp-q4a',
    step: 4,
    prompt: '업무를 완성했을 때 부하 직원의 제출 방식은?',
    choices: [
      {
        id: 'A1',
        label: '완성되는 즉시 검토 후 깔끔하게 공유한다.',
        nextId: 'emp-q5a',
      },
      {
        id: 'A2',
        label: '끝난 뒤에도 공유까지 시간이 걸리는 편이다.',
        nextId: 'emp-q5a',
      },
    ],
  },
  {
    id: 'emp-q4b',
    step: 4,
    prompt: '피드백을 받았을 때 반응은?',
    choices: [
      {
        id: 'B1',
        label: '먼저 맥락·사유를 설명하려는 경향이 있다.',
        nextId: 'emp-q5b',
      },
      {
        id: 'B2',
        label: '표정이 굳어지며 대화 온도가 낮아지는 편이다.',
        nextId: 'emp-q5b',
      },
    ],
  },
  {
    id: 'emp-q5a',
    step: 5,
    prompt: '팀 전체가 바쁘게 일하고 있을 때 부하 직원의 행동은?',
    choices: [
      {
        id: 'A1',
        label: '도움이 필요한지 묻고 적극적으로 협조한다.',
      },
      {
        id: 'A2',
        label: '자신의 에너지를 먼저 관리하며 자리를 정리하는 편이다.',
      },
    ],
  },
  {
    id: 'emp-q5b',
    step: 5,
    prompt: '팀 회식이나 단체 모임 자리에서의 모습은?',
    choices: [
      {
        id: 'B1',
        label: '자리에 있어도 개인 리듬을 유지하며 일찍 자리를 뜬다.',
      },
      {
        id: 'B2',
        label: '단체 자리보다 개인 공간을 더 중요하게 여기는 편이다.',
      },
    ],
  },
];

const byId = (list: Question[]) =>
  Object.fromEntries(list.map((q) => [q.id, q])) as Record<string, Question>;

export const questionsByRole: Record<Role, Record<string, Question>> = {
  boss: byId(bossQuestions),
  employee: byId(employeeQuestions),
};

export const startQuestionId: Record<Role, string> = {
  boss: 'boss-q1',
  employee: 'emp-q1',
};
