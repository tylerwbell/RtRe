open Vec3f;

type sample = {
  color: Color.t,
  samples: int,
};

type t = {
  frame: Rect.t(int),
  buffer: Array2d.t(sample),
};

let make = (frame: Rect.t(int), clearColor: Color.t): t => {
  let defaultSample: sample = {color: clearColor, samples: 0};
  let buffer =
    Array2d.make(frame.size.width, frame.size.height, defaultSample);

  {frame, buffer};
};

let clear = (t: t, clearColor: Color.t) => {
  let clearSample: sample = {color: clearColor, samples: 0};
  Array2d.fill(t.buffer, clearSample);
};

// Blend two slices. Source frame should be inside or equal to destination's frame.
let blend = (dest: t, source: t) => {
  for (sourceX in 0 to source.frame.size.width - 1) {
    for (sourceY in 0 to source.frame.size.height - 1) {
      let (destX, destY) = (
        source.frame.origin.x + sourceX,
        source.frame.origin.y + sourceY,
      );

      let destSample = Array2d.get(dest.buffer, destX, destY);
      let sourceSample = Array2d.get(source.buffer, sourceX, sourceY);
      let destSamples = float(destSample.samples);
      let sourceSamples = float(sourceSample.samples);

      let color =
        sourceSample.color
        ->multScalar(sourceSamples)
        ->add(destSample.color->multScalar(destSamples))
        ->divScalar(destSamples +. sourceSamples);

      Array2d.set(
        dest.buffer,
        destX,
        destY,
        {color, samples: int_of_float(destSamples +. sourceSamples)},
      );
    };
  };
};