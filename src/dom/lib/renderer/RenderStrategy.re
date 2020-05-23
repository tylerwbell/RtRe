let make =
    (settings: RenderSettings.t, camera: Camera.t)
    : list(RenderWorkerEvent.Command.t) => {
  let commands: ref(list(RenderWorkerEvent.Command.t)) = ref([]);

  let passes = settings.samples;
  let divisions = settings.chunkDivisions;
  let width = settings.width / divisions;
  let height = settings.height / divisions;

  for (_ in 0 to passes) {
    for (divY in divisions - 1 downto 0) {
      for (divX in divisions - 1 downto 0) {
        let command: RenderWorkerEvent.Command.t =
          Render({
            config: {
              blur: settings.blur,
              depth: settings.depth,
            },
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