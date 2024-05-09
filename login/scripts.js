async function login(event) {
    event.preventDefault(); // Prevent form default submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const response = await fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            username: username,
            password: password
        })
    });

    const data = await response.json();

    if (data.status === 'success') {
        alert(data.message);
        window.location.href = 'home/HTML.html'; // Redirect on success
    } else {
        alert(data.message); // Show error message
    }
}
