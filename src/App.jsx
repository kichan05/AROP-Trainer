import React, { useState, useEffect } from 'react';
import './App.css';
import { alphabetData, numberData, sampleSentences, standardWords, callSigns, aviationTerms, quizQuestions } from './data';

// Fisher-Yates Shuffle
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Helper to chunk array for horizontal table layout
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

function App() {
  const [view, setView] = useState('study'); // 'study' | 'stats' | 'table' | 'listening' | 'quiz'
  const [mode, setMode] = useState('alphabet'); // 'alphabet' | 'number' | 'standard' | 'callsign' | 'term'
  const [tableMode, setTableMode] = useState('alphabet'); // 'alphabet' | 'number' | 'standard' | 'callsign' | 'term'
  
  const [cards, setCards] = useState(() => [...alphabetData]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Listening Mode State
  const [listeningConfig, setListeningConfig] = useState({ 
    count: 10, 
    speed: 1.0,
    type: 'random' // 'random' | 'sentence'
  });
  const [testString, setTestString] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // Quiz Mode State
  const [quizState, setQuizState] = useState({
    questions: [],
    currentIndex: 0,
    score: 0,
    showResult: false,
    selectedOption: null,
    isCorrect: null
  });

  // Initialize mistakes from LocalStorage
  const [mistakes, setMistakes] = useState(() => {
    try {
      const saved = localStorage.getItem('air-radio-mistakes');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Safe access to current item
  const currentItem = (cards && cards.length > 0 && currentIndex >= 0 && currentIndex < cards.length) 
    ? cards[currentIndex] 
    : null;

  useEffect(() => {
    localStorage.setItem('air-radio-mistakes', JSON.stringify(mistakes));
  }, [mistakes]);

  const handleNext = () => {
    if (!cards || cards.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    if (!cards || cards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleCardClick = () => {
    if (!isFlipped && currentItem) setIsFlipped(true);
  };

  const handleGrade = (result) => {
    if (!currentItem) return;
    if (result === 'wrong') {
      setMistakes((prev) => ({
        ...prev,
        [currentItem.char]: (prev[currentItem.char] || 0) + 1
      }));
    }
    handleNext();
  };

  const handleTabChange = (newMode) => {
    setMode(newMode);
    let newData = [];
    switch (newMode) {
      case 'alphabet': newData = [...alphabetData]; break;
      case 'number': newData = [...numberData]; break;
      case 'standard': newData = [...standardWords]; break;
      case 'callsign': newData = [...callSigns]; break;
      case 'term': newData = [...aviationTerms]; break;
      default: newData = [...alphabetData];
    }
    setCards(newData);
    setCurrentIndex(0);
    setIsFlipped(false);
    setView('study');
  };

  const handleShuffle = () => {
    if (!cards || cards.length === 0) return;
    setCards((prevCards) => shuffleArray(prevCards));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleResetStats = () => {
    if (confirm('모든 오답 기록을 초기화하시겠습니까?')) {
      setMistakes({});
    }
  };

  // --- Quiz Logic ---
  const startQuiz = () => {
    setQuizState({
      questions: shuffleArray([...quizQuestions]),
      currentIndex: 0,
      score: 0,
      showResult: false,
      selectedOption: null,
      isCorrect: null
    });
    setView('quiz');
  };

  const handleQuizOptionClick = (option) => {
    if (quizState.selectedOption) return; // Prevent double click

    const currentQuestion = quizState.questions[quizState.currentIndex];
    const isCorrect = option === currentQuestion.answer;
    
    setQuizState(prev => ({
      ...prev,
      selectedOption: option,
      isCorrect: isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score
    }));

    // Auto next after delay
    setTimeout(() => {
      if (quizState.currentIndex < quizState.questions.length - 1) {
        setQuizState(prev => ({
          ...prev,
          currentIndex: prev.currentIndex + 1,
          selectedOption: null,
          isCorrect: null
        }));
      } else {
        setQuizState(prev => ({
          ...prev,
          showResult: true
        }));
      }
    }, 1500);
  };

  // --- Listening Logic ---
  const generateTestString = () => {
    if (listeningConfig.type === 'sentence') {
      const randomSentence = sampleSentences[Math.floor(Math.random() * sampleSentences.length)];
      return randomSentence.text;
    } else {
      const allChars = [...alphabetData, ...numberData];
      let result = '';
      for (let i = 0; i < listeningConfig.count; i++) {
        const randomItem = allChars[Math.floor(Math.random() * allChars.length)];
        result += randomItem.char;
      }
      return result;
    }
  };

  const speakText = (text, rate) => {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.lang = 'en-US';
      utterance.onend = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  };

  const startListeningTest = async () => {
    const newTestString = generateTestString();
    setTestString(newTestString);
    setUserAnswer('');
    setTestResult(null);
    setIsPlaying(true);

    setTimeout(() => {
      document.querySelector('.answer-input')?.focus();
    }, 100);

    const ttsMap = {};
    [...alphabetData, ...numberData, ...standardWords, ...callSigns, ...aviationTerms].forEach(item => {
      ttsMap[item.char.toUpperCase()] = item.tts;
      if (item.name) ttsMap[item.name.toUpperCase()] = item.tts;
    });

    if (listeningConfig.type === 'random') {
      for (let char of newTestString) {
        // if (!window.speechSynthesis.speaking && !isPlaying) break;
        const word = ttsMap[char.toUpperCase()] || char;
        await speakText(word, listeningConfig.speed);
        await new Promise(r => setTimeout(r, 500));
      }
    } else {
      const words = newTestString.split(/\s+/);
      for (let word of words) {
        // if (!window.speechSynthesis.speaking && !isPlaying) break;
        
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        
        if (/[0-9]/.test(word)) {
           for (let char of word) {
             if (!isPlaying) break;
             const ttsChar = char === '.' ? 'point' : (ttsMap[char] || char);
             if (/[0-9.]/.test(char)) {
                await speakText(ttsChar, listeningConfig.speed);
                await new Promise(r => setTimeout(r, 100));
             }
           }
        } else if (ttsMap[cleanWord]) {
           await speakText(ttsMap[cleanWord], listeningConfig.speed);
        } else {
           await speakText(word, listeningConfig.speed);
        }
        await new Promise(r => setTimeout(r, 300));
      }
    }
    setIsPlaying(false);
  };

  const stopListeningTest = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const submitListeningTest = () => {
    const correct = testString.toUpperCase().trim();
    const user = userAnswer.toUpperCase().trim();
    
    let score = 0;
    const corrections = [];
    const compareLength = Math.max(correct.length, user.length);

    for (let i = 0; i < compareLength; i++) {
      const isCorrect = (correct[i] || '') === (user[i] || '');
      if (isCorrect && i < correct.length) score++;
      corrections.push({
        char: correct[i] || '-',
        user: user[i] || '-',
        isCorrect
      });
    }

    setTestResult({
      score: Math.round((score / correct.length) * 100),
      corrections
    });
  };

  useEffect(() => {
    if (view !== 'study') return;
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') handleNext();
        else if (e.key === 'ArrowLeft') handlePrev();
        else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
          if (currentItem) setIsFlipped((prev) => !prev);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, cards, isFlipped, view, currentItem]);

  const getSortedMistakes = () => {
    const allItems = [...alphabetData, ...numberData, ...standardWords, ...callSigns, ...aviationTerms];
    return allItems
      .map(item => ({ ...item, count: mistakes[item.char] || 0 }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);
  };

  const getDataForTable = () => {
    switch (tableMode) {
      case 'alphabet': return chunkArray(alphabetData, 4);
      case 'number': return chunkArray(numberData, 2);
      case 'standard': return chunkArray(standardWords, 1);
      case 'callsign': return chunkArray(callSigns, 1);
      case 'term': return chunkArray(aviationTerms, 1);
      default: return [];
    }
  };

  const tableRows = getDataForTable();

  return (
    <div className="container">
      <h1>항공 무선 통신사 학습</h1>
      
      <div className="tabs">
        <button className={`tab-btn ${mode === 'alphabet' && view === 'study' ? 'active' : ''}`} onClick={() => handleTabChange('alphabet')}>문자</button>
        <button className={`tab-btn ${mode === 'number' && view === 'study' ? 'active' : ''}`} onClick={() => handleTabChange('number')}>숫자</button>
        <button className={`tab-btn ${mode === 'standard' && view === 'study' ? 'active' : ''}`} onClick={() => handleTabChange('standard')}>표준단어</button>
        <button className={`tab-btn ${mode === 'callsign' && view === 'study' ? 'active' : ''}`} onClick={() => handleTabChange('callsign')}>호출부호</button>
        <button className={`tab-btn ${mode === 'term' && view === 'study' ? 'active' : ''}`} onClick={() => handleTabChange('term')}>항공용어</button>
      </div>
      <div className="tabs secondary-tabs">
        <button className={`tab-btn ${view === 'quiz' ? 'active' : ''}`} onClick={startQuiz} style={{ backgroundColor: '#ff9800', color: 'white' }}>📝 퀴즈</button>
        <button className={`tab-btn ${view === 'listening' ? 'active' : ''}`} onClick={() => setView('listening')} style={{ backgroundColor: '#9c27b0', color: 'white' }}>🎧 듣기 연습</button>
        <button className={`tab-btn ${view === 'stats' ? 'active' : ''}`} onClick={() => setView('stats')} style={{ backgroundColor: '#e91e63', color: 'white' }}>📊 오답 통계</button>
        <button className={`tab-btn ${view === 'table' ? 'active' : ''}`} onClick={() => setView('table')} style={{ backgroundColor: '#2196f3', color: 'white' }}>📑 전체 표</button>
      </div>

      {view === 'study' ? (
        <>
          <div className="toolbar" style={{ marginBottom: '10px' }}>
            <button className="small-btn" onClick={handleShuffle}>🔀 순서 섞기</button>
          </div>
          <div className="flashcard-container" onClick={handleCardClick}>
            {currentItem ? (
              <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
                <div className="card-face card-front">
                  <div className="char-display" style={{fontSize: (mode === 'callsign' ? currentItem.name : currentItem.char).length > 8 ? '2rem' : '4rem'}}>
                    {mode === 'callsign' ? currentItem.name : currentItem.char}
                  </div>
                  <p className="hint">클릭해서 정답 확인</p>
                </div>
                <div className="card-face card-back">
                  <div className="name-display">
                    {mode === 'callsign' ? currentItem.char : currentItem.name}
                  </div>
                  <div className="pronunciation-display">{currentItem.pronunciation}</div>
                  <div className="grading-buttons">
                    <button className="grade-btn wrong" onClick={(e) => { e.stopPropagation(); handleGrade('wrong'); }}>❌ 틀렸음</button>
                    <button className="grade-btn correct" onClick={(e) => { e.stopPropagation(); handleGrade('correct'); }}>⭕ 맞았음</button>
                  </div>
                </div>
              </div>
            ) : <div className="flashcard"><div className="card-face"><p>카드가 없습니다.</p></div></div>}
          </div>
          <div className="controls">
            <button className="control-btn" onClick={handlePrev} disabled={!cards.length}>←</button>
            <div style={{ alignSelf: 'center', fontSize: '1.2rem' }}>{currentItem ? `${currentIndex + 1} / ${cards.length}` : '- / -'}</div>
            <button className="control-btn" onClick={handleNext} disabled={!cards.length}>→</button>
          </div>
        </>
      ) : view === 'quiz' ? (
        <div className="quiz-container">
           {quizState.showResult ? (
             <div className="quiz-result">
               <h2>퀴즈 결과</h2>
               <div className="score-display">
                 {quizState.score} / {quizState.questions.length}
               </div>
               <p>{quizState.score >= quizState.questions.length * 0.8 ? '🎉 훌륭합니다!' : '💪 더 노력해보세요!'}</p>
               <button className="reset-btn" onClick={startQuiz}>다시 풀기</button>
             </div>
           ) : (
             <div className="quiz-question-box">
               <div className="quiz-progress">문제 {quizState.currentIndex + 1} / {quizState.questions.length}</div>
               <h3 className="quiz-question">{quizState.questions[quizState.currentIndex]?.question}</h3>
               <div className="quiz-options">
                 {quizState.questions[quizState.currentIndex]?.options.map((option, idx) => (
                   <button 
                    key={idx} 
                    className={`quiz-option-btn 
                      ${quizState.selectedOption === option ? (quizState.isCorrect ? 'correct' : 'wrong') : ''}
                      ${quizState.selectedOption && option === quizState.questions[quizState.currentIndex].answer ? 'correct' : ''}
                    `}
                    onClick={() => handleQuizOptionClick(option)}
                    disabled={!!quizState.selectedOption}
                   >
                     {option}
                   </button>
                 ))}
               </div>
               {quizState.selectedOption && (
                 <div className="quiz-feedback">
                   {quizState.isCorrect ? '⭕ 정답입니다!' : `❌ 오답입니다. 정답: ${quizState.questions[quizState.currentIndex].answer}`}
                 </div>
               )}
             </div>
           )}
        </div>
      ) : view === 'listening' ? (
        <div className="listening-container">
          <h2>🎧 수신(듣기) 평가 연습</h2>
          <div className="listening-controls">
            <label>연습 모드:
              <select value={listeningConfig.type} onChange={(e) => setListeningConfig({...listeningConfig, type: e.target.value})} disabled={isPlaying}>
                <option value="random">랜덤 문자열</option>
                <option value="sentence">실전 문장 (PDF)</option>
              </select>
            </label>
            {listeningConfig.type === 'random' && (
              <label>문자 개수:
                <select value={listeningConfig.count} onChange={(e) => setListeningConfig({...listeningConfig, count: Number(e.target.value)})} disabled={isPlaying}>
                  <option value={5}>5개</option><option value={10}>10개</option><option value={20}>20개</option>
                </select>
              </label>
            )}
            <label>속도:
              <select value={listeningConfig.speed} onChange={(e) => setListeningConfig({...listeningConfig, speed: Number(e.target.value)})} disabled={isPlaying}>
                <option value={0.6}>0.6x</option><option value={0.8}>0.8x</option><option value={1.0}>1.0x</option><option value={1.2}>1.2x</option>
              </select>
            </label>
          </div>
          <div className="player-actions">
            {!isPlaying ? <button className="play-btn" onClick={startListeningTest}>▶ 시험 시작</button> : <button className="stop-btn" onClick={stopListeningTest}>⏹ 중지</button>}
          </div>
          <div className="input-area">
            <p className="instruction">{listeningConfig.type === 'random' ? '음어의 문자를 입력하세요.' : '들리는 문장을 그대로 입력하세요.'}</p>
            <textarea className="answer-input" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="정답 입력..." />
          </div>
          {testResult ? (
            <div className="result-area">
              <h3>📝 결과: {testResult.score}점</h3>
              <div className="result-details" style={{fontSize: listeningConfig.type === 'sentence' ? '0.7rem' : '1.1rem'}}>
                {testResult.corrections.map((item, idx) => (
                  <span key={idx} className={`result-char ${item.isCorrect ? 'correct' : 'wrong'}`} style={{minWidth: item.char === ' ' ? '8px' : 'auto', padding: '2px 4px'}}>
                    <span className="char-orig">{item.char === ' ' ? '␣' : item.char}</span>
                    <span className="char-user">{item.user === ' ' ? '␣' : item.user}</span>
                  </span>
                ))}
              </div>
            </div>
          ) : <button className="submit-btn" onClick={submitListeningTest} disabled={isPlaying || testString.length === 0}>채점 하기</button>}
        </div>
      ) : view === 'stats' ? (
        <div className="stats-container">
          <h2>⚠️ 많이 틀린 문자</h2>
          {getSortedMistakes().length === 0 ? <p>기록이 없습니다.</p> : (
            <ul className="stats-list">{getSortedMistakes().map((item) => (
              <li key={item.char} className="stat-item"><span className="stat-char">{item.char}</span><span className="stat-name">{item.name} ({item.pronunciation})</span><span className="stat-count">{item.count}회</span></li>
            ))}</ul>
          )}
          <button className="reset-btn" onClick={handleResetStats}>기록 초기화</button>
        </div>
      ) : (
        <div className="table-view-container">
          <div className="tabs" style={{ marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className={`tab-btn ${tableMode === 'alphabet' ? 'active' : ''}`} onClick={() => setTableMode('alphabet')}>문자</button>
            <button className={`tab-btn ${tableMode === 'number' ? 'active' : ''}`} onClick={() => setTableMode('number')}>숫자</button>
            <button className={`tab-btn ${tableMode === 'standard' ? 'active' : ''}`} onClick={() => setTableMode('standard')}>표준단어</button>
            <button className={`tab-btn ${tableMode === 'callsign' ? 'active' : ''}`} onClick={() => setTableMode('callsign')}>호출부호</button>
            <button className={`tab-btn ${tableMode === 'term' ? 'active' : ''}`} onClick={() => setTableMode('term')}>항공용어</button>
          </div>
          <div className="table-section">
             <table className="reference-table multi-column">
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={i}>{row.map((item) => (
                    <React.Fragment key={item.char}>
                      <td className="cell-char" style={{maxWidth: '150px'}}>{item.char}</td>
                      <td className="cell-name">{item.name} <br/><small>{item.pronunciation}</small></td>
                    </React.Fragment>
                  ))}</tr>
                ))}
              </tbody>
             </table>
          </div>
        </div>
      )}
      <footer className="footer">
        개발: <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer">Gemini-CLI</a>,
        자연어입력 : <a href="https://kichan.dev" target="_blank" rel="noopener noreferrer">박희찬(kichan)</a>
      </footer>
    </div>
  );
}

export default App;