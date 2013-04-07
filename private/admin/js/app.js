;(function ($, window) {
  'use strict';

  function killEvent(event) {
    event.stopPropagation()
    event.preventDefault()
  }

  function onFileDrag(event) {
    killEvent(event)
  }

  function onFileDrop(event) {
    killEvent(event)

    var files = event.originalEvent.dataTransfer.files

    $('#files').get(0).files = files
  }

  function onFileSelect(event) {
    killEvent(event)

    var files = event.originalEvent.target.files
      , fileCount = (files && files.length) || 0
      , $content = $('<ul></ul>')

    console.log('Selected:', files)

    if (fileCount === 0) {
      return
    }

    for (;fileCount--;) {
      $content.append($('<ul>' + files[fileCount].name + '</ul>'))
    }
    $('#progress').empty()
    // $('#progress').append($content)
  }

  function go(event) {
    killEvent(event)

    var form = $(event.target).parents('form')
      , files = form.find('input[type=file]').get(0).files
      , formData = new FormData()
      , fileCount = (files && files.length) || 0

    console.log('Uploading:', files)

    if (fileCount === 0) {
      return
    }

    for (;fileCount--;) {
      formData.append('files' + fileCount, files[fileCount])
    }

    $.ajax({
        type: 'PUT',
        url: window.location.origin + '/media',
        data: formData,
        processData: false,
        contentType: false,
        success: gone
    });
  }

  function gone(data) {
    var $content = $('<ul class="block-grid three-up" data-clearing></ul>')

    data.files.forEach(function (path) {
      $content.append($('<ul><a href="' + path + '"><img src="' + path + '"></img></a></ul>'))
    }, '')

    $('#progress').empty()
    $('#progress').append($content)
    // $('#progress').foundationClearing()
  }

  $('#files').change(onFileSelect)
  $('#files-target').bind('drop', onFileDrop)
  $('#files-target').bind('dragover', onFileDrag)
  $('#files-target').bind('dragleave', onFileDrag)
  $('#upload input[type=submit]').click(go)

  if (!(new XMLHttpRequest()).upload) {
  }
})(jQuery, this);
