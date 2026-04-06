# CSE 160 Assignment 0 – Vector Library

## Overview
This project extends the `cuon-matrix-cse160.js` matrix library from the WebGL textbook to support 2D vector visualization and operations using an HTML5 `<canvas>`.

## File Structure
```
asgn0/
  asg0.html              ← Main webpage (canvas + UI controls)
  asg0.js                ← All drawing and vector operation logic
  lib/
    cuon-matrix-cse160.js ← Vector3/Matrix4 library (provided)
```

## How to Run
Open `asg0.html` in any modern browser. No server required.

## Features
- Draws vectors v1 (red) and v2 (blue) from the canvas center
- Supports the following operations via the dropdown:
  - **Add** – draws v1 + v2 in green
  - **Subtract** – draws v1 − v2 in green
  - **Multiply** – draws v1 * scalar and v2 * scalar in green
  - **Divide** – draws v1 / scalar and v2 / scalar in green
  - **Magnitude** – prints magnitudes to console, draws normalized vectors in green
  - **Normalize** – same as magnitude
  - **Angle Between** – prints angle (degrees) between v1 and v2 to console
  - **Area** – prints area of triangle formed by v1 and v2 to console

## Key Implementation Notes
- Canvas is 400×400; vectors are scaled by 20 to make unit vectors visible
- Vector origin is the canvas center (200, 200)
- Canvas y-axis is flipped (down = positive), so `v.y` is negated when drawing
- `angleBetween` uses the dot product formula: `dot(v1,v2) = |v1||v2|cos(θ)`
- `areaTriangle` uses the cross product: `area = |v1 × v2| / 2`
