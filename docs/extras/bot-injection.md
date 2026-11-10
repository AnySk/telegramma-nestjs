# Bot injection
At times you may need to access the native `Telegraf` instance. You can inject the Telegraf by using the `@InjectBot()` decorator as follows:

```typescript {8} title="src/echo/echo.service.ts"
import { Injectable } from '@nestjs/common';
import { InjectBot } from '@anysk/telegramma-nestjs';
import { Telegraf } from '@anysk/telegramma';
import { TelegrafContext } from '../common/interfaces/telegraf-context.interface.ts';

@Injectable()
export class EchoService {
  constructor(@InjectBot() private bot: Telegraf<TelegrafContext>) {}
  ...
}
```

If you run [multiple bots](/extras/multiple-bots) in the same application, explicitly specify the bot name:

```typescript {8} title="src/echo/echo.service.ts"
import { Injectable } from '@nestjs/common';
import { InjectBot } from '@anysk/telegramma-nestjs';
import { Telegraf } from '@anysk/telegramma';
import { TelegrafContext } from '../common/interfaces/telegraf-context.interface.ts';

@Injectable()
export class EchoService {
  constructor(@InjectBot('cats') private bot: Telegraf<TelegrafContext>) {}
  ...
}
```