import { DEFAULT_STATE } from "@components/config-wizard/constants";
import type { WizardState } from "@components/config-wizard/types";

const hasMetadataChanges = (state: WizardState): boolean => {
  return (
    state.brandName !== DEFAULT_STATE.brandName ||
    state.productDescription !== DEFAULT_STATE.productDescription
  );
};

const hasFontChanges = (state: WizardState): boolean => {
  return (
    state.fonts.display !== DEFAULT_STATE.fonts.display ||
    state.fonts.body !== DEFAULT_STATE.fonts.body ||
    state.fonts.label !== DEFAULT_STATE.fonts.label ||
    state.fonts.cursive !== DEFAULT_STATE.fonts.cursive
  );
};

const hasPackageChanges = (state: WizardState): boolean => {
  return (
    state.brandName !== DEFAULT_STATE.brandName ||
    state.productDescription !== DEFAULT_STATE.productDescription
  );
};

const hasProductChanges = (state: WizardState): boolean => {
  return (
    state.brandName !== DEFAULT_STATE.brandName ||
    state.tagline !== DEFAULT_STATE.tagline ||
    state.targetUsers !== DEFAULT_STATE.targetUsers ||
    state.productDescription !== DEFAULT_STATE.productDescription ||
    state.brandPersonality !== DEFAULT_STATE.brandPersonality ||
    state.antiReferences !== DEFAULT_STATE.antiReferences ||
    state.accessibilityLevel !== DEFAULT_STATE.accessibilityLevel
  );
};

const hasDesignElevationChanges = (state: WizardState): boolean => {
  return (
    state.borderRadius !== DEFAULT_STATE.borderRadius ||
    state.shadowIntensity !== DEFAULT_STATE.shadowIntensity ||
    state.motionSpeed !== DEFAULT_STATE.motionSpeed
  );
};

const hasDesignOverviewChanges = (state: WizardState): boolean => {
  return (
    state.creativeNorthStar !== DEFAULT_STATE.creativeNorthStar ||
    state.designOverview !== DEFAULT_STATE.designOverview ||
    state.brandPersonality !== DEFAULT_STATE.brandPersonality
  );
};

const hasDesignComponentsChanges = (state: WizardState): boolean => {
  return state.componentVariants !== DEFAULT_STATE.componentVariants;
};

const hasDesignDosDontsChanges = (state: WizardState): boolean => {
  return state.dosAndDonts !== DEFAULT_STATE.dosAndDonts;
};

const hasAgentChanges = (state: WizardState): boolean => {
  return (
    state.productContext !== DEFAULT_STATE.productContext ||
    state.testingFramework !== DEFAULT_STATE.testingFramework ||
    state.deploymentTarget !== DEFAULT_STATE.deploymentTarget ||
    state.compliance.length > 0
  );
};

const hasStructureChanges = (state: WizardState): boolean => {
  return (
    state.namingConvention !== DEFAULT_STATE.namingConvention ||
    state.componentPlacement !== DEFAULT_STATE.componentPlacement ||
    state.folderPerComponent !== DEFAULT_STATE.folderPerComponent
  );
};

export {
  hasAgentChanges,
  hasDesignComponentsChanges,
  hasDesignDosDontsChanges,
  hasDesignElevationChanges,
  hasDesignOverviewChanges,
  hasFontChanges,
  hasMetadataChanges,
  hasPackageChanges,
  hasProductChanges,
  hasStructureChanges,
};
