import { Provider } from '@nestjs/common';
import { Scenes } from '@anysk/telegramma';
import { TELEGRAF_STAGE } from './telegraf.constants';

export const telegrafStageProvider: Provider = {
  provide: TELEGRAF_STAGE,
  useClass: Scenes.Stage,
};
