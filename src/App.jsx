import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Trophy, Users, Star, TrendingUp, ChevronDown, Search, Filter, Plus, Minus, Zap, Award } from 'lucide-react';

const App = () => {
  const [activeSport, setActiveSport] = useState('football');
  const [selectedBets, setSelectedBets] = useState([]);
  const [betSlipOpen, setBetSlipOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  // Mock live data to simulate real-time updates
  const mockLiveMatches = [
    {
      id: 1,
      team1: 'برشلونة',
      team2: 'ريال مدريد',
      time: '20:45',
      date: 'اليوم',
      league: 'الدوري الإسباني',
      score1: 2,
      score2: 1,
      minute: '78',
      odds: { win1: 2.10, draw: 3.20, win2: 3.40 },
      status: 'live'
    },
    {
      id: 4,
      team1: '湖人队',
      team2: '勇士队',
      time: '19:00',
      date: 'اليوم',
      league: 'NBA',
      score1: 85,
      score2: 78,
      quarter: 'Q3',
      odds: { win1: 1.95, win2: 1.85 },
      status: 'live'
    }
  ];

  const mockUpcomingMatches = [
    {
      id: 2,
      team1: 'بايرن ميونيخ',
      team2: 'بوروسيا دورتموند',
      time: '18:30',
      date: '2024-01-15',
      league: 'الدوري الألماني',
      odds: { win1: 1.85, draw: 3.40, win2: 4.10 },
      status: 'upcoming'
    },
    {
      id: 3,
      team1: 'مانشستر سيتي',
      team2: 'ليفربول',
      time: '21:00',
      date: '2024-01-15',
      league: 'الدوري الإنجليزي',
      odds: { win1: 2.30, draw: 3.10, win2: 3.00 },
      status: 'upcoming'
    },
    {
      id: 5,
      team1: 'باريس سان جيرمان',
      team2: 'أوليمبيك مارسيليا',
      time: '22:00',
      date: '2024-01-15',
      league: 'الدوري الفرنسي',
      odds: { win1: 1.45, draw: 4.20, win2: 6.50 },
      status: 'upcoming'
    }
  ];

  useEffect(() => {
    // Simulate real-time data updates
    setLiveMatches(mockLiveMatches);
    setUpcomingMatches(mockUpcomingMatches);
    
    const interval = setInterval(() => {
      // Update scores for live matches
      setLiveMatches(prev => prev.map(match => ({
        ...match,
        score1: match.id === 1 ? match.score1 + Math.floor(Math.random() * 2) : match.score1,
        score2: match.id === 1 ? match.score2 + Math.floor(Math.random() * 2) : match.score2,
        minute: match.id === 1 ? Math.min(90, parseInt(match.minute) + 1).toString() : match.minute
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const sports = [
    { id: 'football', name: 'كرة القدم', icon: '⚽', matches: 12 },
    { id: 'basketball', name: 'كرة السلة', icon: '🏀', matches: 8 },
    { id: 'tennis', name: 'التنس', icon: '🎾', matches: 5 },
    { id: 'volleyball', name: 'ال.volleyball', icon: '🏐', matches: 3 },
    { id: 'boxing', name: 'الملاكمة', icon: '🥊', matches: 2 },
    { id: 'esports', name: 'الألعاب الإلكترونية', icon: '🎮', matches: 7 }
  ];

  const addToBetSlip = (match, betType, odds) => {
    const existingBet = selectedBets.find(bet => bet.matchId === match.id && bet.type === betType);
    
    if (existingBet) {
      setSelectedBets(selectedBets.filter(bet => !(bet.matchId === match.id && bet.type === betType)));
    } else {
      setSelectedBets([
        ...selectedBets,
        {
          matchId: match.id,
          match,
          type: betType,
          odds,
          stake: 10
        }
      ]);
    }
  };

  const updateStake = (index, amount) => {
    const newBets = [...selectedBets];
    newBets[index].stake = Math.max(0, amount);
    setSelectedBets(newBets);
  };

  const totalOdds = selectedBets.reduce((acc, bet) => acc * bet.odds, 1);
  const totalStake = selectedBets.reduce((acc, bet) => acc + bet.stake, 0);
  const potentialWin = totalStake * totalOdds;

  const LiveMatchCard = ({ match }) => (
    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-6 mb-4 relative overflow-hidden">
      <div className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded-full text-xs font-bold text-white flex items-center">
        <Zap className="w-3 h-3 ml-1" />
        مباشر
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-white/80" />
          <span className="text-sm text-white/80">{match.date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-white/80" />
          <span className="text-sm font-semibold text-white">
            {match.minute ? `${match.minute}'` : match.quarter}
          </span>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <h3 className="text-sm text-white/80 mb-2">{match.league}</h3>
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <p className="font-semibold text-lg text-white">{match.team1}</p>
          </div>
          <div className="mx-4">
            <div className="bg-white/20 rounded-lg px-3 py-1">
              <span className="text-2xl font-bold text-white">
                {match.score1} - {match.score2}
              </span>
            </div>
          </div>
          <div className="text-center flex-1">
            <p className="font-semibold text-lg text-white">{match.team2}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => addToBetSlip(match, 'win1', match.odds.win1)}
          className={`p-3 rounded-lg text-center transition-all duration-200 ${
            selectedBets.find(bet => bet.matchId === match.id && bet.type === 'win1')
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          <div className="font-bold">{match.odds.win1}</div>
          <div className="text-xs">الفوز 1</div>
        </button>
        
        {match.odds.draw > 0 && (
          <button
            onClick={() => addToBetSlip(match, 'draw', match.odds.draw)}
            className={`p-3 rounded-lg text-center transition-all duration-200 ${
              selectedBets.find(bet => bet.matchId === match.id && bet.type === 'draw')
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            <div className="font-bold">{match.odds.draw}</div>
            <div className="text-xs">تعادل</div>
          </button>
        )}
        
        <button
          onClick={() => addToBetSlip(match, 'win2', match.odds.win2)}
          className={`p-3 rounded-lg text-center transition-all duration-200 ${
            selectedBets.find(bet => bet.matchId === match.id && bet.type === 'win2')
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          <div className="font-bold">{match.odds.win2}</div>
          <div className="text-xs">الفوز 2</div>
        </button>
      </div>
    </div>
  );

  const UpcomingMatchCard = ({ match }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{match.date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold text-blue-600">{match.time}</span>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <h3 className="text-sm text-gray-500 mb-2">{match.league}</h3>
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <p className="font-semibold text-lg">{match.team1}</p>
          </div>
          <div className="mx-4">
            <span className="text-2xl font-bold text-gray-400">VS</span>
          </div>
          <div className="text-center flex-1">
            <p className="font-semibold text-lg">{match.team2}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => addToBetSlip(match, 'win1', match.odds.win1)}
          className={`p-3 rounded-lg text-center transition-all duration-200 ${
            selectedBets.find(bet => bet.matchId === match.id && bet.type === 'win1')
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 hover:bg-blue-50 text-gray-800'
          }`}
        >
          <div className="font-bold">{match.odds.win1}</div>
          <div className="text-xs">الفوز 1</div>
        </button>
        
        {match.odds.draw > 0 && (
          <button
            onClick={() => addToBetSlip(match, 'draw', match.odds.draw)}
            className={`p-3 rounded-lg text-center transition-all duration-200 ${
              selectedBets.find(bet => bet.matchId === match.id && bet.type === 'draw')
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-green-50 text-gray-800'
            }`}
          >
            <div className="font-bold">{match.odds.draw}</div>
            <div className="text-xs">تعادل</div>
          </button>
        )}
        
        <button
          onClick={() => addToBetSlip(match, 'win2', match.odds.win2)}
          className={`p-3 rounded-lg text-center transition-all duration-200 ${
            selectedBets.find(bet => bet.matchId === match.id && bet.type === 'win2')
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-gray-100 hover:bg-red-50 text-gray-800'
          }`}
        >
          <div className="font-bold">{match.odds.win2}</div>
          <div className="text-xs">الفوز 2</div>
        </button>
      </div>
    </div>
  );
    return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" dir="rtl">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <h1 className="text-2xl font-bold text-white">
                  <span className="text-yellow-400">ZTN-BET</span> 
                  <span className="text-blue-400"> X BZEZEL</span>
                </h1>
              </div>
              <div className="hidden md:flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-bold">مباشر</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4 text-white">
                <div className="text-center">
                  <div className="text-lg font-bold">2,847</div>
                  <div className="text-xs text-gray-300">مستخدم نشط</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">₪1,250,000</div>
                  <div className="text-xs text-gray-300">jackpots</div>
                </div>
              </div>
              <button
                onClick={() => setBetSlipOpen(!betSlipOpen)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>الرهان ({selectedBets.length})</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Sports Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 ml-2" />
                الرياضات
              </h2>
              <div className="space-y-2">
                {sports.map((sport) => (
                  <button
                    key={sport.id}
                    onClick={() => setActiveSport(sport.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      activeSport === sport.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{sport.icon}</span>
                      <span className="font-medium">{sport.name}</span>
                    </div>
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                      {sport.matches}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Stats */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Award className="w-5 h-5 ml-2" />
                الإحصائيات الحية
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">المستخدمين النشطين</span>
                  <span className="text-green-400 font-bold">2,847</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">الرهانات اليوم</span>
                  <span className="text-blue-400 font-bold">15,230</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">ال jackpots</span>
                  <span className="text-yellow-400 font-bold">₪1,250,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">المباريات الحية</span>
                  <span className="text-red-400 font-bold">{liveMatches.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Matches */}
          <div className="lg:col-span-2">
            {/* Live Matches Section */}
            {liveMatches.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="bg-red-600 w-3 h-3 rounded-full animate-pulse ml-2"></div>
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Zap className="w-6 h-6 ml-2 text-red-400" />
                    المباريات الحية
                  </h2>
                </div>
                <div className="space-y-4">
                  {liveMatches.map((match) => (
                    <LiveMatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Matches Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  مباريات {sports.find(s => s.id === activeSport)?.name}
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="البحث عن فريق..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="bg-white/10 border border-white/20 rounded-lg p-2 text-white hover:bg-white/20 transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {upcomingMatches.map((match) => (
                  <UpcomingMatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          </div>
                    {/* Bet Slip */}
          <div className={`lg:col-span-1 transition-all duration-300 ${betSlipOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Star className="w-5 h-5 ml-2 text-yellow-400" />
                  رهانك
                </h2>
                <button
                  onClick={() => setBetSlipOpen(false)}
                  className="lg:hidden text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {selectedBets.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">لا توجد رهانات محددة</p>
                  <p className="text-sm text-gray-500 mt-2">اختر مباريات للبدء في الرهان</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedBets.map((bet, index) => (
                    <div key={`${bet.matchId}-${bet.type}`} className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="text-white font-semibold text-sm">
                            {bet.match.team1} vs {bet.match.team2}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {bet.type === 'win1' ? 'فوز ' + bet.match.team1 : 
                             bet.type === 'draw' ? 'تعادل' : 
                             'فوز ' + bet.match.team2}
                          </p>
                          {bet.match.status === 'live' && (
                            <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mt-1">
                              مباشر
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedBets(selectedBets.filter((_, i) => i !== index))}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400 font-bold">{bet.odds}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateStake(index, bet.stake - 5)}
                            className="bg-white/10 rounded p-1 hover:bg-white/20"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            value={bet.stake}
                            onChange={(e) => updateStake(index, parseFloat(e.target.value) || 0)}
                            className="bg-white/10 border border-white/20 rounded px-2 py-1 w-16 text-center text-white text-sm"
                          />
                          <button
                            onClick={() => updateStake(index, bet.stake + 5)}
                            className="bg-white/10 rounded p-1 hover:bg-white/20"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-white/20 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">إجمالي الفرص:</span>
                      <span className="text-white font-bold">{totalOdds.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">إجمالي الرهان:</span>
                      <span className="text-white font-bold">₪{totalStake}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-yellow-400">الربح المحتمل:</span>
                      <span className="text-green-400">₪{potentialWin.toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 mt-4">
                    تأكيد الرهان
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">ZTN-BET</h3>
              <p className="text-gray-400 text-sm">
                أفضل منصة رهان إلكتروني في المنطقة مع أفضل الفرص وأعلى الأمان
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">الروابط السريعة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">الرئيسية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الرياضات</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ال jackpots</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الدعم</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">الدعم</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">الأسئلة الشائعة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الخصوصية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">تواصل معنا</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">تابعنا</h4>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <span className="text-white text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                  <span className="text-white text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-700 transition-colors">
                  <span className="text-white text-xs">i</span>
                </div>
              </div>
            </div>
          </div>
                    <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 ZTN-BET X BZEZEL. جميع الحقوق محفوظة. | هذا الموقع مخصص للبالغين فقط
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
