export const alphabetData = [
  { char: 'A', name: 'Alpha', pronunciation: '알파', tts: 'Alpha' },
  { char: 'B', name: 'Bravo', pronunciation: '브라보', tts: 'Bravo' },
  { char: 'C', name: 'Charlie', pronunciation: '찰리', tts: 'Charlie' },
  { char: 'D', name: 'Delta', pronunciation: '델타', tts: 'Delta' },
  { char: 'E', name: 'Echo', pronunciation: '에코', tts: 'Echo' },
  { char: 'F', name: 'Foxtrot', pronunciation: '폭스트롯', tts: 'Foxtrot' },
  { char: 'G', name: 'Golf', pronunciation: '골프', tts: 'Golf' },
  { char: 'H', name: 'Hotel', pronunciation: '호텔', tts: 'Hotel' },
  { char: 'I', name: 'India', pronunciation: '인디아', tts: 'India' },
  { char: 'J', name: 'Juliett', pronunciation: '줄리엣', tts: 'Juliett' },
  { char: 'K', name: 'Kilo', pronunciation: '킬로', tts: 'Kilo' },
  { char: 'L', name: 'Lima', pronunciation: '리마', tts: 'Lima' },
  { char: 'M', name: 'Mike', pronunciation: '마이크', tts: 'Mike' },
  { char: 'N', name: 'November', pronunciation: '노벰버', tts: 'November' },
  { char: 'O', name: 'Oscar', pronunciation: '오스카', tts: 'Oscar' },
  { char: 'P', name: 'Papa', pronunciation: '파파', tts: 'Papa' },
  { char: 'Q', name: 'Quebec', pronunciation: '퀘벡', tts: 'Kway-beck' },
  { char: 'R', name: 'Romeo', pronunciation: '로미오', tts: 'Romeo' },
  { char: 'S', name: 'Sierra', pronunciation: '시에라', tts: 'Sierra' },
  { char: 'T', name: 'Tango', pronunciation: '탱고', tts: 'Tango' },
  { char: 'U', name: 'Uniform', pronunciation: '유니폼', tts: 'Uniform' },
  { char: 'V', name: 'Victor', pronunciation: '빅터', tts: 'Victor' },
  { char: 'W', name: 'Whiskey', pronunciation: '위스키', tts: 'Whiskey' },
  { char: 'X', name: 'X-ray', pronunciation: '엑스레이', tts: 'X-ray' },
  { char: 'Y', name: 'Yankee', pronunciation: '양키', tts: 'Yankee' },
  { char: 'Z', name: 'Zulu', pronunciation: '줄루', tts: 'Zulu' },
];

export const numberData = [
  { char: '0', name: 'Nadazero', pronunciation: '나다제로', tts: 'Nadazero' },
  { char: '1', name: 'Unaone', pronunciation: '우나원', tts: 'Unaone' },
  { char: '2', name: 'Bissotwo', pronunciation: '비스투', tts: 'Bissotwo' },
  { char: '3', name: 'Terrathree', pronunciation: '테라쓰리', tts: 'Terrathree' },
  { char: '4', name: 'Kartefour', pronunciation: '카테포', tts: 'Kartefour' },
  { char: '5', name: 'Pantafive', pronunciation: '판타파이브', tts: 'Pantafive' },
  { char: '6', name: 'Soxisix', pronunciation: '속시식스', tts: 'Soxisix' },
  { char: '7', name: 'Setteseven', pronunciation: '세테세븐', tts: 'Setteseven' },
  { char: '8', name: 'Oktoeight', pronunciation: '옥토에이트', tts: 'Oktoeight' },
  { char: '9', name: 'Novenine', pronunciation: '노베나이너', tts: 'Novenine' },
];

export const sampleSentences = [
  {
    id: 'Sample A',
    text: "BE SURE YOU ARE GETTING THE RIGHT INFORMATION FROM THE RIGHT FIELD. AS JUST ON EXAMPLE IN KANSAS, THERE ARE THREE AIRPORTS OTTAWA, PAOLAMA AND GRANETT WITHIN 25 MILES OF EACH OTHER. ALL THREE UNICOMS TRANSMIT AND RECEIVE ON 122.8MHZ.",
  },
  {
    id: 'Sample B',
    text: "COLUMBIA CHEROKEE ONE FOUR SIX ONE TANGO IS 8 MILES SOUTHEAST ON VICTOR ONE FIVE NINER AT 3500 ON VOR FLIGHT PLAN MEMPHIS TO SPRINGFIELD. WE HAVE TWO POINT FIVE HOURS OF FUEL REMAINING.",
  },
  {
    id: 'Sample C',
    text: "ALTITUDE CLIMB TO ONE THAT WOULD PUT YOU IN OR CLOSE TO THE BASE OF THE OVERCAST CEILING. YOU WOULD THEN BE LESS THAN 576 FEET BELOW THE CLOUD LAYER AND INN VIOLATION OF VFR REGULATIONS.",
  },
  {
    id: 'Sample D-1',
    text: "CHANGE FREQUENCY TO 118.65MHZ.",
  },
  {
    id: 'Sample D-2',
    text: "DESCENT ALTITUDE 12500.",
  },
  {
    id: 'Sample D-3',
    text: "I HAVE ONE SON AND TWO DAUGHTERS.",
  },
  {
    id: 'Sample D-4',
    text: "THE TOTAL PROFIT OF THIS YEAR IS 34 MILION DOLLARS.",
  },
  {
    id: 'Sample D-5',
    text: "TURN RIGHT HEADING 079.",
  }
];

