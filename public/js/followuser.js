const follow_btn = document.querySelector(".follow-user")
const unfollow_btn = document.querySelector(".unfollow-user")

follow_btn.addEventListener('click', follow);
unfollow_btn.addEventListener('click', unfollow);

function follow(){
  const userid = follow_btn.value
  fetch(`/users/follow/${userid}`, {
    method : 'POST'
  })
  .then(data => console.log(data))
  .catch(err => console.log(err))
}

function unfollow(){
  const userid = unfollow_btn.value
  fetch(`/users/unfollow/${userid}`, {
    method : 'POST'
  })
  .then(data => console.log(data))
  .catch(err => console.log(err))
}
