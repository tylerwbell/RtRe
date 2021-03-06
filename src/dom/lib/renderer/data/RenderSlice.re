open DomCollections;
open Vec3f;

type t = {
  frame: Rect.t(int),
  buffer: Uint8ColorArray2d.t,
  samples: Uint32Array2d.t,
};

let make = (frame: Rect.t(int), clearColor: Color.t): t => {
  let buffer =
    Uint8ColorArray2d.make(frame.size.width, frame.size.height, clearColor);
  let samples = Uint32Array2d.make(frame.size.width, frame.size.height, 0);

  {frame, buffer, samples};
};

let clear = (t: t, clearColor: Color.t) => {
  Uint8ColorArray2d.fill(t.buffer, clearColor);
  Uint32Array2d.fill(t.samples, 0);
};

// Blend two slices. Source frame should be inside or equal to destination's frame.
let blend = (dest: t, source: t) => {
  for (sourceX in 0 to source.frame.size.width - 1) {
    for (sourceY in 0 to source.frame.size.height - 1) {
      let (destX, destY) = (
        source.frame.origin.x + sourceX,
        source.frame.origin.y + sourceY,
      );

      let destColor = Uint8ColorArray2d.get(dest.buffer, destX, destY);
      let sourceColor =
        Uint8ColorArray2d.get(source.buffer, sourceX, sourceY);
      let destSamples = float(Uint32Array2d.get(dest.samples, destX, destY));
      let sourceSamples =
        float(Uint32Array2d.get(source.samples, sourceX, sourceY));

      let color =
        sourceColor
        ->multScalar(sourceSamples)
        ->add(destColor->multScalar(destSamples))
        ->divScalar(destSamples +. sourceSamples);

      Uint8ColorArray2d.set(dest.buffer, destX, destY, color);
      Uint32Array2d.set(
        dest.samples,
        destX,
        destY,
        int_of_float(destSamples +. sourceSamples),
      );
    };
  };
};