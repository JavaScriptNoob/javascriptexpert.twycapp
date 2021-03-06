var myApp = angular.module('myApp', ['firebase', 'ngRoute']);
myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "src/home.html",
            controller: 'mainController'
        })
        .when("/login", {
            templateUrl: "src/login.html",
            controller: "loginCtrl"
        });
});
var users_list = [];
var users_coords = {};
var users_names = {};
//var latlong = null;
//var geoArray = [];


for (var i = 0; i < 10; i++) {
    var bot_name = "bot_" + parseInt(i, 10);
    console.log(bot_name);

    //firebase.database().ref().child("accounts").push({
    //    userId: bot_name,
    //    name : "Test bot #" + parseInt(i, 10)
    //});

    firebase.database().ref().child(bot_name).set({
        latitidude: 56 + Math.random() * 1,
        longitude:  13 + Math.random() * 2
    });
}

function get_coords_by_uid(user_id){    
    console.log("trying to get coordinates for ", user_id);
 
    firebase.database().ref().child(user_id).on('value', function (snapshot) {
        console.log(snapshot.val());
        //latlong = snapshot.val();

        //console.log("Здесь мы должны получить geo" , latlong);
        //geoArray = Object.values(latlong);
        //console.log(geoArray)       
        users_coords[user_id] = snapshot.val();
    }, function(error){ 
        console.log("Error:" + error.code)
    });
};
	if(window.location.href.indexOf("login") > 0 ){
		function init() {
            console.log("User coordinates :", users_coords);
console.log(window.location.href);
			var myMap = new ymaps.Map("map", {
					center: [56.064188, 12.717836

                    ],
                    zoom: 6
                    
				}, {
					searchControlProvider: 'yandex#search'
				});
			var yellowCollection = new ymaps.GeoObjectCollection(null, {
					preset: 'islands#yellowIcon'
				});
				//blueCollection = new ymaps.GeoObjectCollection(null, {
				//	preset: 'islands#blueIcon'
                //}),   
            
               
                console.log("Placing coords on the map...", users_coords)

            for (var key in users_coords){
                console.log(key, users_coords[key]);
                var lon = users_coords[key]["longitude"];
                var lan = users_coords[key]["latitidude"];

                console.log("My Random Coords", lan, lon)

				yellowCollection.add(new ymaps.Placemark([lan, lon ],{
                    balloonContentBody: ['<div class="balloonStyle" >',
                    '<img src="http://www.bestfunnypic.com/data/girl/2018-09-07_swedish-girl.jpg" width="100px" height="100px" style="border-radius:50px;" >','</img>',
                        '<address>',
                        '<strong>' + users_names[key] + '</strong>',
                        '<br/>',
                        '</address>', '</div>'
                    ].join('')
                }, {
                    preset: 'islands#yellowIcon'
                }));
			}
		
		    myMap.geoObjects.add(yellowCollection);
            yellowCollection.events.add('click', function (e) {
              
                document.getElementById("boss-container").classList.remove('unvisible');
                document.getElementById("boss-container").classList.add('fade-in');
                document.getElementById("map").classList.remove("mapStatic");
                document.getElementById("map").classList.add('mapAnimation');
                myMap.container.fitToViewport(true);
            });
			// Через коллекции можно подписываться на события дочерних элементов.
			//yellowCollection.events.add('click', function () { alert('Кликнули по желтой метке') });
			//blueCollection.events.add('click', function () { alert('Кликнули по синей метке') });
		
			// Через коллекции можно задавать опции дочерним элементам.
			//blueCollection.options.set('preset', 'islands#blueDotIcon');
		}
    
setTimeout(function(e) {
    ymaps.ready(init);
}, 7000);
	
}
var subBut = document.getElementById('submit');
if (subBut) {
    subBut.addEventListener('click', function(){
        if (subBut)  {
         console.log(subBut.value());   
        } else {
            
        }
    })
}
 



console.log (window.location.href );


window.onload = function () {
    setTimeout(function(e) {
        console.log("Getting users coords from database")
        console.log("Users list :", users_list)
        for(var i = 0; i < users_list.length; i ++) {
            get_coords_by_uid(users_list[i]);
        }
    }, 3000);

    navigator.geolocation.getCurrentPosition(function (location) {
        var latitude = location.coords.latitude;
        var longitude = location.coords.longitude;
        console.log(latitude, longitude);
        window.localStorage.setItem('location', JSON.stringify({latitude: latitude, longitude: longitude}));
        
    })

 
    firebase.database().ref().child("accounts").orderByChild("userId").on("value", function(snapshot) {
        console.log("Sending requrest for user ids")
        snapshot.forEach(function(uid) {
            var current_uid = uid.val()['userId'];
            var current_name = uid.val()["name"];
            //var coords = get_coords_by_uid(current_uid);
            //console.log(current_uid, coords);
            console.log(current_uid);
            users_list.push(current_uid);
            users_names[current_uid] = current_name;
        });
            console.log("User list was obtained");
    });

}
function ValidateForm(){
        
    var nameID=document.MailingList.text;
    console.log(nameID);
     
    if ((nameID.value==null)||(nameID.value=="")){
        alert("Please Enter your Name");
        nameID.focus();
        return false;
    }
    return window.location.replace(window.location.href + "login")}
     var leto = document.getElementById('toHome');
     leto.addEventListener("click",  function () {
        document.getElementById("boss-container").classList.remove('fade-in');
        document.getElementById("boss-container").classList.add('unvisible');
     })
         
     
    
		