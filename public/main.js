var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

/*
var width = window.innerWidth;
var height = window.innerHeight;

var camera = new THREE.OrthographicCamera(
  width / - 2,
  width / 2,
  height / 2,
  height / - 2,
  1,
  1000
);
scene.add( camera );
*/
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

var cube;

function create_cube() {
  var geometry = new THREE.BoxGeometry(4, 4, 4);
  var fabric_texture = new THREE.TextureLoader()
    .load("fabric.jpg", function(texture) {
      var material = new THREE.MeshBasicMaterial({
        //color: piece_colors[color_index],
        map: texture
      });
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      //console.log("loaded!");
    });
}

function create_buffer_geometry() {
  var geometry = new THREE.BufferGeometry();
  var vertexPositions = [
    [-1.0, -1.0, 1.0],
    [1.0, -1.0, 1.0],
    [1.0, 1.0, 1.0],

    [1.0, 1.0, 1.0],
    [-1.0, 1.0, 1.0],
    [-1.0, -1.0, 1.0]
  ];
  var vertices = new Float32Array(vertexPositions.length * 3);

  for (var i = 0; i < vertexPositions.length; i++) {
    vertices[i * 3 + 0] = vertexPositions[i][0];
    vertices[i * 3 + 1] = vertexPositions[i][1];
    vertices[i * 3 + 2] = vertexPositions[i][2];
  }

  geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
  var material = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

render();
create_buffer_geometry();
//create_cube();

/*
var y =0;
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


camera.position.z = 8;

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
    cube.rotation.y -= deltaX * offset;
    cube.rotation.x += deltaY * offset;
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
