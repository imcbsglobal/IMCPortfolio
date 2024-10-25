import Android from "./components/Android"
import Brocher from "./components/Brocher"
import Facebook from "./components/Facebook"
import Home from "./components/Home"
import Instagram from "./components/Instagram"
import Introduction from "./components/Introduction"
import Logos from "./components/Logos"
import Navbar from "./components/Navbar"
import Posters from "./components/Posters"
import Video from "./components/Video"
import Websites from "./components/Websites"
import WebApplication from "./components/WebApplication"
import Software from "./components/Software"
import Hardware from "./components/Hardware"
import AddAdmin from "./components/AddAdmin"
import SMSWhatsapp from "./components/SMSWhatsapp"
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';



function App() {

  return (
    <Router>
       {/* <ConditionalNavbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/android" element={<Android />} />
        <Route path="/webapplication" element={<WebApplication />} />
        <Route path="/software" element={<Software />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/logos" element={<Logos />} />
        <Route path="/brochure" element={<Brocher/>} />
        <Route path="/posters" element={<Posters />} />
        <Route path="/video" element={<Video />} />
        <Route path="/websites" element={<Websites />} />
        <Route path="/instagram" element={<Instagram/>} />
        <Route path="/facebook" element={<Facebook/>} />
        <Route path="/smsWhatsappMarketing" element={<SMSWhatsapp/>} />
        {/* <Route path="/addAdmin" element={<AddAdmin/>} /> */}
      </Routes>
    </Router>
  )
}

// function ConditionalNavbar() {
//   const location = useLocation();
//   return location.pathname !== "/introduction" ? <Navbar /> : null;
// }


export default App
