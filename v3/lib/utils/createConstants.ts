// Ported from the legacy `lib` submodule (`lib/utils/createConstants.js`).
const createConstants = <T extends string>(...constants: T[]) =>
  constants.reduce(
    (acc, constant) => {
      acc[constant] = constant;
      return acc;
    },
    {} as { [K in T]: K }
  );

export default createConstants;
