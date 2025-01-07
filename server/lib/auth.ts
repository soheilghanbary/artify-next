import { DrizzleAdapter } from "@auth/drizzle-adapter"
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { db } from '../db'
import { accountsTable, authenticatorsTable, sessionsTable, usersTable, verificationTokensTable } from "../db/schema"

declare module 'next-auth' {
  interface Session {
    id: string
  }
}

export const authOptions: NextAuthConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: usersTable,
    accountsTable: accountsTable,
    authenticatorsTable: authenticatorsTable,
    sessionsTable: sessionsTable,
    verificationTokensTable: verificationTokensTable
  }),
  trustHost: true,
  session: { strategy: 'jwt' },
  experimental: { enableWebAuthn: true },
  providers: [GithubProvider, GoogleProvider],
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      }
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.uid = user.id
      }
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      return { ...token, ...user }
    },
  },
}

export const { signIn, signOut, auth, handlers } = NextAuth(authOptions)