const currentTab = 0;
showTab(currentTab);

function showTab(n) {
  // This function will display the specified tab of the form...
  let tab = document.getElementsByClassName('tab');
  tab[n].style.display = 'block';
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById('prevBtn').style.display = 'none';
  } else {
    document.getElementById('prevBtn').style.display = 'inline';
  }
  if (n == tab.length - 1) {
    document.getElementById('nextBtn').innerHTML = 'Submit';
  } else {
    document.querySelector('.nextBtn').innerHTML = 'Next Step';
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.querySelector('.tab');
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = 'none';
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementsByClassName('multistep').submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName('tab');
  y = x[currentTab].getElementsByTagName('input');
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == '') {
      // add an "invalid" class to the field:
      y[i].className += ' invalid';
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName('nav')[currentTab].className += ' finish';
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName('nav-num');
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.add(' active');
  }
  //... and adds the "active" class on the current step:
  x[n].className += ' active';
}
