/**
 * includeParam
 * simply include parameters for the filter query param
 * @param {string[]} relations array of relations
 */
export const includeParam = (relations) =>
  encodeURIComponent(
    JSON.stringify({
      include: relations.map((relation) => ({ relation })),
    })
  );
