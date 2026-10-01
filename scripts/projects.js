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
