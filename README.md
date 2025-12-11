🧩 **오늘의 모든 것 (Today’s All-in-One)**

React 기반으로 제작된 일상 추천 통합 서비스입니다.
사용자의 위치 · 날씨 · 날짜 · 취향 등을 기반으로
할 일 / 옷차림 / 영화 / 맛집을 한 화면에서 확인하고 추천받을 수 있습니다.

🚀 **주요 기능**

✅ 1. Todo List

사용자가 직접 할 일을 작성하고 관리

간단한 CRUD 기능

직관적인 UI로 빠른 체크 가능

👕 2. 오늘 뭐 입지? (ToWear)

OpenWeather API + Kakao Map API

실시간 위치 기반 날씨 수집

온도/습도/자외선 지수/대기질 분석

AI 스타일 규칙 기반 옷차림 추천 제공

🎬 3. 오늘 뭐 보지? (ToWatch)

TMDB API

인기 영화 / 추천 영화 / 장르 기반 콘텐츠 제공

카드 UI로 영화 포스터·줄거리·평점 표시

상세 페이지 이동 가능

🍽️ 4. 오늘 뭐 먹지? (ToEat)

Kakao Map API

사용자 위치 기반 주변 맛집 검색

카테고리(한식/양식/일식/카페 등) 필터 제공

주소 / 거리 / 평점 등 상세 정보 표시

🖼️ **메인 화면 구성**

📅 현재 날짜 & 실시간 시간

📝 ToDo

👕 ToWear

🎬 ToWatch

🍽️ ToEat

각 섹션 클릭 시 해당 기능의 상세 페이지로 이동합니다.

🛠 **기술 스택**

**Frontend**

React (CRA)

React Router DOM

CSS / Custom Styles

React Icons

Axios

**API**

OpenWeather API

TMDB API

Kakao Map API

**배포**

Vercel

vercel.json을 통한 SPA 라우팅 설정

📂 **프로젝트 구조**

```text
todo-team/
├─ dist/                     # 빌드 결과물 (Vercel 배포용)
├─ node_modules/            # 설치된 패키지
├─ public/
│  └─ index.html            # 초기 HTML 템플릿
├─ src/
│  ├─ assets/               # 이미지·정적 리소스
│  ├─ components/           # 재사용 가능한 UI 컴포넌트
│  │  ├─ TodoContent/       # Todo 상세 컴포넌트
│  │  ├─ Header.css
│  │  ├─ Header.jsx
│  │  ├─ Todo.css
│  │  ├─ Todo.jsx
│  │  ├─ ToEat.css
│  │  ├─ ToEat.jsx
│  │  ├─ ToWatch.css
│  │  ├─ ToWatch.jsx
│  │  ├─ ToWear.css
│  │  └─ ToWear.jsx
│  ├─ homepage/             # Home 화면 관련 구성 요소
│  │  ├─ Home.css
│  │  ├─ Home.jsx
│  │  ├─ TodoSection.css
│  │  ├─ TodoSection.jsx
│  │  ├─ ToEatSection.css
│  │  ├─ ToEatSection.jsx
│  │  ├─ ToWatchSection.css
│  │  ├─ ToWatchSection.jsx
│  │  ├─ ToWearSection.css
│  │  └─ ToWearSection.jsx
│  ├─ App.css
│  ├─ App.jsx               # 전체 라우팅 및 레이아웃
│  ├─ index.css
│  └─ main.jsx              # React DOM 진입 파일
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ vercel.json              # Vercel 배포 설정
└─ vite.config.js           # Vite 설정 파일
```


🔧 **설치 및 실행 방법**

1️⃣ 프로젝트 클론
git clone https://github.com/your-repo/todays-all.git

2️⃣ 패키지 설치
npm install

3️⃣ 실행
npm start

🔑 **환경변수 설정 (.env)**

프로젝트 루트에 .env 파일을 생성 후 다음 키 추가:

REACT_APP_WEATHER_API_KEY=YOUR_API_KEY <br>
REACT_APP_TMDB_API_KEY=YOUR_TMDB_KEY <br>
REACT_APP_KAKAO_MAP_KEY=YOUR_KAKAO_KEY <br>

👥 **팀 소개**
| 역할    | 이름      | 기여 내용                                       |
| ----- | ------- | ------------------------------------------- |
| 🧭 팀장 | **이희수** | • Todo 섹션 개발<br>• 프로젝트 총괄 진행<br>• Header 작성 |
| 👤 팀원 | **강연우** | • ToWear 섹션 개발<br>• 메인 Home 레이아웃 구성         |
| 👤 팀원 | **천다솜** | • ToWatch 섹션 개발<br>• 프로젝트 보조 및 전체 흐름 지원     |
| 👤 팀원 | **권혜지** | • ToEat 섹션 개발<br>• 프로젝트 보조 및 자료 수집          |

📌 **향후 개선 예정**

OAuth 로그인 기능

사용자별 즐겨찾기 저장

반응형 UI 개선

추천 알고리즘 강화

🙌 **마치며**

이 프로젝트는 일상을 간편하고 즐겁게 만들기 위해 제작되었습니다.
날씨·영화·맛집·할 일 등 **"오늘 필요한 모든 것"**을 한곳에서 확인하세요!
