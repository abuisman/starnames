###
# Let's play
###

var photos = {}

getUrl = _.template "http://farm<%= farm %>.static.flickr.com/<%= server %>/<%= id %>_<%= secret %>.jpg"

sortPhotos = (a, b) ->
  console.log "Komt die a"
  console.log a
  console.log b
  result= ( parseInt(a.photo.dateuploaded) > parseInt(b.photo.dateuploaded) ) ? -1 : ( (parseInt(a.photo.dateuploaded) == parseInt(b.photo.dateuploaded) ) ? 0 : 1)
  console.log result
  return result

jQuery(document).ready ->
    set_images_url = "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=d06ba3473787cc2465f5bbb038ca3b38&photoset_id=72157629474958011&format=json&jsoncallback=?"

    $.ajax 
      url: set_images_url
      type: 'post'
      dataType: 'jsonp'
      success: (response) ->
        set = response.photoset
        console.log set
        photos = set.photo
        
        jQuery.each photos, (index, photo) ->
          #console.log getUrl(photo)
          #console.log photo
          photo_url = "http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=d06ba3473787cc2465f5bbb038ca3b38&photo_id=" + photo.id + "&format=json&jsoncallback=?"
          
          jQuery.ajax
            url: photo_url
            dataType: 'jsonp'
            success: (photo_response) ->
              photo.photo = photo_response.photo
        
        console.log "hier komen de fotos"
        console.log photos
        photos.sort(sortPhotos)
        console.log photos
   #http://farm{farm-id}.static.flickr.com/{server-id}/{photo-id}_{secret}.jpg

