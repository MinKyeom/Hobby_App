import type { AnimalCharacter } from '@/types/quiz';

/**
 * 16 animal archetypes (8 boss + 8 employee).
 * 톤: 인신공격 대신 '유형 설명 + 소통 팁' 중심 (스토어 사이버불링 가이드 대응)
 * 이미지: 로컬 에셋(동물만, 사람 얼굴/상표 없음) + Pexels 출처 메타
 */
export const ANIMALS: Record<string, AnimalCharacter> = {
  lion: {
    id: 'lion',
    role: 'boss',
    tier: 'best',
    emoji: '🦁',
    title: '책임감 넘치는 사자 유형',
    animalName: '사자',
    tags: ['#책임감', '#든든한리더', '#워라밸존중'],
    traits:
      '이 유형은 위기 때 앞장서고, 피드백을 1:1로 차분히 나누는 리더십 성향입니다. 팀의 심리적 안정감을 높이는 편입니다.',
    tip: '이런 유형과는 진행 상황을 주기적으로 공유하고, 구체적 성과와 감사를 함께 전하면 소통이 더 원활해집니다.',
    pexelsQuery: 'funny lion',
    imageUrl:
      'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/lion.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  bear: {
    id: 'bear',
    role: 'boss',
    tier: 'good',
    emoji: '🐻',
    title: '든든하게 챙기는 곰 유형',
    animalName: '곰',
    tags: ['#배려', '#안정감', '#팀케어'],
    traits:
      '이 유형은 팀 분위기와 일상을 세심히 챙기는 보호자형 소통 성향입니다. 완벽하진 않아도 방향은 팀 편인 경우가 많습니다.',
    tip: '이런 유형과는 막히는 지점을 일찍 상의하고, 고마움을 말로 표현하면 신뢰가 쌓입니다.',
    pexelsQuery: 'funny bear',
    imageUrl:
      'https://images.pexels.com/photos/158109/kodiak-brown-bear-adult-portrait-wildlife-158109.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/bear.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  deer: {
    id: 'deer',
    role: 'boss',
    tier: 'mixed',
    emoji: '🦌',
    title: '신중하게 살피는 사슴 유형',
    animalName: '사슴',
    tags: ['#부드러움', '#신중함', '#합의선호'],
    traits:
      '이 유형은 마음은 따뜻하지만 결단이 흔들릴 수 있는 소통 성향입니다. 분위기 신호를 민감하게 읽는 편입니다.',
    tip: '이런 유형과는 선택지를 2~3개로 정리해 제안하고, 감정 해석보다 사실 중심으로 보고하면 결정이 빨라집니다.',
    pexelsQuery: 'funny deer',
    imageUrl:
      'https://images.pexels.com/photos/34231/antler-antler-carrier-fallow-deer-hirsch.jpg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/deer.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  giraffe: {
    id: 'giraffe',
    role: 'boss',
    tier: 'mixed',
    emoji: '🦒',
    title: '큰 그림을 보는 기린 유형',
    animalName: '기린',
    tags: ['#시야넓음', '#전략형', '#우선순위'],
    traits:
      '이 유형은 큰 그림은 잘 보지만 현장 디테일과의 온도 차가 생길 수 있는 성향입니다.',
    tip: '이런 유형과는 업무 범위·우선순위를 문서로 합의하고, 이슈는 감정 없이 사실로 공유하는 편이 안전합니다.',
    pexelsQuery: 'funny giraffe',
    imageUrl:
      'https://images.pexels.com/photos/802112/pexels-photo-802112.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/giraffe.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  parrot: {
    id: 'parrot',
    role: 'boss',
    tier: 'bad',
    emoji: '🦜',
    title: '공개 피드백을 선호하는 앵무새 유형',
    animalName: '앵무새',
    tags: ['#공개피드백', '#즉각표현', '#에너지높음'],
    traits:
      '이 유형은 피드백을 여러 사람이 있는 자리에서 바로 전달하는 경향이 있습니다. 의은 빠르지만 받는 사람은 부담을 느낄 수 있습니다.',
    tip: '이런 유형과는 공개 자리에서는 짧게 사실만 답하고, 세부 논의는 1:1·서면으로 옮겨 보세요. 기록이 도움이 됩니다.',
    pexelsQuery: 'funny parrot',
    imageUrl:
      'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/parrot.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  hedgehog: {
    id: 'hedgehog',
    role: 'boss',
    tier: 'bad',
    emoji: '🦔',
    title: '경계를 두는 고슴도치 유형',
    animalName: '고슴도치',
    tags: ['#경계심', '#신중함', '#경쟁의식'],
    traits:
      '이 유형은 관계에서 경계를 두고, 팀 내 역학을 민감하게 살피는 소통 성향입니다. 신뢰가 쌓이기까지 시간이 걸릴 수 있습니다.',
    tip: '이런 유형과는 감정 대결보다 공유 채널·문서 중심의 투명한 프로세스로 소통하는 편이 좋습니다.',
    pexelsQuery: 'funny hedgehog',
    imageUrl:
      'https://images.pexels.com/photos/1440406/pexels-photo-1440406.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/hedgehog.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  chameleon: {
    id: 'chameleon',
    role: 'boss',
    tier: 'bad',
    emoji: '🦎',
    title: '방향이 자주 바뀌는 카멜레온 유형',
    animalName: '카멜레온',
    tags: ['#유연함', '#지시변경', '#즉흥성'],
    traits:
      '이 유형은 상황에 맞춰 지시를 자주 조정하는 성향입니다. 적응력이 높지만 팀의 리듬이 흔들릴 수 있습니다.',
    tip: '이런 유형과는 지시받을 때 요약·확인 메시지를 남기고, “어제 합의안 A로 진행할까요?”처럼 선택지를 다시 고정해 보세요.',
    pexelsQuery: 'funny chameleon',
    imageUrl:
      'https://images.pexels.com/photos/62289/yemen-chameleon-chamaeleo-calyptratus-chameleon-reptile-62289.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/chameleon.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  octopus: {
    id: 'octopus',
    role: 'boss',
    tier: 'bad',
    emoji: '🐙',
    title: '디테일을 꼼꼼히 보는 문어 유형',
    animalName: '문어',
    tags: ['#디테일', '#관리형', '#완성도'],
    traits:
      '이 유형은 세부 사항까지 직접 확인하고 싶어 하는 성향입니다. 완성도는 높아지지만 자율 공간이 좁아질 수 있습니다.',
    tip: '이런 유형과는 중간 산출물을 짧게 자주 공유하고, 마감·범위를 사전 합의로 정리하면 소통이 수월해집니다.',
    pexelsQuery: 'funny octopus',
    imageUrl:
      'https://images.pexels.com/photos/288621/pexels-photo-288621.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/octopus.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  bee: {
    id: 'bee',
    role: 'employee',
    tier: 'best',
    emoji: '🐝',
    title: '성실하게 공유하는 꿀벌 유형',
    animalName: '꿀벌',
    tags: ['#성실', '#선보고', '#솔선수범'],
    traits:
      '이 유형은 물어보기 전에 진행을 공유하고, 실수해도 바로 보고·대안을 제시하는 협업 성향입니다.',
    tip: '이런 유형과는 중간 공유 리듬을 유지하되, 번아웃 신호도 함께 챙겨 주면 오래 좋은 팀워크가 갑니다.',
    pexelsQuery: 'funny bee',
    imageUrl:
      'https://images.pexels.com/photos/460961/pexels-photo-460961.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/bee.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  dolphin: {
    id: 'dolphin',
    role: 'employee',
    tier: 'good',
    emoji: '🐬',
    title: '센스 있게 맞추는 돌고래 유형',
    animalName: '돌고래',
    tags: ['#소통', '#타이밍', '#협업'],
    traits:
      '이 유형은 흐름을 읽고 타이밍 좋게 움직이는 소통 성향입니다. 팀 커뮤니케이션을 부드럽게 만듭니다.',
    tip: '이런 유형과는 센스에만 기대지 말고 핵심 합의를 문서로 남기면 신뢰가 한 단계 더 올라갑니다.',
    pexelsQuery: 'funny dolphin',
    imageUrl:
      'https://images.pexels.com/photos/64219/dolphin-marine-mammals-water-sea-64219.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/dolphin.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  squirrel: {
    id: 'squirrel',
    role: 'employee',
    tier: 'mixed',
    emoji: '🐿️',
    title: '열정적으로 움직이는 다람쥐 유형',
    animalName: '다람쥐',
    tags: ['#열정', '#실행력', '#중간공유필요'],
    traits:
      '이 유형은 일은 열심히 하지만 공유 타이밍이 늦어질 수 있는 성향입니다. 의도는 좋은 고군분투형입니다.',
    tip: '이런 유형과는 완료 전 체크포인트를 정해 두고, “막히면 바로 말하기” 규칙을 합의하면 리스크가 줄어듭니다.',
    pexelsQuery: 'funny squirrel',
    imageUrl:
      'https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/squirrel.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  penguin: {
    id: 'penguin',
    role: 'employee',
    tier: 'mixed',
    emoji: '🐧',
    title: '리듬을 맞추는 펭귄 유형',
    animalName: '펭귄',
    tags: ['#잠재력', '#타이밍', '#페이스조절'],
    traits:
      '이 유형은 기본기는 있으나 제출 타이밍이나 바쁜 날의 페이스가 팀과 어긋날 수 있는 성향입니다.',
    tip: '이런 유형과는 마감 전 버퍼를 일정에 넣고, 바쁜 날 역할 분담을 미리 요청하면 협업이 안정됩니다.',
    pexelsQuery: 'funny penguin',
    imageUrl:
      'https://images.pexels.com/photos/86405/penguin-funny-blue-water-86405.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/penguin.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  meerkat: {
    id: 'meerkat',
    role: 'employee',
    tier: 'bad',
    emoji: '👀',
    title: '에너지를 아껴 쓰는 미어캣 유형',
    animalName: '미어캣',
    tags: ['#에너지관리', '#자율선호', '#응답리듬'],
    traits:
      '이 유형은 바쁜 날 자신의 페이스를 우선하는 경향이 있습니다. 근태·응답 리듬에 대한 기대치를 맞추면 마찰이 줄어듭니다.',
    tip: '이런 유형과는 기대 근태·응답 시간을 명확히 합의하고, 바쁜 날 역할표를 미리 공유해 보세요.',
    pexelsQuery: 'funny meerkat',
    imageUrl:
      'https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/meerkat.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  sloth: {
    id: 'sloth',
    role: 'employee',
    tier: 'bad',
    emoji: '🦥',
    title: '천천히 마무리하는 나무늘보 유형',
    animalName: '나무늘보',
    tags: ['#슬로우페이스', '#마감관리', '#중간점검'],
    traits:
      '이 유형은 완성 후에도 전달 페이스가 느릴 수 있는 성향입니다. 진행 가시성을 높이면 서로 편해집니다.',
    tip: '이런 유형과는 중간 데드라인·산출물 단위를 쪼개고, 완료 여부를 객관적으로 보이게 만들어 보세요.',
    pexelsQuery: 'funny sloth',
    imageUrl:
      'https://images.pexels.com/photos/1598377/pexels-photo-1598377.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/sloth.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  raccoon: {
    id: 'raccoon',
    role: 'employee',
    tier: 'bad',
    emoji: '🦝',
    title: '방어적으로 소통하는 너구리 유형',
    animalName: '너구리',
    tags: ['#자기변호', '#피드백민감', '#원인분석'],
    traits:
      '이 유형은 피드백을 받을 때 먼저 맥락·사유를 설명하려는 경향이 있습니다. 방어로 보이기 쉬워 톤 조절이 필요합니다.',
    tip: '이런 유형과는 피드백을 사실·영향·다음 행동 3단으로 짧게 전달하고, “다음에 바꿀 한 가지”만 합의해 보세요.',
    pexelsQuery: 'funny raccoon',
    imageUrl:
      'https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/raccoon.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
  cat: {
    id: 'cat',
    role: 'employee',
    tier: 'bad',
    emoji: '🐱',
    title: '개인 공간이 중요한 고양이 유형',
    animalName: '고양이',
    tags: ['#개인공간', '#독립적', '#선택적참여'],
    traits:
      '이 유형은 팀 자리에서도 자신만의 리듬을 지키는 성향입니다. 능력과 별개로 협업 온도 맞추기가 과제일 수 있습니다.',
    tip: '이런 유형과는 필수 협업 루틴만 최소화해 합의하고, 비공식 자리는 강요보다 선택지로 두는 편이 좋습니다.',
    pexelsQuery: 'funny cat',
    imageUrl:
      'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1200',
    localImage: require('../../assets/animals/cat.jpg'),
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay/',
  },
};

export const ANIMAL_LIST = Object.values(ANIMALS);
