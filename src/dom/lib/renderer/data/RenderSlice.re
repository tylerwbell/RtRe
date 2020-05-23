open Collections;
open DomCollections;
open Vec3f;

type t = {
  frame: Rect.t(int),
  buffer: Array2d.t(Color.t),
  samples: Uint8ClampedArray2d.t,
};

let make = (frame: Rect.t(int), clearColor: Color.t): t => {
  let buffer = Array2d.make(frame.size.width, frame.size.height, clearColor);
  let samples =
    Uint8ClampedArray2d.make(frame.size.width, frame.size.height, 0);

  {frame, buffer, samples};
};

let clear = (t: t, clearColor: Color.t) => {
  Array2d.fill(t.buffer, clearColor);
  Uint8ClampedArray2d.fill(t.samples, 0);
};

// Blend two slices. Source frame should be inside or equal to destination's frame.
let blend = (dest: t, source: t) => {
  for (sourceX in 0 to source.frame.size.width - 1) {
    for (sourceY in 0 to source.frame.size.height - 1) {
      let (destX, destY) = (
        source.frame.origin.x + sourceX,
        source.frame.origin.y + sourceY,
      );

      let destColor = Array2d.get(dest.buffer, destX, destY);
      let sourceColor = Array2d.get(source.buffer, sourceX, sourceY);
      let destSamples =
        float(Uint8ClampedArray2d.get(dest.samples, destX, destY));
      let sourceSamples =
        float(Uint8ClampedArray2d.get(source.samples, sourceX, sourceY));

      let color =
        sourceColor
        ->multScalar(sourceSamples)
        ->add(destColor->multScalar(destSamples))
        ->divScalar(destSamples +. sourceSamples);

      Array2d.set(dest.buffer, destX, destY, color);
      Uint8ClampedArray2d.set(
        dest.samples,
        destX,
        destY,
        int_of_float(destSamples +. sourceSamples),
      );
    };
  };
};