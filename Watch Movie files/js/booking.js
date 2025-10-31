// booking.js - seat selection
document.addEventListener('DOMContentLoaded', ()=>{
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('movieId') || '1';
  const time = params.get('time') || sessionStorage.getItem('mtb_selected') && JSON.parse(sessionStorage.getItem('mtb_selected')).time || '07:30 PM';
  if(document.getElementById('bookingMovie')){
    document.getElementById('bookingMovie').textContent='Movie ID: '+movieId;
    document.getElementById('bookingTime').textContent=time;
  }
  renderSeats();
  document.getElementById('confirmBtn') && document.getElementById('confirmBtn').addEventListener('click', submitBooking);
});
function renderSeats(){
  const container = document.getElementById('seatsContainer'); if(!container) return;
  container.innerHTML='';
  for(let r=0;r<6;r++){
    for(let c=0;c<8;c++){
      const seat = document.createElement('div'); seat.className='seat'; seat.textContent= String.fromCharCode(65+r)+(c+1);
      seat.onclick = ()=> seat.classList.toggle('selected');
      container.appendChild(seat);
    }
  }
}
function submitBooking(){
  const selected = Array.from(document.querySelectorAll('.seat.selected')).map(s=>s.textContent);
  if(selected.length===0){alert('Select at least one seat');return;}
  const booking = {id:Date.now(), seats:selected, movie:document.getElementById('bookingMovie').textContent, time:document.getElementById('bookingTime').textContent, total:selected.length*200};
  sessionStorage.setItem('mtb_booking', JSON.stringify(booking));
  window.location.href='payment.html';
}
