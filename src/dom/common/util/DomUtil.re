let debugger: unit => unit = [%bs.raw
  {|
    function() {
        debugger;
    }
|}
];