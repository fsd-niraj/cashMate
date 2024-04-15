import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const IncorrectRoute = () => {

  const params = useParams()
  const auth = useSelector((s) => s?.auth)

  return (
    <>
      <div className="container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <h1 className="text-body-emphasis">404 Not found </h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">
            The route <code>/{params["*"]}</code> that you are trying to access is currently not available or incorrect.
          </p>
          <div className="d-inline-flex gap-2 mb-5">
            {!auth?.isLoggedIn &&
              <a href="/login">
                <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
                  Log in
                </button>
              </a>
            }
            <a href="/">
              <button className="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
                Go Home
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
export default IncorrectRoute