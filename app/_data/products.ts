export type Product = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  highlights: string[];
  tags: string[];
  image: string;      // phone screenshot (fallback)
  logo: string;       // SVG logo
  video?: string;     // demo video path
  url?: string;       // external site URL
  developers?: string[];
  status?: string;    // e.g. "In Development"
  wide?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: 'cluee',
    title: 'Cluee',
    category: 'Knowledge Platform',
    year: '2024',
    description:
      'コミュニティの知識を共有するプラットフォーム。Tiptap ベースの非マークダウンエディタで、エンジニア以外でも気軽に使えます。Ukyo と Leon が共同開発した最初の公開プロダクトです。',
    longDescription:
      'Cluee は、各コミュニティが持つ知識を誰でも気軽に発信・共有できるプラットフォームです。Ukyo と Leon が共同で開発したチーム初の公開プロダクトで、「知識はコミュニティ全体のもの」というコンセプトのもと設計されています。エディタには Tiptap を採用し、Markdown 不要のリッチテキスト入力を実現。エンジニア以外のユーザーでも直感的に操作できます。また、サイト全体のアニメーションにもこだわり、使っていて気持ちいい体験を追求しました。',
    highlights: [
      'Tiptap ベースのリッチテキストエディタ — Markdown 不要',
      'エンジニア以外でも初日から使いやすい UX',
      'コミュニティファースト設計：知識は全員のもの',
      'Framer Motion を活用したサイトアニメーション',
    ],
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'Tiptap'],
    image: '/products/phone/cluee.png',
    logo: '/products/logos/cluee.svg',
    video: '/products/movies/cluee.mp4',
    url: 'https://cluee.jp',
    developers: ['Ukyo Takamatsu', 'Leon Kondo'],
  },
  {
    id: 'routem',
    title: 'Routem',
    category: 'Travel Planning',
    year: '2025',
    description:
      '旅行日程共有アプリ。SNS・ブログ・地図など複数メディアに散らばる情報を一元化し、他人のルートの取り込みや友人との共同編集が可能です。',
    longDescription:
      '現代の旅行計画は複雑です。行きたい場所はInstagramのスクリーンショット、乗換案内はブラウザのタブ、食べたいお店はメモ帳――情報は至るところに散らばっています。Routem はその煩雑さを解消するために生まれました。他のユーザーが公開したルートをそのまま取り込んで自分の旅程にアレンジしたり、友人とリアルタイムで共同編集したりすることができます。チーム全体で開発を続けているフラッグシッププロダクトです。',
    highlights: [
      '他ユーザーのルートをワンクリックで取り込み・アレンジ',
      '友人とのリアルタイム共同編集',
      '複数メディアの情報を1つの旅程に集約',
      'スマートフォンでもストレスなく使えるレスポンシブ UI',
    ],
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
    image: '/products/phone/routem.png',
    logo: '/products/logos/routem.svg',
    video: '/products/movies/routem.mp4',
    url: 'https://routem.net',
    wide: true,
  },
  {
    id: 'routem-mobile',
    title: 'Routem Mobile',
    category: 'Mobile App',
    year: '2025',
    description:
      'Routem のモバイルアプリ版。React Native で開発中、8月中旬リリース予定。Web 版と同じバックエンドを共有し、iOS・Android ネイティブ体験を提供します。',
    longDescription:
      'Routem Mobile は、Web 版 Routem の体験をスマートフォンでそのまま使えるようにしたネイティブアプリです。React Native で開発されており、Web 版と同一のバックエンドを共有します。旅行中でも快適に日程を確認・編集できるよう、モバイル特有のジェスチャーや UI に最適化されています。現在鋭意制作中で、2025年8月中旬のリリースを目指しています。',
    highlights: [
      'React Native による iOS・Android ネイティブ対応',
      'Web 版 Routem と同一バックエンドを共有',
      'モバイルジェスチャーに最適化された UI',
      '2025年8月中旬リリース予定',
    ],
    tags: ['React Native', 'TypeScript', 'Expo'],
    image: '/products/phone/routem_mobile.png',
    logo: '/products/logos/routem_mobile.svg',
    video: '/products/movies/video_converted.mp4',
    status: 'In Development',
  },
];
