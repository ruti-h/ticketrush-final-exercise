// מחירון TicketRush
const TICKET_PRICE = 350; // ₪ לכרטיס
const SERVICE_FEE = 12;   // ₪ עמלת שירות לכל כרטיס
const MAX_TICKETS = 8;    // מקסימום כרטיסים להזמנה
const MEMBER_DISCOUNT = 0.2;   // הנחת חברות מועדון על מחיר הכרטיס בלבד
const STUDENT_DISCOUNT = 0.15; // מבצע סטודנטיות: 15% על מחיר הכרטיס
const MEMBER_MAX_TICKETS = 6;  // מכסת כרטיסים לחברות מועדון

function maxTickets(isMember) {
  return isMember ? MEMBER_MAX_TICKETS : MAX_TICKETS;
}

// ההנחות לא מצטברות: מקבלים רק את הגדולה מביניהן
function ticketDiscount(isMember, isStudent) {
  return Math.max(isMember ? MEMBER_DISCOUNT : 0, isStudent ? STUDENT_DISCOUNT : 0);
}

function calcTotal(qty, isMember, isStudent) {
  if (!Number.isInteger(qty) || qty < 1 || qty > maxTickets(isMember)) return null;
  // ההנחה חלה על מחיר הכרטיס בלבד, לא על עמלת השירות
  const ticketPrice = Math.round(TICKET_PRICE * (1 - ticketDiscount(isMember, isStudent)) * 100) / 100;
  return qty * (ticketPrice + SERVICE_FEE);
}

if (typeof module !== 'undefined') {
  module.exports = {
    TICKET_PRICE, SERVICE_FEE, MAX_TICKETS, MEMBER_DISCOUNT, STUDENT_DISCOUNT, MEMBER_MAX_TICKETS,
    maxTickets, calcTotal
  };
}
