import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

export default async function DashboardPage() {
  const user = await currentUser()
  console.log(user)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <p className="mb-2">Welcome to dashboard</p>
      <div className="mb5">
        <p>Welcome, {user?.firstName}</p>
        <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
        <p>사용자 등록일: {user?.createdAt}</p>
      </div>
    </div>
  )
}
