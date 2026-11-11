// רשימת המתנה לכרטיסים שאזלו
// תקין = יש @ ויש נקודה אחריו
function isValidEmail(email) {
  const at = email.indexOf('@');
  return at !== -1 && email.indexOf('.', at + 1) !== -1;
}

// מחזירה מערך חדש; לא משנה את המערך שהתקבל
function joinWaitlist(list, email) {
  const clean = String(email == null ? '' : email).trim().toLowerCase();
  if (!isValidEmail(clean) || list.includes(clean)) return list.slice();
  return list.concat(clean);
}

module.exports = { joinWaitlist };
