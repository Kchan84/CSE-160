// asg0.js
// CSE 160 Assignment 0 - Vector Library

// Entry point called by <body onload="main()">
function main() {
  // Step 1: Retrieve the <canvas> element
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  // Step 2: Get the 2D rendering context and fill black background
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Step 3: Draw initial red vector v1 = (2.25, 2.25)
  var v1 = new Vector3([2.25, 2.25, 0]);
  drawVector(v1, 'red');
}

// Draws a vector from the center of the canvas in the given color.
// Coordinates are scaled by 20 so unit-length vectors are visible.
// Canvas y-axis is flipped (down = positive), so we negate v.y.
function drawVector(v, color) {
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');

  var SCALE = 20;              // Scale factor: 1 unit = 20 pixels
  var cx = canvas.width  / 2; // Center x = 200
  var cy = canvas.height / 2; // Center y = 200

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.moveTo(cx, cy);
  // Negate y because canvas y increases downward
  ctx.lineTo(cx + v.elements[0] * SCALE, cy - v.elements[1] * SCALE);
  ctx.stroke();
}

// Clears the canvas back to solid black
function clearCanvas() {
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Called when the user clicks the "Draw" button.
// Reads v1 and v2 from the input fields and draws them.
function handleDrawEvent() {
  clearCanvas();

  var v1 = new Vector3([
    parseFloat(document.getElementById('v1x').value),
    parseFloat(document.getElementById('v1y').value),
    0
  ]);
  var v2 = new Vector3([
    parseFloat(document.getElementById('v2x').value),
    parseFloat(document.getElementById('v2y').value),
    0
  ]);

  drawVector(v1, 'red');   // v1 in red
  drawVector(v2, 'blue');  // v2 in blue
}

// Called when the user clicks the "Draw Operation" button.
// Reads v1, v2, scalar, and the chosen operation, then draws the result.
function handleDrawOperationEvent() {
  clearCanvas();

  var v1 = new Vector3([
    parseFloat(document.getElementById('v1x').value),
    parseFloat(document.getElementById('v1y').value),
    0
  ]);
  var v2 = new Vector3([
    parseFloat(document.getElementById('v2x').value),
    parseFloat(document.getElementById('v2y').value),
    0
  ]);
  var scalar = parseFloat(document.getElementById('scalar').value);
  var op     = document.getElementById('operation').value;

  // Always draw the original v1 (red) and v2 (blue) first
  drawVector(v1, 'red');
  drawVector(v2, 'blue');

  if (op === 'add') {
    // v3 = v1 + v2, drawn in green
    var v3 = new Vector3(v1.elements);
    v3.add(v2);
    drawVector(v3, 'green');

  } else if (op === 'sub') {
    // v3 = v1 - v2, drawn in green
    var v3 = new Vector3(v1.elements);
    v3.sub(v2);
    drawVector(v3, 'green');

  } else if (op === 'mul') {
    // v3 = v1 * scalar and v4 = v2 * scalar, both drawn in green
    var v3 = new Vector3(v1.elements); v3.mul(scalar);
    var v4 = new Vector3(v2.elements); v4.mul(scalar);
    drawVector(v3, 'green');
    drawVector(v4, 'green');

  } else if (op === 'div') {
    // v3 = v1 / scalar and v4 = v2 / scalar, both drawn in green
    var v3 = new Vector3(v1.elements); v3.div(scalar);
    var v4 = new Vector3(v2.elements); v4.div(scalar);
    drawVector(v3, 'green');
    drawVector(v4, 'green');

  } else if (op === 'magnitude') {
    // Print magnitudes to console, then draw normalized vectors in green
    console.log('Magnitude of v1: ' + v1.magnitude());
    console.log('Magnitude of v2: ' + v2.magnitude());
    var n1 = new Vector3(v1.elements); n1.normalize();
    var n2 = new Vector3(v2.elements); n2.normalize();
    drawVector(n1, 'green');
    drawVector(n2, 'green');

  } else if (op === 'normalize') {
    // Same as magnitude: print magnitudes, draw normalized vectors in green
    console.log('Magnitude of v1: ' + v1.magnitude());
    console.log('Magnitude of v2: ' + v2.magnitude());
    var n1 = new Vector3(v1.elements); n1.normalize();
    var n2 = new Vector3(v2.elements); n2.normalize();
    drawVector(n1, 'green');
    drawVector(n2, 'green');

  } else if (op === 'angle') {
    // Print the angle between v1 and v2 (in degrees) to the console
    console.log('Angle: ' + angleBetween(v1, v2) + ' degrees');

  } else if (op === 'area') {
    // Print the area of the triangle formed by v1 and v2 to the console
    console.log('Area of the triangle: ' + areaTriangle(v1, v2));
  }
}

// Returns the angle (in degrees) between two Vector3 objects.
// Uses dot product formula: dot(v1,v2) = |v1| * |v2| * cos(angle)
function angleBetween(v1, v2) {
  var dot      = Vector3.dot(v1, v2);
  var cosAlpha = dot / (v1.magnitude() * v2.magnitude());
  // Clamp to [-1, 1] to avoid floating-point errors in acos
  cosAlpha = Math.max(-1, Math.min(1, cosAlpha));
  return Math.acos(cosAlpha) * (180 / Math.PI);
}

// Returns the area of the triangle formed by v1 and v2.
// Area = (1/2) * |v1 x v2|
function areaTriangle(v1, v2) {
  return Vector3.cross(v1, v2).magnitude() / 2;
}
