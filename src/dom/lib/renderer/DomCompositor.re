open Canvas.Context2d;

type t = {
  context: Canvas.context2d,
  rendering: RenderSlice.t,
};

let make = (canvas: Canvas.t, width: int, height: int): t => {
  Canvas.setWidth(canvas, float(width));
  Canvas.setHeight(canvas, float(height));
  let context = Canvas.getContext2d(canvas);

  let defaultPoint: RenderSlice.sample = {color: Color.black, samples: 0};
  let buffer = Array2d.make(width, height, defaultPoint);

  {
    context,
    rendering: {
      frame: {
        origin: Point.zero,
        size: {
          width,
          height,
        },
      },
      buffer,
    },
  };
};

let draw = (t: t) => {
  for (x in 0 to t.rendering.frame.size.width - 1) {
    for (y in 0 to t.rendering.frame.size.height - 1) {
      let sample = Array2d.get(t.rendering.buffer, x, y);

      // TODO: this should be a processing step
      let correctedColor = Filter.apply(GammaFilter, sample.color);

      t.context->setFillStyle(Color.toDomRgbaString(correctedColor));
      t.context->fillRect(x, y, 1, 1);
    };
  };
};