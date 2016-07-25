(function(){
  var cols = ['AliceBlue','AntiqueWhite','Aqua','Aquamarine',
  'Azure','Beige','Bisque','Black','BlanchedAlmond','Blue',
  'BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse',
  'Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson',
  'Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray',
  'DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen',
  'DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen',
  'DarkSlateBlue','DarkSlateGray','DarkTurquoise','DarkViolet',
  'DeepPink','DeepSkyBlue','DimGray','DodgerBlue','FireBrick',
  'FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite',
  'Gold','GoldenRod','Gray','Green','GreenYellow','HoneyDew',
  'HotPink','IndianRed ','Indigo  ','Ivory','Khaki','Lavender',
  'LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral',
  'LightCyan','LightGoldenRodYellow','LightGray','LightGreen',
  'LightPink','LightSalmon','LightSeaGreen','LightSkyBlue',
  'LightSlateGray','LightSteelBlue','LightYellow','Lime','LimeGreen',
  'Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue',
  'MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue',
  'MediumSpringGreen','MediumTurquoise','MediumVioletRed',
  'MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite',
  'Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed',
  'Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed',
  'PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue',
  'Purple','RebeccaPurple','Red','RosyBrown','RoyalBlue',
  'SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell',
  'Sienna','Silver','SkyBlue','SlateBlue','SlateGray','Snow',
  'SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato',
  'Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow',
  'YellowGreen'];
  function $(x) {
    return document.querySelector(x);
  }
  var levels = {
    'easy': [40, 20], 
    'normal': [80, 15], 
    'hard': [120, 10], 
    'expert': ['all',10]
  };
  var moves = levels['easy'][1];
  var swabnumber = levels['easy'][0];
  var currentcol = 'white';
  var correct = 0;
  var currentlevel = false;

  function setlevel(button) {
    currentlevel = button;
  }

  function drawbuttons(container) {
    var out = '';
    for (level in levels) {
      out += '<li><button data-amount="' + levels[level][0] + '" data-moves="' + 
              levels[level][1] + '">' + level + '</button></li>';
    }
    container.innerHTML = out;
  }

  $('#levelbuttons').addEventListener('click', function(ev) {
    ev.preventDefault();
    var target = ev.target;
    if (target.tagName === 'BUTTON') {
      swabnumber = target.getAttribute('data-amount');
      moves = target.getAttribute('data-moves');
      setlevel(target);
      drawswabs(swabnumber, cols);
      updatecounter(0, moves);
      document.body.classList.remove('loaded');
    }
  });

  function init(correct, swabnumber, moves) {
    drawbuttons($('#levelbuttons'));
    drawswabs(swabnumber, cols);
    updatecounter(correct, moves);
  }

  function updatecounter(correct, allmoves) {
    $('#counter').innerHTML = '<span class="correct">' + correct +
                              '</span>/<span class="wrong">' +
                               allmoves+'</span>';
  }

  $('ul.swabs').addEventListener('click', function(ev) {
    ev.preventDefault();
    var target = ev.target;
    if (target.tagName === 'A') {
      var col = target.getAttribute('data-title');
        validatecol(col);
    }
  });

  function validatecol(col) {
    if (col === currentcol) {
      ++correct;
      updatecounter(correct, moves);
      $('#result').innerHTML = '';
      drawswabs(swabnumber, cols);
    } else {
      --moves;
      if (moves === 0) {
        gameover(correct);
      } else {
        updatecounter(correct, moves);
        $('#result').innerHTML = 'nope… <b style="color: ' + col +
                                 '">(' + col + ')</b>';
      }  
    }
  } 

  function gameover(correct) {
    $('.scores').innerHTML = 'You recognised ' + correct + ' colours on the ' + 
                              currentlevel.innerHTML + ' level.';
    $('.share').innerHTML = '' + 
      '<a target="_blank" href="http://twitter.com/share?url=' +
      'https://codepo8.github.io/10kb-CSS-colour-game/&text=' +
      encodeURIComponent('I played "Find the named CSS colour" ' +
      'and recognised ' + correct + ' colours on the ' + 
      currentlevel.innerHTML + ' level') + 
      '"><svg xmlns="http://www.w3.org/2000/svg" height="50" width="42" viewBox="0 0 182.66667 150.66667"><defs><clipPath id="a"><path d="M0 10.012h1366.9v1110.9H0z"/></clipPath></defs><g clip-path="url(#a)" transform="matrix(.1333 0 0 -.1333 0 150.67)"><path d="M1366.9 989.39c-50.27-22.31-104.33-37.387-161.05-44.18 57.89 34.723 102.34 89.68 123.28 155.15-54.18-32.15-114.18-55.47-178.09-68.04-51.13 54.49-124.02 88.55-204.68 88.55-154.89 0-280.43-125.55-280.43-280.43 0-21.988 2.457-43.398 7.258-63.91-233.08 11.68-439.72 123.36-578.04 293.01-24.14-41.4-37.97-89.567-37.97-140.97 0-97.308 49.49-183.13 124.76-233.44-45.968 1.437-89.217 14.058-127.03 35.078-.042-1.18-.042-2.348-.042-3.52 0-135.9 96.68-249.22 224.96-275-23.512-6.41-48.28-9.8-73.86-9.8-18.09 0-35.628 1.71-52.78 5 35.71-111.41 139.26-192.5 262-194.77-96.06-75.23-216.96-120.04-348.36-120.04-22.622 0-44.962 1.332-66.92 3.91 124.16-79.568 271.55-125.98 429.94-125.98 515.82 0 797.86 427.31 797.86 797.93 0 12.153-.28 24.223-.79 36.25 54.77 39.57 102.31 88.95 139.93 145.2" fill="#55ACEE"/></g></svg>' +
      'Share on Twitter</a>';                          
    document.body.classList.add('ended');
  }

  function drawswabs(swabnumber, cols) {
    var list = $('ul.swabs');
    var out ='';
    var newrand = [];
    if (swabnumber === 'all') {
      newrand = shuffle(cols);
    } else {
      newrand = shuffle(cols).slice(0, +swabnumber);
    }
    var all = newrand.length;
    var index = Math.floor(Math.random() * newrand.length);
    currentcol = newrand[index];
    $('#colourname').innerHTML = currentcol;
    for (var i = 0; i < all; i++) {
      out += '<li><a href="#"  data-title="' + newrand[i] +
             '" style="background:' + newrand[i] +
             '"></a></li>';
    }
    list.innerHTML = out;
  }

  function shuffle(array) {
    var newarray = array.slice(0);
    var currentIndex = newarray.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = newarray[currentIndex];
      newarray[currentIndex] = newarray[randomIndex];
      newarray[randomIndex] = temporaryValue;
    }
    return newarray;
  }

  /* ZOMG cheatmode */
  document.addEventListener('keydown', function(ev) {
    if (ev.which === 191) {
      $('a[data-title^=' + currentcol + ']').innerHTML = '!';
      }
  });
  document.addEventListener('keyup', function(ev) {
      $('a[data-title^=' + currentcol + ']').innerHTML = '';
  });
 /* end cheatmode */

  $('.gameover button').addEventListener('click', function(ev) {
      document.body.classList.remove('ended');
      $('#result').innerHTML = '';
      correct = 0;
      document.body.classList.add('loaded');
  });

  init(0, levels['easy'][0], levels['easy'][1]);
  document.body.classList.add('loaded');

;})();