document.getElementById("uploadBtn").addEventListener("click", function () {
  document.getElementById("croppie-input").click();
});
var dyHeight = 300;
function changeSize(aspectWidth, aspectHeight, heightValue) {
  $("#croppie-demo").croppie("destroy");
  var aspectRatio = aspectWidth / aspectHeight;

  var viewportWidth = 450;
  var viewportHeight = 450 / aspectRatio;

  if (viewportHeight > 450) {
    viewportHeight = 450;
    viewportWidth = 450 * aspectRatio;
  }

  croppieDemo = $("#croppie-demo").croppie({
    enableOrientation: true,
    enableResize: false,
    viewport: {
      width: viewportWidth,
      height: viewportHeight,
      type: "rectangle",
    },
    boundary: {
      width: 450,
      height: 450,
    },
  });
  $("#croppie-demo").croppie("bind", {
    url: uploadedImage,
  });

  dyHeight = heightValue;
}

// $(".size_btn").on("click", function (prevHeight){
//     $("#croppie-view").css("height", dyHeight);
//   });

var uploadedImage = null;
var croppieDemo = $("#croppie-demo").croppie({
  enableOrientation: true,
  enableResize: false,
  viewport: {
    width: 450,
    height: 450,
    type: "rectangle",
  },
  boundary: {
    width: 450,
    height: 450,
  },
});

$("#croppie-input").on("change", function () {
  var reader = new FileReader();
  reader.onload = function (e) {
    uploadedImage = e.target.result;
    console.log(uploadedImage);
    croppieDemo.croppie("bind", {
      url: uploadedImage,
    });
  };
  reader.readAsDataURL(this.files[0]);
});

$(".croppie-crop").on("click", function (ev) {
  if (uploadedImage !== null) {
    croppieDemo
      .croppie("result", {
        type: "canvas",
        size: "original",
        format: "png",
        quality: 1,
      })
      .then(function (image) {
        html = '<img src="' + image + '" id="prv" />';
        $("#croppie-view").html(html);
        $("#prv").css("height", dyHeight);

        console.log(image);
      });
  } else {
    console.log("No image uploaded.");
  }
});

$(document).ready(function () {
  $(".canvas_section").hide();
  $("#croppie-input").change(function () {
    $(".upload_section").hide();
    $(".canvas_section").show();
  });
});
