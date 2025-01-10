import type React from 'react'

const Artify: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 font-bold text-4xl text-foreground">About Artify</h1>

      <p className="mb-6 text-foreground/75 text-lg">
        Artify is a web application built to showcase creative arts, leveraging
        modern web technologies.
      </p>

      <h2 className="mb-4 font-semibold text-2xl text-foreground">Purpose</h2>
      <p className="mb-6 text-foreground/75 text-lg">
        The main goals of this project are:
      </p>
      <ul className="mb-6 list-inside list-disc text-foreground/75 text-lg">
        <li>
          Gaining hands-on experience with cutting-edge web development tools
          and practices.
        </li>
        <li>
          Exploring the integration of various technologies to build a
          performant and scalable application.
        </li>
      </ul>

      <h2 className="mb-4 font-semibold text-2xl text-foreground">
        Tech Stack
      </h2>
      <ul className="mb-6 list-inside list-disc text-foreground/75 text-lg">
        <li>
          <strong>Framework:</strong>{' '}
          <a
            href="https://nextjs.org/"
            className="text-primary hover:underline"
          >
            Next.js 15
          </a>
        </li>
        <li>
          <strong>Backend:</strong>{' '}
          <a href="https://hono.dev/" className="text-primary hover:underline">
            Hono
          </a>
        </li>
        <li>
          <strong>Database ORM:</strong>{' '}
          <a
            href="https://orm.drizzle.team/"
            className="text-primary hover:underline"
          >
            Drizzle ORM
          </a>
        </li>
        <li>
          <strong>Styling:</strong>{' '}
          <a
            href="https://tailwindcss.com/"
            className="text-primary hover:underline"
          >
            TailwindCSS
          </a>
        </li>
        <li>
          <strong>Authentication:</strong>{' '}
          <a
            href="https://next-auth.js.org/"
            className="text-primary hover:underline"
          >
            NextAuth
          </a>
        </li>
        <li>
          <strong>Programming Language:</strong>{' '}
          <a
            href="https://www.typescriptlang.org/"
            className="text-primary hover:underline"
          >
            TypeScript
          </a>
        </li>
      </ul>

      <hr className="my-6 border-gray-300" />

      <p className="text-foreground/75 text-lg">
        Feel free to explore and adapt the project for your own learning and
        development purposes!
      </p>
    </div>
  )
}

export default Artify
