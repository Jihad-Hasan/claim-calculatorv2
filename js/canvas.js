var cvs = document.getElementById('signature-pad');
var ctx = cvs.getContext('2d');
var clearButton = document.getElementById('clear-button');
var saveButton = document.getElementById('save-button');
var signAlert = document.querySelector('.sign-alert');
var drawing = false;

cvs.addEventListener('mousedown', function (e) {
    drawing = true;
    var rect = cvs.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    hideAlert();
});

cvs.addEventListener('mousemove', function (e) {
    if (!drawing) return;
    var rect = cvs.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
});

cvs.addEventListener('mouseup', function () {
    drawing = false;
    ctx.beginPath();
});

cvs.addEventListener('touchstart', function (e) {
    drawing = true;
    var rect = cvs.getBoundingClientRect();
    var touch = e.touches[0];
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    hideAlert();
});

cvs.addEventListener('touchmove', function (e) {
    if (!drawing) return;
    e.preventDefault();
    var rect = cvs.getBoundingClientRect();
    var touch = e.touches[0];
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.stroke();
});

cvs.addEventListener('touchend', function () {
    drawing = false;
    ctx.beginPath();
});


clearButton.addEventListener('click', function () {
    ctx.clearRect(0, 0, cvs.width, cvs.height);

});

const Moneysliders = document.querySelectorAll('.money_slider');
Moneysliders.forEach(slider => {
    let tooltip;
    rangeSlider.create(slider, {
        onSlide: (val) => {
            tooltip.textContent = "£ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    });
    const handleEl = slider.rangeSlider.handle;

    tooltip = document.createElement('div')
    tooltip.classList.add('tooltip')
    handleEl.appendChild(tooltip)
    tooltip.textContent = "£ " + slider.rangeSlider.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

})

const Monthsliders = document.querySelectorAll('.month_slider');
Monthsliders.forEach(slider => {
    let tooltip;
    rangeSlider.create(slider, {
        onSlide: (val) => {
            tooltip.textContent = val + " Month";
        }
    });
    const handleEl = slider.rangeSlider.handle;

    tooltip = document.createElement('div')
    tooltip.classList.add('tooltip')
    handleEl.appendChild(tooltip)
    tooltip.textContent = slider.rangeSlider.value + " Month";
})