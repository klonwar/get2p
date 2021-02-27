import chalk from "chalk";
import {Request, RequestHandler, Response} from "express";

export const handler = (yourAsyncHandler: (req: Request, res: Response) => Promise<void>): RequestHandler => {
  return async (req, res, next) => {
    try {
      await yourAsyncHandler(req, res);
    } catch (e) {
      if (e.message.includes(`ECONNREFUSED`) && e.message.includes(`:3306`)) {
        console.error(chalk.red(`-X Can't connect to mysql database`));
      } else {
        console.error(chalk.red(e.stack));
      }
      res.status(500).send(undefined);
    }
    next();
  };
};

export default handler;