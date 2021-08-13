var app = new Vue({
  el: "#app",
  data: function () {
    return {
      characters: [
        { name: "Aether", pronoun: "he" },
        { name: "Albedo", pronoun: "he" },
        { name: "Baal", pronoun: "she" },
        { name: "Barbara", pronoun: "she" },
        { name: "Amber", pronoun: "she" },
        { name: "Beidou", pronoun: "she" },
        { name: "Bennet", pronoun: "he" },
        { name: "Chongyun", pronoun: "he" },
        { name: "Diluc", pronoun: "he" },
        { name: "Diona", pronoun: "she" },
        { name: "Eula", pronoun: "she" },
        { name: "Fischl", pronoun: "she" },
        { name: "Ganyu", pronoun: "she" },
        { name: "Hu Tao", pronoun: "she" },
        { name: "Kazuha", pronoun: "he" },
        { name: "Kaeya", pronoun: "he" },
        { name: "Ayaka", pronoun: "she" },
        { name: "Keqing", pronoun: "she" },
        { name: "Klee", pronoun: "she" },
        { name: "Lisa", pronoun: "she" },
        { name: "Lumine", pronoun: "she" },
        { name: "Mona", pronoun: "she" },
        { name: "Ningguang", pronoun: "she" },
        { name: "Noelle", pronoun: "she" },
        { name: "Qiqi", pronoun: "she" },
        { name: "Razor", pronoun: "he" },
        { name: "Rosaria", pronoun: "she" },
        { name: "Sayu", pronoun: "she" },
        { name: "Sucrose", pronoun: "she" },
        { name: "Venti", pronoun: "he" },
        { name: "Xiao", pronoun: "he" },
        { name: "Xiangling", pronoun: "she" },
        { name: "Xingqiu", pronoun: "he" },
        { name: "Xinyan", pronoun: "she" },
        { name: "Yanfei", pronoun: "she" },
        { name: "Yoimiya", pronoun: "she" },
        { name: "Zhongli", pronoun: "he" },
      ],
      categories: [],
      category: -1,
      piada: "",
      character: 0,
    };
  },
  methods: {
      onRandom: () => {
      var url = "https://api.chucknorris.io/jokes/random"; //Sua URL

      url +=
        app.category < 0 ? "" : `?category=${app.categories[app.category]}`;

      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", url, false);

      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          var res = JSON.parse(xhttp.responseText);
          app.piada = res.value
        //   app.formatName(char, res.value)
        }
      };
      xhttp.send();
    },
  
  },
  computed: {
    formatedJoke: function() {
        var str = this.piada
        var char = this.characters[this.character]
        str = str.replaceAll(/Chuck Norris/ig, char.name).replaceAll(/Chuck/ig, char.name).replaceAll(/Norris/ig, char.name);

        if (char.pronoun == "she") {
          str = str.replaceAll(" he ", " she ").replaceAll(" his ", " her ").replaceAll(" him ", " her ");
          str = str.replaceAll(" He ", " She ").replaceAll(" His ", " Her ").replaceAll(" Him ", " Her ");
        }
        console.log(str)

        return str;
    }
  },
  created: function () {
    var url = "https://api.chucknorris.io/jokes/categories"; //Sua URL

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        var res = JSON.parse(xhttp.responseText);
        this.categories = res;

        console.log(this.categories, res);
      }
    };
    xhttp.send();
  },
});
