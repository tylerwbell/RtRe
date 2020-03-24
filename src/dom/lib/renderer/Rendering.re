open Vec3f;

module Chunk = {
  type point = {
    color: Color.t,
    samples: int,
  };

  type slice = {
    x: int,
    y: int,
    width: int,
    height: int,
  };

  type t = {
    slice,
    buffer: array(point),
  };

  let blend = (a: t, b: t) => {
    for (i in 0 to Array.length(a.buffer) - 1) {
      let pointA = a.buffer[i];
      let pointB = b.buffer[i];
      let samplesA = pointA.samples;
      let samplesB = pointB.samples;
      let samples = samplesA + samplesB;

      let color =
        pointA.color
        ->multScalar(float(samplesA))
        ->add(pointB.color->multScalar(float(samplesB)))
        ->divScalar(float(samples));

      a.buffer[i] = {color, samples};
    };
  };
};