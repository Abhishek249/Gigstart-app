// Code goes here
(function() {

    var app = angular.module("myapp", ["firebase"]);

    app.controller("maincontroller", function($scope, $firebase, $firebaseObject, $firebaseArray) {
      var ref = new Firebase("https://gigstart.firebaseio.com/artists");
  
      $scope.p1=5;
      $scope.p2=5;
      $scope.p3=5;
      $scope.p4=5;
      console.log("this is initial p1: "+ $scope.p1);
      
      $scope.mainArray = [];
      ref.orderByChild("--rating").on("child_added", function(snapshot)
      {

      //collect artist data as array in local var mainArray so that it is accesible in front end
       $scope.mainArray=new $firebaseArray(ref);
       
       
       //artist rating div visibility toggle
       $scope.expand=function(artist)
       {
          artist.showFull = !artist.showFull;
          for (var i = 0; i < $scope.mainArray.length; i++)
          {
              var currentArtist = $scope.mainArray[i];
              if (currentArtist != artist)
              {
                  currentArtist.showFull = false;
              } 
          } 
         
       }
       
      });
      
      var avg=0;
      
    $scope.submit=function(person)
    {   
        var artist_uri=person.name;
        artist_uri=encodeURIComponent(artist_uri.trim());
        //console.log("artist uri is: ",artist_uri);
        var localref="https://gigstart.firebaseio.com/artists/"+artist_uri;
        //console.log("localref is: ",localref);
       // console.log("person is: ",person);
        //console.log("Singer ID is: ",person.name," its type is: ",typeof(person.name));
        //console.log(person.p1+" "+person.p2+" "+person.p3+" "+person.p4+" ");
        if(typeof person=='undefined')
        {
          
        }
        else
        {
         $scope.p1=(typeof person.p1!='undefined')?parseInt(person.p1):$scope.p1 ;
         $scope.p2=(typeof person.p2!='undefined')?parseInt(person.p2):$scope.p2 ;
         $scope.p3=(typeof person.p3!='undefined')?parseInt(person.p3):$scope.p3 ;
         $scope.p4=(typeof person.p4!='undefined')?parseInt(person.p4):$scope.p4 ;
        }
      
        var prev_fan_count=person.fan_count;
        var prev_rating=person.rating;
        var new_fan_count=prev_fan_count+1;
        avg=($scope.p1+$scope.p2+$scope.p3+$scope.p4)/4;
        var new_rating=(((prev_fan_count*prev_rating)+avg)/new_fan_count).toFixed(2);
        
        console.log("new rating: ",new_rating);
        //update artist details
        //create ref. to firebase on localref
        var update_ref=new Firebase(localref);
        update_ref.update({fan_count:new_fan_count,rating:new_rating});
        
        
      
    };

    
      
    }); //end of controller




  } //end of closure function body
)(); //termination of closure     */
   

 