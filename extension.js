$(document).ready(function() {
  var current_url = window.location.href;

  if (current_url === 'http://service.rundstedt-transfer.de/firma_dtl_tab.php'){
    $('[name="save_now"]').on('click', function(event) {
      var selectors = ['[name="firma_name1"]', '[name="firma_telefon"]', '[name="firma_zielgruppe"]', '[name="firma_adrgruppe1"]', '[name="firma_branche"]']
      check_site(selectors);
    });
  } else if (current_url === 'http://service.rundstedt-transfer.de/job_edit.php') {

    $('select[name="region"]:nth-child(1) option:nth-child(1)').attr("selected","selected");
    $('select[name="stellenart"]:nth-child(1) option:nth-child(1)').attr("selected","selected");
    $('[name="firma"]').val("Rundstedt Transfer");

    $('[name="save_now"]').on('click', function(event) {
      var selectors = ['[name="arbeitsort"]', '[name="region"]', '[name="stellenart"]']
      check_site(selectors);
    });
  } else if (current_url.slice(0,-4) === 'http://service.rundstedt-transfer.de/knd2firma_list.php?fid='){
    url_redirect();
  } else if (current_url === "http://service.rundstedt-transfer.de/sub_people_finder.php") {
    if ($('select[name="p_zuordnung_intern"]').val() != "a"){
      $('select[name="p_zuordnung_intern"]:nth-child(1) option:nth-child(1)').attr("selected","selected");
      $('[name="btn_suche_starten"]').click();
    }
  }
});

function url_redirect() {
  $('.dataTableRowEven .dataTableContent:nth-child(1) a, .dataTableRowOdd .dataTableContent:nth-child(1) a').on('click', function(event){
    event.preventDefault()
    var id = event.currentTarget.href
    var pattern = /[0-9]{4}/g;
    var result = id.match(pattern);
    window.location.href = "http://service.rundstedt-transfer.de/sub_user_update_jobsuchender.php?tfrow=2&tatab=3&sid=&id=".concat(result)
  });
}


function check_site(fields) {
  for (i = 0; i < fields.length; i++) {
    if ($(fields[i]).val() === "") {
      event.preventDefault();
      alert('Nicht alle Felder wurden ausgefüllt!!')
      break
    }
  }
}


