import { createListenerDecorator } from '../../utils';
import { Scenes } from '@anysk/telegramma';

export const SceneEnter =
  createListenerDecorator<Scenes.BaseScene<never>>('enter');
