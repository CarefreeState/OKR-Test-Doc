// 获取当前页面的 queryString 的 path
var path = getParamValue("path");
var decodePath = Base64.decode(path);

jsonRequest("/testdoc/" + path, "GET", null, function (data) {
  for (i = 0; i < data.length; i++) {
    var isDir = data[i].isDir;
    var name = data[i].name;
    var fileItem = '<li class="file-item">';
    if (isDir === true) {
      fileItem +=
        '<div class="file-header" onclick="redirect(' +
        "'" +
        getDirUrl(name) +
        "'" +
        ')"><span class="file-icon">📁</span><span style="color: #551a8b" class="file-name">' +
        name +
        "</span></div></li>";
    } else {
      fileItem +=
        '<div class="file-header"><span class="file-icon">📄</span><span class="file-name">' +
        name +
        '</span></div><div class="file-content"><img src="';
      fileItem += getImgUrl(name) + '" alt="' + name + '" /></div></li>';
    }
    jQuery(".file-list").append(jQuery(fileItem));
  }
  document.querySelectorAll(".file-item").forEach((item) => {
    const header = item.querySelector(".file-header");
    const content = item.querySelector(".file-content");

    if (content) {
      header.addEventListener("click", () => {
        item.classList.toggle("expanded");
      });
    }
  });
});

function getDirUrl(name) {
  return "automationimages.html?path=" + Base64.encode(decodePath + "/" + name);
}

function getImgUrl(name) {
  return "images/automation" + decodePath + "/" + name;
}

function redirect(url) {
  location.href = url;
}
