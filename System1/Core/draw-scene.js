
// https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/3.4.2/gl-matrix-min.js
// import { mat4 } from "https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/3.4.2/gl-matrix-min.js";
// import { randomBetween } from "../Modules/mathness.js";
import { loadSquares } from "../Demos/loadSquares.js";

//export function drawScene(gl, programInfo, buffers, positionCheap = {x:0, y:0, z:-76.0} ) {
export function drawScene(gl, programInfo, positionCheap = {x:0, y:0, z:-76.0} ) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    //[-20.0, 20.0, -76.0]
    [positionCheap.x, positionCheap.y, positionCheap.z]
  ); // amount to translate


  // Set the shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  
  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);
  
  // >>>>
  const positionBuffer = gl.createBuffer();
  
  var colorUniformLocation = gl.getUniformLocation(programInfo.program, "u_color");

  //gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    
  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  // setPositionAttribute(gl, buffers, programInfo);
  const numComponents = 2; // pull out 2 values per iteration
  const type = gl.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  // 0 = use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  
  

  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

  // 
  // // Set the shader uniforms
  // gl.uniformMatrix4fv(
  //   programInfo.uniformLocations.projectionMatrix,
  //   false,
  //   projectionMatrix
  // );
  // gl.uniformMatrix4fv(
  //   programInfo.uniformLocations.modelViewMatrix,
  //   false,
  //   modelViewMatrix
  // );

  const offset2 = 0;
  const vertexCount = 6;// 3 for tri, 6 for 2 tris making a square
  var primitiveType = gl.TRIANGLES;
  
  // setRectangle(gl, randomBetween(-4,4), 8, 12, 8);
  // gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
  // gl.drawArrays(primitiveType, offset2, vertexCount);
  // 
  // 
  // setRectangle(gl, -9, randomBetween(-4,4), 8, 8);
  // gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
  // gl.drawArrays(primitiveType, offset2, vertexCount);
  // 
  // 
  // 
  // setRectangle(gl,-24, randomBetween(-4,4) + -22, 8, 12);
  // gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
  // gl.drawArrays(primitiveType, offset2, vertexCount);
  // 
  
  var gg = loadSquares(gl, colorUniformLocation);
  
  for (var i = 0; i < gg.length; i++) {
    gg[i]();
    gl.drawArrays(primitiveType, offset2, vertexCount);
    
  }
  

  // {

    // gl.drawArrays(primitiveType, offset2, vertexCount);

  // }
  
  // {
  //   const offset = 0;
  //   const vertexCount = 6;// 3 for tri, 6 for 2 tris making a square
  //   var primitiveType = gl.TRIANGLES;
  //   // var primitiveType = gl.TRIANGLE_STRIP;
  //   gl.drawArrays(primitiveType, offset, vertexCount);
  // }
}

// Tell WebGL how to pull out the positions from the position
// buffer into the vertexPosition attribute.
// function setPositionAttribute(gl, buffers, programInfo) {
//   const numComponents = 2; // pull out 2 values per iteration
//   const type = gl.FLOAT; // the data in the buffer is 32bit floats
//   const normalize = false; // don't normalize
//   const stride = 0; // how many bytes to get from one set of values to the next
//   // 0 = use type and numComponents above
//   const offset = 0; // how many bytes inside the buffer to start from
//   gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
//   gl.vertexAttribPointer(
//     programInfo.attribLocations.vertexPosition,
//     numComponents,
//     type,
//     normalize,
//     stride,
//     offset
//   );
//   gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
// }

// 
// // Fills the buffer with the values that define a rectangle.
// function setRectangle(gl, x, y, width, height) {
//   var x1 = x;
//   var x2 = x + width;
//   var y1 = y;
//   var y2 = y + height;
// 
//   // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
//   // whatever buffer is bound to the `ARRAY_BUFFER` bind point
//   // but so far we only have one buffer. If we had more than one
//   // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.
// 
//   var positions = [
//     x1 + 2, y1,
//     x1, y2 + 2,
//     x2 + 4, y2,
//     x2 + 2, y1,
//     // other tri
//     x1 + 2, y1,
//     x2 + 4, y2
//   ];
// 
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
// }
