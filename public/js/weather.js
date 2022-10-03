function searchToggle(obj, evt) {
    var container = $(obj).closest('.search-wrapper');

    if (!container.hasClass('active')) {
        container.addClass('active');
        evt.preventDefault();
    }
    else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
        container.removeClass('active');
        // clear input
        container.find('.search-input').val('');
        // clear and hide result container when we press close
        container.find('.result-container').fadeOut(100, function () { $(this).empty(); });
    }
}
function submitFn(obj, evt) {
    value = $(obj).find('.search-input').val().trim();

    _html = "Yup yup! Your search text sounds like this: ";
    if (!value.length) {
        _html = "Yup yup! Add some text friend :D";
    }
    else {
        _html += "<b>" + value + "</b>";
    }

    $(obj).find('.result-container').html('<span>' + _html + '</span>');
    $(obj).find('.result-container').fadeIn(100);

    evt.preventDefault();
}

const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const cityName_val = document.getElementById('cityName_val');
const temp_info = document.getElementById('temp_info');
const weather = document.getElementById('weather');
const feel_like = document.getElementById('feel_like');
const humidity = document.getElementById('humidity');
const humiID = document.getElementById('humiID');
const temp_degree = document.getElementById('temp_degree');
const deg = document.getElementById('feel_degree');
const hide = document.getElementsByClassName('hide');
$(`.menu-btn`).click(function(){
    $(`.navbar .menu`).toggleClass("active");
    $(`.menu-btn i`).toggleClass("active");
    
});
const info = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        cityName_val.innerHTML = ``;
        temp_info.innerHTML = '';
        weather.innerHTML = '';
        feel_like.innerHTML = '';
        humidity.innerHTML = '';
        humiID.innerHTML = '';
        feel_deg.innerHTML = '';
        hide.classList.add('hide')
    }

    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=cff3466435c71b013157e4bca60a7e93`;
            const response = await fetch(url);
            const data = await response.json();
            const arrayData = [data];
            console.log(arrayData);
            // temp_info.innerText = arrayData[0].main.temp;
            let temp_convert = arrayData[0].main.temp;
            let temp_cel = temp_convert - 273.15;
            let celcius_round = Math.round(temp_cel);
            //let deg = document.getElementById('degree').innerText;
            let degree_cel = deg.innerText;
            let temp_status = temp_degree.innerText ;
            //let temp_class = temp_status.addClass('my');
            temp_info.innerText = `${celcius_round}${temp_status}`;
            console.log(temp_convert);
            weather.innerText = arrayData[0].weather[0].main;
            feel_like.innerText = "Feels like";
            let feel_convert = arrayData[0].main.feels_like;
            let feel_cel = feel_convert - 273.15;
            let feel_round = Math.round(feel_cel);
            feel_deg.innerText = `${feel_round}${degree_cel}`;
            humidity.innerText = "Humidity";
            humi = arrayData[0].main.humidity;
            humiID.innerText = `${humi}%`;
            let city = arrayData[0].name;
            cityName_val.innerText = city;
            if(city.length==7){
                document.getElementById('cityName_val').style.left='-5.5%';
                document.getElementById('cityName_val').style.fontSize='80px';
            }
            else if(city.length>7 && city.length<=10){
                document.getElementById('cityName_val').style.left='-19%';
                document.getElementById('cityName_val').style.fontSize='80px';
            }
            else if(city.length>=5 && city.length<=6){
                document.getElementById('cityName_val').style.left='-2%';
            }
            else if(city.length>=3&& city.length<5){
                document.getElementById('cityName_val').style.left='2%';
            }
            else{
                document.getElementById('cityName_val').style.left='3%';
            }
        }
        catch {
            document.getElementById('error').innerHTML = "Please Enter the correct City Name";
        }
    }
    
}
submitBtn.addEventListener('click', info);