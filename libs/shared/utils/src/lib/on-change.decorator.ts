/** credit: https://github.com/zhaosiyang/property-watch-decorator/blob/master/src/index.ts */

export interface SimpleChange<T> {
  firstChange: boolean;
  previousValue: T;
  currentValue: T;
  isFirstChange: () => boolean;
}

export type CallBackFunction<T> = (value: T, change?: SimpleChange<T>) => void;

/**
 * OnChange
 * a parameterized decorator that is usable with any property on a class,
 * not only inputs, and can mimic the functionality of ngOnChanges
 * @param callback
 */
export function OnChange<T = any>(callback: CallBackFunction<T> | string) {
  const cachedValueKey = Symbol();
  const isFirstChangeKey = Symbol();

  return (target: any, key: PropertyKey) => {
    const callBackFn: CallBackFunction<T> =
      typeof callback === 'string' ? target[callback] : callback;
    if (!callBackFn) {
      throw new Error(
        `Cannot find method ${callback} in class ${target.constructor.name}`
      );
    }

    Object.defineProperty(target, key, {
      set: function (value) {
        /**
         * change the statust of "isFirstChange"
         */
        this[isFirstChangeKey] = this[isFirstChangeKey] === undefined;

        /**
         * There's no operation if the cached value is the same as the current
         */
        if (!this[isFirstChangeKey] && this[cachedValueKey] === value) {
          return;
        }

        const oldValue = this[cachedValueKey];
        this[cachedValueKey] = value;

        /**
         * simpleChange mimics the ngOnChanges previousValue implementation
         * with improved typing
         */
        const simpleChange: SimpleChange<T> = {
          firstChange: this[isFirstChangeKey],
          previousValue: oldValue,
          currentValue: this[cachedValueKey],
          isFirstChange: () => this[isFirstChangeKey],
        };
        callBackFn.call(this, this[cachedValueKey], simpleChange);
      },
      get: function () {
        return this[cachedValueKey];
      },
    });
  };
}
