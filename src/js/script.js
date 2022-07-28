const API_ENDPOINT = "https://c2tz4fxl5a.execute-api.us-west-2.amazonaws.com/email_campaign";
const API_PATH = "subscribe";

$(window).on("load", function() {
  $("form").get(0).reset()
});

$("#inputOther").on("input", function(event) {
    let target = $(event.target);
    let select = false;
    if (target.val() != "") {
        select = true;
    }
    $(event.target).parent().find(".form-check-input").prop("checked", select).change();
});

$(".form-check-input").change(function(event) {
    let target = $(event.target).parent();
    selectOption($(event.target).prop("checked"), target);
})

$("form").submit(function(event) {
    event.preventDefault();
    let name = $("#inputName").val();
    let email = $("#inputEmail").val();
    var whyParticipating = [];
    $("#check5").val($("#inputOther").val());
    let checkBoxesChecked = [$("#check1").val()];
    $.each($("input[name='why']:checked"), function(){
        whyParticipating.push($(this).val());
    });
    console.log({
      "name": name,
      "email_address": email
    });
    $('#subscribe-btn').prop("disabled",true);
    $('.loader').css("opacity", 1);
    $.ajax({
      url: API_ENDPOINT + "/" + API_PATH,
      method: "POST",
      data: '{"name": "' + name + '", "email_address": "' + email + '", "why_participating": "' + whyParticipating.join(', ') + '"}',
      dataType: "json",
    })
    .done(function (jqXHR) {
      window.location.href = "/success";
    })
    .fail(function (jqXHR) {
      $('#error-text').css("display", "block");
    })
    .always(function (jqXHR) {
      $('.loader').css("opacity", 0);
    });
});

function selectOption(select, target) {
    if (target.hasClass("option")) {
      if (!select) {
        target.removeClass("active");
        target.find(".glyphicon").removeClass("glyphicon-check");
        target.find(".glyphicon").addClass("glyphicon-unchecked");
      } else {
        target.addClass("active");
        target.find(".glyphicon").removeClass("glyphicon-unchecked");
        target.find(".glyphicon").addClass("glyphicon-check")
      }
    }
}
