import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });

  try {
    if (!user) {
      res.status(401);
      res.json({ error: "User does not exist" });
      return null;
    }
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user.id,
          time: Date.now(),
        },
        "secret_env_key",
        { expiresIn: "8h" }
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("AERO_MUSIC_ACCESS_TOKEN", token, {
          httpOny: true,
          maxAge: 8 * 60 * 60,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );

      return res.json(user);
    }
  } catch (e) {
    res.status(401);
    res.json({ error: "Invalid Login" });
    return null;
  }
};
