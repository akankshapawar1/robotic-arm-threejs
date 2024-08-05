class ManipulatorTest {
  constructor() {
    this.revJoin1 = new RevolutJoint(); // Base joint
    this.shoulder = new THREE.Object3D(); // Shoulder to connect the base joint and the link
    this.link1 = new link();
    // this.endEf = new EndEffector();

    // Set initial positions and rotations
    this.revJoin1.rotation.x = 0;
    this.revJoin1.children[3].rotation.z = 0; // Ensure this is set to 0 to stand upright

    // Position the shoulder and link correctly
    this.shoulder.position.y = 15; // Adjust based on the geometry of the joint and link
    this.link1.position.y = 50; // Adjust based on the length of the link
    // this.endEf.position.y = 100; // Position end effector at the end of the link
    // this.endEf.rotation.z = 0; // Ensure this is set to 0

    // Nest the components to form the manipulator
    this.revJoin1.children[3].add(this.shoulder);
    this.shoulder.add(this.link1);
    // this.link1.add(this.endEf);
  }

  setAngle(angles) {
    const { a1 } = angles;
    const clampedA1 = Math.max(-90, Math.min(90, a1))
    const radA1 = clampedA1 * (Math.PI / 180); // Convert degrees to radians
    this.shoulder.rotation.z = radA1; // Rotate shoulder around z-axis
  }
}

class EndEffector {
  constructor(
    scale = 1,
    geometry = new THREE.SphereGeometry(12 * scale, 20, 20),
    material = new THREE.MeshLambertMaterial({ color: 0xFF00CC })
  ) {
    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.frame = new Frame();
    this.frame.add(this.mesh);
    return this.frame;
  }
}

class link {
  constructor(
    position = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 }
  ) {
    this.geometry = new THREE.CylinderGeometry(10, 10, 100, 32);
    this.material = new THREE.MeshLambertMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 1
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    var { x, y, z } = position;
    this.mesh.position.set(x, y, z);
    var { x, y, z } = rotation;
    this.mesh.rotation.set(x, y, z);

    return this.mesh;
  }
}

class RevolutJoint {
  constructor(
    geometry = new THREE.CylinderGeometry(15, 15, 30, 32), // Increased height to encapsulate the link
    material = new THREE.MeshLambertMaterial({
      color: 0xdf1111,
      transparent: false,
      opacity: 1
    })
  ) {
    this.frame = new Frame();
    this.material = material;
    this.geometry = geometry;
    this.frame.add(new THREE.Mesh(this.geometry, this.material));
    return this.frame;
  }
}

class Frame {
  constructor(_scale = 1) {
    let scale = _scale;
    let axis = {
      x: new Segment(
        new THREE.CylinderGeometry(2, 2, 20, 32),
        new THREE.MeshLambertMaterial({
          color: 0xff0000
        })
      ).add(
        new Segment(
          new THREE.CylinderGeometry(0, 4, 5, 32),
          new THREE.MeshLambertMaterial({
            color: 0xff0000
          })
        )
      ),
      y: new Segment(
        new THREE.CylinderGeometry(2, 2, 20, 32),
        new THREE.MeshLambertMaterial({
          color: 0x00ff00
        })
      ).add(
        new Segment(
          new THREE.CylinderGeometry(0, 4, 5, 32),
          new THREE.MeshLambertMaterial({
            color: 0x00ff00
          })
        )
      ),
      z: new Segment(
        new THREE.CylinderGeometry(2, 2, 20, 32),
        new THREE.MeshLambertMaterial({
          color: 0x0000ff
        })
      ).add(
        new Segment(
          new THREE.CylinderGeometry(0, 4, 5, 32),
          new THREE.MeshLambertMaterial({
            color: 0x0000ff
          })
        )
      )
    };

    axis.x.position.x = 10;
    axis.x.children[0].position.y = 12.5;
    axis.x.rotation.z = -Math.PI / 2;

    axis.y.position.y = 10;
    axis.y.children[0].position.y = 12.5;

    axis.z.position.z = 10;
    axis.z.children[0].position.y = 12.5;
    axis.z.rotation.x = Math.PI / 2;

    this.pivot = new Pivot();
    this.pivot
      .add(axis.x)
      .add(axis.y)
      .add(axis.z);

    return this.pivot;
  }
}

class Pivot {
  constructor(
    scale = 1,
    geometry = new THREE.SphereGeometry(2 * scale, 20, 20),
    material = new THREE.MeshLambertMaterial({ color: 0xffcc00 })
  ) {
    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    return this.mesh;
  }
}

class Segment {
  constructor(
    geometry = new THREE.CylinderGeometry(5, 5, 20, 32),
    material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
      transparent: true,
      opacity: 0.7
    })
  ) {
    this.material = material;
    this.geometry = geometry;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.pivot = new Pivot();

    this.pivot.position.set(this.mesh.position);
    this.pivot.rotation.set(this.mesh.rotation);

    return this.mesh;
  }
}
