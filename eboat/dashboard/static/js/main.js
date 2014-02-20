//获取指定范围内的随机整数
function GetRandomInteger(start, end){
    return Math.round(Math.random()*(end - start)+start);
}

//获取任意长度的随机（字符和数字）串  
function GetRandomString(length)  
{  
    var rand="";  
    for(var i=0;i<length;i++){  
        if(i%2==0) {rand+=String.fromCharCode(Randomletter());}  
        else       {rand+=RandomNumber();}  
    }  
    return rand;  
}  

//获取65-90的随机数用于根据Ascall码表产生随机大写字母  
function Randomletter()  
{  
    var rand=Math.floor(Math.random()*25)+65;  
    return rand;  
}  

//获取0-9的随机数  
function RandomNumber()  
{  
    var rand=Math.floor(Math.random()*9);  
    return rand;  
}  





var boat_count = 20; //船的数量
var map_size = [15, 835, 0, 470]; //地图的活跃范围
var path_count = [9, 20]; //每支船的路径条数，在给定范围内的随机整数
var boat_name_length = 8; //船编号的长度

function createBoats(){
    var boats = [];
    for (var k=1; k<=boat_count; k++){
        var path = [];
        for (var i=0; i<GetRandomInteger(path_count[0], path_count[1]); i++){
            path.push([GetRandomInteger(map_size[0],map_size[1]), GetRandomInteger(map_size[2],map_size[3])]);
        }
        var boat = {id:k, name:GetRandomString(boat_name_length), follow:false, path:path};
        boats.push(boat);
    }
    return boats;
}


var map = $('#map');

function addboat(id, x, y){
    map.append("<div id='" + id +"' class='boat-icon'>");
    var boat = document.getElementById(id);
    boat.style.left = x + 'px';
    boat.style.top = y + 'px';
}


function removeboat(id){
    $("#"+id).remove();
}

function moveboat_by_path(id, path){
    var timerId, startTime, frameTime = 10, dur = 5 * 1000;

    var roadcount = 1;

    var start = path[roadcount-1];
    var end = path[roadcount];

    var lx = end[0] - start[0];
    var ly = end[1] - start[1];

    function animFun(time){
        var per = Math.min(1.0, (new Date - startTime) / dur);
        if(per >= 1) {
            if(roadcount < (path.length-1)){
                roadcount++;
                start = path[roadcount-1];
                end = path[roadcount];
                lx = end[0] - start[0];
                ly = end[1] - start[1];
                startTime = new Date;
            }else{
                clearTimeout(timerId);
            }
        }else{
            try{
                document.getElementById(id).style.left = Math.round(start[0] + lx * per) + "px";
                document.getElementById(id).style.top= Math.round(start[1] + ly * per) + "px";
            }catch(e){
                clearTimeout(timerId);
            }
        }
    }
    function move(){
        addboat(id, start[0], start[1]);
        startTime = new Date;
        timerId = setInterval(animFun, frameTime);
    }
    return move;
}



var MapModule = angular.module("MapModule", []);

MapModule.config(function($interpolateProvider){
    $interpolateProvider.startSymbol("{$");
    $interpolateProvider.endSymbol("$}");
});

MapModule.controller("BoatCtrl",
    function($scope) {

        $scope.boats = createBoats();

        $scope.followcount = function() {
            var count = 0;
            angular.forEach($scope.boats, function(boat) {
                count += boat.follow? 1 : 0;
            });
            return count;
        };

        $scope.moveboat = function(boat) {
            var id = boat.name + boat.id;
            if(boat.follow){
                var mb = moveboat_by_path(id, boat.path);
                mb();
            }else{
                removeboat(id);
            }
        };

        /*
        $scope.addTodo = function() {
        $scope.todos.push({text:$scope.todoText, done:false});
        $scope.todoText = '';
        };

        $scope.archive = function() {
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.done) $scope.todos.push(todo);
            });
        };
        */

    }// end of controller.function
);//end of controller

$(function(){
});//end of function


