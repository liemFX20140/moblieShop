import './App.css';
import './css/custom.css';
import './css/style.default.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './Share/Footer/Footer';
import Header from './Share/Header/Header';
import Home from './Home/Home';
import Detail from './Detail/Detail';
import Cart from './Cart/Cart';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import Checkout from './Checkout/Checkout';
import History from './History/History';
import Shop from './Shop/Shop';
import Chat from './Share/Chat/Chat';
import { useEffect } from 'react';
import { addSession } from './Redux/Action/ActionSession';
import { addUser } from './Redux/Action/ActionCart';
import { useDispatch } from 'react-redux';
import UserAPI from './API/UserAPI';
import MainHistory from './History/Component/MainHistory';
import DetailHistory from './History/Component/DetailHistory';

function App() {
  const dispatch = useDispatch();
  const getSessionLogin = async () => {
    const res = await UserAPI.getSessionSignIn();
    const action = addSession(res._id);
    dispatch(action);
    const action2 = addUser(res._id);
    dispatch(action2);
  };
  useEffect(() => {
    getSessionLogin();
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/history'>
            <Route path='' element={<MainHistory />} />
            <Route path=':id' element={<DetailHistory />} />
          </Route>
          <Route path='/shop' element={<Shop />} />
        </Routes>
      </BrowserRouter>
      <Chat />
      <Footer />
    </div>
  );
}

export default App;
