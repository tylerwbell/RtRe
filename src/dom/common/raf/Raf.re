type animationId;

[@bs.val]
external requestAnimationFrame: (float => unit) => animationId =
  "requestAnimationFrame";

[@bs.val]
external cancelAnimationFrame: animationId => unit = "cancelAnimationFrame";