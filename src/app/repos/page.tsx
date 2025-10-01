import { Repository } from '@/types/repo'
import Link from 'next/link'
import React from 'react'
import { FaCodeBranch, FaEye, FaStar } from 'react-icons/fa'

const username = 'ms020704'

export default async function ReposPage() {
  // 1. SSG : static site generation
  //const response = await fetch(`https://api.github.com/users/${username}/repos`)

  // // 2. SSR : server side rendering
  // const response = await fetch(
  //   `https://api.github.com/users/${username}/repos`,
  //   {
  //     cache: 'no-store',
  //   }
  // )

  // 3. ISR : incremental static regeneration
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  )

  await new Promise((reslove) => setTimeout(reslove, 1000))
  const repos = await response.json()
  // console.log(repos)
  // console.log('Fetched repos:', repos)
  // console.log('Is Array?', Array.isArray(repos))
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        GitHub repositories of {username}
      </h2>
      <ul>
        {repos.map((repo: Repository) => (
          <li key={repo.id} className="bg-gray-900 m-4 p-4 rounded-md">
            <Link href={`/repos/${repo.name}`}>
              <h3 className="text-xl font-bold text-gray-100">{repo.name}</h3>
              <p className="text-gray-100">{repo.description}</p>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaCodeBranch /> {repo.forks_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye /> {repo.watchers_count}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
