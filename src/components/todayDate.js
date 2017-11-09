// returns today date in yyyy-mm-dd format
// used in userForm to verify Date of Birth

function todayDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();
  if(dd<10){
    dd='0'+dd
  }
  if(mm<10){
    mm='0'+mm
  }

  today = yyyy+'-'+mm+'-'+dd;
  return today;
}

export default todayDate;
