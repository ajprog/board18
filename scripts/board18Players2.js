/*
 * The board18Players2 script contains the Email functions and
 * the registerMainMenu function for the board18Players page.
 * 
 * Copyright (c) 2015 Richard E. Price under the The MIT License.
 * A copy of this license can be found in the LICENSE.text file.
 *
 * All BD18 global variables are contained in one 'master variable'
 * called BD18.  This isolates them from all other global variables. 
 */

/* 
 * Function emailPlayerResult is the call back function for the
 * ajax calls to emailPlayer.php and emailPlayerAll.php. It may
 * have to process returns from multiple emails for the same call.
 * It only needs to check for errors and it only needs to report 
 * the first error. 
 *  
 * Output from emailPlayer.php and emailPlayerAll.php
 * is an echo return status:
 *   "success" - Email sent.
 *   "fail"    - Uexpected error - This email not sent.
 */
function emailPlayerResult(response) {
  if (response === 'fail') {
    if (BD18.mailError === false) {
      var errmsg = 'Send email to player failed.\n';
      errmsg += 'Please contact the BOARD18 webmaster.';
      alert(errmsg);
      BD18.mailError = true;
    }
  }
  else if (response !== 'success') {
    // Something is definitly wrong in the code.
    var nerrmsg = 'Invalid return code from emailPlayer.php.\n';
    nerrmsg += response + '\nPlease contact the BOARD18 webmaster.';
    alert(nerrmsg);
  }
}

/* 
 * Function doEmail is called by the on-click method
 * of the send email button in the oneemail form. 
 * It checks the input for missing fields and then
 * does an ajax call to emailPlayer.php. 
 */
function doEmail() {
  $('.error').hide();
  var subject = $("#subject1").val();     
  var body = $("#body1").val();
  if (subject === "") {
    $("#subject1_error").text('This field is required.').show();
    $("#subject1").focus();
    return false;
  }
  BD18.mailError = false;
  var cString = 'login=' + BD18.player.login + '&subject=' + subject;
  cString += '&body=' + body;
  $.post("php/emailPlayer.php", cString, emailPlayerResult);
  $('#lognote').html('Email is being sent.');
  var to1 = window.setTimeout(function(){ $('#lognote').html('  ');}, 5000);
  $("#subject1").val('');
  $("#body1").val('');
}

function sendBroadcast() {
  
};

function registerMainMenu() {
  $.contextMenu({
    selector: "#newmainmenu", 
    trigger: "left",
    className: "bigMenu",
    items: {
      broadcast: {
        name: "Send Broadcast",
        callback: function(){
          sendBroadcast();
        }
      },
      goback: {
        name: "Return To Admin",
        callback: function(){
          window.location = "board18Admin.php";
        }
      },
      mainpage: {
        name: "Goto Main Page",
        callback: function(){
          window.location = "board18Main.php";
        }
      },
      logout: {
        name: "Log Out",
        callback: function(){
          $.post("php/logout.php", logoutOK);
        }
      },
      help: {
        name: "Help",
        callback: function(){
          window.open(BD18.help, "HelpGuide");
        }
      },
      close: {
        name: "Close Menu",
        callback: function(){}
      }
    },
    zIndex: 10,
    position: function(opt, x, y) {
      opt.$menu.position({
        my: 'left top',
        at: 'left bottom',
        of: opt.$trigger
      });
    },
    callback: function(key, options) {
      var m = "clicked on " + key + " on element ";
      m =  m + options.$trigger.attr("id");
      alert(m); 
    }
  });
}