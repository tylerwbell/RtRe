type element;

let getElementById: string => element = [%bs.raw
  {|function(arg) {
  return document.getElementById(arg)
 }|}
];