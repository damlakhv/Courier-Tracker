import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    width: '0px',
    height: '0px',
  }),
});

import { notification } from 'antd';
notification.success = () => null;
notification.error   = () => null;

;(global as any).google = {
  maps: {
    Map: class {
      constructor(_el: HTMLElement, _opts: any) {}
    },
    Marker: class {
      constructor(opts: any) {
        if (opts && opts['data-testid']) {
          const div = document.createElement('div');
          div.setAttribute('data-testid', opts['data-testid']);
          document.body.appendChild(div);
        }
      }
    },
    Polyline: class {
      constructor(_opts: any) {}
    },
    LatLng: class {
      constructor(public lat: number, public lng: number) {}
    },
    InfoWindow: class {
      constructor(_opts: any) {}
    },
    Size: class {
      constructor(public width: number, public height: number) {}
    },
    Point: class {
      constructor(public x: number, public y: number) {}
    },
  }
};
