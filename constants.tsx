
import { NavItem, ProductItem, FAQItem, BusinessModel, NoticeItem } from './types';

export const COMPANY_INFO = {
  name: "CM스토리 (CM Story)",
  address: "경기도 평택시 세교산단로 37, 지제센트럴타워 516호",
  phone: "1544-8742",
  mobile: "010-7769-0308",
  email: "cmstory7@naver.com",
  representative: "이안나",
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: { KR: '홈', EN: 'Home' } },
  { id: 'company', label: { KR: '회사소개', EN: 'Company' } },
  { id: 'products', label: { KR: '제품소개', EN: 'Products' } },
  { id: 'solutions', label: { KR: '비즈니스', EN: 'Solutions' } },
  { id: 'notice', label: { KR: '공지사항', EN: 'Notice' } },
  { id: 'ipcert', label: { KR: '인증/특허', EN: 'IP & Cert' } },
  { id: 'contact', label: { KR: '문의하기', EN: 'Contact' } },
];

export const HERO_CONTENT = {
  title: {
    KR: "CM STORY는 현장에서 작동하는 스포츠 경험을\n기기·플랫폼·운영 모델까지 함께 설계하는 스포츠 테크 제조 기업입니다.",
    EN: "CM STORY: Designing sports experiences\nfrom devices to platforms and operational models."
  },
  subtitle: {
    KR: "우리는 스포츠 현장을 데이터로 바꾸고, 공간에 최적화된 하드웨어와 콘텐츠 기술을 제공합니다.",
    EN: "We transform sports fields into data and provide hardware and content technology optimized for space."
  }
};

export const COMPANY_DETAILS = {
  description: {
    KR: `CM스토리는 스포츠와 엔터테인먼트를 결합한 '현장형 기기'와 이를 운영하는 '콘텐츠/플랫폼'을 함께 만드는 기업입니다.
    단순히 기계를 납품하는 것이 아니라, 설치 환경·유지보수·운영 수익모델까지 고려한 제품을 설계합니다.
    실제 사용자 플레이 데이터를 기반으로 콘텐츠를 만들고, 공간(오락실/체육시설/매장)에 수익을 연결하는 구조를 지향합니다.
    우리는 연구개발부터 시제품 제작, KC 인증 및 안전 심의, 양산 설계, 그리고 최종 설치와 운영까지 전 프로세스를 체계화하여 신뢰할 수 있는 제조 파트너가 되고자 합니다.`,
    EN: `CM Story is a company that creates 'field-oriented devices' combining sports and entertainment with the 'content/platforms' that operate them.
    We don't just deliver machines; we design products considering the installation environment, maintenance, and operational profit models.
    We aim for a structure that creates content based on actual user play data and connects revenue to spaces (arcades, fitness centers, stores).
    We systematize the entire process from R&D and prototyping to KC certification, safety review, mass production design, and final installation/operation.`
  }
};

