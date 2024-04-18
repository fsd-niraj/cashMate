import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { userLogout } from '../../reducers/auth';
import { getUserDetails, logoutRoute } from '../../services';
import { resetItems } from '../../reducers/items';
import { useEffect, useState } from 'react';

const Layout = () => {

  const auth = useSelector((s) => s.auth)
  const [userData, setUserData] = useState({})
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(userLogout())
    dispatch(resetItems())
    logoutRoute()
  }

  function fetchUserData() {
    getUserDetails()
      .then((res) => {
        setUserData(res?.data)
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchUserData()
  }, [auth?.profileImageUrl])

  const navList = [
    { title: "Home", icon: "bi bi-house", href: "/" },
    { title: "Dashboard", icon: "bi bi-speedometer", href: "dashboard" },
    { title: "Checkout", icon: "bi bi-table", href: "checkout" },
    { title: "Products", icon: "bi bi-grid", href: "products" }
  ]

  return (
    <>
      <main className='form-signin w-100 m-auto'>
        <header>
          <div className="px-3 py-2 text-bg-dark border-bottom">
            <div className="container">
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                  <i className='bi bi-ui-checks-grid rounded-circle h2' />
                </a>

                <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                  {navList && navList.map((d, i) =>
                    <li key={i}>
                      <a href={d.href} className={`nav-link text-white`}>
                        <div className='w-100 text-center'>
                          <i className={d.icon} />
                          <p className='m-0'>{d.title}</p>
                        </div>
                      </a>
                    </li>
                  )}
                </ul>
                <div className="dropdown text-end">
                  <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded={false}>
                    {userData?.profileImageUrl ?
                      <img src={userData?.profileImageUrl} alt={auth?.user?.name} width="32" height="32" className="rounded-circle" /> :
                      <i className="bi bi-person-circle h2 text-white ms-2" style={{ height: 32, width: 32 }} />
                    }
                  </a>
                  <ul className="dropdown-menu text-small" style={{ position: "absolute", inset: "0px 0px auto auto", margin: "0px", transform: "translate(0px, 34px)" }} data-popper-placement="bottom-end">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="/profile">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" onClick={() => logout()}>Sign out</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </header>
        <section className='container'>
          <Outlet />
        </section>
      </main>
    </>
  )
}

export default Layout;