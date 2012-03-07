
/*
# Let's play
*/

(function() {
  var getUrl, sortPhotos;

  getUrl = _.template("http://farm<%= farm %>.static.flickr.com/<%= server %>/<%= id %>_<%= secret %>.jpg");

  sortPhotos = function(a, b) {
    var result, _ref, _ref2;
    console.log("Komt die a");
    console.log(a);
    console.log(b);
    result = (_ref = parseInt(a.photo.dateuploaded) > parseInt(b.photo.dateuploaded)) != null ? _ref : -{
      1: (_ref2 = parseInt(a.photo.dateuploaded) === parseInt(b.photo.dateuploaded)) != null ? _ref2 : {
        0: 1
      }
    };
    console.log(result);
    return result;
  };

  jQuery(document).ready(function() {
    var set_images_url;
    set_images_url = "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=d06ba3473787cc2465f5bbb038ca3b38&photoset_id=72157629474958011&format=json&jsoncallback=?";
    return $.ajax({
      url: set_images_url,
      type: 'post',
      dataType: 'jsonp',
      success: function(response) {
        var photos, set;
        set = response.photoset;
        console.log(set);
        photos = set.photo;
        jQuery.each(photos, function(index, photo) {
          var photo_url;
          photo_url = "http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=d06ba3473787cc2465f5bbb038ca3b38&photo_id=" + photo.id + "&format=json&jsoncallback=?";
          return jQuery.ajax({
            url: photo_url,
            dataType: 'jsonp',
            success: function(photo_response) {
              return photo.photo = photo_response.photo;
            }
          });
        });
        console.log("hier komen de fotos");
        console.log(photos);
        photos.sort(sortPhotos);
        return console.log(photos);
      }
    });
  });

}).call(this);
