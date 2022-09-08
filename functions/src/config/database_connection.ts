import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient() --> The official approach

/* Using PrismaClient to connect Cloud SQL Database (Plantscale)
 * The object PrismaClient() is a connection between server and database
 * The Connection should be Singleton in the server environment. (we just only need one connection in the entire app)
 * */

class DatabaseConnection {
  private readonly prisma: PrismaClient
  private static instance: DatabaseConnection

  private constructor() {
    this.prisma = new PrismaClient()
  }

  static getInstance(): DatabaseConnection {
    if (DatabaseConnection.instance) return this.instance
    this.instance = new DatabaseConnection()
    return this.instance
  }

  get get_prisma(): PrismaClient {
    return this.prisma
  }
}

export { DatabaseConnection }
