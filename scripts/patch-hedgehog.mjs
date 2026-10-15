import fs from 'fs';

const path = 'src/constants/animals.ts';
let s = fs.readFileSync(path, 'utf8');

const nextTraits =
  '팀 내 역학·스포트라이트에 민감하고, 성과 인정에도 조건·한계를 덧붙이는 소통 성향입니다. 챙김의 온도가 사람마다 다르게 느껴질 수 있습니다.';
const nextTip =
  '성과 공유는 사실·기여도 기준으로 투명하게, 기회·정보는 가능한 한 고르게 열어 두면 신뢰가 쌓입니다.';
const nextTags = "['#경계심', '#인정온도', '#역학민감']";

const re =
  /(id: 'hedgehog',[\s\S]*?tags:\s*)\[[^\]]*\]([\s\S]*?traits:\s*(?:\n\s*)?)(?:'[^']*'|"[^"]*")([\s\S]*?tip:\s*)(?:'[^']*'|"[^"]*")/;

if (!re.test(s)) {
  // multiline traits form
  const re2 =
    /(id: 'hedgehog',[\s\S]*?tags:\s*)\[[^\]]*\]([\s\S]*?traits:\s*\n\s*)'([^']*)'([\s\S]*?tip:\s*)'([^']*)'/;
  if (!re2.test(s)) {
    console.error('pattern not found');
    process.exit(1);
  }
  s = s.replace(re2, `$1${nextTags}$2'${nextTraits}'$4'${nextTip}'`);
} else {
  s = s.replace(re, `$1${nextTags}$2'${nextTraits}'$3'${nextTip}'`);
}

fs.writeFileSync(path, s, 'utf8');
console.log('patched hedgehog');
