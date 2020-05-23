let sky: Texture.t =
  LinearGradient({
    a: {
      x: 0.0,
      y: 0.0,
    },
    b: {
      x: 0.0,
      y: 1.0,
    },
    aColor: Color.fromRgb(0.8, 1.0, 1.0),
    bColor: Color.fromRgb(0.8, 0.8, 1.0),
  });

let make = (): Scene.t => {
  let bodies: ref(list(Shape.t)) = ref([]);
  for (_ in 0 to 200) {
    let a = Random.float(20.0) -. 10.0;
    let b = Random.float(20.0) -. 10.0;
    let y = 0.2;
    let m = Random.float(1.0);
    let center: Vec3f.t = {
      x: a +. 0.9 *. Random.float(1.0),
      y,
      z: b +. 0.9 *. Random.float(1.0),
    };

    let material: Material.t =
      if (m < 0.5) {
        Diffuse({
          albedo: {
            x: Random.float(1.0) *. Random.float(1.0),
            y: Random.float(1.0) *. Random.float(1.0),
            z: Random.float(1.0) *. Random.float(1.0),
          },
        });
      } else if (m < 0.75) {
        Specular({
          albedo: {
            x: Random.float(1.0),
            y: Random.float(1.0),
            z: Random.float(1.0),
          },
        });
      } else {
        Dielectric({refractiveIndex: 0.2, attenuation: Color.white});
      };

    bodies := [Sphere({center, radius: 0.2, material}), ...bodies^];
  };

  bodies :=
    [
      Sphere({
        center: {
          x: 0.0,
          y: 1.0,
          z: 0.0,
        },
        radius: 1.0,
        material:
          Dielectric({refractiveIndex: 1.5, attenuation: Color.white}),
      }),
      Sphere({
        center: {
          x: (-4.0),
          y: 1.0,
          z: 0.0,
        },
        radius: 1.0,
        material: Diffuse({albedo: Color.fromRgb(0.4, 0.2, 0.1)}),
      }),
      Sphere({
        center: {
          x: 4.0,
          y: 1.0,
          z: 0.0,
        },
        radius: 1.0,
        material: Specular({albedo: Color.fromRgb(0.7, 0.6, 0.5)}),
      }),
      Sphere({
        center: {
          x: 0.0,
          y: (-1000.0),
          z: 0.0,
        },
        radius: 1000.0,
        material: Diffuse({albedo: Color.fromRgb(0.5, 0.5, 0.5)}),
      }),
      ...bodies^,
    ];

  {background: sky, bodies: bodies^};
};