let deleteBtn = document.querySelectorAll('.delete-album')

for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', (event) => {
        let btnValue = event.target.value
        fetch('/delete-album', {
            method: 'POST',
            body: JSON.stringify({
                albumDelete: btnValue
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((res) => res.text())
        .then((res) => {
            if(res == 'good') {
                window.location.reload(true)
            } else {
                alert('Result = ' + res)
            }
        })
    })
}
