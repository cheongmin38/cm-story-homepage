
import { NavItem, ProductItem, FAQItem, BusinessModel, NoticeItem } from './types';

export const COMPANY_INFO = {
  name: "주식회사 씨엠스토리 (CM Story Co., Ltd.)",
  address: "경기도 평택시 세교산단로 37, 지제센트럴타워 516호",
  phone: "1544-8742",
  mobile: "010-7769-0308",
  email: "cmstory7@naver.com",
  representative: "이안나",
};

/**
 * [영구 자산 관리 워크플로우]
 * 아래 경로에 맞춰 실제 이미지 파일을 해당 폴더에 배치하십시오.
 * 코드가 수정되어도 이미지는 이 경로를 통해 영구적으로 유지됩니다.
 */
export const ASSET_PATHS = {
  logo: '/assets/brand/logo.png',
  intro_scene: '/assets/machines/factory_assembly.png',
  boxing_machine: '/assets/machines/boxing_machine.png',
  football_platform: '/assets/machines/football_link.png',
  patent_certificate: '/assets/patents/patent_main.png',
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: { KR: '홈', EN: 'Home' } },
  { id: 'company', label: { KR: '회사소개', EN: 'Company' } },
  { id: 'products', label: { KR: '제품소개', EN: 'PRODUCTS' } },
  { id: 'solutions', label: { KR: '비즈니스', EN: 'Solutions' } },
  { id: 'ipcert', label: { KR: '인증/특허', EN: 'IP & Cert' } },
  { id: 'contact', label: { KR: '문의하기', EN: 'Contact' } },
  { id: 'notice', label: { KR: '공지사항', EN: 'Notice' } },
];

export const HERO_CONTENT = {
  title: {
    KR: "현장에서 작동하는\n스포츠 테크놀로지.",
    EN: "Field-Proven\nSports Technology."
  },
  subtitle: {
    KR: "CM STORY는 스포츠의 본질에 집중합니다.\n실제 타격이 일어나는 현장을 데이터로 연결합니다.\n하드웨어 제조부터 플랫폼 운영까지 통합 설계합니다.\n우리는 단순한 기기가 아닌 수익 모델을 공급합니다.",
    EN: "CM STORY focuses on the essence of sports.\nWe connect real-world action with precision data.\nWe integrate hardware manufacturing and platforms.\nWe deliver profit models, not just machines."
  }
};

export const COMPANY_DETAILS = {
  description: {
    KR: "우리는 스포츠와 기술의 접점을 설계합니다.\n현장형 하드웨어를 직접 제조합니다.\n실시간 데이터를 처리하는 플랫폼을 구축합니다.\n제조 공정의 전 과정을 내재화했습니다.\nR&D부터 양산까지 투명하게 공개합니다.\nCM스토리는 신뢰할 수 있는 하드웨어 파트너입니다.\n우리는 공간의 가치를 수익으로 증명합니다.",
    EN: "We engineer the intersection of sports and tech.\nWe manufacture field-ready hardware directly.\nWe build platforms for real-time data processing.\nThe entire manufacturing process is internalized.\nWe operate with transparency from R&D to mass production.\nCM Story is your trusted hardware partner.\nWe prove space value through real revenue."
  }
};

export const PRODUCTS: ProductItem[] = [
  {
    id: 'boxing',
    title: { KR: "크라운 복싱 미트 머신", EN: "CROWN BOXING MITT MACHINE" },
    subtitle: { KR: "인터랙티브 타격 정밀 기기", EN: "Interactive Precision Striking Device" },
    description: {
      KR: "LED 가이드와 정밀 센서를 탑재한 타격 트레이닝 시스템입니다.",
      EN: "Impact training system with LED guides and precision sensors."
    },
    features: {
      KR: [
        "산업용 고내구도 타격 패드 설계",
        "자체 개발 정밀 충격 감지 센서",
        "카드/삼성페이 통합 결제 시스템",
        "클라우드 기반 랭킹 및 영상 서버"
      ],
      EN: [
        "Industrial-grade high-durability pads",
        "In-house precision impact sensors",
        "Integrated card/Samsung Pay system",
        "Cloud ranking and video server"
      ]
    },
    details: {
      KR: "현장의 거친 환경에서도 완벽하게 작동합니다.\n데이터를 통해 사용자 몰입도를 극대화합니다.",
      EN: "Functions perfectly in harsh field environments.\nMaximizes engagement through real-time data."
    }
  },
  {
    id: 'football',
    title: { KR: "풋볼링크 (Football Link)", EN: "Football Link" },
    subtitle: { KR: "아마추어 축구 매칭 시스템", EN: "Amateur Football Matching System" },
    description: {
      KR: "팀과 개인을 잇는 데이터 기반 매칭 플랫폼입니다.",
      EN: "Data-driven matching platform for teams and players."
    },
    features: {
      KR: [
        "알고리즘 기반 정교한 밸런스 매칭",
        "실시간 경기 예약 및 자동 알림",
        "심판 및 용병 매칭 최적화 서비스",
        "누적 데이터를 통한 플레이어 프로필"
      ],
      EN: [
        "Algorithm-based balance matching",
        "Real-time booking and notifications",
        "Ref and mercenary matching service",
        "Player profiles via cumulative data"
      ]
    },
    details: {
      KR: "아마추어 스포츠 시장의 불투명성을 해결합니다.\n누구나 공정하게 경쟁할 수 있는 환경을 만듭니다.",
      EN: "Solving amateur sports market opacity.\nCreating a fair competition environment for all."
    }
  }
];

