let bigDiv = document.getElementsByTagName("div")[0];
let item = new Array(4);
let innerBoxes = new Array(3);

for(let i = 0;i < 4;i ++){
    (function(e) {
        let countryName = document.createElement("h2");
        let continentName = document.createElement("p");
        let citiesTitle = document.createElement("h3");
        let photosTitle = document.createElement("h3");
        let city = document.createElement("ul");
        let button = document.createElement("button");

        countryName.className = "h2";
        continentName.className = "p";
        citiesTitle.className = "h3";
        photosTitle.className = "h3";
        city.className = "ul";
        button.className = "button";

    item[i] = document.createElement("div");
    item[i].className = "item";

    let nodeCountry = document.createTextNode(countries[i]["name"]);
    let nodeContinent = document.createTextNode(countries[i]["continent"]);
    countryName.appendChild(nodeCountry);
    continentName.appendChild(nodeContinent);
    item[i].appendChild(countryName);
    item[i].appendChild(continentName);

    for(let j = 0;j < 2;j ++){
        (function(e) {
        innerBoxes[j] = document.createElement("div");
        innerBoxes[j].className = "inner-box";

        //cities框
        if(j === 0){
            let ndCitiesTitle = document.createTextNode("Cities");
            citiesTitle.appendChild(ndCitiesTitle);

            let cities = new Array(countries[i]["cities"].length);
            for(let k = 0;k < countries[i]["cities"].length;k ++){
                cities[k] = document.createElement("li");
                let ndCities = document.createTextNode(countries[i]["cities"][k]);
                cities[k].appendChild(ndCities);
                city.appendChild(cities[k]);
            }

            innerBoxes[j].appendChild(citiesTitle);
            innerBoxes[j].appendChild(city);
        }
        //photos框
        if(j === 1){
            let ndPhotoTitle = document.createTextNode("Popular Photos");
            photosTitle.appendChild(ndPhotoTitle);

            let photos = new Array(countries[i]["photos"].length);
            for(let k = 0;k < countries[i]["photos"].length;k ++){
                photos[k] = document.createElement("img");
                photos[k].className = "photo";
                photos[k].src = "images/" + countries[i]["photos"][k];
                innerBoxes[j].appendChild(photos[k]);
            }
        }

        item[i].appendChild(innerBoxes[j]);
    })(j);
    }
//按钮
    let nodeButton = document.createTextNode("visit");
    button.appendChild(nodeButton);
    item[i].appendChild(button);

    bigDiv.appendChild(item[i]);
    })(i);
}