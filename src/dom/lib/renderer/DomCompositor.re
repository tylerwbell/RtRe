open Canvas.Context2d;

let draw = (context: Canvas.context2d, rendering: Rendering.t) => {
  for (x in 0 to rendering.width - 1) {
    for (y in 0 to rendering.height - 1) {
      let pixel = rendering.buffer[y * rendering.width + x];
      let correctedColor = Filter.apply(GammaFilter, pixel);

      context->setFillStyle(Color.toDomRgbaString(correctedColor));
      context->fillRect(x, y, 1, 1);
    };
  };
};