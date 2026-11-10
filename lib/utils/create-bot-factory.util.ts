import { Telegraf } from '@anysk/telegramma';
import { TelegrafModuleOptions } from '../interfaces';
import { Logger } from '@nestjs/common';

const redactToken = (text: string): string =>
  text.replace(/\/(bot|user)(\d+):[^/\s]+\//g, '/$1$2:[REDACTED]/');

/**
 * The message and the stack of a network error embed the request URL, which
 * contains the bot token, so both are redacted before the error goes anywhere.
 */
const toSafeError = (err: unknown): Error => {
  const error = err instanceof Error ? err : new Error(String(err));
  error.message = redactToken(error.message);
  if (error.stack) error.stack = redactToken(error.stack);
  return error;
};

export async function createBotFactory(
  options: TelegrafModuleOptions,
): Promise<Telegraf<any>> {
  const bot = new Telegraf<any>(options.token, options.options);

  bot.use(...(options.middlewares ?? []));
  bot.catch((err, ctx) =>
    Logger.error(err, `Telegraf: ${ctx.botInfo.username}`),
  );

  if (options.launchOptions !== false) {
    const launchOptions = options.launchOptions ?? {};
    const logLaunchError = (error: Error) => {
      const name = bot.botInfo?.username ?? options.botName;
      Logger.error(
        `Bot launch failed: ${error.message}`,
        error.stack,
        name ? `Telegraf: ${name}` : 'Telegraf',
      );
    };

    // With long polling `launch()` resolves only when polling stops, so the
    // bot counts as started once Telegram has accepted the token (`onLaunch`).
    // With a webhook `launch()` resolves as soon as the webhook is set.
    let started = false;
    const startup = new Promise<void>((resolve, reject) => {
      const onStarted = () => {
        started = true;
        resolve();
      };
      bot
        .launch(launchOptions, launchOptions.webhook ? undefined : onStarted)
        .then(onStarted, (err: unknown) => {
          const error = toSafeError(err);
          if (options.failOnLaunchError && !started) {
            reject(error);
          } else {
            // Never leave the rejection unhandled: it would crash the process.
            logLaunchError(error);
            resolve();
          }
        });
    });

    if (options.failOnLaunchError) {
      await startup;
    }
  }

  return bot;
}
