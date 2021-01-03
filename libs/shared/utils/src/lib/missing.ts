/**
 * https://github.com/ag-grid/ag-grid/blob/b98b0f5ee1512ffb4ba3280e0c33400e22d3a138/community-modules/core/src/ts/utils/generic.ts
 */
export function exists<T>(value: T, allowEmptyString = false): boolean {
  return (
    value != null && (allowEmptyString || ((value as unknown) as string) !== '')
  );
}

export function missing<T>(value: T): boolean {
  return !exists(value);
}
