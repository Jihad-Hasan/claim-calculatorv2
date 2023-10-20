var data = [{
    id: "1",
    fname: "Avro",
    lname: "Energy"
  },
  {
    id: "2",
    fname: "Better",
    lname: "Energy"
  },
  {
    id: "3",
    fname: "Boost",
    lname: "Power"
  },
  {
    id: "4",
    fname: "British",
    lname: "Gas"
  },
  {
    id: "5",
    fname: "Bulb",
    lname: "Energy"
  },
  {
    id: "6",
    fname: "Co-Operative",
    lname: "Energy"
  },
  {
    id: "7",
    fname: "E.",
    lname: "ON"
  },
  {
    id: "8",
    fname: "EDF",
    lname: "Energy"
  },
  {
    id: "9",
    fname: "Engie",
    lname: ""
  },
  {
    id: "10",
    fname: "Energy",
    lname: "Plus"
  },
  {
    id: "11",
    fname: "Enstroga",
    lname: ""
  },
  {
    id: "12",
    fname: "Entice",
    lname: "Energy"
  },
  {
    id: "13",
    fname: "ESB",
    lname: "Energy"
  },
  {
    id: "14",
    fname: "Extra",
    lname: "Energy"
  },
  {
    id: "15",
    fname: "Flow",
    lname: "Energy"
  },
  {
    id: "16",
    fname: "Foxglove",
    lname: "Energy"
  },
  {
    id: "17",
    fname: "Future",
    lname: "Energy"
  },
  {
    id: "18",
    fname: "Good",
    lname: "Energy"
  },
  {
    id: "20",
    fname: "Great North",
    lname: "Energy"
  },
  {
    id: "21",
    fname: "Green",
    lname: "Energy UK"
  },
  {
    id: "22",
    fname: "Green Network",
    lname: "Energy"
  },
  {
    id: "23",
    fname: "Igloo",
    lname: "Energy"
  },
  {
    id: "24",
    fname: "Lumo",
    lname: "Energy"
  },
  {
    id: "25",
    fname: "M&S",
    lname: "Energy"
  },
  {
    id: "26",
    fname: "Nabuh",
    lname: "Energy"
  },
  {
    id: "27",
    fname: "Npower",
    lname: ""
  },
  {
    id: "28",
    fname: "Octopus",
    lname: "Energy"
  },
  {
    id: "29",
    fname: "OVO",
    lname: "Energy"
  },
  {
    id: "30",
    fname: "People's",
    lname: "Energy"
  },
  {
    id: "31",
    fname: "Powershop",
    lname: "UK"
  },
  {
    id: "32",
    fname: "Pure",
    lname: "Planet"
  },
  {
    id: "33",
    fname: "Robin",
    lname: "Hood Energy"
  },
  {
    id: "34",
    fname: "Shell",
    lname: "Energy"
  },
  {
    id: "35",
    fname: "So",
    lname: "Energy"
  },
  {
    id: "36",
    fname: "SSE",
    lname: ""
  },
  {
    id: "37",
    fname: "Scottish",
    lname: "Power"
  },
  {
    id: "38",
    fname: "Tonik",
    lname: "Energy"
  },
  {
    id: "39",
    fname: "Utilita",
    lname: "Energy"
  },
  {
    id: "40",
    fname: "Utility",
    lname: "Point"
  },
  {
    id: "41",
    fname: "Utility",
    lname: "Warehouse"
  },
  {
    id: "42",
    fname: "Yorkshire",
    lname: "Energy"
  },
  {
    id: "43",
    fname: "Other",
    lname: ""
  },
];

$('#txt-search').keyup(function () {
  $('.next').prop('disabled', true);
  var searchField = $(this).val();
  if (searchField === '') {
    $('#filter-records').html('');
    return;
  }
  var regex = new RegExp(searchField, "i");
  var output = '';
  $.each(data, function (key, val) {
    var fullname = val.fname + ' ' + val.lname;
    if ((fullname.search(regex) != -1)) {
      output += '<li id="' + val.id + '" class="li-search">' + val.fname + ' ' + val.lname + '</li>';
    }
  });
  output += '<li class="li-search"> Other</li>';

  $('#filter-records').html(output);
});

$(document).on("click", ".li-search", function () {
  $("#txt-search").val($(this).html());
  setFormFields($(this).attr("id"));
  $("#filter-records").html("");
  $(".next").prop("disabled", false);
});

