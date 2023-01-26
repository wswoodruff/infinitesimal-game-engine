

// import {Layers} from './Layers.js';
import {Vector3} from '../Modules/Vector3.js';
import {Box3} from '../Modules/Box3.js';
import {Color} from '../Modules/Color.js';

// need to import some threejs functions
// like Vector

/*
class MM {}
class Quark {}
class TT extends Quark {}
class PP extends TT {}
bb = new TT()
rr = new PP()
rr instanceof Quark
  */
export class Quark {

  system;
  
  name = "";
  
  lv = 0;
  
  
  // max = new Vector3();
  
  // see
  // const mypoint = new Point()
  // Check `mypoint` is an `instanceof` `Point`
  // console.assert(mypoint instanceof Point)
  isType = "Quark";
  subType = "anything";
  
  gl;
  
  // is position world? or local?
  // lets go with local for now and use "get world()"
  // if you set attributes of this, they wont update the boundingBox
  // since they dont have setters
  position = new Vector3();
  
  
  // these need to get BOX3 min max etc
  width = 0;
  height = 0;
  depth = 0;
  mHeight;
  mWidth;
  mDepth;
  // set width(v){
  //   if (this.)
  // }
  
  scale = new Vector3();
  
  color = new Color();
  mColor = new Color();
  
  origin = new Vector3();
  
  pointsCount = 0;
  
  canUpdate = true;
  useInEditMode = true;
  
  tacos = "foof";
  
  
  // when updating
  // need to update matrix stuff
  peeps = new Set();
  add(peep){
      // if typeOf is needed
      if(peep instanceof Quark){
        this.peeps.add(peep);
      }
  }
  
  // NOT USEd d yet, see source
  // this MUST be an enum
  // layer = [Layers.Main];
  // need set layer()
  // so we can remove it from the list as well
  
  // instead well just do a bool check
  // keeping in mind "art" texture things should not collide
  canCollide = true;
  // canTrigger = true;
  

  // maybe rename to script
  // main part 
  // var helper = {randomBetween : randomBetween}
  // this.playCodeDecompressed().do(this, helper);

  playCode = `return {
    x: this.x,
    y: this.y,
    width: this.width,
    height: this.height
  }`;
  playCodeDecompressed = null;
  playHelpers = {};
  /*
  
  // sq1.playCode = `return { do : function(obj, helpers){
  //   obj.x = helpers.randomBetween(${-xx},${xy});
  //   obj.color.x = Math.random();
  //   obj.color.y = Math.random();
  //   obj.color.z = Math.random();
  // }}`;
  
  
    play(colorUniformLocation){

      if(this.playCodeDecompressed === null){

        this.playCodeDecompressed = new Function(this.playCode);
        
      }
      
      if( this.playCodeDecompressed().hasOwnProperty("do") ){
        // 2nd arg is helper {} , temp solution to get mth functions into sandbox
        this.playCodeDecompressed().do(this, {randomBetween : randomBetween});
      }
      // var gg = this.playCodeDecompressed;
      //setSquareLike(this.gl, gg.x, gg.y, gg.width, gg.height);
      this.draw(colorUniformLocation);
    }
    */
  
  
  // in pixel space
  boxPadding = 0;
  
  boundingBox = new Box3();
  // invisible extra AABB testing space for various needs
  // like testing if an actor is standing near enough to a platform
  boundingBoxPadding = new Box3();
  
  get min(){
    return this.boundingBox.min;
  }
  get max(){
    return this.boundingBox.max;
  }
  
  // change per subclass
  // HRmmmmm max y is wrong for screenspace
  computeBoundingBox(){
    this.boundingBox.min.x = (-this.width / 2) + this.x;
    this.boundingBox.min.y = (this.height / 2) + this.y;
    this.boundingBox.min.z = (-this.depth / 2) + this.z;
    
    this.boundingBox.max.x = (this.width / 2) + this.x;
    this.boundingBox.max.y = (-this.height / 2) + this.y;
    this.boundingBox.max.z = (this.depth / 2) + this.z;
  }
  
  computeBoundingBoxPadding(){
    this.boundingBoxPadding.copy(this.boundingBox);
    this.boundingBoxPadding.addPaddingScreenSpace(this.boxPadding);
  }
  
  

  // these should become get set
  
  get x(){
    return this.position.x;
  }
  get y(){
    return this.position.y;
  }
  get z(){
    return this.position.z;
  }
  
  set x(v){
    this.position.x = v;
    this.computeBoundingBox();
    this.computeBoundingBoxPadding();
  }
  set y(v){
    this.position.y = v;
    this.computeBoundingBox();
    this.computeBoundingBoxPadding();
  }
  set z(v){
    this.position.z = v;
    this.computeBoundingBox();
    this.computeBoundingBoxPadding();
  }
  

  // 
  worldPosition(){
    
  }


  // clone(){
  // // debugger
  // // this.tacos = "derps";
  // this.gl = 
  // }
  copyTo(thing){
    thing.system = this.system;
    thing.gl = this.gl;
    thing.x = this.x;
    thing.y = this.y;
    thing.z = this.z;
    thing.position = this.position.clone();
    thing.width = this.width;
    thing.height = this.height;
    thing.isType = this.isType;
    thing.subType = this.subType;
    thing.boxPadding = this.boxPadding;

    thing.boundingBox = this.boundingBox.clone();
    thing.boundingBoxPadding = this.boundingBoxPadding.clone();
    
    // thing.color = this.color;
    thing.color = this.color.clone();
    // thing.origin = this.origin;
    thing.origin = this.origin.clone();
    thing.pointsCount = this.pointsCount;
    thing.canUpdate = this.canUpdate;
    thing.useInEditMode = this.useInEditMode;
    thing.canCollide = this.canCollide;
    thing.name = this.name;
    // not sure about these yet
    thing.playCode = this.playCode;
    thing.playCodeDecompressed = this.playCodeDecompressed;
    thing.playHelpers = this.playHelpers;
    thing.update = this.update;
    thing.play = this.play;
  }
  
  update(){
    
  }
  

  
  

  
  // this belongs on the object as a method
  originCompute(width, height, depth = 0){
    this.origin.x = width/2;
    this.origin.y = height/2;
    this.origin.z = depth/2;
  }

  // we never have the gl available yet on start of game....
  // maaaaybe we should, but for now just make it name
  // also arguments shoudl become an object
  //constructor(gl, x, y, width, height, depth, color = {x:1.0, y:1.0, z:1.0, w:1.0}) {
  constructor(name, x, y, width, height, depth, color = {r:1.0, g:1.0, b:1.0, a:1.0}) {
    // this.gl = gl;
    this.name = name;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.color.copy(color);
    this.mColor.copy(color);
    // // this just puts the origin at the center but does not move the geometry
    // // which means the origin is at top left
    // // hrrrmmmmm
    // // for a box in 3D its expected at center for transforms
    // // and maybe bottom for a character
    // // but a charecter its more likely a parent peeps sit
    // // you can draw its offset in GL
    // // but what is position then????
    this.originCompute(this.width, this.height, 0);
    // var center = {
    //   x:this.width/2,
    //   y: this.width/2,
    //   z: this.depth/2
    // }
    
  }

}
