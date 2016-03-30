var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

/*
var camera = new THREE.CubeCamera( 1, 100000, 128 );
scene.add( camera );
*/

var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setClearColor(0xffffff, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);

/*
var rei_texture = new THREE.TextureLoader().load("rei.png");
rei_texture.wrapS = THREE.RepeatWrapping;
rei_texture.wrapT = THREE.RepeatWrapping;
rei_texture.repeat.set(4, 4);
var rei_material = new THREE.MeshBasicMaterial({
  map: rei_texture
});
*/

/*
var metal_texture = new THREE.TextureLoader().load("metal.jpg");
console.log(metal_texture);
var metal_material = new THREE.MeshBasicMaterial({
  map: metal_texture
});
*/

var wood_texture = new THREE.TextureLoader().load("wood.jpg");
var wood_material = new THREE.MeshBasicMaterial({
  map: wood_texture
});

var piece_colors = [
  0x0085ff,
  0xffed5d,
  0x6bd2db,
  0x990067
];

function create_cube(color_index,texture) {
  var geometry = new THREE.BoxGeometry(4, 4, 4);
  var material = new THREE.MeshBasicMaterial({
    //color: piece_colors[color_index],
    map: wood_texture
  });
  var cube = new THREE.Object3D();
  var mesh = new THREE.Mesh(geometry,material);
  /*
  mesh.scale.x = texture.image.width;
  mesh.scale.y = texture.image.height;
*/
  cube.add(mesh);
  return cube;
}

var cubes = [];

var y = 0;
/*
for (var x = 0; x < piece_colors.length; ++x) {
  cubes.push(create_cube(x));
  cubes[x].position.y = y;
  cubes[x].rotation.x = 5;
  cubes[x].rotation.y = 4;
  cubes[x].rotation.z = 3;
  scene.add(cubes[x]);
  y += 2;
}
*/

cubes.push(create_cube(0,wood_texture));
scene.add(cubes[0]);

camera.position.z = 5;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersects = [];

function render() {
  requestAnimationFrame(render);
  //camera.rotation.y += .0001;
  /*
  for (var x=0;x<cubes.length;++x){
    if (cubes[x].position.y > -1){
      cubes[x].position.y -= .01;
    }
  }
  */
  renderer.render(scene, camera);
}

$(window).resize(function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

var color_changed = false;
var clicked = false;
var down = false;

/*
$(window).click(function(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  intersects = raycaster.intersectObjects(scene.children,true);
  for (var i = 0; i < intersects.length; i++) {
    if (!color_changed){
      intersects[i].object.material.color.set(0x000000);
      color_changed = !color_changed;
    }
    else {
      intersects[i].object.material.color.set(piece_colors[0]);
      color_changed = !color_changed;
    }
  }
});
*/

$(window).mousedown(function(e) {
  down = !down;
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  //console.log(mouse.x, mouse.y);
});

$(window).mouseup(function(e) {
  down = !down;
});

$(window).mousemove(function(e) {
  var offset = 1;
  var deltaX;
  var deltaY;
  deltaX = 0;
  deltaY = 0;
  if (down) {
    deltaX = mouse.x - ((e.clientX / window.innerWidth) * 2 - 1);
    deltaY = mouse.y - (-(e.clientY / window.innerHeight) * 2 + 1);
    //console.log(deltaX,deltaY);
    /*
    camera.rotation.y -= deltaX * offset;
    camera.rotation.x += deltaY * offset;
    */
    cubes[0].rotation.y -= deltaX * offset;
    cubes[0].rotation.x += deltaY * offset;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }
});

$(window).keydown(function(e) {
  if (e.keyCode == 37) { //left
    cubes[0].position.x -= .5;
  } else if (e.keyCode == 38) { //up
    cubes[0].position.y += .5;
  } else if (e.keyCode == 39) { //right
    cubes[0].position.x += .5;
  } else if (e.keyCode == 40) { //down
    cubes[0].position.y -= .5;
  } else if (e.keyCode == 65) {
    camera.position.x -= .5;
  } else if (e.keyCode == 68) {
    camera.position.x += .5;
  } else if (e.keyCode == 32) {
    camera.rotation.x = 0;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
  }
});


$('body').mousewheel(function(event) {
  if (event.deltaY > 0 && camera.fov > 3) {
    console.log("up");
    camera.fov -= 3;
    camera.updateProjectionMatrix();
  } else if (event.deltaY < 0 && camera.fov < 150) {
    console.log("down");
    camera.fov += 3;
    camera.updateProjectionMatrix();
  }
});

render();
