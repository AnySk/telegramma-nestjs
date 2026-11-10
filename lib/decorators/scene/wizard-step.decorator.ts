import { WizardStepMetadata } from '../../interfaces';
import { WIZARD_STEP_METADATA } from '../../telegraf.constants';

/**
 * Binds a method to one or more wizard steps.
 *
 * Several steps can be passed at once (`@WizardStep(2, 3)`) or the decorator
 * can be stacked (`@WizardStep(2) @WizardStep(3)`).
 */
export const WizardStep =
  (step: number, ...moreSteps: number[]): MethodDecorator =>
  (_target, _key, descriptor) => {
    const previous: WizardStepMetadata | undefined = Reflect.getMetadata(
      WIZARD_STEP_METADATA,
      descriptor.value as object,
    );
    const steps = [
      ...new Set([...(previous?.steps ?? []), step, ...moreSteps]),
    ];
    Reflect.defineMetadata(
      WIZARD_STEP_METADATA,
      { steps } satisfies WizardStepMetadata,
      descriptor.value as object,
    );
    return descriptor;
  };
