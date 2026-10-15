import fs from 'fs';

const src = fs.readFileSync('src/constants/questions.ts', 'utf8');

function extractArray(name) {
  const start = src.indexOf(`const ${name}`);
  const brace = src.indexOf('= [', start) + 2; // skip Question[] type bracket
  let depth = 0;
  let end = -1;
  for (let i = brace; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  return src.slice(brace + 1, end);
}

function parseQuestions(arraySrc, prefix) {
  const idMatches = [...arraySrc.matchAll(new RegExp(`id:\\s*'(${prefix}-q[^']+)'`, 'g'))];
  // question ids only (not choice ids) — they contain -q
  const qIds = [...new Set(idMatches.map((m) => m[1]))];

  return qIds.map((id) => {
    const start = arraySrc.indexOf(`id: '${id}'`);
    const step = Number((arraySrc.slice(start).match(/step:\s*(\d+)/) || [])[1]);
    const prompt = (arraySrc.slice(start).match(/prompt:\s*'([^']*)'/) || [])[1] || '';
    const choicesStart = arraySrc.indexOf('choices:', start);
    const bracket = arraySrc.indexOf('[', choicesStart);
    let depth = 0;
    let end = bracket;
    for (let i = bracket; i < arraySrc.length; i++) {
      if (arraySrc[i] === '[') depth++;
      else if (arraySrc[i] === ']') {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    const choicesBlock = arraySrc.slice(bracket + 1, end);
    const edges = [];
    const parts = choicesBlock.split(/\{\s*id:/).slice(1);
    for (const part of parts) {
      const cid = (part.match(/^\s*'([^']+)'/) || [])[1];
      const next = (part.match(/nextId:\s*'([^']+)'/) || [])[1] || null;
      edges.push({ id: cid, next });
    }
    return { id, step, prompt, edges };
  });
}

function analyze(role, questions, startId) {
  const map = Object.fromEntries(questions.map((q) => [q.id, q]));
  const byStep = {};
  for (const q of questions) (byStep[q.step] ||= []).push(q);

  let paths = 0;
  const pathLens = [];
  const samples = [];
  function dfs(id, depth, trail) {
    const q = map[id];
    if (!q) return;
    for (const e of q.edges) {
      if (!e.next) {
        paths++;
        pathLens.push(depth + 1);
        if (samples.length < 5) samples.push([...trail, `${e.id}->END`]);
      } else dfs(e.next, depth + 1, [...trail, `${e.id}->${e.next}`]);
    }
  }
  dfs(startId, 0, [startId]);

  const edgeIn = {};
  for (const q of questions) {
    for (const e of q.edges) {
      if (e.next) {
        edgeIn[e.next] ||= [];
        edgeIn[e.next].push(q.id);
      }
    }
  }
  const merges = Object.entries(edgeIn)
    .filter(([, from]) => new Set(from).size > 1)
    .map(([id, from]) => ({ id, from: [...new Set(from)] }));

  const weak = questions
    .filter((q) => q.step < 5)
    .map((q) => {
      const unique = new Set(q.edges.map((e) => e.next || 'END'));
      return { id: q.id, step: q.step, choices: q.edges.length, uniqueNext: unique.size, next: [...unique] };
    })
    .filter((b) => b.uniqueNext === 1);

  const avgChoices =
    questions.reduce((a, q) => a + q.edges.length, 0) / (questions.length || 1);

  return {
    role,
    nodeCount: questions.length,
    avgChoices: Number(avgChoices.toFixed(2)),
    paths,
    pathLens: {
      min: Math.min(...pathLens),
      max: Math.max(...pathLens),
      avg: Number((pathLens.reduce((a, b) => a + b, 0) / pathLens.length).toFixed(2)),
    },
    byStep: Object.fromEntries(
      Object.keys(byStep)
        .sort()
        .map((s) => [
          s,
          byStep[s].map((q) => ({
            id: q.id,
            choices: q.edges.length,
            prompt: q.prompt,
            next: [...new Set(q.edges.map((e) => e.next || 'RESULT'))],
          })),
        ]),
    ),
    merges,
    weak,
    samples,
  };
}

const boss = parseQuestions(extractArray('bossQuestions'), 'boss');
const emp = parseQuestions(extractArray('employeeQuestions'), 'emp');
const bossA = analyze('boss', boss, 'boss-q1');
const empA = analyze('employee', emp, 'emp-q1');

function print(a) {
  console.log(`\n========== ${a.role.toUpperCase()} ==========`);
  console.log(`질문 노드: ${a.nodeCount}`);
  console.log(`평균 선택지: ${a.avgChoices}`);
  console.log(`완전 경로 수: ${a.paths}`);
  console.log(`경로 문항 수: min=${a.pathLens.min} max=${a.pathLens.max} avg=${a.pathLens.avg}`);
  console.log(`합류 노드: ${a.merges.length}`);
  for (const m of a.merges) console.log(`  - ${m.id} ← ${m.from.join(', ')}`);

  for (const [step, list] of Object.entries(a.byStep)) {
    console.log(`\n[Step ${step}] 변형 ${list.length}개`);
    for (const q of list) {
      console.log(`  ${q.id} | 선택 ${q.choices} → ${q.next.join(' | ')}`);
      console.log(`    ${q.prompt}`);
    }
  }

  if (a.weak.length) {
    console.log(`\n선택지는 여러 개인데 next가 1갈래로만 가는 노드:`);
    for (const w of a.weak) console.log(`  - ${w.id} (step ${w.step}): ${w.choices} choices → ${w.next}`);
  } else {
    console.log(`\n중간 단계에서 모든 노드가 2갈래 이상 next를 가짐`);
  }

  console.log('\n샘플 경로:');
  for (const s of a.samples) console.log(' ', s.join(' | '));
}

print(bossA);
print(empA);
fs.writeFileSync('scripts/branching-report.json', JSON.stringify({ boss: bossA, employee: empA }, null, 2));
console.log('\nWrote scripts/branching-report.json');
