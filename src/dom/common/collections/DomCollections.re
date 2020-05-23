module Uint8ClampedArray2d =
  Collection2dView.MakeInt(Uint8ClampedArray.RandomAccessCollection);

module Uint32Array2d =
  Collection2dView.MakeInt(Uint32Array.RandomAccessCollection);

module Uint8ColorArray2d =
  Collection2dView.MakeColor(
    (CollectionColorView.Make(Uint8ClampedArray.RandomAccessCollection)),
  );