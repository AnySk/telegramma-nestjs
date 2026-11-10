import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { Middleware, Telegraf } from '@anysk/telegramma';

export interface TelegrafModuleOptions {
  token: string;
  botName?: string;
  options?: Partial<Telegraf.Options<any>>;
  launchOptions?: Telegraf.LaunchOptions | false;
  /**
   * What to do when the bot fails to launch (wrong token, Telegram
   * unreachable, webhook cannot be set, ...).
   *
   * - `false` (default): the error is logged and the application keeps running.
   * - `true`: the application waits for the bot to launch and fails to start
   *   if it cannot.
   *
   * Errors that happen after a successful launch are always only logged.
   */
  failOnLaunchError?: boolean;
  include?: Function[];
  middlewares?: ReadonlyArray<Middleware<any>>;
}

export interface TelegrafOptionsFactory {
  createTelegrafOptions():
    | Promise<TelegrafModuleOptions>
    | TelegrafModuleOptions;
}

export interface TelegrafModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  botName?: string;
  useExisting?: Type<TelegrafOptionsFactory>;
  useClass?: Type<TelegrafOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<TelegrafModuleOptions> | TelegrafModuleOptions;
  inject?: any[];
}
