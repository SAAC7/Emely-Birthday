
window.addEventListener('scroll', () => {
    const headerSticky = document.getElementById('header-sticky');
    const headerContent = document.getElementById('header-content');
    if (window.scrollY > 0) {
        headerSticky.classList.remove('scrolled');
        headerContent.classList.add('scrolled');
    } else {
        headerSticky.classList.add('scrolled');
        headerContent.classList.remove('scrolled');
    }
});

const timer = (()=> {
    // Set the date we're counting down to
    var countDownDate = new Date("Dec 20, 2025 17:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("timer").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
})();