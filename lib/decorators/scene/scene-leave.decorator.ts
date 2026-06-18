import { createListenerDecorator } from '../../utils';
import { Scenes } from '@anysk/telegramma';

export const SceneLeave =
  createListenerDecorator<Scenes.BaseScene<never>>('leave');
