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
