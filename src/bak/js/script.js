$(function () {

  'use strict';

  var console = window.console || { log: function () {} },
      $alert = $('.docs-alert'),
      $message = $alert.find('.message'),
      showMessage = function (message, type) {
        $message.text(message);

        if (type) {
          $message.addClass(type);
        }

        $alert.fadeIn();

        setTimeout(function () {
          $alert.fadeOut();
        }, 3000);
      };

  // Demo
  // -------------------------------------------------------------------------

  (function () {
    var $image = $('.img-container > img'),
        $dataX = $('#dataX'),
        $dataY = $('#dataY'),
        $dataHeight = $('#dataHeight'),
        $dataWidth = $('#dataWidth'),
        options = {
          aspectRatio: NaN,
          preview: '.img-preview',
          crop: function (data) {
            $dataX.val(Math.round(data.x));
            $dataY.val(Math.round(data.y));
            $dataHeight.val(Math.round(data.height));
            $dataWidth.val(Math.round(data.width));

            dataX=Math.round(data.x);
            dataY=Math.round(data.y);
            dataHeight=Math.round(data.height);
            dataWidth=Math.round(data.width);
            exportCrop();
          }
        };

    $image.on({
      'build.cropper': function (e) {
        console.log(e.type);
      },
      'built.cropper': function (e) {
        console.log(e.type);
      }
    }).cropper(options);


    // Methods
    $(document.body).on('click', '[data-method]', function () {
      var data = $(this).data(),
          $target,
          result;

      if (data.method) {
        data = $.extend({}, data); // Clone a new one

        if (typeof data.target !== 'undefined') {
          $target = $(data.target);

          if (typeof data.option === 'undefined') {
            try {
              data.option = JSON.parse($target.val());
            } catch (e) {
              console.log(e.message);
            }
          }
        }

        result = $image.cropper(data.method, data.option);

        if (data.method === 'getDataURL') {
          $('#getDataURLModal').modal().find('.modal-body').html('<img src="' + result + '">');
        }

        if ($.isPlainObject(result) && $target) {
          try {
            $target.val(JSON.stringify(result));
          } catch (e) {
            console.log(e.message);
          }
        }

      }
    }).on('keydown', function (e) {

      switch (e.which) {
        case 37:
          e.preventDefault();
          $image.cropper('move', -1, 0);
          break;

        case 38:
          e.preventDefault();
          $image.cropper('move', 0, -1);
          break;

        case 39:
          e.preventDefault();
          $image.cropper('move', 1, 0);
          break;

        case 40:
          e.preventDefault();
          $image.cropper('move', 0, 1);
          break;
      }

    });


    // Import image
    var $inputImage = $('#inputImage'),
        URL = window.URL || window.webkitURL,
        blobURL;

    if (URL) {
      $inputImage.change(function () {
        var files = this.files,
            file;

        if (files && files.length) {
          file = files[0];

          if (/^image\/\w+$/.test(file.type)) {
            blobURL = URL.createObjectURL(file);
            $image.one('built.cropper', function () {
              URL.revokeObjectURL(blobURL); // Revoke when load complete
            }).cropper('reset', true).cropper('replace', blobURL);
            $inputImage.val('');
          } else {
            showMessage('Please choose an image file.');
          }
        }
      });
    } else {
      $inputImage.parent().remove();
    }


    // Options
    $('.docs-options :checkbox').on('change', function () {
      var $this = $(this);

      options[$this.val()] = $this.prop('checked');
      $image.cropper('destroy').cropper(options);
    });


    // Tooltips
    $('[data-toggle="tooltip"]').tooltip();

  }());

  
  $("#noOfCol, #noOfRow, #spacingPx").change(function() {
    exportCrop();
  });  
});

var dataX = 0, dataY=0, dataHeight=0, dataWidth=0;

function exportCrop() {
  var oc=document.getElementById("preview-cropped");
  var octx=oc.getContext("2d");
  
  var canvasWidth = oc.width;
  var canvasHeight = oc.height;
  var noOfRow = $("#noOfRow").val();
  var noOfCol = $("#noOfCol").val();
  var spacingPx = $("#spacingPx").val();

  var outputWidth = 4000;
  
  var cutWidth = 0;
  var cutHeight = 0;
  var cutSpacing = parseInt(spacingPx*canvasWidth/outputWidth); // *2

  var maxWidth = parseInt(canvasWidth/noOfCol) - cutSpacing*2; // /2
  var maxHeight = parseInt(canvasHeight/noOfRow) - cutSpacing*2; // /2
  var steps = 0;

  if ((maxWidth/dataWidth)>(maxHeight/dataHeight)) {
    cutWidth = maxHeight/dataHeight*dataWidth;
    cutHeight = maxHeight;
    steps = Math.ceil(Math.log(dataHeight / cutHeight) / Math.log(2));
  } else {
    cutWidth = maxWidth;
    cutHeight = maxWidth/dataWidth*dataHeight;
    steps = Math.ceil(Math.log(dataWidth / cutWidth) / Math.log(2));
  }

  var img=document.getElementById("img-up").getElementsByTagName('img')[0];

  octx.fillStyle = "#FFFFFF";
  octx.fillRect(0,0,oc.width,oc.height);

  for(var i=0; i<noOfCol; i++) {
    for(var j=0; j<noOfRow; j++) {
        //ctx.drawImage(oc,(maxWidth+cutSpacing)*i,(maxHeight+cutSpacing)*j);
        octx.drawImage(img,parseInt(dataX),parseInt(dataY),parseInt(dataWidth),parseInt(dataHeight), cutSpacing + (maxWidth+cutSpacing*2)*i, cutSpacing + (maxHeight+cutSpacing*2)*j,cutWidth,cutHeight);
    }    
  }  
}