window.onload = function(event) {

  var camera, scene, renderer;
  var effect, controls;
  var element, container;
  var model,mixer;
  const mixers = [];
  const clock = new THREE.Clock();

  init();
  animate();
  geometry();

  function init() {
    renderer = new THREE.WebGLRenderer();
    element = renderer.domElement;
    container = document.getElementById('container');
    container.appendChild(element);

    renderer.setClearColor('#091152', 1.0);

    effect = new THREE.StereoEffect(renderer);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.01, 1000);
    // camera.position.set(-500, 400, -200);
    camera.position.set(-100, 50, -350);
    scene.add(camera);

    controls = new THREE.OrbitControls(camera, element);
    // controls.rotateUp(Math.PI / 4);
    controls.target.set(
      camera.position.x + 0.1,
      camera.position.y,
      camera.position.z
    );
    //controls.noZoom = true;
    controls.noPan = true;

    function setOrientationControls(e) {
      if (!e.alpha) {
        return;
      }

      controls = new THREE.DeviceOrientationControls(camera, true);
      controls.connect();
      controls.update();

      element.addEventListener('click', fullscreen, false);

      window.removeEventListener('deviceorientation', setOrientationControls, true);
    }
    window.addEventListener('deviceorientation', setOrientationControls, true);


    var light = new THREE.AmbientLight( 0xffffff, 0.5 );
    light.position.set(-300, 200, -100);
    scene.add( light );

    var dirlight = new THREE.DirectionalLight( 0xffffff, 0.2 );
    dirlight.position.set(-300, 200, -100);
    scene.add( dirlight );

    window.addEventListener('resize', resize, false);
    setTimeout(resize, 1);

    //particles to create snow
    particle = new THREE.Object3D();
    scene.add(particle);
    var geometry = new THREE.SphereGeometry(2, 0);
    var material = new THREE.MeshBasicMaterial({
      color: 'white',
    });

    for (var i = 0; i < 8000; i++) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      mesh.position.multiplyScalar(90 + (Math.random() * 9000));
      mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
      particle.add(mesh);
    }
    particle.rotation.y -= 0.0040;

//Random tree generator
      for (var i = 0; i < 30; i++) {
            var mtlLoader = new THREE.MTLLoader()
        mtlLoader.load('../models/tree.mtl', function (material) {
          var objLoader = new THREE.OBJLoader()
          objLoader.setMaterials(material)
          objLoader.load('../models/tree.obj', function (tree) {
          tree.position.set(Math.random() *-1000- -200, 0,Math.random()  *-1000- -100 );
            // tree.position.multiplyScalar(90 + (Math.random() * -200));
            // tree.rotation.set(Math.random() * 2, Math.random() * 200, Math.random() * 200);
            tree.scale.set(30,30,30);
            scene.add(tree)
            });
          });
        }


}

  function geometry(){


    // Instantiate a loader
    var loader = new THREE.GLTFLoader();
    // Load a glTF resource
    loader.load(
      // resource URL
      '../models/fox3.gltf',
      // called when the resource is loaded
      function ( gltf ) {

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        //Loading in and positioning model
        var object = gltf.scene;
        object.scale.set(15,15,15);
        object.position.set (200,10, -300);
        object.rotation.y = 1.5;

        //Playing Animation
        mixer = new THREE.AnimationMixer(gltf.scene);
        console.log(gltf.animations)
        mixer.clipAction( gltf.animations[0] ).play();
        materialObj = new THREE.MeshBasicMaterial( { color: "#8A430B", skinning: true} );
        object.traverse(function(child){
          if (child instanceof THREE.Mesh){
            child.material = materialObj;
          }
        });


        console.log(object);
        scene.add( object )
      });

      var mtlLoader = new THREE.MTLLoader()
  mtlLoader.load('../models/snowman.mtl', function (material) {
    var objLoader = new THREE.OBJLoader()
    objLoader.setMaterials(material)
    objLoader.load('../models/snowman.obj', function (snowman) {
      snowman.position.set ( 300, 25,-200);
      snowman.scale.set(15,15,15);
      snowman.rotation.y = 0.85;
      scene.add(snowman)
      });
    });

    var mtlLoader = new THREE.MTLLoader()
mtlLoader.load('../models/pointymountains.mtl', function (material) {
  var objLoader = new THREE.OBJLoader()
  objLoader.setMaterials(material)
  objLoader.load('../models/pointymountains.obj', function (mountain) {
    mountain.position.set ( -100, 300 , 600);
    mountain.scale.set(100,100,500);
    mountain.rotation.y = 0.85;
    scene.add(mountain)
    });
  });

  var mtlLoader = new THREE.MTLLoader()
mtlLoader.load('../models/pointymountains.mtl', function (material) {
var objLoader = new THREE.OBJLoader()
objLoader.setMaterials(material)
objLoader.load('../models/pointymountains.obj', function (mountain) {
  mountain.position.set ( -100, 300 , -1500);
  mountain.scale.set(100,100,1500);
  mountain.rotation.y = -1;
  scene.add(mountain)
  });
});

var mtlLoader = new THREE.MTLLoader()
mtlLoader.load('../models/pointymountains.mtl', function (material) {
var objLoader = new THREE.OBJLoader()
objLoader.setMaterials(material)
objLoader.load('../models/pointymountains.obj', function (mountain) {
mountain.position.set ( 1500, 300 , 300);
mountain.scale.set(100,100,500);
// mountain.rotation.y = -2;
scene.add(mountain)
});
});

// floor
  var mtlLoader = new THREE.MTLLoader()
mtlLoader.load('../models/floor.mtl', function (material) {
var objLoader = new THREE.OBJLoader()
objLoader.setMaterials(material)
objLoader.load('../models/floor.obj', function (floor) {
  floor.position.set ( -100, 1,-200);
  floor.scale.set(100,15,100);
  floor.rotation.y = 0.85;
  scene.add(floor)
  });
});

}

        function resize() {
      var width = container.offsetWidth;
      var height = 1000;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      effect.setSize(width, height);
    }

    function update(dt) {
      resize();

      camera.updateProjectionMatrix();

      controls.update(dt);

      const delta = clock.getDelta();
      mixers.forEach( ( mixer ) => { mixer.update( delta ); } );

    }

    function render(dt) {
      effect.render(scene, camera);
    }

    function animate(t) {
      requestAnimationFrame(animate);

      particle.position.y += -0.3;

      var delta = clock.getDelta();
      if (mixer != null && mixer !== undefined) {
        mixer.update(delta);
      };

      update(clock.getDelta());
      render(clock.getDelta());
    }

    function fullscreen() {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    }

  }
