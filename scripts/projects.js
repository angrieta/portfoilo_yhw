'use strict';

// Local captures keep project evidence accessible without an internal server.
window.portfolioProjects = [
  {
    id: 'carbay', name: '카베이', english: 'CARBAY', type: '회사 프로젝트', category: '자동차 비교견적 플랫폼',
    title: '차량 탐색에서 상담까지, 한 흐름으로',
    summary: '메인 화면의 정보 구조와 상담 진입 경로를 정리한 웹사이트 리뉴얼.',
    image: 'carbay-after.jpg', period: '2025.09 - 현재 재직 중 진행', status: '최신 작업본',
    role: 'UI 디자인 · 퍼블리싱 전담',
    intro: '프로모션, 차량 정보, 상담 신청이 함께 있는 자동차 서비스. 첫 화면의 정보 우선순위와 주요 메뉴를 정리하고, 상담으로 이어지는 화면을 디자인하고 구현했습니다.',
    before: 'carbay-before', after: 'carbay-after', beforeLabel: '입사 전 사이트', afterLabel: '최신 작업본',
    beforeText: '검색과 여러 메뉴가 두 줄로 배치되어 있고, 상담 신청은 우측 고정 영역에 놓여 있습니다.',
    afterText: '주요 메뉴를 한 줄로 정리하고, 프로모션과 상담 폼을 첫 화면에 함께 배치했습니다. 주요 서비스는 별도의 퀵 메뉴로 연결합니다.',
    changes: [
      ['정보 구조', '전차종 견적, 즉시출고, 렌트·리스 비교 등 주요 목적에 맞춰 탐색 경로를 정리했습니다.'],
      ['상담 진입', '프로모션을 확인하는 위치에 상담 입력 영역을 함께 배치해 다음 행동을 연결했습니다.'],
      ['콘텐츠 구성', '출고후기, 차량 조건, 카매니저 등 비교와 선택에 필요한 정보를 섹션별로 구성했습니다.']
    ],
    note: '변경 후 화면은 최신 리뉴얼 작업본입니다. 공개 운영 사이트와 화면 구성에 차이가 있을 수 있습니다.',
    links: [['입사 전 사이트', 'http://skin-skin5.carbaynew11.cafe24.com/'], ['Figma 작업 파일', 'https://www.figma.com/design/M76Os4WpCOZ3zFDt5hgnpJ/Untitled?node-id=234-3']]
  },
  {
    id: 'carpro', name: '카프로', english: 'CARPRO', type: '회사 프로젝트', category: '장기렌트 · 리스',
    title: '조건별 차량 비교가 쉬워지는 화면',
    summary: '하이브리드 중심의 소개 페이지를 조건별 차량 탐색과 견적 신청으로 확장.',
    image: 'carpro-after.jpg', period: '2025.09 - 현재 재직 중 진행', status: '운영 사이트',
    role: 'UI 디자인 · 퍼블리싱 전담',
    intro: '하이브리드 차량 소개와 문의 중심이었던 화면에서, 다양한 차량의 조건을 비교하고 견적을 신청할 수 있도록 UI와 페이지 구성을 개선했습니다.',
    before: 'carpro-before', after: 'carpro-after', beforeLabel: '입사 전 사이트', afterLabel: '변경 후 사이트',
    beforeText: '하이브리드 차량의 장점과 견적 신청을 중심으로 구성된 랜딩페이지입니다.',
    afterText: '최대 할인, 하이브리드, 무심사 등 조건별 차량 목록과 인기차종, FAQ를 배치했습니다. 각 차량에서 견적 신청으로 연결됩니다.',
    changes: [
      ['차량 탐색', '할인, 연비, 심사 조건으로 차량을 묶어 사용 목적에 따른 탐색을 구성했습니다.'],
      ['정보 비교', '차량명과 월 이용료, 주요 조건을 일관된 차량 카드 구조로 정리했습니다.'],
      ['견적 연결', '차량별 견적 버튼과 하단 상담 폼을 통해 관심 차량에서 신청까지 연결했습니다.']
    ],
    note: '입사 전 화면은 내부에 보관된 기존 사이트, 변경 후 화면은 카프로 운영 사이트를 기준으로 합니다.',
    links: [['운영 사이트', 'https://car-pro.kr/'], ['Figma 작업 파일', 'https://www.figma.com/design/M76Os4WpCOZ3zFDt5hgnpJ/Untitled?node-id=1702-6261']]
  },
  {
    id: 'chanawa', name: '차나와', english: 'CHANAWA', type: '회사 프로젝트', category: '자동차 서비스',
    title: '탐색과 상담을 연결하는 메인 리뉴얼',
    summary: '첫 화면의 견적 폼과 목적별 차량 섹션으로 정보 접근성을 개선.',
    image: 'chanawa-after.jpg', period: '2025.09 - 현재 재직 중 진행', status: '개발 작업본',
    role: 'UI 디자인 · 퍼블리싱 전담',
    intro: '서비스 소개와 차량 목록을 확인한 뒤 상담으로 이어지는 흐름에 집중했습니다. 메인 화면의 견적 신청 영역과 조건별 차량 섹션을 디자인하고 퍼블리싱했습니다.',
    before: 'chanawa-before', after: 'chanawa-after', beforeLabel: '기존 운영 화면', afterLabel: '변경 후 작업본',
    beforeText: '브랜드 소개와 영상이 첫 화면의 중심이며, 상담 폼은 우측 고정 영역에 배치되어 있습니다.',
    afterText: '첫 화면에 견적 신청 폼을 배치하고, 주간 특가·최대 할인·즉시출고·인기차량으로 탐색 범위를 구분했습니다.',
    changes: [
      ['첫 화면', '서비스 소개와 견적 신청이 함께 보이도록 메인 레이아웃을 재구성했습니다.'],
      ['탐색 구조', '가격 혜택, 출고 시점, 인기차종 등 서로 다른 선택 기준을 섹션으로 나눴습니다.'],
      ['신청 흐름', '차량별 견적 버튼과 상담 폼을 연결해 문의 진입 지점을 정리했습니다.']
    ],
    note: '변경 후 화면은 개발 중인 리뉴얼 작업본입니다. 화면 내 상품 정보는 촬영 당시의 표시 내용입니다.',
    links: [['기존 운영 사이트', 'https://www.chanawa.co.kr/'], ['Figma 작업 파일', 'https://www.figma.com/design/M76Os4WpCOZ3zFDt5hgnpJ/Untitled?node-id=2004-12']]
  },
  {
    id: 'starbucks', name: '스타벅스', english: 'STARBUCKS', type: '개인 리디자인', category: '커피 브랜드 · 반응형 랜딩페이지',
    title: '잠깐의 여유가, 더 좋은 하루로',
    summary: '세이지 그린과 편안한 여백으로 메뉴 탐색부터 커피 이야기, 매장 찾기를 연결한 랜딩페이지.',
    period: '2026.10', status: '반응형 웹사이트', role: 'UI 디자인 · 퍼블리싱',
    url: './demos/coffee/index.html', pages: '추천 메뉴 · 메뉴 필터 · 커피 스토리 · 매장 찾기',
    intro: 'Figma 초안을 바탕으로 스타벅스의 편안한 일상을 새롭게 풀어낸 개인 리디자인입니다. 부드러운 그린 계열과 곡선, 제품 중심의 화면을 사용하고 메뉴 탐색에서 브랜드 이야기와 매장 검색으로 이어지도록 구성했습니다.',
    changes: [
      ['부드러운 브랜드 경험', '여백과 둥근 형태, 세이지 그린을 중심으로 제품과 설명을 차분하게 읽을 수 있는 화면을 구성했습니다.'],
      ['메뉴 탐색', '추천 음료 전환, 음료 종류별 필터와 상세 화면을 구현했습니다. 메뉴와 리워드 정보는 공식 홈페이지로 연결합니다.'],
      ['반응형과 이미지 구성', '모바일에서는 콘텐츠를 세로로 재배치하고, 원두와 스토리 이미지의 여백을 조정했습니다. 고해상도 매장 사진과 지역 검색을 제공합니다.']
    ],
    note: '독립 포트폴리오 리디자인입니다. 주문·결제·회원가입은 제공하지 않으며 제품 사진과 상표의 권리는 Starbucks에 있습니다.',
    links: [['Figma 초안', 'https://www.figma.com/design/osJPU9L97s0FOmIglaQ3rN?node-id=61-1944'], ['리디자인 원본 사이트', 'https://www.starbucks.co.kr/']]
  },
  {
    id: 'twosome', name: '투썸플레이스', english: 'A TWOSOME PLACE', type: '개인 리디자인', category: '디저트 브랜드 · 반응형 랜딩페이지',
    title: '케이크와 커피, 서로를 완성하는 시간',
    summary: '크림색 배경과 세리프 타이포그래피, 비대칭 케이크 컬렉션으로 풀어낸 디저트 브랜드 랜딩페이지.',
    period: '2026.10', status: '반응형 웹사이트', role: 'UI 디자인 · 퍼블리싱',
    url: './demos/coffee/twosome.html', pages: '시그니처 케이크 · 커피 페어링 · 브랜드 이야기 · 투썸하트 · 매장 찾기',
    intro: 'Figma의 The art of pairing 시안을 반응형 웹사이트로 구현했습니다. 따뜻한 크림색 배경과 세리프 제목, 비대칭 케이크 사진으로 시작해 커피·브랜드·멤버십·공간의 이야기를 이어갑니다.',
    changes: [
      ['시안의 분위기를 웹으로', 'DM Serif Display와 Pretendard, 크림·브라운·버건디의 색상 대비, 비대칭 사진 배치로 시안의 인상을 구현했습니다.'],
      ['메뉴에서 공간까지', '케이크 사진 전환과 메뉴 상세, 투썸하트 앱 안내, 지역별 매장 검색을 구현해 각 섹션에서 다음 행동으로 이어지게 했습니다.'],
      ['반응형 레이아웃', '데스크톱에서는 큰 사진과 여백을 살리고 모바일에서는 한 열로 재배치했습니다. 메뉴와 상세 창은 키보드로 사용할 수 있습니다.']
    ],
    note: '독립 포트폴리오 리디자인입니다. 주문·결제·회원가입은 제공하지 않으며 제품 사진과 상표의 권리는 A Twosome Place에 있습니다.',
    links: [['Figma 디자인 시안', 'https://www.figma.com/design/osJPU9L97s0FOmIglaQ3rN?node-id=61-2189'], ['리디자인 원본 사이트', 'https://www.twosome.co.kr/']]
  },
  {
    id: 'brand-reference', name: '브랜드 레퍼런스', english: 'BRAND REFERENCE', type: '개인 프로젝트', category: '디자인 레퍼런스 라이브러리',
    title: '탐색부터 수집과 비교까지, 디자인 참고의 흐름을 잇다',
    summary: '웹사이트와 디자인 소재를 유형·색상별로 찾고, 저장하고 비교하는 레퍼런스 도구.',
    period: '2026.10', status: '인터랙티브 웹사이트', role: '기획 · UI 디자인 · 퍼블리싱',
    url: 'https://angrieta.github.io/favicon-save-Folder/?collection=gdweb&view=brands',
    pages: '레퍼런스 탐색 · 사이트 상세 · 컬러 · 보관함',
    intro: '브랜드와 GDWEB 선정 사이트의 화면, 버튼, 로고, 아이콘 등 디자인 참고 자료를 한곳에서 탐색하는 웹 도구입니다. 필요한 소재를 검색하고 유형과 색상으로 좁힌 뒤, 보관함에 모아 비교할 수 있도록 탐색부터 활용까지의 흐름을 구성했습니다.',
    changes: [
      ['목적에 맞는 탐색', '회사명·초성 검색과 소재 유형, 색상, 기기, 선정 연도 필터를 연결했습니다. 사이트별 화면과 개별 소재를 오가며 확인할 수 있습니다.'],
      ['수집과 활용', '보관함 저장, 이미지 비교, 원본·ZIP 다운로드와 보관함 백업·복원을 구현했습니다. 선정 당시 화면과 현재 수집한 소재를 구분해 표시합니다.'],
      ['이미지 표시와 반응형', '작은 아이콘의 과도한 확대를 방지하고, 최적화한 미리보기와 필요한 상세 자료만 불러오는 구조를 적용했습니다. 모바일 탐색과 밝은·어두운 테마를 지원합니다.']
    ],
    note: '검색·필터·보관함을 직접 사용할 수 있는 디자인 레퍼런스 도구입니다. 참고 이미지와 상표의 권리는 각 원저작자에게 있습니다.',
    links: [['GitHub 저장소', 'https://github.com/angrieta/favicon-save-Folder']]
  },
  {
    id: 'moru', name: '모루', english: 'MORU', type: '개인 프로젝트', category: '일본어·영어 학습 웹앱',
    title: '단어 암기에서, 직접 문장을 만드는 연습까지',
    summary: '플래시카드, 자동 복습, 듣기·문장 퀴즈와 한자 쓰기를 연결한 일본어·영어 학습 웹앱.',
    period: '2026.10', status: '공개 웹앱', role: '기획 · UI 설계 · AI 보조 구현',
    url: 'https://angrieta.github.io/moru-vocabulary/',
    pages: '단어 · 복습 · 듣기 퀴즈 · 한자 쓰기 · 영어 문장·문법',
    intro: '중요한 단어부터 익히고 외국인 친구와 대화·채팅하는 것을 목표로 만든 학습 웹앱입니다. 정답을 보기 전에 먼저 떠올리는 퀴즈, 틀린 단어의 재복습, 문장을 조립하는 연습을 하나의 학습 흐름으로 연결했습니다. 산뜻한 민트색과 새싹 캐릭터, 큰 단어 카드로 부담 없이 공부를 시작하도록 구성했습니다.',
    changes: [
      ['먼저 떠올리는 학습', '한글 힌트와 정답은 필요할 때 열도록 하고, 뜻·단어·듣기·빈칸 퀴즈를 연결했습니다. 틀린 문제는 다시 풀고 복습 일정에 반영합니다.'],
      ['소리와 쓰기로 확장', '사람 녹음과 합성 음성 파일로 발음을 제공하고, 소리를 들을 수 없는 환경에는 읽고 푸는 대체 방식을 제공합니다. 일본어는 한자 획순과 쓰기 연습을 지원합니다.'],
      ['단어에서 대화로', '영어 문장·문법 42개 수업과 252개 연습 문제를 구성했습니다. 한국어와 영어의 어순을 비교하고, 선택한 오답마다 다른 이유를 설명합니다.']
    ],
    note: '로그인 없이 사용할 수 있으며 학습 기록은 이 브라우저에 저장됩니다. JSON 백업·복원을 지원합니다. 회화 콘텐츠는 준비된 상황별 연습입니다.',
    links: [['GitHub 저장소', 'https://github.com/angrieta/moru-vocabulary']]
  },
  {
    id: 'rolex-web', name: '롤렉스 · 웹사이트', english: 'ROLEX WEB', type: '개인 리디자인', category: '컬렉션 탐색 · 반응형 웹',
    title: '탐색과 비교로 나만의 시계를 찾다',
    summary: '세 가지 컬렉션의 탐색, 조건 선택, 모델 비교를 연결한 반응형 웹사이트.',
    period: '2026.10', status: '인터랙티브 웹사이트', role: 'UI 디자인 · 퍼블리싱',
    url: './demos/rolex-web/', pages: '컬렉션 · 조건별 탐색 · 모델 비교 · 관심 모델',
    intro: '처음 제작한 롤렉스 웹사이트 리디자인입니다. Figma 레이아웃의 차콜과 샴페인 골드, 세리프 타이포그래피를 바탕으로 서브마리너·데이트저스트·데이토나를 탐색하는 경험을 구현했습니다. 화면 크기에 맞춰 레이아웃과 메뉴가 바뀌며 검색, 조건 선택과 모델 비교를 직접 사용할 수 있습니다.',
    changes: [
      ['탐색과 비교', '컬렉션 소개에서 케이스 크기·소재 선택과 사양 비교로 이어집니다. 비교표에서는 같은 사양을 숨겨 차이를 살펴볼 수 있습니다.'],
      ['실제로 작동하는 UI', '모델명·소재·크기 검색, 상세 화면, 관심 모델 저장과 히어로 이미지 전환을 구현했습니다. 관심 모델은 해당 브라우저에 저장됩니다.'],
      ['반응형 구성', '데스크톱의 컬렉션 그리드를 모바일에서는 세로 흐름으로 전환하고, 별도 모바일 메뉴와 가로 스크롤 비교표를 제공합니다.']
    ],
    note: '실제로 조작할 수 있는 반응형 웹사이트입니다. 비공식 포트폴리오 리디자인이며 제품 사진·상표의 권리는 Rolex에 있습니다. 제품 상세와 판매점 안내는 공식 사이트로 연결됩니다.',
    links: [['Figma 레이아웃 원본', 'https://www.figma.com/design/osJPU9L97s0FOmIglaQ3rN?node-id=28-2'], ['리디자인 원본 사이트', 'https://www.rolex.com/ko']]
  },
  {
    id: 'rolex', name: '롤렉스 · UI 시안', english: 'ROLEX UI', type: '개인 리디자인', category: '제품 랜딩페이지 UI 디자인',
    title: '정밀함의 깊이를 마주하다',
    summary: '서브마리너 데이트의 형태와 소재를 따라 읽는 한국어 제품 랜딩페이지.',
    image: 'rolex-submariner.jpg', period: '2026.10', status: 'UI 디자인 시안',
    role: 'UI 디자인', previewType: 'design', previewWidth: 1440,
    url: './demos/rolex/', pages: '제품 소개 · 디테일 · 모델 구성 · 제품 사양',
    intro: '롤렉스 한국어 웹사이트를 제품 중심으로 재해석한 개인 디자인입니다. 서브마리너 데이트 한 모델에 집중해 전체 형태에서 소재와 마감, 모델 구성과 사양으로 이어지는 흐름을 설계했습니다. 한국어 제목과 설명, 절제된 색감과 여백으로 차분하고 명확하게 읽히도록 구성했습니다.',
    changes: [
      ['제품 중심의 전개', '대표 이미지, 구조를 짚는 설명, 비대칭 매크로 이미지로 제품을 단계적으로 살펴보도록 구성했습니다.'],
      ['한국어 정보 위계', '메뉴부터 제목, 구성 옵션과 사양까지 한국어 중심으로 정리하고 Pretendard로 읽기 흐름을 맞췄습니다.'],
      ['소재와 정보의 대비', '브랜드와 소재 장면에는 어두운 배경을, 구성과 사양에는 밝은 배경을 사용했습니다. 실제 126610LN 모델의 자료를 기준으로 디자인했습니다.']
    ],
    note: '1440px 데스크톱 UI 디자인 시안입니다. 스크롤로 전체 화면을 살펴볼 수 있으며, 이미지 안의 메뉴와 옵션은 정적 표현입니다. 비공식 포트폴리오 작업으로 제품 사진·상표의 권리는 Rolex에 있습니다.',
    links: [['Figma 디자인 원본', 'https://www.figma.com/design/jKqAvanQMOJxUsMZXWfj4N?node-id=2-36'], ['리디자인 원본 사이트', 'https://www.rolex.com/ko/watches/submariner/m126610ln-0001']]
  },
  {
    id: 'carmong', name: 'CARMONG', english: 'CARMONG', type: '개인 프로젝트', category: '사이트 디자인 시안 #3 · #4',
    title: '자동차 견적을 친근하게 풀어내는 디자인', role: '개인 사이트 디자인', status: '개인 디자인 시안',
    intro: '회사 업무와 별개로 만든 자동차 비교견적 사이트 디자인입니다. 노란색 중심의 컬러와 캐릭터를 활용해 친근한 인상을 만들고, 차량 탐색·견적·FAQ를 하나의 시각 언어로 연결했습니다.',
    changes: [
      ['비주얼 방향', '캐릭터와 노란색을 중심으로 서비스의 인상을 통일하고, 기능별 그래픽을 배치했습니다.'],
      ['메뉴 구성', '차량 탐색, 인기 차량, 렌트·리스 테스트를 주요 메뉴로 구성했습니다.'],
      ['화면 전개', '메인, 차량 목록, 차량 상세, FAQ에 같은 컬러와 컴포넌트 스타일을 적용했습니다.']
    ],
    screens: [['carmong-home', '메인 화면'], ['carmong-cars', '차량 목록'], ['carmong-detail', '차량 상세'], ['carmong-faq', 'FAQ']],
    note: '회사 업무와 별개로 제작한 개인 디자인 시안 #3·#4입니다. 화면 속 이용 데이터와 상품 수치는 디자인 예시입니다.', links: []
  }
];

