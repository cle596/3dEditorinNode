var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setClearColor(0xffffff, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);

var rei_texture = new THREE.TextureLoader().load("rei.png");
rei_texture.wrapS = THREE.RepeatWrapping;
rei_texture.wrapT = THREE.RepeatWrapping;
rei_texture.repeat.set(4, 4);
var rei_material = new THREE.MeshBasicMaterial({
  map: rei_texture
});

var piece_colors = [
  0x0085ff,
  0xffed5d,
  0x6bd2db,
  0x990067
];

function create_cube(color_index){
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({
    color: piece_colors[color_index]
  });
  var cube = new THREE.Object3D();
  cube.add(new THREE.Mesh(geometry,material));
  return cube;
}

var cubes = [];

var y = 0;
for (var x=0;x<piece_colors.length;++x){
  cubes.push(create_cube(x));
  cubes[x].position.y = y;
  /*
  cubes[x].rotation.x = 5;
  cubes[x].rotation.y = 4;
  cubes[x].rotation.z = 3;
  */
  scene.add(cubes[x]);
  y+=2;
}

camera.position.z = 5;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersects = [];

function render() {
  requestAnimationFrame(render);
  camera.rotation.y += .0001;
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

$(window).keydown(function(e){
  if(e.keyCode == 37){//left
    cubes[0].position.x -= .5;
  }
  else if(e.keyCode == 38){//up
    cubes[0].position.y += .5;
  }
  else if(e.keyCode == 39){//right
    cubes[0].position.x += .5;
  }
  else if(e.keyCode == 40){//down
    cubes[0].position.y -= .5;
  }
  else if (e.keyCode == 65){
    camera.position.x -= .5;
  }
  else if (e.keyCode == 68){
    camera.position.x += .5;
  }
  else if (e.keyCode == 32){
    camera.rotation.x=0;
    camera.rotation.y=0;
    camera.rotation.z=0;
  }
});


$('body').mousewheel(function(event) {
    if (event.deltaY>0){
      console.log("up");
      camera.fov -= 1;
      camera.updateProjectionMatrix();
    }
    else {
      console.log("down");
      camera.fov += 1;
      camera.updateProjectionMatrix();
    }
});

render();
