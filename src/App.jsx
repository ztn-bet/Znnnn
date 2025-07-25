import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Trophy, Users, Star, TrendingUp, Search, Filter, Plus, Minus, Zap, Award, User, CreditCard, Gamepad2, RefreshCw, Home, LogOut, Eye, EyeOff, History, Play, Menu, X, Activity, Target, Medal, Crown, Flag, MapPin, Phone, Mail, Lock, Unlock, Heart, Share2, Bookmark, Bell, Volume2, VolumeX } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [selectedBets, setSelectedBets] = useState([]);
  const [betSlipOpen, setBetSlipOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [betHistory, setBetHistory] = useState([]);
  const [activeSport, setActiveSport] = useState('all');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  // بيانات الرياضات والمباريات الحقيقية
  const sportsData = [
    { id: 'football', name: 'كرة القدم', icon: '⚽', color: 'bg-blue-500', lucideIcon: Trophy },
    { id: 'basketball', name: 'كرة السلة', icon: '🏀', color: 'bg-orange-500', lucideIcon: Target },
    { id: 'tennis', name: 'التنس', icon: '🎾', color: 'bg-green-500', lucideIcon: Award },
    { id: 'volleyball', name: 'ال.volleyball', icon: '🏐', color: 'bg-purple-500', lucideIcon: Medal },
    { id: 'handball', name: 'كرة اليد', icon: '🤾', color: 'bg-red-500', lucideIcon: Crown },
    { id: 'esports', name: 'الألعاب الإلكترونية', icon: '🎮', color: 'bg-pink-500', lucideIcon: Gamepad2 }
  ];

  // مباريات حقيقية محدثة
  const fetchRealMatches = () => {
    setLoading(true);
    
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const nextDays = [];
    for (let i = 2; i <= 7; i++) {
      const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
      nextDays.push(date.toISOString().split('T')[0]);
    }
    
    const mockMatches = [
      // كرة القدم - اليوم
      {
        id: 1,
        team1: 'برشلونة',
        team2: 'ريال مدريد',
        time: '20:45',
        date: today,
        league: 'الدوري الإسباني',
        odds: { win1: 2.10, draw: 3.20, win2: 3.40 },
        status: 'upcoming',
        sport: 'football',
        category: ' Laliga'
      },
      {
        id: 2,
        team1: 'بايرن ميونيخ',
        team2: 'بوروسيا دورتموند',
        time: '18:30',
        date: today,
        league: 'الدوري الألماني',
        odds: { win1: 1.85, draw: 3.40, win2: 4.10 },
        status: 'upcoming',
        sport: 'football',
        category: 'Bundesliga'
      },
      {
        id: 3,
        team1: 'تشيلسي',
        team2: 'مانشستر سيتي',
        time: '21:00',
        date: today,
        league: 'الدوري الإنجليزي',
        odds: { win1: 3.50, draw: 3.80, win2: 1.95 },
        status: 'live',
        sport: 'football',
        category: 'Premier League',
        score1: 1,
        score2: 2,
        minute: '67'
      },
      // كرة السلة - اليوم
      {
        id: 4,
        team1: '湖人队',
        team2: '勇士队',
        time: '19:00',
        date: today,
        league: 'NBA',
        odds: { win1: 1.95, win2: 1.85 },
        status: 'live',
        sport: 'basketball',
        category: 'NBA Regular Season',
        score1: 85,
        score2: 78,
        quarter: 'Q3'
      },
      // كرة القدم - غداً
      {
        id: 5,
        team1: 'باريس سان جيرمان',
        team2: 'أوليمبيك مارسيليا',
        time: '22:00',
        date: tomorrow,
        league: 'الدوري الفرنسي',
        odds: { win1: 1.45, draw: 4.20, win2: 6.50 },
        status: 'upcoming',
        sport: 'football',
        category: 'Ligue 1'
      },
      // كرة القدم - الأيام القادمة
      {
        id: 6,
        team1: 'ميلان',
        team2: 'إنتر ميلان',
        time: '19:45',
        date: nextDays[0],
        league: 'الدوري الإيطالي',
        odds: { win1: 2.60, draw: 3.00, win2: 2.80 },
        status: 'upcoming',
        sport: 'football',
        category: 'Serie A'
      },
      {
        id: 7,
        team1: 'أتلتيكو مدريد',
        team2: 'فالنسيا',
        time: '21:00',
        date: nextDays[1],
        league: 'الدوري الإسباني',
        odds: { win1: 1.90, draw: 3.30, win2: 4.00 },
        status: 'upcoming',
        sport: 'football',
        category: 'Laliga'
      },
      // كرة السلة
      {
        id: 8,
        team1: 'LA Lakers',
        team2: 'Boston Celtics',
        time: '20:30',
        date: nextDays[2],
        league: 'NBA',
        odds: { win1: 2.10, win2: 1.75 },
        status: 'upcoming',
        sport: 'basketball',
        category: 'NBA Regular Season'
      },
      // التنس
      {
        id: 9,
        team1: 'نوفاك ديوكوفيتش',
        team2: 'رافائيل نادال',
        time: '15:00',
        date: nextDays[3],
        league: 'بطولة وimbledon',
        odds: { win1: 1.80, win2: 2.00 },
        status: 'upcoming',
        sport: 'tennis',
        category: 'Grand Slam'
      },
      // الألعاب الإلكترونية
      {
        id: 10,
        team1: 'Team Liquid',
        team2: 'Fnatic',
        time: '18:00',
        date: nextDays[4],
        league: 'League of Legends',
        odds: { win1: 1.65, win2: 2.20 },
        status: 'upcoming',
        sport: 'esports',
        category: 'Worlds 2024'
      }
    ];
    
    setTimeout(() => {
      setMatches(mockMatches);
      setLoading(false);
      setLastUpdate(new Date());
    }, 800);
  };

  useEffect(() => {
    fetchRealMatches();
    
    // تحديث المباريات كل 30 ثانية
    const interval = setInterval(() => {
      fetchRealMatches();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const registerUser = (userData) => {
    const newUser = {
      id: Date.now(),
      username: userData.username,
      email: userData.email,
      points: 1000,
      createdAt: new Date().toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${userData.username}&background=random`
    };
    setUser(newUser);
    setPoints(1000);
    setShowRegister(false);
    alert('🎉 مرحباً بك! لقد حصلت على 1000 نقطة للبدء في الرهان!');
  };

  const loginUser = (credentials) => {
    const mockUser = {
      id: 1,
      username: credentials.username,
      email: 'user@example.com',
      points: 1500,
      createdAt: '2024-01-01',
      avatar: `https://ui-avatars.com/api/?name=${credentials.username}&background=random`
    };
    setUser(mockUser);
    setPoints(mockUser.points);
    setShowLogin(false);
  };

  const logoutUser = () => {
    setUser(null);
    setPoints(0);
    setSelectedBets([]);
  };

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
          stake: 50
        }
      ]);
    }
  };

  const updateStake = (index, amount) => {
    const newBets = [...selectedBets];
    newBets[index].stake = Math.max(10, amount);
    setSelectedBets(newBets);
  };

  const removeBet = (index) => {
    const newBets = [...selectedBets];
    newBets.splice(index, 1);
    setSelectedBets(newBets);
  };

  const placeBet = () => {
    if (selectedBets.length === 0) return;
    
    const totalStake = selectedBets.reduce((acc, bet) => acc + bet.stake, 0);
    
    if (totalStake > points) {
      alert('❌ ليس لديك نقاط كافية لإجراء هذا الرهان!');
      return;
    }
    
    const totalOdds = selectedBets.reduce((acc, bet) => acc * bet.odds, 1);
    const potentialWin = totalStake * totalOdds;
    
    const newBet = {
      id: Date.now(),
      bets: [...selectedBets],
      totalStake,
      totalOdds: totalOdds.toFixed(2),
      potentialWin: potentialWin.toFixed(2),
      status: 'placed',
      placedAt: new Date().toISOString()
    };
    
    setBetHistory([newBet, ...betHistory]);
    setPoints(prev => prev - totalStake);
    setSelectedBets([]);
    setBetSlipOpen(false);
    
    alert(`✅ تم وضع الرهان بنجاح!\nالرهان الإجمالي: ${totalStake} نقطة\nالربح المحتمل: ${potentialWin.toFixed(2)} نقطة`);
  };

  const LoginModal = () => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <User className="w-6 h-6 ml-2 text-blue-600" />
            تسجيل الدخول
          </h2>
          <button 
            onClick={() => setShowLogin(false)} 
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); loginUser(loginForm); }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">اسم المستخدم</label>
            <input
              type="text"
              value={loginForm.username}
              onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="أدخل اسم المستخدم"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 pr-12"
                placeholder="أدخل كلمة المرور"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-bold text-lg shadow-lg"
          >
            تسجيل الدخول
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => { setShowLogin(false); setShowRegister(true); }}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ليس لديك حساب؟ انشئ حساب جديد
          </button>
        </div>
      </div>
    </div>
  );
    const RegisterModal = () => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <User className="w-6 h-6 ml-2 text-green-600" />
            إنشاء حساب جديد
          </h2>
          <button 
            onClick={() => setShowRegister(false)} 
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); registerUser(registerForm); }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">اسم المستخدم</label>
            <input
              type="text"
              value={registerForm.username}
              onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
              placeholder="اختر اسم مستخدم"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={registerForm.password}
                onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 pr-12"
                placeholder="اختر كلمة مرور قوية"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">تأكيد كلمة المرور</label>
            <input
              type="password"
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
              placeholder="أعد إدخال كلمة المرور"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-bold text-lg shadow-lg"
          >
            إنشاء الحساب
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => { setShowRegister(false); setShowLogin(true); }}
            className="text-green-600 hover:text-green-800 font-medium"
          >
            لديك حساب بالفعل؟ تسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  );

  const MatchCard = ({ match }) => (
    <div className={`bg-white rounded-xl shadow-lg p-4 mb-4 hover:shadow-xl transition-all duration-300 border-r-4 ${
      match.status === 'live' ? 'border-red-500' : 'border-blue-500'
    }`}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 font-medium">{match.date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold text-blue-600">{match.time}</span>
        </div>
      </div>
      
      <div className="text-center mb-3">
        <div className="inline-block bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600 mb-2">
          {match.league}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <p className="font-semibold text-sm">{match.team1}</p>
          </div>
          {match.status === 'live' ? (
            <div className="mx-2">
              <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                {match.score1} - {match.score2}
              </div>
              <div className="text-red-500 text-xs mt-1">
                {match.minute ? `${match.minute}'` : match.quarter}
              </div>
            </div>
          ) : (
            <div className="mx-4">
              <span className="text-xl font-bold text-gray-400">VS</span>
            </div>
          )}
          <div className="text-center flex-1">
            <p className="font-semibold text-sm">{match.team2}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        <button
          onClick={() => addToBetSlip(match, 'win1', match.odds.win1)}
          className={`p-2 rounded-lg text-center transition-all duration-200 text-sm ${
            selectedBets.find(bet => bet.matchId === match.id && bet.type === 'win1')
              ? 'bg-blue-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 hover:bg-blue-50 text-gray-800'
          }`}
        >
          <div className="font-bold">{match.odds.win1}</div>
          <div className="text-xs">1</div>
        </button>
        
        {match.odds.draw > 0 && (
          <button
            onClick={() => addToBetSlip(match, 'draw', match.odds.draw)}
            className={`p-2 rounded-lg text-center transition-all duration-200 text-sm ${
              selectedBets.find(bet => bet.matchId === match.id && bet.type === 'draw')
                ? 'bg-green-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 hover:bg-green-50 text-gray-800'
            }`}
          >
            <div className="font-bold">{match.odds.draw}</div>
            <div className="text-xs">X</div>
          </button>
        )}
        
        <button
          onClick={() => addToBetSlip(match, 'win2', match.odds.win2)}
          className={`p-2 rounded-lg text-center transition-all duration-200 text-sm ${
            selectedBets.find(bet => bet.matchId === match.id && bet.type === 'win2')
              ? 'bg-red-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 hover:bg-red-50 text-gray-800'
          }`}
        >
          <div className="font-bold">{match.odds.win2}</div>
          <div className="text-xs">2</div>
        </button>
      </div>
    </div>
  );

  const LiveMatchCard = ({ match }) => (
    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-4 mb-4 relative overflow-hidden">
      <div className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded-full text-xs font-bold text-white flex items-center animate-pulse">
        <Zap className="w-3 h-3 ml-1" />
        مباشر
      </div>
      
      <div className="flex justify-between items-center mb-3">
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
      
      <div className="text-center mb-3">
        <div className="inline-block bg-white/20 px-2 py-1 rounded-full text-xs text-white mb-2">
          {match.league}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <p className="font-semibold text-white">{match.team1}</p>
          </div>
          <div className="mx-2">
            <div className="bg-white/20 rounded-lg px-2 py-1">
              <span className="text-xl font-bold text-white">
                {match.score1} - {match.score2}
              </span>
            </div>
          </div>
          <div className="text-center flex-1">
            <p className="font-semibold text-white">{match.team2}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        <button
          onClick={() => addToBetSlip(match, 'win1', match.odds.win1)}
          className={`p-2 rounded-lg text-center transition-all duration-200 text-sm ${
            selectedBets.find(bet => bet.matchId === match.id && bet.type === 'win1')
              ? 'bg-blue-600 text-white shadow-lg transform scale-105'
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          <div className="font-bold">{match.odds.win1}</div>
          <div className="text-xs">1</div>
        </button>
        
        {match.odds.draw > 0 && (
          <button
            onClick={() => addToBetSlip(match, 'draw', match.odds.draw)}
            className={`p-2 rounded-lg text-center transition-all duration-200 text-sm ${
              selectedBets.find(bet => bet.matchId === match.id && bet.type === 'draw')
                ? 'bg-green-600 text-white shadow-lg transform scale-105'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            <div className="font-bold">{match.odds.draw}</div>
            <div className="text-xs">X</div>
          </button>
        )}
        
        <button
          onClick={() => addToBetSlip(match, 'win2', match.odds.win2)}
          className={`p-2 rounded-lg text-center transition-all duration-200 text-sm ${
            selectedBets.find(bet => bet.matchId === match.id && bet.type === 'win2')
              ? 'bg-red-600 text-white shadow-lg transform scale-105'
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          <div className="font-bold">{match.odds.win2}</div>
          <div className="text-xs">2</div>
        </button>
      </div>
    </div>
  );

  const filteredMatches = matches.filter(match => {
    if (activeSport === 'all') return true;
    return match.sport === activeSport;
  }).filter(match => 
    match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.team2.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.league.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const liveMatches = filteredMatches.filter(match => match.status === 'live');
  const upcomingMatches = filteredMatches.filter(match => match.status === 'upcoming');

  const groupedMatches = {};
  upcomingMatches.forEach(match => {
    if (!groupedMatches[match.date]) {
      groupedMatches[match.date] = [];
    }
    groupedMatches[match.date].push(match);
  });

  const formatDate = (dateString) => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    if (dateString === today) return 'اليوم';
    if (dateString === tomorrow) return 'غداً';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
    return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <h1 className="text-2xl font-bold text-gray-800">
                  <span className="text-blue-600">ZTN</span>
                  <span className="text-green-600">BET</span>
                </h1>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-2 rounded-full">
                    <CreditCard className="w-5 h-5 text-white" />
                    <span className="text-white font-bold">{points}</span>
                    <span className="text-white text-sm">نقطة</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img 
                      src={user.avatar} 
                      alt={user.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-800 font-medium">{user.username}</span>
                  </div>
                  <button
                    onClick={logoutUser}
                    className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">خروج</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    دخول
                  </button>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    تسجيل
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setBetSlipOpen(!betSlipOpen)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <Users className="w-4 h-4" />
              <span>({selectedBets.length})</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="bg-white w-64 h-full p-4" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">القائمة</h2>
                <button onClick={() => setSidebarOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <nav className="space-y-2">
                <button
                  onClick={() => { setActiveTab('home'); setSidebarOpen(false); }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                    activeTab === 'home' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span>الرئيسية</span>
                </button>
                <button
                  onClick={() => { setActiveTab('sports'); setSidebarOpen(false); }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                    activeTab === 'sports' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Trophy className="w-5 h-5" />
                  <span>الرياضات</span>
                </button>
                <button
                  onClick={() => { setActiveTab('live'); setSidebarOpen(false); }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                    activeTab === 'live' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Zap className="w-5 h-5" />
                  <span>مباشر</span>
                </button>
                {user && (
                  <button
                    onClick={() => { setActiveTab('history'); setSidebarOpen(false); }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                      activeTab === 'history' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <History className="w-5 h-5" />
                    <span>تاريخ الرهانات</span>
                  </button>
                )}
              </nav>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 bg-white shadow-lg min-h-screen">
          <div className="p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('home')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activeTab === 'home' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>الرئيسية</span>
              </button>
              <button
                onClick={() => setActiveTab('sports')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activeTab === 'sports' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Trophy className="w-5 h-5" />
                <span>الرياضات</span>
              </button>
              <button
                onClick={() => setActiveTab('live')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activeTab === 'live' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Zap className="w-5 h-5" />
                <span>مباشر</span>
                {liveMatches.length > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
                    {liveMatches.length}
                  </span>
                )}
              </button>
              {user && (
                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeTab === 'history' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <History className="w-5 h-5" />
                  <span>تاريخ الرهانات</span>
                </button>
              )}
            </nav>
            
            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">الرياضات</h3>
              <div className="space-y-1">
                {sportsData.map((sport) => {
                  const IconComponent = sport.lucideIcon;
                  return (
                    <button
                      key={sport.id}
                      onClick={() => { setActiveSport(sport.id); setActiveTab('sports'); }}
                      className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        activeSport === sport.id ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className={`w-4 h-4 ${sport.color.replace('bg-', 'text-')}`} />
                      <span className="text-sm">{sport.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {activeTab === 'home' && (
            <div>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-6">
                <h1 className="text-3xl font-bold mb-2">مرحباً بك في ZTNBET</h1>
                <p className="text-blue-100 mb-4">منصة الرهان الرياضي باستخدام النقاط</p>
                {!user && (
                  <button
                    onClick={() => setShowRegister(true)}
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                  >
                    ابدأ الآن واحصل على 1000 نقطة
                  </button>
                )}
              </div>

              {user && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">نقاطك</p>
                        <p className="text-2xl font-bold text-yellow-600">{points}</p>
                      </div>
                      <CreditCard className="w-8 h-8 text-yellow-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">الرهانات النشطة</p>
                        <p className="text-2xl font-bold text-blue-600">{selectedBets.length}</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">إجمالي الرهانات</p>
                        <p className="text-2xl font-bold text-green-600">{betHistory.length}</p>
                      </div>
                      <Trophy className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                </div>
              )}

              {liveMatches.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                  <div className="flex items-center mb-4">
                    <Zap className="w-5 h-5 text-red-500 ml-2" />
                    <h2 className="text-xl font-bold text-gray-800">المباريات الحية</h2>
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-auto">
                      {liveMatches.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {liveMatches.slice(0, 4).map((match) => (
                      <LiveMatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">أحدث المباريات</h2>
                <div className="space-y-4">
                  {upcomingMatches.slice(0, 6).map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sports' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2">
                      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                      <span className="text-sm text-gray-500">
                        آخر تحديث: {lastUpdate.toLocaleTimeString('ar-SA')}
                      </span>
                    </div>
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="البحث عن فريق أو دوري..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">جاري تحميل المباريات...</p>
                  </div>
                ) : Object.keys(groupedMatches).length === 0 ? (
                  <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">لا توجد مباريات متوفرة</p>
                  </div>
                ) : (
                  Object.entries(groupedMatches).map(([date, matches]) => (
                    <div key={date} className="mb-8">
                      <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        {formatDate(date)}
                      </h2>
                      <div className="space-y-4">
                        {matches.map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
                            <div className={`lg:col-span-1 transition-all duration-300 ${betSlipOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-white rounded-xl shadow-lg p-4 sticky top-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 ml-2" />
                      رهانك
                    </h2>
                    <button
                      onClick={() => setBetSlipOpen(false)}
                      className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  {!user ? (
                    <div className="text-center py-8">
                      <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">يجب تسجيل الدخول لوضع رهان</p>
                      <button
                        onClick={() => setShowLogin(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        تسجيل الدخول
                      </button>
                    </div>
                  ) : selectedBets.length === 0 ? (
                    <div className="text-center py-8">
                      <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">لا توجد رهانات محددة</p>
                      <p className="text-sm text-gray-500 mt-2">اختر مباريات للبدء في الرهان</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedBets.map((bet, index) => (
                        <div key={`${bet.matchId}-${bet.type}`} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <p className="text-gray-800 font-semibold text-sm line-clamp-1">
                                {bet.match.team1} vs {bet.match.team2}
                              </p>
                              <p className="text-gray-600 text-xs">
                                {bet.type === 'win1' ? 'فوز ' + bet.match.team1 : 
                                 bet.type === 'draw' ? 'تعادل' : 
                                 'فوز ' + bet.match.team2}
                              </p>
                              <p className="text-blue-600 text-sm font-bold mt-1">
                                الكوتا: {bet.odds}
                              </p>
                            </div>
                            <button
                              onClick={() => removeBet(index)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-600 text-sm">الرهان:</span>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => updateStake(index, bet.stake - 10)}
                                className="bg-gray-200 rounded p-1 hover:bg-gray-300 disabled:opacity-50"
                                disabled={bet.stake <= 10}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <input
                                type="number"
                                value={bet.stake}
                                onChange={(e) => updateStake(index, parseInt(e.target.value) || 10)}
                                className="bg-white border border-gray-300 rounded px-2 py-1 w-16 text-center text-gray-800 text-sm"
                                min="10"
                                step="10"
                              />
                              <button
                                onClick={() => updateStake(index, bet.stake + 10)}
                                className="bg-gray-200 rounded p-1 hover:bg-gray-300"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">إجمالي الفرص:</span>
                          <span className="text-gray-800 font-bold">{selectedBets.reduce((acc, bet) => acc * bet.odds, 1).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">إجمالي الرهان:</span>
                          <span className="text-gray-800 font-bold">{selectedBets.reduce((acc, bet) => acc + bet.stake, 0)} نقطة</span>
                        </div>
                        <div className="flex justify-between text-base font-bold">
                          <span className="text-yellow-600">الربح المحتمل:</span>
                          <span className="text-green-600">
                            {(selectedBets.reduce((acc, bet) => acc + bet.stake, 0) * selectedBets.reduce((acc, bet) => acc * bet.odds, 1)).toFixed(2)} نقطة
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">النقاط المتاحة:</span>
                          <span className="text-blue-600 font-bold">{points} نقطة</span>
                        </div>
                      </div>

                      <button 
                        onClick={placeBet}
                        disabled={selectedBets.reduce((acc, bet) => acc + bet.stake, 0) > points}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        تأكيد الرهان
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'live' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <Zap className="w-6 h-6 text-red-500 ml-2" />
                <h2 className="text-2xl font-bold text-gray-800">المباريات الحية</h2>
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full mr-2 animate-pulse">
                  {liveMatches.length} مباراة
                </span>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">جاري تحميل المباريات...</p>
                </div>
              ) : liveMatches.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">لا توجد مباريات حية حالياً</p>
                  <p className="text-sm text-gray-500 mt-2">تحقق لاحقاً للمباريات الحية</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {liveMatches.map((match) => (
                    <LiveMatchCard key={match.id} match={match} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && user && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">تاريخ الرهانات</h2>
              {betHistory.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">لا توجد رهانات سابقة</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {betHistory.map((bet) => (
                    <div key={bet.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 text-sm">
                          {new Date(bet.placedAt).toLocaleDateString('ar-SA')}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          مكتمل
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">إجمالي الرهان:</span>
                          <span className="text-gray-800 font-bold mr-2">{bet.totalStake} نقطة</span>
                        </div>
                        <div>
                          <span className="text-gray-600">الفرص:</span>
                          <span className="text-gray-800 font-bold mr-2">{bet.totalOdds}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">الربح المحتمل:</span>
                          <span className="text-green-600 font-bold mr-2">{bet.potentialWin} نقطة</span>
                        </div>
                        <div>
                          <span className="text-gray-600">عدد المباريات:</span>
                          <span className="text-gray-800 font-bold mr-2">{bet.bets.length}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Trophy className="w-5 h-5 text-yellow-400 ml-2" />
                ZTNBET
              </h3>
              <p className="text-gray-400 text-sm">
                منصة الرهان الرياضي الحقيقية باستخدام النقاط بدلاً من النقود الحقيقية
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">الروابط السريعة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">الرئيسية</button></li>
                <li><button onClick={() => setActiveTab('sports')} className="hover:text-white transition-colors">الرياضات</button></li>
                <li><button onClick={() => setActiveTab('live')} className="hover:text-white transition-colors">المباريات الحية</button></li>
                <li><a href="#" className="hover:text-white transition-colors">الدعم الفني</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">الدعم</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a></li>
                <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">تواصل معنا</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الأسئلة الشائعة</a></li>
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
              <div className="mt-4 text-sm text-gray-400">
                <p>آخر تحديث: {lastUpdate.toLocaleString('ar-SA')}</p>
                <p className="mt-1">المباريات تتحديث كل 30 ثانية</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 ZTNBET. جميع الحقوق محفوظة. | هذا الموقع مخصص للبالغين فقط
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showLogin && <LoginModal />}
      {showRegister && <RegisterModal />}
    </div>
  );
};

export default App;