window.portfolioArchive = [
  { name: '크라이저', type: '인턴 실무', date: '2025.05', image: 'krizer_main.jpg', description: '메인 및 제품 랜딩페이지 디자인', links: [['웹사이트', 'https://krizer.com/'], ['Figma', 'https://www.figma.com/proto/1Y4MpfPfIEjKsxnuPcwoKC/Untitled?page-id=0%3A1&node-id=1-2'], ['랜딩 1', 'https://krizer.com/455'], ['랜딩 2', 'https://krizer.com/454'], ['랜딩 3', 'https://krizer.com/457'], ['랜딩 4', 'https://krizer.com/android_settop']] },
  { name: '베베드피노', type: '개인 리디자인', date: '2025.02', image: 'bebedepino_page.png', description: '아동 의류 쇼핑몰 메인, 목록, 상품, 검색 화면', links: [['구현 사이트', 'https://angrieta.github.io/bebe_de_pino/'], ['Figma', 'https://www.figma.com/proto/kiPmZdyF9JakaYGyvzApxr/2025?page-id=0%3A1&node-id=1-112']] },
  { name: 'Time Clinic', type: '개인 리디자인', date: '2025.02', image: 'time_page.png', description: '병원 메인 화면, 슬라이드와 퀵 메뉴', links: [['구현 사이트', 'https://angrieta.github.io/Time_Clinic/'], ['Figma', 'https://www.figma.com/design/l66FXvGDv9kAbRoLDJgCF3/Untitled?node-id=0-1']] },
  { name: '현대 M-mall', type: '개인 리디자인', date: '2025.02', image: 'H_mall_page.png', description: '쇼핑몰 웹사이트 리디자인 및 퍼블리싱', links: [['구현 사이트', 'https://angrieta.github.io/M-mall/'], ['Figma', 'https://www.figma.com/design/AKsOHrAZosZVIAnIKdkERl/Untitled?node-id=0-1']] },
  { name: 'NuPhy', type: '개인 리디자인', date: '2025.01 - 02', image: 'nuphy_page.png', description: '키보드 쇼핑몰 메인, 로그인, 상품 화면', links: [['구현 사이트', 'https://angrieta.github.io/nuphy_edit/'], ['Figma', 'https://www.figma.com/design/sCT63vAI3YV7ng2WSy0raa/Untitled?node-id=7-33']] }
];

window.portfolioGallery = {
  detail: ['detail_008.jpg', 'detail_009.jpg', 'detail_010.jpg', 'detail_007.jpg', 'detail_001.jpg', 'detail_002.jpg', 'detail_004.jpg', 'detail_003.jpg', 'detail_005.png', 'detail_006.png'],
  sns: ['sns_001.jpg', 'sns_002.jpg', 'sns_003.jpg', 'sns_004.jpg', 'sns_005.png', 'sns_006.png', 'sns_007.png', 'sns_008.png'],
  banner: ['banner_001.png', 'banner_002.jpg', 'banner_003.jpg', 'banner_004.jpg', 'banner_005.jpg', 'banner_006.jpg', 'banner_007.png', 'banner_008.png', 'banner_009.jpg', 'banner_010.jpg', 'banner_011.jpg', 'banner_012.jpg', 'banner_013.jpg', 'banner_014.jpg', 'banner_015.jpg']
};
