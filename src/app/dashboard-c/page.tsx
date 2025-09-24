'use client'

import { useUser } from '@clerk/nextjs'

export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>로그인 후 이 페이지를 보실 수 있습니다.</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Dashboard-C</h1>
      <div className="mb-5">
        <p>use client 지시자 사용</p>
        <p>브라우저에서 useUser() 함수 이용</p>
        <p>Welcome, {user.firstName}</p>
        <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      </div>
    </div>
  )
}
