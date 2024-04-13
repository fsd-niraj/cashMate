export async function saveState({accessToken, user, isLoggedIn}) {
  try {
    const dataToSave = JSON.stringify({accessToken, user, isLoggedIn});
    return localStorage.setItem("user", dataToSave);
  } catch (e) {
    throw new Error(e)
  }
}

export function viewAsCurrency(amount) {
  return amount?.toLocaleString("en-US", { currency: "CAD", style: "currency" })
}

export function viewAsDate(date) {
  return new Date(date).toLocaleDateString()
}

export function viewAsTime(date) {
  return new Date(date).toLocaleTimeString()
}

export const checkMobileDevice = () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true
  return false;
}