module Uint8ClampedArray2d =
  RandomAccessCollection2dView.MakeInt(
    Uint8ClampedArray.RandomAccessCollection,
  );

module Uint32Array2d =
  RandomAccessCollection2dView.MakeInt(Uint32Array.RandomAccessCollection);