export const BUSINESS_MODELS: BusinessModel[] = [
  {
    title: { KR: "수익 공유 파트너십", EN: "Revenue Share" },
    desc: {
      KR: "초기 도입 부담을 획기적으로 낮춥니다.\n공간 가치를 수익으로 즉시 전환합니다.",
      EN: "Radically lower initial entry barriers.\nConvert space value into immediate profit."
    }
  },
  {
    title: { KR: "스마트 광고 솔루션", EN: "Smart Ad Solutions" },
    desc: {
      KR: "대기 모드를 고효율 광고판으로 활용합니다.\n타겟 마케팅으로 추가 수익을 창출합니다.",
      EN: "Use standby mode as high-efficiency ads.\nGenerate extra income via target marketing."
    }
  },
  {
    title: { KR: "영상 바이럴 마케팅", EN: "Video Viral Marketing" },
    desc: {
      KR: "플레이 영상을 실시간으로 전송합니다.\n자연스러운 온라인 홍보 효과를 유도합니다.",
      EN: "Stream play videos in real-time.\nInduce natural online viral effects."
    }
  },
  {
    title: { KR: "운영 통합 관제", EN: "Integrated Operations" },
    desc: {
      KR: "모든 기기 상태를 원격으로 관리합니다.\n실시간 매출 및 오류 보고서를 제공합니다.",
      EN: "Manage all device statuses remotely.\nProvide real-time sales and error reports."
    }
  }
];

export const NOTICES: NoticeItem[] = [
  {
    id: 1,
    date: "2025.03.10",
    category: { KR: "공지", EN: "NOTICE" },
    title: { KR: "CM스토리 공식 웹사이트 리뉴얼 안내", EN: "CM Story Official Website Renewal" },
    isNew: true
  },
  {
    id: 2,
    date: "2025.02.25",
    category: { KR: "기술", EN: "TECH" },
    title: { KR: "복싱 머신 S/W v2.4 업데이트 완료", EN: "Boxing Machine S/W v2.4 Update" },
    isNew: true
  },
  {
    id: 3,
    date: "2025.01.15",
    category: { KR: "특허", EN: "PATENT" },
    title: { KR: "복싱유희기구 핵심 기술 특허 등록", EN: "Core Tech Patent Registration" }
  }
];

export const CERTIFICATIONS = [
  { title: "특허 등록", detail: "제 10-2863896 호" },
  { title: "KC 안전 인증", detail: "전자파 및 전기안전 필" },
  { title: "상표권 확보", detail: "CROWN BOXING / FOOTBALL LINK" },
  { title: "기술 확인", detail: "벤처기업 및 기술연구소 추진 중" }
];

export const FAQS: FAQItem[] = [
  {
    question: { KR: "설치 공간 제약이 있나요?", EN: "Are there space constraints?" },
    answer: { 
      KR: "최소한의 면적과 220V 전원이 필요합니다.\n인터넷 연결 환경만 갖추면 즉시 가동됩니다.",
      EN: "Requires minimal area and 220V power.\nStarts immediately with internet connection."
    }
  },
  {
    question: { KR: "사후 관리는 어떻게 진행되나요?", EN: "How is after-sales support?" },
    answer: {
      KR: "대부분의 이슈는 원격으로 즉시 해결됩니다.\n부품 교체는 전국 방문 서비스를 지원합니다.",
      EN: "Most issues are resolved remotely.\nOn-site visits support hardware replacements."
    }
  }
];
