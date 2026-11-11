const { calcTotal, maxTickets } = require('../js/pricing');

test('two tickets cost 724', function () { assertEq(calcTotal(2), 724); });
test('one ticket costs 362', function () { assertEq(calcTotal(1), 362); });
test('regular customers may buy up to 8', function () { assertEq(maxTickets(), 8); });

test('members get 20% off the ticket price, not the fee', function () { assertEq(calcTotal(2, true), 584); });
test('members may buy up to 6', function () { assertEq(maxTickets(true), 6); });
test('member above quota (7) is rejected', function () { assertEq(calcTotal(7, true), null); });
test('member may buy 6 tickets', function () { assertEq(calcTotal(6, true), 6 * 292); });
test('zero tickets is rejected', function () { assertEq(calcTotal(0, false), null); });
test('regular customer above 8 is rejected', function () { assertEq(calcTotal(9, false), null); });
test('regular customer without isMember pays full price', function () { assertEq(calcTotal(8), 8 * 362); });
