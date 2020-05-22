let make =
    (settings: RenderSettings.t, camera: Camera.t)
    : list(RenderWorkerEvent.Command.t) => {
  let commands: ref(list(RenderWorkerEvent.Command.t)) = ref([]);

  let divisions = 9;
  let width = settings.width / divisions;
  let height = settings.height / divisions;

  for (_ in 0 to 5) {
    for (divX in 0 to divisions - 1) {
      for (divY in 0 to divisions - 1) {
        let command: RenderWorkerEvent.Command.t =
          Render({
            camera,
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