export const PRODUCTS: ProductItem[] = [
  {
    id: 'boxing',
    title: { KR: "크라운 복싱 미트 머신 (CROWN BOXING MITT MACHINE)", EN: "Crown Boxing Meat Machine (CROWN BOXING MITT MACHINE)" },
    subtitle: { KR: "인터랙티브 타격 트레이닝 기기", EN: "Interactive Striking Training Device" },
    description: {
      KR: "LED와 고정밀 센서를 기반으로 한 상호작용형 복싱 타격 게임 및 트레이닝 기기입니다.",
      EN: "An interactive boxing training and gaming device based on LEDs and high-precision sensors."
    },
    features: {
      KR: [
        "반복 사용 환경에 맞춘 내구 구조, 현금/카드 결제 대응",
        "상단 모니터를 통한 대기 모드 광고 및 영상 송출",
        "서버 기반의 사용자 플레이 영상 업로드 및 랭킹 시스템",
        "정밀한 타격 강도 및 속도 측정 센서 탑재"
      ],
      EN: [
        "High durability structure, cash/card payment support",
        "Ad and video broadcasting via the top monitor",
        "Cloud-based play video uploads and ranking system",
        "Precision sensors for strike force and speed measurement"
      ]
    },
    details: {
      KR: "오락실, 피트니스 센터, 스포츠 테마 매장 등 다양한 환경에 설치 가능하며, 단순히 게임기를 넘어 사용자 데이터를 수집하고 이를 기반으로 한 온-오프라인 연계 이벤트를 기획할 수 있는 비즈니스 툴입니다.",
      EN: "Can be installed in arcades, fitness centers, and sports stores. It's more than a game machine—it's a business tool that collects user data for O2O marketing."
    }
  },
  {
    id: 'football',
    title: { KR: "풋볼링크 (Football Link)", EN: "Football Link" },
    subtitle: { KR: "조기축구 매칭 및 리그 운영 플랫폼", EN: "Amateur Football Matching & League Platform" },
    description: {
      KR: "팀, 용병, 심판을 하나로 잇는 전문 매칭 플랫폼입니다.",
      EN: "A professional matching platform connecting teams, mercenaries, and referees."
    },
    features: {
      KR: [
        "1~10단계 레벨 기반의 정교한 매칭 알고리즘",
        "대표자 전용 실시간 메시징 및 스케줄 관리",
        "리그 대회 운영, 참가비 결제 및 자동 정산 시스템",
        "공신력 있는 심판 매칭 및 평가 서비스"
      ],
      EN: [
        "Sophisticated matching algorithm based on levels 1-10",
        "Real-time messaging and scheduling for team leaders",
        "League operation, fee payment, and automated settlement",
        "Credible referee matching and evaluation service"
      ]
    },
    details: {
      KR: "아마추어 축구 시장의 불투명한 매칭 구조를 개선하고, 데이터 기반의 공정한 리그 운영을 돕는 서비스입니다.",
      EN: "A service to improve the opaque matching structure of the amateur football market."
    }
  }
];

export const BUSINESS_MODELS: BusinessModel[] = [
  {
    title: { KR: "설치형 수익쉐어 모델", EN: "Revenue Share Model" },
    desc: {
      KR: "공간 오너와 50:50 또는 협의된 비율로 운영 수익을 공유합니다. 초기 도입 비용 부담을 낮추고 지속적인 관리를 제공합니다.",
      EN: "Share operating revenue with space owners at 50:50 or agreed ratios, lowering initial costs."
    }
  },
  {
    title: { KR: "대기모드 광고 플랫폼", EN: "Standby Ad Platform" },
    desc: {
      KR: "기기 상단 모니터를 광고판으로 활용합니다. 지역 광고 또는 대행사 연계를 통해 추가 수익을 창출합니다.",
      EN: "Use the top monitor as an ad board to generate additional revenue via local or agency ads."
    }
  },
  {
    title: { KR: "참여형 콘텐츠 바이럴", EN: "Interactive Content Viral" },
    desc: {
      KR: "사용자의 플레이 영상을 서버로 업로드하고, 선정 이벤트를 통해 온라인 바이럴을 유도하여 기기 이용률을 높입니다.",
      EN: "Upload play videos to servers and induce viral effects through events to increase usage."
    }
  },
  {
    title: { KR: "데이터 기반 운영 최적화", EN: "Data-Driven Optimization" },
    desc: {
      KR: "이용 횟수, 시간대별 반응, 인기 콘텐츠 데이터를 분석하여 설치처별 맞춤형 운영 가이드를 제공합니다.",
      EN: "Analyze usage frequency and popular content to provide customized operation guides."
    }
  }
];

export const NOTICES: NoticeItem[] = [
  {
    id: 1,
    date: "2025.03.10",
    category: { KR: "공지", EN: "NOTICE" },
    title: { KR: "CM스토리 공식 홈페이지 리뉴얼 오픈 안내", EN: "CM Story Official Website Renewal Open" },
    isNew: true
  },
  {
    id: 2,
    date: "2025.02.25",
    category: { KR: "기술", EN: "TECH" },
    title: { KR: "크라운 복싱 미트 머신 S/W 업데이트 (v2.4)", EN: "Crown Boxing Mitt Machine S/W Update (v2.4)" },
    isNew: true
  },
  {
    id: 3,
    date: "2025.01.15",
    category: { KR: "특허", EN: "PATENT" },
    title: { KR: "복싱유희기구 핵심 기술 특허 등록 완료", EN: "Core Tech Patent Registered for Boxing Play Apparatus" }
  },
  {
    id: 4,
    date: "2024.12.20",
    category: { KR: "이벤트", EN: "EVENT" },
    title: { KR: "겨울 시즌 한정 수익쉐어 프로모션 진행", EN: "Winter Season Revenue Share Promotion" }
  },
  {
    id: 5,
    date: "2024.11.05",
    category: { KR: "박람회", EN: "EXPO" },
    title: { KR: "2024 글로벌 스포츠 테크 박람회 참가 성료", EN: "Participation in 2024 Global Sports Tech Expo" }
  }
];

