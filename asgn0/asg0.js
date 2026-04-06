// asg0.js — CSE 160 Assignment 0
// Vector Library + Canvas Drawing

// Canvas scale: 1 unit = 20px, so vectors of length ~10 fill the canvas nicely
var PX_PER_UNIT = 20;

// Called on page load via <body onload="main()">
function main() {
  var cnv = getCanvas();
  if (!cnv) return;

  // Paint the background black
  fillBlack(cnv);

  // Draw the default starting vector in red
  var startVec = new Vector3([2.25, 2.25, 0]);
  drawVector(startVec, 'red');
}

// Returns the canvas element, or null with a console error
function getCanvas() {
  var cnv = document.getElementById('vectorCanvas');
  if (!cnv) {
    console.log('ERROR: could not find the canvas element.');
    return null;
  }
  return cnv;
}

// Fills the entire canvas with solid black
function fillBlack(cnv) {
  var ctx = cnv.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cnv.width, cnv.height);
}

// Clears the canvas (resets to black background)
function clearCanvas() {
  var cnv = getCanvas();
  if (cnv) fillBlack(cnv);
}

// Draws a Vector3 as a line from the canvas center.
// The canvas y-axis points down, so we flip the y component.
function drawVector(vec, color) {
  var cnv = getCanvas();
  if (!cnv) return;
  var ctx = cnv.getContext('2d');

  // Origin = center of the 400x400 canvas
  var originX = cnv.width  / 2;
  var originY = cnv.height / 2;

  var tipX = originX + vec.elements[0] * PX_PER_UNIT;
  var tipY = originY - vec.elements[1] * PX_PER_UNIT; // flip y

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.moveTo(originX, originY);
  ctx.lineTo(tipX, tipY);
  ctx.stroke();
}

// Reads a Vector3 from the V1 input fields
function readV1() {
  return new Vector3([
    parseFloat(document.getElementById('xOne').value),
    parseFloat(document.getElementById('yOne').value),
    0
  ]);
}

// Reads a Vector3 from the V2 input fields
function readV2() {
  return new Vector3([
    parseFloat(document.getElementById('xTwo').value),
    parseFloat(document.getElementById('yTwo').value),
    0
  ]);
}

// "Draw Vectors" button — draws v1 (red) and v2 (blue)
function handleDrawEvent() {
  clearCanvas();
  drawVector(readV1(), 'red');
  drawVector(readV2(), 'blue');
}

// "Draw Operation" button — applies the selected operation and draws the result
function handleDrawOperationEvent() {
  clearCanvas();

  var vecA   = readV1();
  var vecB   = readV2();
  var scalar = parseFloat(document.getElementById('scalarVal').value);
  var op     = document.getElementById('selectedOp').value;

  // Always show the originals
  drawVector(vecA, 'red');
  drawVector(vecB, 'blue');

  switch (op) {

    case 'add': {
      // Result = vecA + vecB
      var result = new Vector3(vecA.elements);
      result.add(vecB);
      drawVector(result, 'green');
      break;
    }

    case 'sub': {
      // Result = vecA - vecB
      var result = new Vector3(vecA.elements);
      result.sub(vecB);
      drawVector(result, 'green');
      break;
    }

    case 'mul': {
      // Scale both vectors by scalar
      var scaledA = new Vector3(vecA.elements);
      var scaledB = new Vector3(vecB.elements);
      scaledA.mul(scalar);
      scaledB.mul(scalar);
      drawVector(scaledA, 'green');
      drawVector(scaledB, 'green');
      break;
    }

    case 'div': {
      // Divide both vectors by scalar
      var scaledA = new Vector3(vecA.elements);
      var scaledB = new Vector3(vecB.elements);
      scaledA.div(scalar);
      scaledB.div(scalar);
      drawVector(scaledA, 'green');
      drawVector(scaledB, 'green');
      break;
    }

    case 'magnitude': {
      // Print lengths, then draw normalized versions
      console.log('|v1| = ' + vecA.magnitude());
      console.log('|v2| = ' + vecB.magnitude());
      var normA = new Vector3(vecA.elements); normA.normalize();
      var normB = new Vector3(vecB.elements); normB.normalize();
      drawVector(normA, 'green');
      drawVector(normB, 'green');
      break;
    }

    case 'normalize': {
      console.log('|v1| = ' + vecA.magnitude());
      console.log('|v2| = ' + vecB.magnitude());
      var normA = new Vector3(vecA.elements); normA.normalize();
      var normB = new Vector3(vecB.elements); normB.normalize();
      drawVector(normA, 'green');
      drawVector(normB, 'green');
      break;
    }

    case 'angle': {
      console.log('Angle between v1 and v2: ' + angleBetween(vecA, vecB).toFixed(2) + ' degrees');
      break;
    }

    case 'area': {
      console.log('Triangle area: ' + triangleArea(vecA, vecB).toFixed(4));
      break;
    }
  }
}

// Returns the angle in degrees between two vectors using the dot product:
// cos(theta) = dot(a,b) / (|a| * |b|)
function angleBetween(a, b) {
  var dotProduct = Vector3.dot(a, b);
  var cosTheta   = dotProduct / (a.magnitude() * b.magnitude());
  // Clamp to valid range for acos to handle floating point edge cases
  cosTheta = Math.min(1.0, Math.max(-1.0, cosTheta));
  return Math.acos(cosTheta) * (180.0 / Math.PI);
}

// Returns the area of the triangle formed by two vectors.
// Area = |a x b| / 2  (half the parallelogram they span)
function triangleArea(a, b) {
  return Vector3.cross(a, b).magnitude() / 2.0;
}
