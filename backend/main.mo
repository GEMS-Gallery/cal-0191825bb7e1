import Text "mo:base/Text";

import Float "mo:base/Float";
import Array "mo:base/Array";
import Result "mo:base/Result";

actor Calculator {
  type Operation = {
    #add;
    #subtract;
    #multiply;
    #divide;
  };

  type CalculationResult = Result.Result<Float, Text>;

  public func calculate(x : Float, y : Float, op : Operation) : async CalculationResult {
    switch (op) {
      case (#add) { #ok(x + y) };
      case (#subtract) { #ok(x - y) };
      case (#multiply) { #ok(x * y) };
      case (#divide) {
        if (y == 0) {
          #err("Division by zero")
        } else {
          #ok(x / y)
        }
      };
    }
  };
}