export const CERTIFICATIONS = [
  { title: "CBC 미트머신 특허 등록", detail: "제2863896호 (2025-09-19)" },
  { title: "크라운 복싱 미트 머신 상표", detail: "등록 및 출원 완료" },
  { title: "풋볼링크 브랜드 상표", detail: "한글/영문 상표 출원 완료" },
  { title: "KC 인증", detail: "전자파 및 전기안전 인증 완료/진행" },
  { title: "게임물 등급 심의", detail: "이용등급 시나리오 준비 및 제출" }
];

export const FAQS: FAQItem[] = [
  {
    question: { KR: "초기 설치 비용은 어떻게 되나요?", EN: "What are the initial installation costs?" },
    answer: { 
      KR: "수익쉐어 모델 선택 시 설치 비용은 협의를 통해 최소화할 수 있으며, 직구매 모델의 경우 별도 견적을 제공합니다.",
      EN: "Initial installation costs can be minimized through consultation when choosing the revenue-sharing model, while separate quotes are provided for direct purchase models."
    }
  },
  {
    question: { KR: "AS 및 유지보수는 어떻게 진행되나요?", EN: "How is maintenance handled?" },
    answer: {
      KR: "전국 AS 네트워크를 통해 신속한 현장 방문 및 수리를 지원하며, 대부분의 소프트웨어 이슈는 원격으로 즉시 해결 가능합니다.",
      EN: "We provide rapid on-site visits and repairs through our nationwide AS network, and most software issues can be resolved immediately via remote support."
    }
  },
  {
    question: { KR: "정산 방식은 어떻게 이루어지나요?", EN: "How is settlement handled?" },
    answer: {
      KR: "서버 기반의 자동 정산 시스템을 통해 실시간 매출 확인이 가능하며, 매월 약정된 날짜에 수익 쉐어 비율에 맞춰 정산이 진행됩니다.",
      EN: "Real-time sales can be checked through our server-based settlement system, and payments are made monthly based on the agreed revenue share ratio."
    }
  },
  {
    question: { KR: "광고 노출은 어떤 방식으로 제어되나요?", EN: "How is ad exposure controlled?" },
    answer: {
      KR: "중앙 관리 시스템을 통해 대기 모드 시 노출될 광고 리스트를 원격으로 업데이트할 수 있으며, 지역별/설치처별 타겟팅이 가능합니다.",
      EN: "The central management system allows for remote updates of the standby ad list, with targeting options by region or installation site."
    }
  },
  {
    question: { KR: "카드 결제나 삼성페이 대응이 가능한가요?", EN: "Does it support card or mobile payments?" },
    answer: {
      KR: "네, 표준 카드 단말기 모듈이 내장되어 있어 신용카드, 체크카드 및 삼성페이 등 다양한 결제 수단을 기본 지원합니다.",
      EN: "Yes, integrated standard card terminal modules support credit, debit, and mobile payments like Samsung Pay by default."
    }
  },
  {
    question: { KR: "공간 설치 조건이 까다로운가요?", EN: "Are there strict installation requirements?" },
    answer: {
      KR: "표준 전원(220V)과 인터넷 연결(유선 또는 Wi-Fi)만 확보되면 설치가 가능합니다. 컴팩트한 설계로 좁은 공간에서도 효율적으로 운영할 수 있습니다.",
      EN: "Installation only requires standard 220V power and an internet connection. The compact design allows for efficient operation even in tight spaces."
    }
  }
];
