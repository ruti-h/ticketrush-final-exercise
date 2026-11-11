const { joinWaitlist } = require('../js/waitlist');

test('adds a normalized email', function () { assertEq(joinWaitlist([], '  Dana@Mail.COM ')[0], 'dana@mail.com'); });
test('does not mutate the original list', function () {
  const list = ['a@b.co'];
  const out = joinWaitlist(list, 'c@d.co');
  assertEq(list.length, 1); assertEq(out.length, 2); assertEq(out === list, false);
});
test('rejects email without @', function () { assertEq(joinWaitlist([], 'dana.mail.com').length, 0); });
test('rejects email without a dot after @', function () { assertEq(joinWaitlist([], 'dana@mailcom').length, 0); });
test('ignores duplicates after normalizing', function () { assertEq(joinWaitlist(['dana@mail.com'], 'DANA@mail.com ').length, 1); });
