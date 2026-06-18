import { Inject } from '@nestjs/common';
import { Telegraf } from '@anysk/telegramma';

import { getAllBotsToken } from '../../utils/get-all-bots-token.util';

export type AllBotsMap = Map<string, Telegraf<any>>;

export const InjectAllBots = (): ParameterDecorator =>
  Inject(getAllBotsToken());
