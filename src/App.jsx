import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Navbar from './LayOut/Navbar/Navbar';
import Footer from './LayOut/Footer/Footer';
import AboutRehberlik from './Pages/AboutRehberlik';
import AboutHistory from './Pages/AboutHistory';
import AboutCommitet from './Pages/AboutCommitet';
import Contact from './Pages/Contact';
import AboutPage from './Pages/About';
import DetailPage from './Pages/DetailPage/DetailPage';
import MainLayout from './LayOut/MainLayout';
import LayoutAdmin from './AdminLayout';
import AddIdmanci from './AdminComponents/AddIdmanci';
import IdmanciAdmin from './Pages/AdminPages/IdmanciPage';
import AddIdmanNovleri from './AdminComponents/AddIdmanNovu';
import IdmanNovleriAdmin from './Pages/AdminPages/IdmanNovleri';
import MesqciAdmin from './Pages/AdminPages/MesqciPage';
import AddMesqci from './AdminComponents/AddMesqci';
import AddHakim from './AdminComponents/AddHakim';
import AddRehberlik from './AdminComponents/AddRehberlik';
import AddKomitet from './AdminComponents/AddKomitet';
import HakimAdmin from './Pages/AdminPages/HakimPage';
import RehberlikAdmin from './Pages/AdminPages/RehberlikPage';
import KomitetAdmin from './Pages/AdminPages/KomitetPage';
import AddFoto from './AdminComponents/AddFoto';
import FotoAdmin from './Pages/AdminPages/FotoPAge';
import VideoAdmin from './Pages/AdminPages/VideoPage';
import AddVideo from './AdminComponents/AddVideo';
import XeberlerAdmin from './Pages/AdminPages/XeberlerPage';
import AddXeberler from './AdminComponents/AddXeber';
import ContactAdmin from './Pages/AdminPages/ContactPage';
import AddContact from './AdminComponents/AddContact';
import NewsCard from './Components/NewsComponents/NewsComponents';
import NewsDetailPage from './Components/NewsComponents/NewsDetailPage/NewsDetailPage';
import AddMedal from './AdminComponents/AddMedal';
import MedalAdmin from './Pages/AdminPages/MedalPage';
import PhotoSection from './Components/MediaComponents/PhotoSection/PhotoSection';
import VideoSection from './Components/MediaComponents/VideoSection/VideoSection';
import OurHakim from './Components/AboutComponents/OurHakim';
import OurMesqci from './Components/AboutComponents/OurMesqci';
import Ourİdmaci from './Components/AboutComponents/Ourİdmanci';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AddYaris from './AdminComponents/AddYarisTime';
import YarisAdmin from './Pages/AdminPages/YarisTime';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import ErrorPage from './Pages/ErrorPage/ErrorPage';

function App() {
  return (
    <>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<ErrorPage />} />
            <Route path='/' element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/rehberlik" element={<AboutRehberlik />} />
              <Route path="/tariximiz" element={<AboutHistory />} />
              <Route path="/haqqimizda" element={<AboutPage />} />
              <Route path="/icraiyye-comitesi" element={<AboutCommitet />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/idmancilar" element={<Ourİdmaci />} />
              <Route path="/hakimler" element={<OurHakim />} />
              <Route path="/mesqciler" element={<OurMesqci />} />
              <Route path="/page/:name" element={<DetailPage />} />
              <Route path="/news" element={<NewsCard />} />
              <Route path="/news/:name" element={<NewsDetailPage />} />
              <Route path="/photo" element={<PhotoSection />} />
              <Route path="/video" element={<VideoSection />} />
            </Route>
            <Route path="/login" element={<AdminLogin />} />
            <Route path='/admin' element={<LayoutAdmin />}>
              <Route path="/admin/idmancilar" element={<IdmanciAdmin />} />
              <Route path="/admin/mesqci" element={<MesqciAdmin />} />
              <Route path="/admin/idmanNovleri" element={<IdmanNovleriAdmin />} />
              <Route path="/admin/hakim" element={<HakimAdmin />} />
              <Route path="/admin/rehberlik" element={<RehberlikAdmin />} />
              <Route path="/admin/komitet" element={<KomitetAdmin />} />
              <Route path="/admin/foto" element={<FotoAdmin />} />
              <Route path="/admin/video" element={<VideoAdmin />} />
              <Route path="/admin/xeberler" element={<XeberlerAdmin />} />
              <Route path="/admin/contact" element={<ContactAdmin />} />
              <Route path="/admin/medal" element={<MedalAdmin />} />
              <Route path="/admin/addMedal" element={<AddMedal />} />
              <Route path="/admin/addRehberlik" element={<AddRehberlik />} />
              <Route path="/admin/addKomitet" element={<AddKomitet />} />
              <Route path="/admin/addFoto" element={<AddFoto />} />
              <Route path="/admin/addVideo" element={<AddVideo />} />
              <Route path="/admin/addIdmanNovleri" element={<AddIdmanNovleri />} />
              <Route path="/admin/addMesqci" element={<AddMesqci />} />
              <Route path="/admin/addIdmanci" element={<AddIdmanci />} />
              <Route path="/admin/addHakim" element={<AddHakim />} />
              <Route path="/admin/addXeberler" element={<AddXeberler />} />
              <Route path="/admin/addContact" element={<AddContact />} />
              <Route path="/admin/addYaris" element={<AddYaris />} />
              <Route path="/admin/yaris" element={<YarisAdmin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </>
  )
}

export default App
