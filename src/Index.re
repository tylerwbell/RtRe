// Entry point

[@bs.val] external document: Js.t({..}) = "document";

let style = document##createElement("style");
document##head##appendChild(style);

type viewport = {
  x: int,
  y: int,
};

let viewport = {x: 800, y: 500};

let canvas = Canvas.createElement(viewport.x, viewport.y);
document##body##appendChild(canvas);

let context = Canvas.getContext2d(canvas);

let clear = () => {
  Canvas.Ctx.setFillStyle(context, "#000000");
  Canvas.Ctx.fillRect(
    context,
    0.0,
    0.0,
    float(viewport.x),
    float(viewport.y),
  );

  Canvas.Ctx.setFillStyle(context, "#aaaa00");
  for (x in 0 to viewport.x) {
    for (y in 0 to viewport.y) {
      if (Random.int(100) == 0) {
        Canvas.Ctx.fillRect(context, float(x), float(y), 1.0, 1.0);
      };
    };
  };
};

let x = ref(0);
let vx = ref(10);

let rec loop = (~t: float) => {
  Js.log(t);
  clear();

  x := x^ + vx^;
  vx :=
    (
      switch (x^) {
      | x when x < 0 || x > viewport.x => (-1) * vx^
      | _ => vx^
      }
    );

  Canvas.Ctx.setFillStyle(context, "#FF0000");
  Canvas.Ctx.fillRect(context, float(x^), 10.0, 10.0, 10.0);

  let _ = Raf.requestAnimationFrame(t => loop(~t));
  ();
};

loop(~t=0.0);