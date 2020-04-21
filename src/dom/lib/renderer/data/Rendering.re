type colorSample = {
  color: Color.t,
  samples: int,
};

type t = {
  size: Size.t,
  buffer: array(colorSample),
};

// blend slice into rendering
let blend = (rendering: t, slice: Slice.t) => {
  for (sliceX in 0 to slice.frame.width - 1) {
    for (sliceY in 0 to slice.frame.height - 1) {
      let (absoluteX, absoluteY) = (sliceX + b.slice.x, sliceY + b.slice.y);

      let i = absoluteX + absoluteY * a.slice.width;
      let j = sliceX + sliceY * b.slice.width;

      let pointA = a.buffer[i];
      let pointB = b.buffer[j];
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