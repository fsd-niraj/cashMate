import { useSelector } from "react-redux"

const ProfilePage = () => {

  const auth = JSON.parse(localStorage.getItem("user")) || useSelector((s) => s?.auth)

  return (
    <>
      <div className="container py-5" id="featured-3">
        <h2 className="pb-2">Profile</h2>
        <div className="text-center mt-2">
          {auth?.user?.img ?
            <img src="https://github.com/mdo.png" className="rounded-circle" width={200} height={200} alt="" /> :
            <div style={{ textAlign: "center" }}>
              <i className="bi bi-person-circle display-1" />
              {auth.user.img ?
                <i className="cursor-pointer btn bi bi-pencil" style={{ position: "relative", bottom: -10, right: 5 }} /> :
                // <input type="file" className="cursor-pointer btn bi bi-pencil" /> :
                <i className="cursor-pointer btn bi bi-plus-circle" style={{ position: "relative", bottom: -10, right: 5 }} />
              }
            </div>
          }
        </div>
        <div className="mt-5">
          <p>Name: {auth.user.name}</p>
          <p>Email: {auth.user.email}</p>
        </div>
      </div>
    </>
  )
}
export default ProfilePage