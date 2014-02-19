
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

function moveboat(id, start, end){
    var timerId, startTime, frameTime = 10, dur = 5 * 1000;
    var lx = end[0] - start[0];
    var ly = end[1] - start[1];
    function animFun(time){
        var per = Math.min(1.0, (new Date - startTime) / dur);
        if(per >= 1) {
            clearTimeout(timerId);
        }else{
            document.getElementById(id).style.left = Math.round(start[0] + lx * per) + "px";
            document.getElementById(id).style.top= Math.round(start[1] + ly * per) + "px";
        }
    }
    function move(){
        addboat(id, start[0], start[1]);
        startTime = new Date;
        timerId = setInterval(animFun, frameTime);
    }
    return move;
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
            document.getElementById(id).style.left = Math.round(start[0] + lx * per) + "px";
            document.getElementById(id).style.top= Math.round(start[1] + ly * per) + "px";
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

        $scope.boats = [
            {id:1, name:'aa', follow:false, path:[[300,120],[23,23],[343,35],[346,67]]},
            {id:2, name:'bb', follow:false, path:[[100,120],[23,23],[343,35],[346,67]]},
            {id:3, name:'cc', follow:false, path:[[300,120],[23,23],[343,35],[346,67]]},
            {id:4, name:'dd', follow:false, path:[[100,120],[23,23],[343,35],[346,67]]},
            {id:5, name:'ee', follow:false, path:[[300,120],[23,23],[343,35],[346,67]]},
            {id:6, name:'fw', follow:false, path:[[100,120],[23,23],[343,35],[346,67]]},
            {id:7, name:'gw', follow:false, path:[[100,120],[23,23],[343,35],[346,67]]},
            {id:8, name:'hl', follow:false, path:[[100,120],[23,23],[343,35],[346,67]]},
            {id:9, name:'jl', follow:false, path:[[100,120],[23,23],[343,35],[346,67]]},
            {id:10, name:'il', follow:false, path:[[100,120],[23,23],[343,35],[346,67]]},
            {id:11, name:'kl', follow:false, path:[[23,23],[343,35],[0,0],[346,67]]},
            {id:12, name:'le', follow:false, path:[[23,23],[343,35],[0,0],[346,67]]},
            {id:13, name:'me', follow:false, path:[[23,23],[343,35],[0,0],[346,67]]},
            {id:14, name:'nw', follow:false, path:[[23,23],[343,35],[0,0],[346,67]]},
            {id:15, name:'oe', follow:false, path:[[23,23],[343,35],[0,0],[346,67]]},
            {id:16, name:'pp', follow:false, path:[[23,23],[343,35],[0,0],[346,67]]},
            {id:17, name:'qq', follow:false, path:[[23,23],[343,35],[0,0],[346,67]]},
            {id:18, name:'rr', follow:false, path:[[23,23],[343,35],[0,0],[346,67]]},
            {id:19, name:'ss', follow:false, path:[[23,23],[343,35],[0,0],[346,67]]}
        ];

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
    $(document).ready(function(){

        $('#boatTable').dataTable();
        /*
        $('#boatTable').dataTable({
            "bInfo": false,
            "aoColumnDefs": [{'bSortable': false, 'aTargets': [-1]}, { "bSearchable": false, "aTargets": [-1]}]
        });
        */

    });//end of angular.element.ready
});//end of function