export const standardWords = [
  { char: 'ACKNOWLEDGE', name: '수신 확인', pronunciation: '메시지를 받았고 이해했는지 알려달라', tts: 'Acknowledge' },
  { char: 'AFFIRM', name: '예 (긍정)', pronunciation: '그렇다', tts: 'Affirm' },
  { char: 'APPROVED', name: '승인', pronunciation: '요청사항에 대해 허가한다', tts: 'Approved' },
  { char: 'BREAK', name: '분리', pronunciation: '메시지 내용이 분리됨을 표시', tts: 'Break' },
  { char: 'BREAK BREAK', name: '긴급 분리', pronunciation: '매우 바쁜 상황에서 메시지 분리', tts: 'Break Break' },
  { char: 'CANCEL', name: '취소', pronunciation: '이전에 허가했던 것을 취소한다', tts: 'Cancel' },
  { char: 'CHECK', name: '확인', pronunciation: '시스템이나 절차를 점검/확인하라', tts: 'Check' },
  { char: 'CLEARED', name: '허가', pronunciation: '특정 조건하에서 진행을 허가한다', tts: 'Cleared' },
  { char: 'CONFIRM', name: '확인 요청', pronunciation: '허가, 지시, 정보 등에 대해 맞는지 확인', tts: 'Confirm' },
  { char: 'CONTACT', name: '교신', pronunciation: '~와 무선 교신하라', tts: 'Contact' },
  { char: 'CORRECT', name: '맞다', pronunciation: '정확하다', tts: 'Correct' },
  { char: 'CORRECTION', name: '정정', pronunciation: '방금 송신에 오류가 있어 올바른 내용은 ~이다', tts: 'Correction' },
  { char: 'DISREGARD', name: '무시', pronunciation: '이 메시지를 무시하라', tts: 'Disregard' },
  { char: 'HOW DO YOU READ', name: '감명도 확인', pronunciation: '내 목소리가 얼마나 잘 들리는가?', tts: 'How do you read' },
  { char: 'I SAY AGAIN', name: '재송신', pronunciation: '강조나 명확성을 위해 내가 다시 말한다', tts: 'I say again' },
  { char: 'MAINTAIN', name: '유지', pronunciation: '지정된 조건(고도 등)을 계속 유지하라', tts: 'Maintain' },
  { char: 'MONITOR', name: '청취', pronunciation: '해당 주파수를 계속 듣고 있어라', tts: 'Monitor' },
  { char: 'NEGATIVE', name: '아니요', pronunciation: '부정, 불허, 틀림, 불가능', tts: 'Negative' },
  { char: 'OUT', name: '종료', pronunciation: '통신 끝, 대답 필요 없음', tts: 'Out' },
  { char: 'OVER', name: '이상', pronunciation: '내 말 끝났으니 대답하라', tts: 'Over' },
  { char: 'READ BACK', name: '복창', pronunciation: '내가 한 말을 그대로 따라서 말해라', tts: 'Read back' },
  { char: 'RECLEARED', name: '재허가', pronunciation: '새로운 내용으로 대체하라', tts: 'Recleared' },
  { char: 'REPORT', name: '보고', pronunciation: '다음 정보를 나에게 알려달라', tts: 'Report' },
  { char: 'REQUEST', name: '요청', pronunciation: '~을 알고 싶다, ~을 얻고 싶다', tts: 'Request' },
  { char: 'ROGER', name: '수신 완료', pronunciation: '내용을 다 받았다 (알겠다는 뜻 아님)', tts: 'Roger' },
  { char: 'SAY AGAIN', name: '재송신 요청', pronunciation: '다시 말해달라', tts: 'Say again' },
  { char: 'SPEAK SLOWER', name: '천천히', pronunciation: '말하는 속도를 줄여달라', tts: 'Speak slower' },
  { char: 'STANDBY', name: '대기', pronunciation: '기다려라, 내가 부르겠다', tts: 'Standby' },
  { char: 'UNABLE', name: '불가능', pronunciation: '지시나 요청을 따를 수 없다', tts: 'Unable' },
  { char: 'WILCO', name: '윌코', pronunciation: '내용을 이해했고 지시대로 이행하겠다', tts: 'Wilco' },
  { char: 'WORDS TWICE', name: '2회 반복', pronunciation: '단어를 두 번씩 말해달라', tts: 'Words twice' },
];

