"use strict";
module.exports = function(gulp, Plugin) {
  var dist = "./dist",
    src = "./src/image/",
    imgSource2 = src + "/**/*@2x.png",
    imgSource1 = src + "/**/*.png",
    imgDistName = "img/sprite.png",
    cssDistName = "css/sprite.css",
    lessDistName = "css/sprite.less",
    imgDist = dist;

  const $ = require("gulp-load-plugins")();

  gulp.task("clean_r", function() {
    return gulp.src(dist, { read: false }).pipe(Plugin.clean());
  });

  //image minfy
  gulp.task("img_less2", function() {
    return gulp
      .src(imgSource2)
      .pipe(
        Plugin.spritesmith({
          imgName: imgDistName, // 生成的精灵图的路径和名字
          cssName: lessDistName, // 生成的样式的路径和名字
          padding: 2, // 合成的小图的之间的间距
          cssFormat: "less", // 生成的css文件的文件类型
          algorithm: "binary-tree", // 精灵图上面各图的排版样式
          cssTemplate: function(data) {
            // 生成的css模板， 即最后生成的css文件，会根据这个里面的的规则来表示  我们可以规定每个图片对应的类的名字， 等等
            let arr = [],
              width = data.spritesheet.px.width,
              height = data.spritesheet.px.height,
              url = data.spritesheet.image;
            let strIndex;
            let arr1 = [];
            data.sprites.forEach(function(sprite, index) {
              strIndex = sprite.name.indexOf("@");
              arr1.push(
                ".setSprite_" +
                  sprite.name.substring(0, strIndex) +
                  "(" +
                  '"' +
                  url +
                  '"' +
                  ", " +
                  parseFloat(sprite.px.offset_x) / 2 +
                  "px" +
                  ", " +
                  parseFloat(sprite.px.offset_y) / 2 +
                  "px" +
                  ", " +
                  parseFloat(width) / 2 +
                  "px" +
                  ", " +
                  parseFloat(sprite.px.width) / 2 +
                  "px" +
                  ", " +
                  parseFloat(sprite.px.height) / 2 +
                  "px" +
                  ");\n"
              );
            });
            return arr1.join("");
          }
        })
      )
      .pipe(gulp.dest(imgDist));
  });

  gulp.task("img_css2", function() {
    return gulp
      .src(imgSource2)
      .pipe(
        Plugin.spritesmith({
          imgName: imgDistName, // 生成的精灵图的路径和名字
          cssName: cssDistName, // 生成的样式的路径和名字
          padding: 2, // 合成的小图的之间的间距
          cssFormat: "less", // 生成的css文件的文件类型
          algorithm: "binary-tree", // 精灵图上面各图的排版样式
          cssTemplate: function(data) {
            // 生成的css模板， 即最后生成的css文件，会根据这个里面的的规则来表示  我们可以规定每个图片对应的类的名字， 等等
            let arr = [],
              width = data.spritesheet.px.width,
              height = data.spritesheet.px.height,
              url = data.spritesheet.image;
            let strIndex;
            let arr1 = [];

            data.sprites.forEach(function(sprite, index) {
              strIndex = sprite.name.indexOf("@");
              arr.push(
                "." +
                  sprite.name.substring(0, strIndex) +
                  "{" +
                  "background: url('" +
                  url +
                  "') " +
                  "no-repeat " +
                  parseFloat(sprite.px.offset_x) / 2 +
                  "px " +
                  parseFloat(sprite.px.offset_y) / 2 +
                  "px;" +
                  "background-size: " +
                  parseFloat(width) / 2 +
                  "px " +
                  "auto;" +
                  "width: " +
                  parseFloat(sprite.px.width) / 2 +
                  "px;" +
                  "height: " +
                  parseFloat(sprite.px.height) / 2 +
                  "px;" +
                  "}\n"
              );
            });
            return arr.join("");
          }
        })
      )
      .pipe(gulp.dest(imgDist));
  });

  /*

        .setSprite(@url, @x, @y, @size, @width, @height){
            background: url(@url) no-repeat @x @y;
            background-size: @size auto;
            width: @width;
            height: @height;
        }

    */

  gulp.task("spriter_r", function() {
    return gulp
      .src("src/css/css.css")
      .pipe(
        Plugin.spriter({
          sprite: "sprite.png",
          slice: "./image",
          outpath: "./dist/test/sprite"
        })
      )
      .pipe(gulp.dest("./dist/test"));
  });

  gulp.task("sprite-retina", () => {
    var spriteData;
    return (
      gulp
        .src(imgSource)
        .pipe(
          Plugin.imageResize({
            width: "50%",
            height: "50%"
          })
        )
        // .pipe($.rename((path) => {
        //     path.basename = path.basename.slice(0, -3);
        // }))
        .pipe(gulp.dest("spritesRetinaFolder"))
    );

    // spriteData = gulp.src('image/**/*.png')
    // .pipe(Plugin.spritesmith({
    //     retinaSrcFilter: 'image/**/*@2x.png',
    //     other
    // }))
  });
};
