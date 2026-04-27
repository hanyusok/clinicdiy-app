const fs = require('fs');
const crypto = require('crypto');

const users = [];
const userUUIDs = [];

for (let i = 1; i <= 5; i++) {
  const id = crypto.randomUUID();
  userUUIDs.push(id);
  users.push(
    "INSERT INTO auth.users (" +
    "id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, " +
    "recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, " +
    "created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token" +
    ") VALUES (" +
    "'" + id + "', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', " +
    "'user" + i + "@example.com', crypt('password123', gen_salt('bf')), now(), " +
    "null, now(), '{\"provider\": \"email\", \"providers\": [\"email\"]}', '{\"username\": \"user" + i + "\"}', " +
    "now(), now(), '', '', '', ''" +
    ");"
  );
}

const posts = [];
const categories = ['knowhow', 'tip', 'products', 'tools', 'templates', 'qna'];
const postTitles = [
  '병원 인테리어 직접 해본 후기', '도배 팁 공유합니다', '대기실 의자 추천', '이 공구 꼭 사세요', '간판 디자인 템플릿', '이거 어떻게 수리하나요?',
  '셀프 페인팅 성공기', '바닥재 선택 가이드', '조명 설치 후기', '수전 교체 방법', '진료실 방음 팁', '수납장 리폼',
  '안내데스크 꾸미기', '대기실 테이블 추천', '콘센트 추가 설치기', '방문 손잡이 교체', '에어컨 필터 청소', '공기청정기 필터 교체주기',
  '화분 추천해주세요', '인테리어 소품 공유', '블라인드 설치', '커튼 vs 블라인드', 'CCTV 설치기', '간판 조명 교체',
  '페인트 추천', '벽지 vs 페인트', '데스크탑 선정리', '정수기 렌탈 vs 구매', '스피커 설치', '대기실 잡지 추천'
];

for (let i = 1; i <= 30; i++) {
  const userId = userUUIDs[Math.floor(Math.random() * userUUIDs.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const title = postTitles[i - 1] || "Post Title " + i;
  const content = "이것은 " + title + "에 대한 상세 내용입니다. 셀프 인테리어를 하면서 겪은 다양한 경험과 노하우를 공유합니다. " + i + "번째 게시물입니다.";
  
  posts.push(
    "INSERT INTO public.posts (user_id, category, title, content, likes_count, views_count) " +
    "VALUES ('" + userId + "', '" + category + "', '" + title + "', '" + content + "', " + Math.floor(Math.random() * 50) + ", " + Math.floor(Math.random() * 200) + ");"
  );
}

const comments = [];
const commentContents = [
  '좋은 정보 감사합니다!', '도움이 많이 되었습니다.', '저도 이렇게 해봐야겠네요.', '질문이 있습니다.', '대단하시네요!', 
  '잘 보고 갑니다.', '공유 감사합니다.', '저희 병원에도 적용해볼게요.', '어디서 구매하셨나요?', '추가 팁이 있다면 알려주세요.'
];

for (let i = 1; i <= 100; i++) {
  const userId = userUUIDs[Math.floor(Math.random() * userUUIDs.length)];
  const postId = Math.floor(Math.random() * 30) + 1;
  const content = commentContents[Math.floor(Math.random() * commentContents.length)] + " (" + i + ")";
  
  comments.push(
    "INSERT INTO public.comments (post_id, user_id, content) " +
    "VALUES (" + postId + ", '" + userId + "', '" + content + "');"
  );
}

const seedSql = "-- Seed Users\n" +
users.join('\n') + "\n\n" +
"-- Seed Posts\n" +
posts.join('\n') + "\n\n" +
"-- Seed Comments\n" +
comments.join('\n') + "\n";

fs.writeFileSync('supabase/seed.sql', seedSql);
console.log('supabase/seed.sql generated successfully.');
