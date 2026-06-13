import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      if (!user || !profile) return false;

      try {
        const existingUser = await writeClient.fetch(
          AUTHOR_BY_GITHUB_ID_QUERY,
          { id: profile.id }
        );

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id: profile.id,
            name: user.name,
            username: profile.login,
            email: user.email,
            image: user.image,
            bio: profile.bio || "",
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const user = await writeClient.fetch(
            AUTHOR_BY_GITHUB_ID_QUERY,
            { id: profile.id }
          );
          token.id = user?._id;
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
