import Header from '../Header/Header';
import Routes from '../../router/Routers';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <div>
        <Header />
        <Routes />
        <Footer />
    </div>
  )
}

export default Layout