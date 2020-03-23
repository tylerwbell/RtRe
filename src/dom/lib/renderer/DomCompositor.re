open Canvas.Context2d;

let draw = (context: Canvas.context2d, rendering: Rendering.Chunk.t) => {
  let slice = rendering.slice;

  for (x in slice.x to slice.width - 1) {
    for (y in slice.y to slice.height - 1) {
      let point = rendering.buffer[y * slice.width + x];

      // TODO: this should be a processing step
      let correctedColor = Filter.apply(GammaFilter, point.color);

      context->setFillStyle(Color.toDomRgbaString(correctedColor));
      context->fillRect(x, y, 1, 1);
    };
  };
};