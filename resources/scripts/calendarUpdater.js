//Define global variables (dateData is from other script)
import dataFile from './dateInformation'
var dt = new Date();

//function that will create all the date tags
 function renderDate() {
    dt.setDate(1);
    var day = dt.getDay();
    var today = new Date();
    var endDate = new Date(dt.getFullYear(),dt.getMonth() + 1,0).getDate();
    var prevDate = new Date(dt.getFullYear(),dt.getMonth(),0).getDate();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    document.getElementById("month").innerHTML = months[dt.getMonth()]+" "+dt.getFullYear();
    var cells = "";

   //Filter object for current month
   var monthDates = '';
   var monthDatesArray = [];
    if (dataFile[dt.getFullYear()][months[dt.getMonth()]]!== undefined){
      monthDates = dataFile[dt.getFullYear()][months[dt.getMonth()]];
      console.log(monthDates);
      monthDatesArray = Object.keys(monthDates);
   }
   else{
         monthDates = 'None';
   }
  
   //Define object tag missing src data
    var imageStartText ="<img onmousedown='openJournal(";
    var imageMidText = ")' src='";
    var imageEndText = "'>";

    //Create previous date tags
    for (x = day; x > 0; x--) {
    cells += "<li><span  class='prev_date'>" + (prevDate - x + 1) + "</span></li>";
    }

    //Loop over days and add images if they are included in the file
    for (i = 1; i <= endDate; i++) {
    if (i == today.getDate() && dt.getMonth() == today.getMonth()) cells += "<li class='today'>";
    else cells += "<li>";
    if (monthDatesArray.includes(i.toString())){

      cells+=imageStartText + i + imageMidText + monthDates[i] + imageEndText
    }
    cells+="<span class='dayNumber'>" + i + "</span></li>";
    }
    document.getElementsByClassName("days")[0].innerHTML = cells;
 }

 //Changes date based on push buttons
 function moveDate(para) {
    if(para == "prev") {
        dt.setMonth(dt.getMonth() - 1);
    } else if(para == 'next') {
        dt.setMonth(dt.getMonth() + 1);
    }
    renderDate();
 }

 //Opens iframe with corresponding html journal entry file
 function openJournal(day){
    var htmlString = "./webpages/";
    var currentMonth = dt.getMonth()+1;
    var iframeWrapper = document.getElementById('iframeWrapper');
    var iframe = document.getElementById('journalEntry')

    if (currentMonth < 10) htmlString+="0"+currentMonth;
    else htmlString += currentMonth;

    if (day < 10) htmlString += "_0" + day;
    else htmlString += "_" + day;

    htmlString += "_" + dt.getFullYear() + ".html";

    iframe.src = htmlString;
    iframeWrapper.style.display = "block";
 }

 //Hides iframe
 function closeJournal(){
    var iframeWrapper = document.getElementById('iframeWrapper');
    var iframe = document.getElementById('journalEntry')

    iframe.src = "";
    iframeWrapper.style.display = "none";
 }