$(".radio-group .radio").on("click", function () {
  $(".selected .fa").removeClass("fa-check");
  $(".radio").removeClass("selected");
  $(this).addClass("selected");
  if ($("#suser").hasClass("selected") == true) {
    $(".next").prop("disabled", true);
    $(".searchfield").show();
  } else {
    setFormFields(false);
    $(".next").prop("disabled", false);
    $("#filter-records").html("");
    $(".searchfield").hide();
  }
});

var step = 1;

$(document).ready(function () {
  stepProgress(step);
});


$("input[name='utility']").on("change", function () {
  // Remove border and hide alert when a radio button is selected
  $('.error1').css("border", "1px solid");
  $('#alert1').css("display", "none");
});

$("input[name='form2']").on("change", function () {
  // Remove border and hide alert when a radio button is selected
  $('#alert2').css("display", "none");
  $('.error2').css("border", "1px solid")
});

$(".next").on("click", function () {
  setTimeout(function () {
    $(".banner-section").css("display","none")
  }, 2000)
  var nextstep = false;
  if (step == 2) {
    nextstep = checkForm("userinfo");
    if (!$("input[name='utility']:checked").val()) {
      $('#alert1').css("display", "block");
      $('.error1').css("border", "2px solid red")
      return;
    } else if (!$("input[name='form2']:checked").val()) {
      $('#alert2').css("display", "block");
      $('.error2').css("border", "2px solid red")
      return;
    }
  } else {

    nextstep = true;
  }
  //if (nextstep == true) {


  if (step == 3) {

    if (currentType == 'gas' && (gasValue > 0 && gasMonthvalue > 0)) {
      $('#alert3').css("display", "none");
      $("#overlay").show();
      $(".loader-container").show();
      setTimeout(function () {
        $("#overlay").hide();
        $(".loader-container").hide();

        if (step < $(".step").length) {
          updateSelectedValues(step);

          $(".step").show();
          $(".step")
            .not(":eq(" + step++ + ")")
            .hide();
          stepProgress(step);
        }
        hideButtons(step);
      }, 2000);

      setTimeout(function () {
        const start = () => {
          confetti.start()
        };

        //  Stop

        const stop = () => {
          setTimeout(function () {
            confetti.stop()
          }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
        };
        start();
        stop();

      }, 2000)
    } else if (currentType == 'electric' && (elecValue > 0 && elecMonthvalue > 0)) {
      $('#alert4').css("display", "none");

      $("#overlay").show();
      $(".loader-container").show();
      setTimeout(function () {
        $("#overlay").hide();
        $(".loader-container").hide();

        if (step < $(".step").length) {
          updateSelectedValues(step);

          $(".step").show();
          $(".step")
            .not(":eq(" + step++ + ")")
            .hide();
          stepProgress(step);
        }
        hideButtons(step);
      }, 2000);

      setTimeout(function () {
        const start = () => {
          confetti.start()
        };

        //  Stop

        const stop = () => {
          setTimeout(function () {
            confetti.stop()
          }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
        };
        start();
        stop();

      }, 2000)
    } else if (currentType == 'gas & electric' && (gasValue > 0 && gasMonthvalue > 0) && (elecValue > 0 && elecMonthvalue > 0)) {
      $('#alert3').css("display", "none");
      $('.gas-claim').hide();
      $("#overlay").show();
      $(".loader-container").show();
      setTimeout(function () {
        $("#overlay").hide();
        $(".loader-container").hide();

        if (step < $(".step").length) {
          updateSelectedValues(step);
          $(".step").show();
          $(".step")
            .not(":eq(" + step++ + ")")
            .hide();
          stepProgress(step);
        }
        hideButtons(step);
      }, 2000);

      setTimeout(function () {
        const start = () => {
          confetti.start()
        };

        //  Stop

        const stop = () => {
          setTimeout(function () {
            confetti.stop()
          }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
        };
        start();
        stop();

      }, 2000)
    } else {
      $('#alert3').css("display", "block");
      $('#alert4').css("display", "block");

    }
  } else {
    //$('#alert3').css("display","block");

    // $('#alert3').css("display","block");
    $("#overlay").show();
    $("#loader").show();
    setTimeout(function () {
      $("#overlay").hide();
      $("#loader").hide();

      if (step < $(".step").length) {
        updateSelectedValues(step);

        $(".step").show();
        $(".step")
          .not(":eq(" + step++ + ")")
          .hide();
        stepProgress(step);
      }
      hideButtons(step);
    }, 2000);


  }
  if (step === 4) {
    // Perform validation for step 4
    if (!validateStep4Form()) {
      return; // Stop here if validation fails
    }
  }

});



function validateStep4Form() {
  var title = $("#name_title").val();
  var firstName = $("#fname").val();
  var lastName = $("#lname").val();
  var company = $("#company").val();
  var jobTitle = $("#job_title").val();
  var isFormValid = true;

  if (!title) {
    $("#name_title").css("border", "2px solid red");
    isFormValid = false;
  }

  if (!firstName) {
    $("#fname").css("border", "2px solid red");
    $("#fname_alert").css("display", "block");
    isFormValid = false;
  }

  if (!lastName) {
    $("#lname").css("border", "2px solid red");
    $("#lname_alert").css("display", "block");
    isFormValid = false;
  }

  if (!company) {
    $("#company").css("border", "2px solid red");
    $("#company_alert").css("display", "block");
    isFormValid = false;
  }

  if (!jobTitle) {
    $("#job_title").css("border", "2px solid red");
    $("#job_alert").css("display", "block");
    isFormValid = false;
  }

  if (!isFormValid) {

  }
  return isFormValid;
}

$("#fname").on("click", function () {
  $(this).css("border", "");
  $("#fname_alert").css("display", "none");
});
$("#lname").on("click", function () {
  $(this).css("border", "");
  $("#lname_alert").css("display", "none");
});
$("#company").on("click", function () {
  $(this).css("border", "");
  $("#company_alert").css("display", "none");
});

$("#job_title").on("click", function () {
  $(this).css("border", "");
  $("#job_alert").css("display", "none");
});




function validateStep5Form() {
  var email = $("#email_input").val();
  var telephone = $("#telephone").val();
  var isFormValid = true;

  if (!email) {
    $("#email_input").css("border", "2px solid red");
    $("#email_alert").css("display", "block");
    isFormValid = false;
  }
  if (!telephone) {
    $("#telephone").css("border", "2px solid red");
    $("#telephone_alert").css("display", "block");

    isFormValid = false;
  }


  if (!isFormValid) {

  }
  return isFormValid;
}
$("#email_input").on("click", function () {
  $(this).css("border", "");
  $("#email_alert").css("display", "none");
});
$("#telephone").on("click", function () {
  $(this).css("border", "");
  $("#telephone_alert").css("display", "none");
});
$(".btn-uniqe2").on("click", function () {
  var nextstep = false;

  if (!validateStep4Form()) {
    //alert("Please fill in the required fields");
  } else {
    $("#form-alert").css("display", "none")

    nextstep = true;

  }

  if (nextstep == true) {

    if (step < $(".step").length) {
      updateSelectedValues(step);
      $(".step").show();
      $(".step")
        .not(":eq(" + step++ + ")")
        .hide();
      stepProgress(step);
    }
    hideButtons(step);
  }
});



$(".btn-uniqe3").on("click", function () {
  var nextstep = false;

  if (!validateStep5Form()) {
    // alert("Please fill in the required fields");
  } else {
    nextstep = true;
  }

  if (nextstep == true) {
    if (step < $(".step").length) {
      updateSelectedValues(step);
      $(".step").show();
      $(".step")
        .not(":eq(" + step++ + ")")
        .hide();
      stepProgress(step);
    }
    hideButtons(step);
  }
});

var signatureimg;

$(".submit").on("click", function () {
  var nextstep = false;
  if (isSignatureEmpty()) {
    showAlert();
  } else {
    hideAlert();
    var image = new Image();
    image.src = cvs.toDataURL('image/png');
    signatureimg = image.src
    nextstep = true;
  }

  if (nextstep == true) {
    if (step < $(".step").length) {
      updateSelectedValues(step);
      $(".step").show();
      $(".step")
        .not(":eq(" + step++ + ")")
        .hide();
      stepProgress(step);
    }
    hideButtons(step);
  }
});



$(".submit_o").on("click", function () {
  var nextstep = true;
  
  if (nextstep == true) {
    if (step < $(".step").length) {
      updateSelectedValues(step);
      $(".step").show();
      $(".step")
        .not(":eq(" + step++ + ")")
        .hide();
      stepProgress(step);
    }
    hideButtons(step);
  }
});

function showAlert() {
  signAlert.style.display = 'block';
  cvs.style.borderColor = 'red';
}

function hideAlert() {
  signAlert.style.display = 'none';
  cvs.style.borderColor = 'black';

}

function isSignatureEmpty() {
  var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
  for (var i = 0; i < imageData.length; i += 4) {
    if (imageData[i + 3] !== 0) {
      return false; // Signature is not empty
    }
  }
  return true; // Signature is empty
}

// ON CLICK BACK BUTTON
$(".back").on("click", function () {
  if (step > 1) {
    step -= 1;
    $(".step").hide();
    $(".step")
      .filter(":eq(" + (step - 1) + ")")
      .show();
    stepProgress(step);
    hideButtons(step);
  }
});

// CALCULATE PROGRESS BAR
stepProgress = function (currstep) {
  var percent = parseFloat(100 / $(".step").length) * currstep;
  percent = percent.toFixed();
  $(".progress-bar")
    .css("width", percent + "%")
  //.html(percent + "%");
};

// DISPLAY AND HIDE "NEXT", "BACK" AND "SUMBIT" BUTTONS
hideButtons = function (step) {
  var limit = parseInt($(".step").length);
  $(".action").hide();
  $("#none").hide();

  if (step < limit - 1) {
    $(".next").show();

  }
  if (step > 1) {
    $(".back").show();
  }
  if (step == limit) {
    $(".back").hide();
  }
  if (step == 3) {
    $(".btn-uniqe").hide();
  }
  if (step == 4) {
    $(".btn-uniqe").hide();
    $(".btn-uniqe2").show();
  }
  if (step == 5) {
    $(".btn-uniqe").hide();
    $(".btn-uniqe3").show();
  }
  if (step == 3 && currentType == 'gas & electric') {
    $('.gas-claim').hide();
  }
  if (step == (limit - 1)) {
    $(".next").hide();
    $(".submit").show();
    $(".submit_o").show();

  }
};

function setFormFields(id) {

  if (id != false) {
    //FILL STEP 2 FORM FIELDS
    d = data.find(x => x.id === id);

  } else {
    // EMPTY USER SEARCH INPUT
    $("#txt-search").val('');
    //  EMPTY STEP 2 FORM FIELDS

  }
}

function checkForm(val) {
  // CHECK IF ALL "REQUIRED" FIELD ALL FILLED IN
  var valid = true;
  $("#" + val + " input:required").each(function () {
    if ($(this).val() === "") {
      $(this).addClass("is-invalid");
      valid = false;
    } else {
      $(this).removeClass("is-invalid");
    }
  });
  return valid;
}
var gasValue = 0;
var elecValue = 0;
var elecMonthvalue = 0;
var gasMonthvalue = 0;

var currentType = ''

var totalPrice1 = 0;
var totalPrice2 = 0;

$('#customRange1').on('input', function () {
  $('#gasValue').text("£ " + $(this).val().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $('#alert3').css("display", "none");
  gasValue = parseInt($(this).val());
  updatePriceOne();
  updateBothprice()

});


$('#customRange2').on('input', function () {
  $('#alert3').css("display", "none");
  $('#gasContractValue').text($(this).val() + " Months");
  gasMonthvalue = parseInt($(this).val());
  updatePriceOne();
  updateBothprice()

});

$('#customRange3').on('input', function () {
  $('#alert4').css("display", "none");

  $('#eleValue').text("£ " + $(this).val().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

  elecValue = parseInt($(this).val());
  updateEPriceOne();
  updateBothprice()

});

$('#customRange4').on('input', function () {
  $('#alert4').css("display", "none");

  $('#electricContractValue').text($(this).val() + " Months");
  elecMonthvalue = parseInt($(this).val());
  updateEPriceOne();
  updateBothprice()
});

$('input[type="radio"]').change(function () {
  if ($(this).val() === 'gas') {
    currentType = 'gas';
    $('.gas-claim').show();
    $('.condition1').show();
    $('.condition2').hide();
    $('.bothprice').hide();
    $('.indivisul_price').show();
    $('.priceEOne').hide();
    $('.priceone').show();

  } else if ($(this).val() === 'electric') {
    currentType = 'electric';

    $('.condition1').hide();
    $('.condition2').show();
    $('.bothprice').hide();
    $('.indivisul_price').show();

    $('.priceone').hide();
    $('.priceEOne').show();

  } else if ($(this).val() === 'gas & electric') {
    currentType = 'gas & electric';

    $('.condition1').show();
    $('.condition2').show();
    $('.indivisul_price').hide();
    $('.bothprice').show();
  }

});

function updatePriceOne() {
  totalPrice1 = ((gasValue * gasMonthvalue) * 0.22);
  $(".priceone").text("£ " + parseInt(totalPrice1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  updateBothprice();
}

function updateEPriceOne() {
  totalPrice2 = ((elecValue * elecMonthvalue) * 0.22);
  $(".priceEOne").text("£ " + parseInt(totalPrice2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  updateBothprice();
}

function updateBothprice() {
  $(".bothprice1").text("£ " + (parseInt(totalPrice1 + totalPrice2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")));
}

// Function to get URL parameters by name
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Retrieve the values of the desired URL parameters

// Use the retrieved parameter values as needed
// console.log('UTM Source:', utmSource);
// console.log('UTM Medium:', utmMedium);
// console.log('UTM Campaign:', utmCampaign);
// console.log('UTM Term:', utmTerm);
// console.log('UTM Content:', utmContent);
// console.log('UTM Refcode:', refCode);


// Object to hold all the data
const formData = {
  energySupplier: '',
  selectedUtility: '',
  commissionsAddedToCost: '',
  selectedgasValue: '',
  selectedelecValue: '',
  selectedelecMonthvalue: '',
  selectedgasMonthvalue: '',
  gasClaimCalculated: '',
  electricClaimCalculated: '',
  gasandelectriClaimCalculated: '',
  nameTitle: '',
  firstName: '',
  lastName: '',
  companyName: '',
  jobTitle: '',
  email: '',
  phoneNumber: '',
  signatureImage: '',
  utmSource: '',
  utmMedium: '',
  utmCampaignn: '',
  utmTerm: '',
  utmContent: '',
  refCode: '',
};

function sendToWebhook(data) {

  fetch('https://hooks.zapier.com/hooks/catch/16443623/3r7g2j3/', {
      method: 'POST',
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log('Request sent. Status:', response.status);
    })
    .catch(error => {
      console.error('Error:', error);
    });

}

function updateSelectedValues(step) {
  switch (step) {
    case 1:
      formData.energySupplier = $("#txt-search").val();
      formData.utmSource = getParameterByName('utm_source');
      formData.utmMedium = getParameterByName('utm_medium');
      formData.utmCampaign = getParameterByName('utm_campaign');
      formData.utmTerm = getParameterByName('utm_term');
      formData.utmContent = getParameterByName('utm_content');
      formData.refCode = getParameterByName('ref_code');
      break;
    case 2:
      formData.selectedUtility = $("input[name='utility']:checked").val();
      formData.commissionsAddedToCost = $("input[name='form2']:checked").val();
      break;
    case 3:
      formData.selectedgasValue = gasValue;
      formData.selectedelecValue = elecValue;
      formData.selectedelecMonthvalue = elecMonthvalue;
      formData.selectedgasMonthvalue = gasMonthvalue;
      break;
    case 4:
      if (currentType == 'gas' && (gasValue > 0 && gasMonthvalue > 0)) {
        formData.gasClaimCalculated = parseInt(totalPrice1);
      } else if (currentType == 'electric' && (elecValue > 0 && elecMonthvalue > 0)) {
        formData.electricClaimCalculated = parseInt(totalPrice2);
      } else if (currentType == 'gas & electric' && (gasValue > 0 && gasMonthvalue > 0) && (elecValue > 0 && elecMonthvalue > 0)) {
        formData.gasandelectriClaimCalculated = parseInt(totalPrice1 + totalPrice2);
      };
      formData.nameTitle = $("#name_title").val();
      formData.firstName = $("#fname").val();
      formData.lastName = $("#lname").val();
      formData.companyName = $("#company").val();
      formData.jobTitle = $("#job_title").val();

      break;
    case 5:

      formData.email = $("#email_input").val();
      formData.phoneNumber = $("#telephone").val();
      break;
    case 6:
      formData.signatureImage = signatureimg;
      break;
    default:
      break;
  }

  if (step === 6) {
    sendToWebhook(formData);
  }
}