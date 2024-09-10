import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiHandler } from "next";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Naver from "next-auth/providers/naver";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, option);
export { authHandler as GET, authHandler as POST };

const option: AuthOptions = {
  providers: [
    Naver({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  debug: true,
};
