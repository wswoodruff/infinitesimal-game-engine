


export let loop = function(){

  if(this.runtimeState === "play"){
    this.loopID = requestAnimationFrame( this.loop.bind(this) );
  }
  // console.log("popcorn");


  // renderer.render( scene, camera );
  // console.log(this.pointer);
  //console.log("moof");
  
  // we need a larger mouse mover
  this.fauxPointer.x = this.pointer.x * this.pointerXYScalar;
  this.fauxPointer.y = this.pointer.y * this.pointerXYScalar;
  //this.fauxPointer.z = this.pointer.z;
  this.fauxPointer.z = -100.0;
  
  this.loopHookPoints.beforeDraw();

  // drawScene(gl, programInfo);
  this.drawScene(this, this.gl, this.programInfo, this.fauxPointer);
  
};



var time;
function updateTimes(system){
  time = new Date();
  system.time.millisecondsSinceStarted = time.getMilliseconds();
  system.time.sinceStarted = Date.now();
}
