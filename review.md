> **תקציר:** לא למזג עדיין. הבדיקות נכשלות (3 עברו, 4 נכשלו). `calcRefund` מחזירה 90% גם מעמלת השירות, למרות שלפי המדיניות (וההערה בקוד) העמלה לא מוחזרת – יוצא החזר עודף של 10.8 ₪ לכרטיס. התיקון: `qty * TICKET_PRICE * REFUND_RATE`. בנוסף הענף מבוסס על `main` ישן (באג ₪0.00 שכבר תוקן).

# Code review: `noa/refund`

**Verdict: changes requested – do not merge yet.**

## How I checked
- Opened the branch in a separate worktree and ran `node tests/run.js`.
- Result: **3 passed, 4 failed** – it does *not* work as-is.

## Finding 1 (blocker): the service fee is refunded
`js/refund.js`, `calcRefund`:

```js
return qty * (TICKET_PRICE + SERVICE_FEE) * REFUND_RATE;
```

The comment above it (and the refund policy) says the customer gets back 90% of the
**ticket price** and the service fee is **not** refunded. The code applies 90% to
ticket + fee, so we over-refund 10.8 ₪ per ticket.

- `calcRefund(1)` → expected **315**, got **325.8**
- `calcRefund(2)` → expected **630**, got **651.6**

Your own tests in `tests/refund.test.js` are correct and catch this.

**Suggested fix:**

```js
return qty * TICKET_PRICE * REFUND_RATE;
```

(`SERVICE_FEE` then no longer needs to be imported.)

## Finding 2 (not your bug): branch is based on an old `main`
The two `format.test.js` failures (`₪0.00`) come from the price-format bug that has
since been reverted on `main`. Please merge/rebase your branch on the current `main`
before merging so the whole suite is green.

## Smaller notes
- Consider validating `qty` (e.g. return `null` for qty < 1), consistent with `calcTotal`.
- Commit messages are clear – thanks.

Happy to re-review once the fix is in.
