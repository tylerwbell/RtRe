let make =
    (settings: RenderSettings.t, camera: Camera.t)
    : list(RenderWorkerEvent.Command.t) => {
  let commands: ref(list(RenderWorkerEvent.Command.t)) = ref([]);

  for (_ in 0 to 100) {
    let command: RenderWorkerEvent.Command.t =
      Render({
        camera,
        slice: {
          x: 0,
          y: 0,
          width: settings.width,
          height: settings.height,
        },
      });
    commands := [command, ...commands^];
  };

  commands^;
};