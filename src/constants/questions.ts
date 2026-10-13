import type { Question, Role } from '@/types/quiz';

export const TOTAL_STEPS = 5;

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
        label: '"??? 이거 언제 됨?" 다짜고짜 독촉 및 단답형',
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
        label: '팀원들의 호불호나 식성을 배려해서 결단력 있게 정한다.',
        nextId: 'boss-q3a1',
      },
      {
        id: 'A2',
        label: '"아무거나 먹자" 해놓고 막상 제안하면 은근히 다 거절한다.',
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
        label: '지시 사항이 수시로 바뀌고 본인이 했던 말을 자주 번복한다.',
        nextId: 'boss-q3b1',
      },
      {
        id: 'B2',
        label: '세세한 것 하나까지 본인 뜻대로 해야 하는 마이크로 매니징을 한다.',
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
        label: '"내가 책임질 테니 해결책부터 찾아보자."하며 앞장선다.',
        nextId: 'boss-q4a',
      },
      {
        id: 'A2',
        label: '비난은 안 하지만 은근히 한숨을 쉬며 눈치를 준다.',
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
        label: '"내가 책임질 테니 해결책부터 찾아보자."하며 앞장선다.',
        nextId: 'boss-q4a',
      },
      {
        id: 'A2',
        label: '비난은 안 하지만 은근히 한숨을 쉬며 눈치를 준다.',
        nextId: 'boss-q4a',
      },
    ],
  },
  {
    id: 'boss-q3b1',
    step: 3,
    prompt: '팀원을 혼내거나 지적해야 할 때 상사의 행동은?',
    choices: [
      {
        id: 'B1',
        label: '사람들이 다 보는 공개적인 장소에서 혼낸다.',
        nextId: 'boss-q4b',
      },
      {
        id: 'B2',
        label: '부하를 라이벌처럼 보고 견제하며 은근히 손해를 보게 만든다.',
        nextId: 'boss-q4b',
      },
    ],
  },
  {
    id: 'boss-q3b2',
    step: 3,
    prompt: '팀원을 혼내거나 지적해야 할 때 상사의 행동은?',
    choices: [
      {
        id: 'B1',
        label: '사람들이 다 보는 공개적인 장소에서 혼낸다.',
        nextId: 'boss-q4b',
      },
      {
        id: 'B2',
        label: '부하를 라이벌처럼 보고 견제하며 은근히 손해를 보게 만든다.',
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
        label: '단둘이 불러 감정을 빼고 원인과 개선방안 중심으로 피드백한다.',
        nextId: 'boss-q5a',
      },
      {
        id: 'A2',
        label: '다른 상사를 욕하면서 은근슬쩍 본인 업무를 나에게 떠넘긴다.',
        nextId: 'boss-q5a',
      },
    ],
  },
  {
    id: 'boss-q4b',
    step: 4,
    prompt: '다른 상사나 팀에 대한 이야기를 할 때 모습은?',
    choices: [
      {
        id: 'B1',
        label: '다른 상사를 욕하면서 은근슬쩍 본인 업무를 나에게 떠넘긴다.',
        nextId: 'boss-q5b',
      },
      {
        id: 'B2',
        label: '은근히 뒷말을 퍼뜨리거나 한쪽 편만 들어 팀 내 갈등을 키운다.',
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
        label: '"오늘 다들 고생 많았어요!" 하고 정시 퇴근을 권장한다.',
      },
      {
        id: 'A2',
        label: '모두를 챙겨줄 때 특정 팀원만 은근히 빼놓고 손해를 보게 만든다.',
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
        label: '급하지도 않은 일로 주말이나 늦은 밤에 수시로 카톡을 보낸다.',
      },
      {
        id: 'B2',
        label: '퇴근 직전에 갑자기 새 일을 던져주며 탕비실로 부른다.',
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
        label: '표정이 어두워지며 "이걸 제가 왜 해야 하나요?"라는 태도를 보인다.',
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
        label: '다 끝난 후에야 한 번에 가져와서 결과만 보여준다.',
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
        label: '일을 진작에 끝냈음에도 일부러 미루다 늦게 준다.',
        nextId: 'emp-q3b1',
      },
      {
        id: 'B2',
        label: '핑계를 대며 마감을 넘기거나 완성도가 엉망인 결과물을 낸다.',
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
        label: '혼자 어떻게든 막아보려다 일을 더 크게 만든다.',
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
        label: '혼자 어떻게든 막아보려다 일을 더 크게 만든다.',
        nextId: 'emp-q4a',
      },
    ],
  },
  {
    id: 'emp-q3b1',
    step: 3,
    prompt: '팀 분위기가 어수선하거나 야근 중일 때 행동은?',
    choices: [
      {
        id: 'B1',
        label: '모두가 정신없이 일하는 와중에 눈치를 보며 은근슬쩍 퇴근한다.',
        nextId: 'emp-q4b',
      },
      {
        id: 'B2',
        label: '지각이 잦고 업무 시간에 자리를 비워 메신저 답장이 느리다.',
        nextId: 'emp-q4b',
      },
    ],
  },
  {
    id: 'emp-q3b2',
    step: 3,
    prompt: '팀 분위기가 어수선하거나 야근 중일 때 행동은?',
    choices: [
      {
        id: 'B1',
        label: '모두가 정신없이 일하는 와중에 눈치를 보며 은근슬쩍 퇴근한다.',
        nextId: 'emp-q4b',
      },
      {
        id: 'B2',
        label: '지각이 잦고 업무 시간에 자리를 비워 메신저 답장이 느리다.',
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
        label: '일을 다 끝냈음에도 일부러 시간을 끌다 늦게 준다.',
        nextId: 'emp-q5a',
      },
    ],
  },
  {
    id: 'emp-q4b',
    step: 4,
    prompt: '피드백이나 지적을 받았을 때 반응은?',
    choices: [
      {
        id: 'B1',
        label: '핑계와 변명으로 일관하며 남 탓을 한다.',
        nextId: 'emp-q5b',
      },
      {
        id: 'B2',
        label: '기분 나쁜 티를 팍팍 내며 분위기를 냉랭하게 만든다.',
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
        label: '도움이 필요한 부분이 있는지 묻고 적극적으로 협조한다.',
      },
      {
        id: 'A2',
        label: '모두가 바쁘게 일할 때 눈치를 보며 은근슬쩍 먼저 퇴근한다.',
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
        label: '핸드폰만 보며 영혼 없이 앉아있다가 제일 먼저 도망간다.',
      },
      {
        id: 'B2',
        label: '분위기를 흐리거나 개인주의적인 태도로 일관한다.',
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