export const callSigns = [
  { char: 'Area control center', name: 'CONTROL', pronunciation: '지역관제소 (항공로 관제)', tts: 'Control' },
  { char: 'Radar (in general)', name: 'RADAR', pronunciation: '레이더', tts: 'Radar' },
  { char: 'Approach control', name: 'APPROACH', pronunciation: '접근관제소 (공항 입출항 관제)', tts: 'Approach' },
  { char: 'Approach control radar arrivals', name: 'ARRIVAL', pronunciation: '도착 관제', tts: 'Arrival' },
  { char: 'Approach control radar departure', name: 'DEPARTURE', pronunciation: '출발 관제', tts: 'Departure' },
  { char: 'Aerodrome control', name: 'TOWER', pronunciation: '관제탑 (이착륙 및 공항 주변)', tts: 'Tower' },
  { char: 'Surface movement control', name: 'GROUND', pronunciation: '지상 관제 (활주로 제외 이동)', tts: 'Ground' },
  { char: 'Clearance delivery', name: 'DELIVERY', pronunciation: '허가 중계 (출발 전 승인)', tts: 'Delivery' },
  { char: 'Flight information service', name: 'INFORMATION', pronunciation: '비행정보 (기상 정보 등)', tts: 'Information' },
  { char: 'Apron/Ramp control', name: 'APRON', pronunciation: '계류장 관제', tts: 'Apron' },
];

export const aviationTerms = [
  { char: 'Elevation', name: '표고', pronunciation: '평균 해수면 ~ 지표면 지점 수직 거리', tts: 'Elevation' },
  { char: 'Altitude', name: '진고도', pronunciation: '평균 해수면(MSL) ~ 물체 수직 거리', tts: 'Altitude' },
  { char: 'Height', name: '절대고도', pronunciation: '지정된 데이텀 ~ 물체 수직 거리', tts: 'Height' },
  { char: 'Flight level', name: '비행 고도', pronunciation: '1013.2 hPa 기압 기준 고도', tts: 'Flight level' },
  { char: 'Heading', name: '기수 방위', pronunciation: '항공기 세로축이 가리키는 방향', tts: 'Heading' },
  { char: 'Mayday', name: '조난', pronunciation: '심각, 긴박한 위험', tts: 'Mayday' },
  { char: 'Pan Pan', name: '긴급', pronunciation: '극작적인 도움은 아니지만 필요한 상황', tts: 'Pan Pan' },
];

export const quizQuestions = [
  {
    type: 'phonetic',
    question: "다음 문자 'H'에 해당하는 포네틱 코드는?",
    options: ["Hotel", "House", "Home", "Holiday"],
    answer: "Hotel"
  },
  {
    type: 'phonetic',
    question: "다음 문자 'L'에 해당하는 포네틱 코드는?",
    options: ["Lima", "Lemon", "Love", "Lion"],
    answer: "Lima"
  },
  {
    type: 'phonetic',
    question: "다음 문자 'Q'에 해당하는 포네틱 코드는?",
    options: ["Queen", "Quick", "Quebec", "Quiet"],
    answer: "Quebec"
  },
  {
    type: 'standard',
    question: "'WILCO'의 뜻으로 올바른 것은?",
    options: ["수신 완료", "내용을 이해했고 지시대로 이행하겠다", "다시 말해달라", "부정(아니요)"],
    answer: "내용을 이해했고 지시대로 이행하겠다"
  },
  {
    type: 'standard',
    question: "'STANDBY'의 뜻으로 올바른 것은?",
    options: ["기다려라, 내가 부르겠다", "내 목소리가 잘 들리는가?", "통신 끝", "허가한다"],
    answer: "기다려라, 내가 부르겠다"
  },
  {
    type: 'standard',
    question: "'ACKNOWLEDGE'의 뜻으로 올바른 것은?",
    options: ["시스템 점검", "메시지 분리", "메시지를 받았고 이해했는지 알려달라", "오류 정정"],
    answer: "메시지를 받았고 이해했는지 알려달라"
  },
  {
    type: 'callsign',
    question: "Aerodrome control (관제탑)의 호출 점미사는?",
    options: ["TOWER", "GROUND", "CONTROL", "RADAR"],
    answer: "TOWER"
  },
  {
    type: 'callsign',
    question: "Surface movement control (지상 관제)의 호출 점미사는?",
    options: ["APRON", "GROUND", "DELIVERY", "DEPARTURE"],
    answer: "GROUND"
  },
  {
    type: 'term',
    question: "평균 해수면(MSL)에서 측정한 물체의 수직 거리를 뜻하는 용어는?",
    options: ["Elevation", "Height", "Altitude", "Flight Level"],
    answer: "Altitude"
  },
  {
    type: 'term',
    question: "심각하고 긴박한 위험(조난) 상황을 알리는 신호는?",
    options: ["Mayday", "Pan Pan", "Emergency", "Help"],
    answer: "Mayday"
  }
];