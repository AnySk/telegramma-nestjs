# Getting updates
## Long polling

By default, the bot receives updates using long-polling and requires no additional action.

Telegram allows only one long-polling consumer per bot token. If your application runs as several instances (replicas, a separate CLI entrypoint, etc.), every instance but one fails with `409: Conflict: terminated by other getUpdates request`. In that case either switch to webhooks, or set `launchOptions` to `false` on the instances that should not receive updates.

## Webhooks

If you want to configure a telegram bot webhook, you need to get a middleware via `getBotToken` helper in your `main.ts` file.

To access it, you must use the `app.get()` method, followed by the provider reference:
```typescript
import { getBotToken } from '@anysk/telegramma-nestjs';

// ...
const bot = app.get(getBotToken());
```

Now you can connect middleware:
```typescript
app.use(bot.webhookCallback('/secret-path'));
```

The last step is to specify `launchOptions` in `forRoot` method:
```typescript
TelegrafModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
    launchOptions: {
      webhook: {
        domain: 'domain.tld',
        path: '/secret-path',
      }
    }
  }),
  inject: [ConfigService],
});
```
### Secret token

To make sure webhook requests really come from Telegram, set a secret token. It has to be passed in both places: `launchOptions` registers it with Telegram, and `webhookCallback` rejects requests whose `X-Telegram-Bot-Api-Secret-Token` header does not match.

```typescript
// main.ts
app.use(
  bot.webhookCallback('/secret-path', {
    secretToken: process.env.TELEGRAM_WEBHOOK_SECRET,
  }),
);
```

```typescript
launchOptions: {
  webhook: {
    domain: 'domain.tld',
    path: '/secret-path',
    secretToken: process.env.TELEGRAM_WEBHOOK_SECRET,
  }
}
```

Without the `secretToken` option, `webhookCallback` accepts any `POST` request to the path.

## Launch errors

By default a bot that fails to launch (wrong token, Telegram unreachable, webhook cannot be set) does not stop your application: the error is logged through the Nest logger and the application keeps running without receiving updates.

If the bot is essential, set `failOnLaunchError` to `true`. The application then waits for the bot to launch and fails to start if it cannot:

```typescript
TelegrafModule.forRoot({
  token: process.env.TELEGRAM_BOT_TOKEN,
  failOnLaunchError: true,
});
```

With long polling the bot counts as launched once Telegram has accepted the token. Errors that happen later, such as a `409: Conflict` from another polling instance, are always only logged.

## Disabling updates

If you don't want to receive updates, you need to set `launchOptions` to `false`.
