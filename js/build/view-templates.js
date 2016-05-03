this["JST"] = this["JST"] || {};

this["JST"]["templates/checkin.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<div class="container">\n    <h2 class="widget-title text-center">Check In Here</h2>\n    <div class="row">\n        <div class="col-md-8 col-md-offset-2">\n            <div class="fetchFromFoursquare">\n                <p class="text-center">In this location, on this day, you did some awesome stuff...</p>\n                <p><button type="button" id="BeginCheckin" class="btn btn-block btn-lg">' +
((__t = ( data.search_label )) == null ? '' : __t) +
'</button></p>\n                <div class="text-center">\n                    <i class="loading-indicator fa fa-spinner fa-pulse fa-spin"></i>\n                </div>\n                <div class="list-group location-list"></div>\n            </div>\n        </div><!-- col-lg-8 -->\n    </div><!-- row -->\n</div><!-- container -->\n\n<div id="foursquareModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="foursqareModal" aria-hidden="true">\n\t<form id="existingLocationForm" role="form">\n\t\t<div class="modal-dialog">\n\t\t\t<div class="modal-content">\n\t\t\t\t<div class="modal-header">\n\t\t\t\t\t<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n\t\t\t\t\t<h4 class="existingLocationName modal-title" id="myModalLabel"></h4>\n\t\t\t\t</div>\n\t\t\t\t<div class="modal-body default-body">\n\t\t\t\t\t<div class="well">\n\t\t\t\t\t\t<h3></h3>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="well">\n\t\t\t\t\t\t<i class="fa fa-bullhorn"></i> Got something to say?\n\t\t\t\t\t\t<textarea id="CheckinMessageInput" class="checkinMessageInput form-control" rows="4"></textarea>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="modal-body response-body">\n\t\t\t\t\t<div class="well">\n\t\t\t\t\t\t<h3></h3>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="well prize-well">\n\t\t\t\t\t\t<i class="fa fa-gift fa-3"></i> Prizes\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="modal-footer">\n\t\t\t\t\t<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n\t\t\t\t\t<button type="submit" class="existing_save btn btn-primary">Here</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</form>\n</div>\n';
return __p
};

this["JST"]["templates/inventory.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<div class="container inventoryContainer">\n    <div class="row">\n        <div class="col-sm-6 col-md-4">\n            <div class="thumbnail inventoryItem">\n                <img src="" />\n                <div class="caption">\n                    <h3>item name</h3>\n                    <p>This is item #[unique_id] of the set!<br />You won this prize [some hours, days and/or mins] ago</p>\n                </div>\n            </div>\n        </div>\n    </div><!-- row -->\n</div><!-- container -->\n';
return __p
};

this["JST"]["templates/login.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<div class="container">\n    <div class="row">\n        <div class="col-sm-6 col-sm-offset-3">\n            <form id="userLoginForm" class="form-signin">\n                <h2 class="form-signin-heading">Please sign in</h2>\n                <div class="form-group">\n                    <label for="inputUsername" class="sr-only">Username</label>\n                    <input type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus>\n                </div>\n                <div class="form-group">\n                    <label for="inputPassword" class="sr-only">Password</label>\n                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>\n                </div>\n                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>\n            </form>\n            <p class="error_msg text-center text-warning"></p>\n        </div>\n    </div>\n</div> <!-- /container -->\n';
return __p
};

this["JST"]["templates/register.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<div class="container">\n    <form class="form-signin">\n        <h2 class="form-signin-heading">Please sign in</h2>\n        <label for="inputEmail" class="sr-only">Email address</label>\n        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>\n        <label for="inputPassword" class="sr-only">Password</label>\n        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>\n        <div class="checkbox">\n            <label>\n                <input type="checkbox" value="remember-me"> Remember me\n            </label>\n        </div>\n        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>\n    </form>\n</div> <!-- /container -->\n';
return __p
};

this["JST"]["templates/timeline.html"] = function(data) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="container">\n    <div class="row">\n        <div class="col-md-8">\n            <div class="mapWrapper">\n                <div id="map-canvas" style="width: 100%; height: 400px;"></div>\n            </div>\n        </div><!--col-md-8-->\n        <div class="col-md-4">\n            <p>LAST SEEN AT:</p>\n            <h4 class="lastSeenLabel">' +
((__t = ( data[0].name )) == null ? '' : __t) +
'</h4>\n            ' +
((__t = ( data[0].review )) == null ? '' : __t) +
'\n        </div><!--col-md-4-->\n    </div>\n</div><!-- container -->\n\n<div class="container">\n\t<div class="row">\n\t\t<div class="col-md-8 col-md-offset-2">\n\t\t\t<div class="panel panel-default">\n                <div class="panel-body">\n                    <ul class="timeline">\n                        ';
 _.each(data, function(checkin, index){ ;
__p += '\n                            <li class="';
 if (index%2 ==0) { ;
__p += 'timeline-inverted';
 } ;
__p += '">\n                                <div class="timeline-badge"><i class="fa fa-check"></i></div>\n                                <div class="timeline-panel">\n                                    <h4 class="timeline-title">' +
((__t = ( checkin.name )) == null ? '' : __t) +
'</h4>\n                                    ';
 if ( !_.isEmpty(checkin.review) ){ ;
__p += '\n                                        <blockquote><p>' +
((__t = ( checkin.review )) == null ? '' : __t) +
'</p></blockquote>\n                                    ';
 } ;
__p += '\n                                    <p><small><i class="fa fa-clock-o"></i>' +
((__t = ( checkin.timestamp )) == null ? '' : __t) +
'</small></p>\n                                </div>\n                            </li>\n                        ';
 }); ;
__p += '\n                    </ul>\n                </div>\n            </div>\n\t\t</div><!-- col-md-8 -->\n\t</div><!-- row -->\n</div><!-- container -->\n';
return __p
};