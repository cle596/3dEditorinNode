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

var material = new THREE.MeshBasicMaterial({
  color: 0x0085ff
});
var line_material = new THREE.LineBasicMaterial({
  color: 0xffffff
});

var cube = new THREE.Object3D();

cube.add(new THREE.Mesh(geometry, material));
cube.add(new THREE.LineSegments(geometry, line_material));
scene.add(cube);

cube.rotation.x = 5;
cube.rotation.y = 4;
cube.rotation.z = 3;

camera.position.z = 5;

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  cube.rotation.x += .01;
}
render();

$(window).resize(function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
