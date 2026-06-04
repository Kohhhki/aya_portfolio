export type Member = {
  id: string;
  name: string;
  role: string;
  initials: string;
  image: string;
  bio: string;
  status?: string;
};

export const MEMBERS: Member[] = [
  {
    id: 'kohki',
    name: 'Kohki Fujiyama',
    role: 'bizPM / Marketing',
    initials: 'KF',
    image: '/products/members/Kohki.jpg',
    bio: '千葉県立小金高校卒、上智大学理工学部情報理工学科所属。自分の一番の魅力はバイタリティで、営業、チームマネジメント、またAIを活用した開発陣のサポート等、幅広く活動しています。',
  },
  {
    id: 'ukyo',
    name: 'Ukyo Takamatsu',
    role: 'Frontend / Mobile Engineer',
    initials: 'UT',
    image: '/products/members/Ukyo.jpg',
    bio: '千葉県立小金高校卒、東洋大学理工学部電気電子情報工学科所属。TypeScript、Next.js、Java、Spring、AWS、OCI、Docker 等を扱う。Cluee を個人で制作後、このチームを立ち上げ、Routem のフロントエンド・モバイル開発に取り組んでいます。趣味はアコースティックギター、スノーボード。',
  },
  {
    id: 'leon',
    name: 'Leon Kondo',
    role: 'Backend Engineer',
    initials: 'LK',
    image: '/products/members/Leon.png',
    bio: '千葉県立小金高校卒、早稲田大学創造理工学部総合機械工学科所属。専門はロボット工学とインテリジェントシステム。技術スタックは C++、TypeScript、Python。ハードウェア工学を大学で学びながらチームに参画しています。',
  },
  {
    id: 'mitsuki',
    name: 'Mitsuki Shishikura',
    role: 'Backend Engineer',
    initials: 'MS',
    image: '/products/members/Mitsuki.jpg',
    bio: '千葉県立小金高校卒、中央大学先進理工学部情報工学科所属。何事も「まずは楽しんでやってみる！」を大切にしています。どんな仕事にも前向きに取り組めるポジティブな性格です。趣味は美味しいものの食べ歩き。',
    status: '仮所属',
  },
  {
    id: 'kota',
    name: 'Kota Noto',
    role: 'Mobile Engineer',
    initials: 'KN',
    image: '/products/members/Kota.jpg',
    bio: '千葉県立小金高校卒、東京農工大学知能情報システム工学科所属。ワクワクを原動力に行動する情報工学系の大学生。データと技術でワクワクを設計していきたいです。',
    status: '休止中',
  },
  {
    id: 'keichi',
    name: 'Keichi Tamura',
    role: 'Designer',
    initials: 'KT',
    image: '/products/members/Keichi.jpg',
    bio: '千葉県立小金高校卒、日本大学生産工学部創生デザイン学科所属。空間デザイン専攻。グラフィック、プロダクトから建築まで幅広いデザインを手がけます。Routem では一部サイトデザインと SNS 投稿を担当。',
  },
  {
    id: 'keisuke',
    name: 'Keisuke Mamiya',
    role: 'Designer',
    initials: 'KM',
    image: '/products/members/Keisuke.png',
    bio: '千葉県立小金高校卒、東京都市大学所属。学生時代のサークル活動・イベント経験を生かし、Routem の SNS 投稿や LP デザインに取り組んでいます。',
  },
];

export const TEAM_DESCRIPTION =
  '同じ高校の出身をきっかけに始まったチーム。現在では Routem を中心に、自分たちが面白いと思える Web アプリ・モバイルアプリの開発を行っています。';
