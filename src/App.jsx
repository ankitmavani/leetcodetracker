import { Routes, Route } from 'react-router-dom';
import DailyTracker from './pages/DailyTracker';
import LeetcodeTracker from './pages/LeetcodeTracker';
import Home from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/leetcode-tracker' element={<LeetcodeTracker />} />
      <Route path='/habit-tracker' element={<DailyTracker />} />
    </Routes>
  );
}
