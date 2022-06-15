import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

// export const validateRoute = (handler) => {
//   return async (req: NextApiRequest, res: NextApiResponse) => {
//     const { AERO_MUSIC_ACCESS_TOKEN: token } = req.cookies;

//     if (token) {
//       let user;
//       console.log("Token found");
//       try {
//         const { id } = jwt.verify(token);
//         user = await prisma.user.findUnique({ where: { id } });
//         if (!user) {
//           throw new Error("User does not exist");
//         }
//       } catch (error) {
//         res.status(401);
//         res.json({ error: "Not Authorized" });
//       }
//       console.log("user");
//       console.log(user);
//       return handler(req, res, user);
//     }

//     res.status(401);
//     res.json({ error: "Not Authorized" });
//   };
// };

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.AERO_MUSIC_ACCESS_TOKEN;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "secret_env_key");
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorizied" });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not Authorizied" });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, "hello");
  return user;
};
