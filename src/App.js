import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import NewBoard from './pages/NewBoard';
import ViewBoardPage from './pages/ViewBoardPage';
import MyPage from './pages/MyPage/MyPage';
import NoticeEditPage from './pages/NoticeEditPage/NoticeEditPage';
import NoticeViewPage from './pages/NoticeViewPage/NoticeViewPage';
import NoticeListPage from './pages/NoticeListPage/NoticeListPage';
import StudyGroupPage from './pages/StudyGroupPage/StudyGroupPage';
import RankPage from './pages/RankPage/RankPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import EditBoard from './pages/EditBoard';
import PrivateRoutes from './components/PrivateRoutes';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'element={<MainPage />}/>
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/newBoard' element={<NewBoard />} />
            <Route path='/editBoard/:id' element={<EditBoard />} /> 
            <Route path='/viewBoard/:id' element={<ViewBoardPage />} />
            <Route path='/myPage' element={<MyPage />} />
            <Route path='/studyGroup' element={<StudyGroupPage />} />
            <Route path='/newNotice' element={<NoticeEditPage />} />
            <Route path='/notice/:id' element={<NoticeViewPage />} />
            <Route path='/noticeList' element={<NoticeListPage />} />
          </Route>
          <Route path='/rank' element={<RankPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
