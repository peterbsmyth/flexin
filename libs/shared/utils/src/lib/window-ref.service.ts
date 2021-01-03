import { Injectable } from '@angular/core';

function _window() {
  // return the global native browser window object
  return window;
}

@Injectable()
export class WindowRef {
  get nativeWindow() {
    return _window();
  }
}
