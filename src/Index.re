// Entry point

[@bs.val] external document: Js.t({..}) = "document";

let style = document##createElement("style");
document##head##appendChild(style);

type viewport = {
  width: int,
  height: int,
};

let viewport = {width: 800, height: 500};

let canvas = Canvas.createElement(viewport.width, viewport.height);
document##body##appendChild(canvas);

let context = Canvas.getContext2d(canvas);

let clearColor = Color.fromRgb(0.0, 0.0, 0.0);
Canvas.Context2d.setFillStyle(context, Color.toRgbaString(clearColor));
Canvas.Context2d.fillRect(
  context,
  0.0,
  0.0,
  float(viewport.width),
  float(viewport.height),
);

for (x in 0 to viewport.width) {
  for (y in 0 to viewport.height) {
    let color =
      Color.fromRgb(
        float(x) /. float(viewport.width),
        float(y) /. float(viewport.height),
        0.0,
      );

    Canvas.Context2d.setFillStyle(context, Color.toRgbaString(color));
    Canvas.Context2d.fillRect(context, float(x), float(y), 1.0, 1.0);
  };
};