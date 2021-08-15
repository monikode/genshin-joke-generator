var app = new Vue({
  el: "#app",
  data: function () {
    return {
      characters: [
        { name: "Aether", pronoun: "he", vision: "Geo" },
        { name: "Albedo", pronoun: "he", vision: "Geo" },
        { name: "Baal", pronoun: "she", vision: "Electro" },
        { name: "Barbara", pronoun: "she", vision: "Hydro" },
        { name: "Amber", pronoun: "she", vision: "Pyro" },
        { name: "Beidou", pronoun: "she", vision: "Electro" },
        { name: "Bennet", pronoun: "he", vision: "Pyro" },
        { name: "Chongyun", pronoun: "he", vision: "Cryo" },
        { name: "Diluc", pronoun: "he", vision: "Pyro" },
        { name: "Diona", pronoun: "she", vision: "Cryo" },
        { name: "Eula", pronoun: "she", vision: "Cryo" },
        { name: "Fischl", pronoun: "she", vision: "Electro" },
        { name: "Ganyu", pronoun: "she", vision: "Cryo" },
        { name: "HuTao", pronoun: "she", vision: "Pyro" },
        { name: "Kazuha", pronoun: "he", vision: "Anemo" },
        { name: "Kaeya", pronoun: "he", vision: "Cryo" },
        { name: "Ayaka", pronoun: "she", vision: "Cryo" },
        { name: "Keqing", pronoun: "she", vision: "Electro" },
        { name: "Klee", pronoun: "she", vision: "Pyro" },
        { name: "Lisa", pronoun: "she", vision: "Electro" },
        { name: "Lumine", pronoun: "she", vision: "Anemo" },
        { name: "Mona", pronoun: "she", vision: "Hydro" },
        { name: "Ningguang", pronoun: "she", vision: "Geo" },
        { name: "Noelle", pronoun: "she", vision: "Geo" },
        { name: "Qiqi", pronoun: "she", vision: "Cryo" },
        { name: "Razor", pronoun: "he", vision: "Electro" },
        { name: "Rosaria", pronoun: "she", vision: "Cryo" },
        { name: "Sayu", pronoun: "she", vision: "Anemo" },
        { name: "Sucrose", pronoun: "she", vision: "Anemo" },
        { name: "Venti", pronoun: "he", vision: "Anemo" },
        { name: "Xiao", pronoun: "he", vision: "Anemo" },
        { name: "Xiangling", pronoun: "she", vision: "Pyro" },
        { name: "Xingqiu", pronoun: "he", vision: "Hydro" },
        { name: "Xinyan", pronoun: "she", vision: "Pyro" },
        { name: "Yanfei", pronoun: "she", vision: "Pyro" },
        { name: "Yoimiya", pronoun: "she", vision: "Pyro" },
        { name: "Zhongli", pronoun: "he", vision: "Geo" },
      ],
      categories: [],
      category: -1,
      piada: "",
      character: 0,
    };
  },
  watch: {
    character: function () {
      var str = this.characters[this.character].name.toLowerCase();

      document.getElementById("char").style.backgroundImage =
        "url(assets/" + str + ".png)";
    },
    joke: function () {},
  },
  methods: {
    centerText: (
      ctx,
      text,
      x,
      y,
      lineHeight,
      maxWidth,
      color,
      charName,
      charColor
    ) => {
      var initY = y;
      var words = text.split(" ");
      var line = "";
      var lineHeight = 40;
      ctx.fillStyle = color;

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth) {
          ctx.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);

      var height = y - initY;
      var center = 300 - height / 2;
      center = Math.floor(center);

      if (initY !== center) {
        app.centerText(ctx, text, x, center, lineHeight, maxWidth, "#0C0C0D");
      }
      app.fillName(ctx, charName, x, center - 43, charColor);
    },

    fillName: (ctx, text, x, y, color) => {
      if (text) {
        ctx.font = "bold 18px Montserrat";
        ctx.textBaseline = "top";
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
      }
    },
    getCanvasCharImg: function () {
      var str = this.characters[this.character].name.toLowerCase();
      return (
        "https://raw.githubusercontent.com/monikode/genshin-joke-generator/master/assets/" +
        str +
        ".png"
      );
    },
    getCanvasVisionImg: function () {
      var str = this.characters[this.character].vision.toLowerCase();
      return (
        "https://raw.githubusercontent.com/monikode/genshin-joke-generator/master/assets/" +
        str +
        ".png"
      );
    },
    getVisionImg: function () {
      var str = this.characters[this.character].vision.toLowerCase();
      document.getElementById("left").style.backgroundColor = `var(--${str})`;
      return "assets/" + str + ".png";
    },
    generateCanvas: () => {
      var myCanvas = document.getElementById("my-canvas");
      var ctx = myCanvas.getContext("2d");
      var color = getComputedStyle(document.documentElement).getPropertyValue(
        "--" + app.characters[app.character].vision.toLowerCase()
      );
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 235, 600);
      ctx.save();
      ctx.globalAlpha = 0.2;
      var vision = document.getElementById("canvas-vision");
      vision.style.opacity = 0.38;
      ctx.drawImage(vision, -25, 340, 318, 307);
      ctx.restore();
      ctx.fillStyle = "#F4F4F4";
      ctx.fillRect(235, 0, 800 - 235, 600);

      ctx.fillStyle = "#0C0C0D";
      ctx.font = "36px Montserrat";

      var x = 386;
      var y = 400;
      var maxWidth = 334;
      var lineHeight = 40;

      app.centerText(
        ctx,
        app.formatedJoke,
        x,
        y,
        lineHeight,
        maxWidth,
        "#F4F4F4",
        app.characters[app.character].name.toUpperCase(),
        color
      );

      ctx.font = "bold 14px Montserrat";
      ctx.fillStyle = "#B4B4B4";
      ctx.fillText("DEVELOPED BY MONIKODE", 562, 567);
      ctx.fillText("GENERATED BY GENSHIN-JOKE-GENERATOR", 440, 538);

      var img = document.getElementById("canvas-img");
      console.log(img.width);
      var aux = img.height / img.width;
      ctx.drawImage(img, 10, 10);

      const dataURI = myCanvas.toDataURL("image/jpeg");

      // console.log(dataURI, typeof dataURI, decodeURI(dataURI));
      console.log(decodeURI(dataURI));
      var link = document.createElement("a");
      var tt = document.getElementById("twitter");
      // link.download = 'joke';
      link.target = "_blank";

      fetch(dataURI)
        .then((res) => res.blob())
        .then((blob) => {
          
          var url = URL.createObjectURL(blob);
        
          tt.href += url;
          link.href = url;
          link.click();
        });
    },
    onRandom: () => {
      var url = "https://api.chucknorris.io/jokes/random"; //Sua URL

      url +=
        app.category < 0 ? "" : `?category=${app.categories[app.category]}`;

      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", url, false);

      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          var res = JSON.parse(xhttp.responseText);
          app.piada = res.value;
          //   app.formatName(char, res.value)
        }
      };

      xhttp.send();
    },
  },
  computed: {
    formatedJoke: function () {
      var str = this.piada;
      var char = this.characters[this.character];
      str = str
        .replaceAll(/Chuck Norris/gi, char.name)
        .replaceAll(/Chuck/gi, char.name)
        .replaceAll(/Norris/gi, char.name);

      if (char.pronoun == "she") {
        str = str
          .replaceAll(" he ", " she ")
          .replaceAll(" his ", " her ")
          .replaceAll(" him ", " her ");
        str = str
          .replaceAll(" He ", " She ")
          .replaceAll(" His ", " Her ")
          .replaceAll(" Him ", " Her ");
        str = str.replaceAll(" Him.", " Her.").replaceAll(" him.", " her.");
      }

      return str;
    },
  },
  created: function () {
    var url = "https://api.chucknorris.io/jokes/categories"; //Sua URL

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        var res = JSON.parse(xhttp.responseText);
        this.categories = res;
      }
    };
    xhttp.send();
  },
});
