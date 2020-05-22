let make =
    (settings: RenderSettings.t, camera: Camera.t)
    : list(RenderWorkerEvent.Command.t) => {
  let commands: ref(list(RenderWorkerEvent.Command.t)) = ref([]);

  let passes = 0;
  let divisions = 10;
  let width = settings.width / divisions;
  let height = settings.height / divisions;

  for (_ in 0 to passes) {
    for (divX in 0 to divisions - 1) {
      for (divY in 0 to divisions - 1) {
        let command: RenderWorkerEvent.Command.t =
          Render({
            camera,
            viewport: {
              width: settings.width,
              height: settings.height,
            },
            frame: {
              origin: {
                x: divX * width,
                y: divY * height,
              },
              size: {
                width,
                height,
              },
            },
          });

        commands := [command, ...commands^];
      };
    };
  };

  commands^;
};