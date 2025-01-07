import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { auth } from "../lib/auth";

export class UsersService {
  async getById(id: string) {
    return await db.query.usersTable.findFirst({ where: eq(usersTable.id, id) })
  }

  async getBySession() {
    const session = await auth()
    const id = session?.user?.id!
    return await db.query.usersTable.findFirst({
      where: eq(usersTable.id, id)
    })
  }

  async update(id: string, values: any) {
    return await db.update(usersTable).set(values).where(eq(usersTable.id, id)).execute()
  }
}