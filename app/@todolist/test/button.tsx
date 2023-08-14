'use client'

export default function Button() {

  const handleClick = async () => {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=0ec572400387bbc34a4f')
  }

  return (
    <button onClick={handleClick}>Click to sign in with github</button>
      )
}
