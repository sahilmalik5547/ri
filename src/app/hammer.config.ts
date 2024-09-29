import { Injectable } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';

@Injectable()
export class CustomHammerConfig extends HammerGestureConfig {
    override overrides = {
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL }, // Enable horizontal swiping
  };
}
