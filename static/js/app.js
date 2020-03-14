function makeResponsive() {

  var selector = d3.select("#selDataset");

  language = JSON.parse(language);
  language = Object.values(language).map(function (x) {
    var item = {word: x["word"]};
    return item;
  });

    var svgContainer = d3.select("body").append("svg").attr("width", "100%").attr("height", "600px")
    //.attr("z-index", "2").attr("position", "absolute").attr("left", "0").attr("top", "0")
    //.attr("display","block").attr("width","20%").attr("margin","auto")

    var spiral = d3_radial.spiral().center([500, 300]).increment(8);

    var circle = svgContainer.selectAll("g")
      .data(language)
      .enter().append("g")
      .attr("transform", "translate(0, 0)");
    
    function getRandomColor(random) {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

      var circlesGroup = circle.append('circle')
      .data(spiral(language))
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 7)
      .attr("fill", "grey")
      .attr("opacity", 0);
      circle.append("text")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("font-size", "6px")
      .attr("fill", "random")
      .text(function(language) { return language.word; })      
      //.attr("transform", "translate(350,-250) rotate(45)");
      ;
    
    var toolTip = d3.select("body").append("div")
      .attr("class", "2ltip");
    d3.selectAll('circle').on("mouseover", function(d, i) {
      d3.select(this.nextSibling).attr("fill", "red").attr("font-size", "40px");
    })
      var url = "https://en.wiktionary.org/wiki/"
    d3.selectAll('circle').on("click", function(d, i) {
      d3.select("#infobox").html(`<a href= ${url + d.word} target="_blank" style="color:red">Wiktionary</a>`);
        // toolTip.style("display", "block");
        // toolTip.html("check")
        //   .attr("left", d3.event.pageX + "px")
        //   .attr("top", d3.event.pageY + "px");
      })

        .on("mouseout", function() {
          d3.select(this.nextSibling).attr("fill", "black").attr("font-size", "6px");
          toolTip.style("display", "none");
        });
    
  
    }

makeResponsive();
    