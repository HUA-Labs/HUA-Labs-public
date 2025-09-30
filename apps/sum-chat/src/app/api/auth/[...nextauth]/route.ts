import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 로그인 성공 후 리다이렉트
      if (url.startsWith(baseUrl)) return url;
      // 외부 URL로의 리다이렉트 방지
      return baseUrl;
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
});

export { handler as GET, handler as POST };