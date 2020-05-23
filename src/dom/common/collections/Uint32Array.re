module ArrayBuffer = Js.Typed_array.ArrayBuffer;
module S = Js.Typed_array.Uint32Array;

module RandomAccessCollection = {
  type t = S.t;

  [@bs.get] external length: t => int = "length";
  [@bs.get] external buffer: t => ArrayBuffer.t = "buffer";

  let get = (t: t, index: int): int => {
    S.unsafe_get(t, index);
  };

  let set = (t: t, index: int, value: int) => {
    S.unsafe_set(t, index, value);
  };

  let fill = (t: t, value: int): unit => {
    let _ = S.fillInPlace(value, t);
    ();
  };

  let make = (size: int, defaultValue: int): t => {
    let array = S.fromBuffer(ArrayBuffer.make(4 * size));
    fill(array, defaultValue);
    array;
  };
};