import chalk from "chalk";

export const handler = (yourAsyncHandler) => {
  return async (req, res, next) => {
    try {
      await yourAsyncHandler(req, res);
    } catch (e) {
      console.error(chalk.red(e.stack));
      res.status(500).send(undefined);
    }
    next();
  }
}

export default handler;