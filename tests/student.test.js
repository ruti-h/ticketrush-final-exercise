const { calcTotal } = require('../js/pricing');

// חתימה סופית: calcTotal(qty, isMember, isStudent)
test('student discount: 2 tickets', function () { assertEq(calcTotal(2, false, true), 619); });
test('no discount for regular price', function () { assertEq(calcTotal(2, false, false), 724); });
test('member and student gets only the larger discount (20%)', function () { assertEq(calcTotal(2, true, true), 584); });
test('student discount never applies to the service fee', function () { assertEq(calcTotal(1, false, true), 309.5); });
