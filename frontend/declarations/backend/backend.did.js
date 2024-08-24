export const idlFactory = ({ IDL }) => {
  const Operation = IDL.Variant({
    'add' : IDL.Null,
    'multiply' : IDL.Null,
    'divide' : IDL.Null,
    'subtract' : IDL.Null,
  });
  const CalculationResult = IDL.Variant({
    'ok' : IDL.Float64,
    'err' : IDL.Text,
  });
  return IDL.Service({
    'calculate' : IDL.Func(
        [IDL.Float64, IDL.Float64, Operation],
        [CalculationResult],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
