var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
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

var geometry = new THREE.BoxGeometry(2, 2, 2);

var rei_texture = new THREE.TextureLoader().load("rei.png");
rei_texture.wrapS = THREE.RepeatWrapping;
rei_texture.wrapT = THREE.RepeatWrapping;
rei_texture.repeat.set(4, 4);
var rei_material = new THREE.MeshBasicMaterial({
  map: rei_texture
});

var piece_colors = [0x0085ff];

var material = new THREE.MeshBasicMaterial({
  color: piece_colors[0]
});

var cube = new THREE.Object3D();

cube.add(new THREE.Mesh(geometry, material));
scene.add(cube);

cube.rotation.x = 5;
cube.rotation.y = 4;
cube.rotation.z = 3;

camera.position.z = 5;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersects = [];

function render() {
  requestAnimationFrame(render);
  cube.rotation.x += .01;
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

render();
