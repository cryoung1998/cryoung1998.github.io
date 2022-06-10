var dt = new Date();
 function renderDate() {
    dt.setDate(1);
    var day = dt.getDay();
    var today = new Date();
    var endDate = new Date(dt.getFullYear(),dt.getMonth() + 1,0).getDate();
    var prevDate = new Date(dt.getFullYear(),dt.getMonth(),0).getDate();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    document.getElementById("month").innerHTML = months[dt.getMonth()]+" "+dt.getFullYear();
    var cells = "";

    var imageStartText ="<object onclick=\"openJournal('";
    var imageMidText = "')\" data=\"./resources/media/"+dt.getFullYear() +"/"+months[dt.getMonth()]+"/";
    var imageEndText = "/main.jpg\" type=\"image/jpeg\"></object>";

    for (x = day; x > 0; x--) {
    cells += "<li><span  class='prev_date'>" + (prevDate - x + 1) + "</span></li>";
    }

    console.log(day);
    for (i = 1; i <= endDate; i++) {
    if (i == today.getDate() && dt.getMonth() == today.getMonth()) cells += "<li class='today'>"+imageStartText + i + imageMidText + i+ imageEndText+"<span class='dayNumber'>"+i+"</span></li>";
    else cells += "<li>"+imageStartText + i +imageMidText + i + imageEndText+"<span class='dayNumber'>" + i + "</span></li>";
    }
    document.getElementsByClassName("days")[0].innerHTML = cells;
 }

 function moveDate(para) {
    if(para == "prev") {
        dt.setMonth(dt.getMonth() - 1);
    } else if(para == 'next') {
        dt.setMonth(dt.getMonth() + 1);
    }
    renderDate();
 }

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

 function closeJournal(){
    var iframeWrapper = document.getElementById('iframeWrapper');
    var iframe = document.getElementById('journalEntry')

    iframe.src = "";
    iframeWrapper.style.display = "none";
 }