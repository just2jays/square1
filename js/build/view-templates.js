this["JST"] = this["JST"] || {};

this["JST"]["templates/checkin.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<div class="container">\n    <h2 class="widget-title text-center">Check In Here</h2>\n    <div class="row">\n        <div class="col-md-8 col-md-offset-2">\n            <div class="fetchFromFoursquare">\n                <p class="text-center">In this location, on this day, you did some awesome stuff...</p>\n                <p><button type="button" id="BeginCheckin" class="btn btn-block btn-lg">' +
((__t = ( data.search_label )) == null ? '' : __t) +
'</button></p>\n                <div class="text-center">\n                    <i class="loading-indicator fa fa-spinner fa-pulse fa-spin"></i>\n                </div>\n                <div class="list-group location-list"></div>\n            </div>\n        </div><!-- col-lg-8 -->\n    </div><!-- row -->\n</div><!-- container -->\n\n<div id="foursquareModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="foursqareModal" aria-hidden="true">\n\t<form id="existingLocationForm" role="form">\n\t\t<div class="modal-dialog">\n\t\t\t<div class="modal-content">\n\t\t\t\t<div class="modal-header">\n\t\t\t\t\t<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n\t\t\t\t\t<h4 class="existingLocationName modal-title" id="myModalLabel"></h4>\n\t\t\t\t</div>\n\t\t\t\t<div class="modal-body default-body">\n\t\t\t\t\t<div class="well">\n\t\t\t\t\t\t<h3></h3>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="well">\n\t\t\t\t\t\t<i class="fa fa-bullhorn"></i> Got something to say?\n\t\t\t\t\t\t<textarea id="CheckinMessageInput" class="checkinMessageInput form-control" rows="4"></textarea>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="modal-body response-body">\n\t\t\t\t\t<div class="well">\n\t\t\t\t\t\t<h3></h3>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="well prize-well">\n\t\t\t\t\t\t<i class="fa fa-gift fa-3"></i> Prizes\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="modal-footer">\n\t\t\t\t\t<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n\t\t\t\t\t<button type="submit" class="existing_save btn btn-primary">Here</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</form>\n</div>\n';
return __p
};

this["JST"]["templates/timeline.html"] = function(data) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="container">\n    <div class="row">\n        <div class="col-md-8">\n            <div class="mapWrapper">\n                <div id="map-canvas" style="width: 100%; height: 400px;"></div>\n            </div>\n        </div><!--col-md-8-->\n        <div class="col-md-4">\n            <p>LAST SEEN AT:</p>\n            <h4 class="lastSeenLabel">PLACE NAME</h4>\n            --REVIEW--\n        </div><!--col-md-4-->\n    </div>\n</div><!-- container -->\n\n<div class="container">\n\t<div class="row">\n\t\t<div class="col-md-8 col-md-offset-2">\n\t\t\t<div class="panel panel-default">\n                <div class="panel-body">\n                    <ul class="timeline">\n                        ';
 _.each(data, function(dat){ ;
__p += '\n                            <li>hi</li>\n                        ';
 }); ;
__p += '\n                    </ul>\n                </div>\n            </div>\n\t\t</div><!-- col-md-8 -->\n\t</div><!-- row -->\n</div><!-- container -->\n';
return __p
};