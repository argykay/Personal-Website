var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  // Current index of word
  var i = this.loopNum % this.toRotate.length;
  // Full text of current word
  var fullTxt = this.toRotate[i];

  // Check if deleting
  if (this.isDeleting) {
    // Remove character
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add character
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert element into html span (this span into index.html span)
  this.el.innerHTML = '<span class="wraping">' + this.txt + "</span>";

  var that = this;
  // Type speed
  var delta = 200 - Math.random() * 100;

  // In deletion, make the speed twice fast
  if (this.isDeleting) {
    delta /= 2;
  }

  // If the word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make a pause at the end
    delta = this.period;
    // Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    // When deletion is complete, set it back to false
    this.isDeleting = false;
    // Move to the next word
    this.loopNum++;
    // Pause before it starts typing again
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
};
