open Canvas.Context2d;
open DomCollections;

type t = {
  context: Canvas.context2d,
  rendering: RenderSlice.t,
};

let make = (canvas: Canvas.t, width: int, height: int): t => {
  Canvas.setWidth(canvas, float(width));
  Canvas.setHeight(canvas, float(height));
  let context = Canvas.getContext2d(canvas);

  let slice =
    RenderSlice.make(
      {
        origin: Point.zero,
        size: {
          width,
          height,
        },
      },
      Color.black,
    );

  {context, rendering: slice};
};

let draw = (t: t) => {
  let buffer =
    Uint8ClampedArray.RandomAccessCollection.buffer(
      t.rendering.buffer.source.source,
    );

  let uint8Array = Js.Typed_array.Uint8ClampedArray.fromBuffer(buffer);

  t.context
  ->drawImageData(
      uint8Array,
      t.rendering.frame.size.width,
      t.rendering.frame.size.height,
      0,
      0,
    );
};