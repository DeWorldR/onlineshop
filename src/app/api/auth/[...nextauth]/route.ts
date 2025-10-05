import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// ถ้าอยากต่อกับ Google, GitHub ฯลฯ import Provider ที่ต้องการเพิ่มได้

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // ตัวอย่าง mock user
        if (
          credentials?.username === "admin" &&
          credentials?.password === "1234"
        ) {
          return { id: "1", name: "Admin User", email: "admin@test.com" }
        }
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET, // ใส่ใน .env.local
  pages: {
    signIn: "/login", // custom หน้า login ได้
  }
})

export { handler as GET, handler as POST }
