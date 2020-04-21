open Canvas.Context2d;

type t = {
  context: Canvas.context2d,
  rendering: Chunk.t,
};

let make = (canvas: Canvas.t, width: int, height: int): t => {
  Canvas.setWidth(canvas, float(width));
  Canvas.setHeight(canvas, float(height));
  let context = Canvas.getContext2d(canvas);

  let defaultPoint: Chunk.point = {color: Color.black, samples: 0};
  let buffer = Array.make(width * height, defaultPoint);

  {
    context,
    rendering: {
      slice: {
        x: 0,
        y: 0,
        width,
        height,
      },
      buffer,
    },
  };
};

let draw = (t: t, rendering: Rendering.Chunk.t) => {
  Rendering.Chunk.blend(t.rendering, rendering);

  let slice = t.rendering.slice;
  for (x in slice.x to slice.width - 1) {
    for (y in slice.y to slice.height - 1) {
      let point = t.rendering.buffer[y * slice.width + x];

      // TODO: this should be a processing step
      let correctedColor = Filter.apply(GammaFilter, point.color);

      t.context->setFillStyle(Color.toDomRgbaString(correctedColor));
      t.context->fillRect(x, y, 1, 1);
    };
  };
};