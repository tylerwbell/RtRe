/* open Canvas.context2d;
   /* renderings -> canva */

   let draw = (context: Canvas.context2d, pixel: int, rendering: Rendering.t) => {
     for (x in 0 to rendering.width - 1) {
       for (y in 0 to rendering.height - 1) {
         let color = rendering.buffer[y * rendering.width + x];
         let correctedColor = Filter.apply(GammaFilter, color);

         let ox = x * pixel;
         let oy = y * pixel;
         context->setFillStyle(Color.toDomRgbaString(correctedColor));
         context->fillRect(ox, oy, pixel, pixel);
       };
     };
   }; */