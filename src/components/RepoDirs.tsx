import Link from 'next/link'
import { GitHubContent } from '@/types/github'

interface RepoProps {
  name: string
}

export default async function RepoDirs({ name }: RepoProps) {
  const username = 'ms020704'
  await new Promise((reslove) => setTimeout(reslove, 2000))
  const response = await fetch(
    `https://api.github.com/repos/${username}/${name}/contents`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  )

  const contents: GitHubContent[] = await response.json()

  const dirs = contents.filter((contents) => contents.type === 'dir')

  return (
    <div className="mt-2">
      <h3 className="text-xl font-bold">Directories</h3>
      <ul>
        {dirs.map((dir) => (
          <li key={dir.path}>
            <Link
              className="underline"
              href={`https://github.com/${username}/${name}/tree/main/${dir.path}`}
            >
              {dir.path}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
